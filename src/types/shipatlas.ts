export interface ShipAtlasProject {
  id: string
  name: string
  type: string
  stack: string
  current_version: string
  executor_url: string | null
  client_id: string | null
  created_at: string
  updated_at: string
}

export interface ShipAtlasBrainRun {
  id: string
  current_version: string
  status: 'success' | 'failed' | 'running' | string
  created_at: string
  finished_at: string | null
  release_count: number
  approved_count: number
  rejected_count: number
  pending_count: number
}

export interface ShipAtlasScheduledDeploy {
  id: string
  release_id: string
  project_id: string
  scheduled_for: string
  branch: string
  status: 'pending' | 'running' | 'success' | 'failed' | 'aborted' | 'stale'
  attempts: number
  created_by: string
  created_at: string
  started_at: string | null
  finished_at: string | null
  release_version: string
  release_name: string
}

export interface ClientProjectOverview {
  id: string
  name: string
  type: string
  stack: string
  current_version: string
  last_run: ShipAtlasBrainRun | null
  next_deploy: ShipAtlasScheduledDeploy | null
}
