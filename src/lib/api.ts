export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type RequestOptions = {
  headers?: Record<string, string>
  signal?: AbortSignal
}

async function request<T>(
  method: string,
  baseUrl: string,
  path: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers ?? {}),
  }

  const init: RequestInit = {
    method,
    headers,
    credentials: 'include',
    signal: options?.signal,
  }

  if (body !== undefined) {
    init.body = JSON.stringify(body)
  }

  const response = await fetch(`${baseUrl}${path}`, init)

  if (response.status === 401) {
    window.dispatchEvent(new CustomEvent('xpand:unauthorized'))
  }

  if (!response.ok) {
    let message = `HTTP ${response.status}`
    try {
      const data = await response.json()
      message = data?.message ?? data?.error ?? message
    } catch {
      // ignore parse errors
    }
    throw new ApiError(response.status, message)
  }

  if (response.status === 204) {
    return undefined as unknown as T
  }

  return response.json() as Promise<T>
}

export function createApiClient(baseUrl: string) {
  return {
    get<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>('GET', baseUrl, path, undefined, options)
    },

    post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>('POST', baseUrl, path, body, options)
    },

    patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>('PATCH', baseUrl, path, body, options)
    },

    delete<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>('DELETE', baseUrl, path, undefined, options)
    },
  }
}
