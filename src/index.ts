// Components
export { Button } from "./components/Button";
export { AppSwitcher } from "./components/AppSwitcher";
export type { AppSwitcherApp } from "./components/AppSwitcher";

// Lib
export { createApiClient, ApiError } from "./lib/api";
export { cn } from "./lib/utils";

// Types
export type { Role, ClientType, ClientSegment, AuthUser, AuthToken, LoginInput, RegisterInput } from "./types/auth";
export type { ClientStatus, Client, ClientStats } from "./types/client";
export type { TicketType, TicketStatus, TicketPriority, Ticket, TicketComment, TicketStatusHistory, CreateTicketInput, UpdateTicketInput, TicketFilters, PaginatedTickets } from "./types/ticket";
export type { ShipAtlasProject, ShipAtlasBrainRun, ShipAtlasScheduledDeploy, ClientProjectOverview } from "./types/shipatlas";
