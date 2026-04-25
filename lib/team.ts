export type CheckKey =
  | "issues"
  | "dbs"
  | "idv"
  | "rtw"
  | "history"
  | "refs"
  | "health"
  | "visa"
  | "housing"
  | "vehicle"
  | "comments";

export type CheckState =
  | { kind: "ok" }
  | { kind: "alert" }
  | { kind: "pending" }
  | { kind: "na" }
  | { kind: "blank" }
  | { kind: "count"; value: number }
  | { kind: "comment" };

export type PipelineStatus =
  | "Offer Made"
  | "Onboarding"
  | "Signed Off"
  | "Ops";

export type TeamTab = "all" | "onboarding" | "signed-off" | "ops";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  pipelineStatus: PipelineStatus;
  tab: TeamTab;
  agency: string;
  targetStart: string | null;
  checks: Record<CheckKey, CheckState>;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "kelly-gaffney",
    name: "Kelly Gaffney",
    role: "Carer",
    pipelineStatus: "Offer Made",
    tab: "onboarding",
    agency: "Abicare",
    targetStart: null,
    checks: {
      issues: { kind: "count", value: 6 },
      dbs: { kind: "na" },
      idv: { kind: "ok" },
      rtw: { kind: "alert" },
      history: { kind: "pending" },
      refs: { kind: "alert" },
      health: { kind: "pending" },
      visa: { kind: "blank" },
      housing: { kind: "blank" },
      vehicle: { kind: "alert" },
      comments: { kind: "comment" },
    },
  },
];

export const TEAM_TABS: Array<{ id: TeamTab; label: string }> = [
  { id: "all", label: "All" },
  { id: "onboarding", label: "Onboarding" },
  { id: "signed-off", label: "Signed Off" },
  { id: "ops", label: "Ops" },
];

export const CHECK_COLUMNS: Array<{ key: CheckKey; label: string }> = [
  { key: "issues", label: "Issues" },
  { key: "dbs", label: "DBS" },
  { key: "idv", label: "IDV" },
  { key: "rtw", label: "RTW" },
  { key: "history", label: "History" },
  { key: "refs", label: "Refs" },
  { key: "health", label: "Health" },
  { key: "visa", label: "Visa" },
  { key: "housing", label: "Housing" },
  { key: "vehicle", label: "Vehicle" },
  { key: "comments", label: "Comments" },
];

export const AGENCIES = ["Abicare"] as const;
