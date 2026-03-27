import type { ClientType, ClientSegment } from './auth'

export type ClientStatus = 'pending' | 'active' | 'suspended'

export interface Client {
  id: string
  name: string
  email: string
  phone: string | null
  type: ClientType
  segment: ClientSegment
  company_name: string | null
  document: string | null
  invite_tag: string | null
  invite_used_at: string | null
  status: ClientStatus
  created_at: string
  updated_at: string
}

export interface ClientStats {
  open: number
  in_progress: number
  waiting_client: number
  resolved: number
  closed: number
  total: number
}
