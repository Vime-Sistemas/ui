export type Role = 'admin' | 'agent' | 'client'

export type ClientType = 'PJ' | 'PF' | 'SaaS'
export type ClientSegment = 'B2B' | 'B2C' | 'B2B2C'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: Role
  clientId: string | null
}

export interface AuthToken {
  token: string
  user: AuthUser
}

export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
  type: ClientType
  segment: ClientSegment
  company_name?: string
  document?: string
  phone?: string
}
