export type TicketType = 'bug' | 'feature' | 'feedback' | 'support'
export type TicketStatus = 'open' | 'in_progress' | 'waiting_client' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical'

export interface Ticket {
  id: string
  client_id: string
  created_by: string
  assigned_to: string | null
  title: string
  description: string
  type: TicketType
  status: TicketStatus
  priority: TicketPriority
  created_at: string
  updated_at: string
  resolved_at: string | null
  client_name?: string
  assignee_name?: string
}

export interface TicketComment {
  id: string
  ticket_id: string
  user_id: string
  content: string
  is_internal: boolean
  created_at: string
  updated_at: string
}

export interface TicketStatusHistory {
  id: string
  ticket_id: string
  changed_by: string
  from_status: TicketStatus | null
  to_status: TicketStatus
  changed_at: string
}

export interface CreateTicketInput {
  title: string
  description: string
  type: TicketType
  priority: TicketPriority
}

export interface UpdateTicketInput {
  status?: TicketStatus
  priority?: TicketPriority
  assigned_to?: string
  title?: string
  description?: string
}

export interface TicketFilters {
  status?: TicketStatus
  type?: TicketType
  priority?: TicketPriority
  page?: number
  limit?: number
}

export interface PaginatedTickets {
  data: Ticket[]
  total: number
  page: number
  limit: number
  totalPages: number
}
