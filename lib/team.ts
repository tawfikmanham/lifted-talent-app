export type CheckKey =
  | "idv"
  | "dbs"
  | "rtw"
  | "history"
  | "refs"
  | "health"
  | "visa"
  | "housing"
  | "vehicle"
  | "issues";

export type CheckStatus = "done" | "in-progress" | "waiting" | "blocked";

export type Check = {
  key: CheckKey;
  label: string;
  status: CheckStatus;
  note: string;
};

export type PipelineStatus =
  | "Offer Made"
  | "Onboarding"
  | "Signed Off"
  | "Ops";

export type TeamTab = "all" | "onboarding" | "signed-off" | "ops";

export type Responsibility = "candidate" | "external" | "lifted" | "clear";

export type LatestUpdate = {
  sentence: string;
  owner: Responsibility;
};

export type EstStart = {
  date: string | null;
  atRisk: boolean;
};

export type CommentAuthorRole = "team" | "candidate";

export type Comment = {
  id: string;
  author: string;
  role: CommentAuthorRole;
  timestamp: string;
  text: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  pipelineStatus: PipelineStatus;
  tab: TeamTab;
  agency: string;
  latestUpdate: LatestUpdate;
  estStart: EstStart;
  checks: Check[];
  comments: Comment[];
  newMessages: number;
};

export const CHECK_LABELS: Record<CheckKey, string> = {
  idv: "IDV",
  dbs: "DBS",
  rtw: "Right to work",
  history: "Work history",
  refs: "References",
  health: "Health declaration",
  visa: "Visa",
  housing: "Housing",
  vehicle: "Vehicle",
  issues: "Issues",
};

const buildChecks = (
  partial: Partial<Record<CheckKey, { status: CheckStatus; note: string }>>,
): Check[] => {
  return (Object.keys(CHECK_LABELS) as CheckKey[]).map((key) => {
    const entry = partial[key];
    return {
      key,
      label: CHECK_LABELS[key],
      status: entry?.status ?? "waiting",
      note: entry?.note ?? "Not started",
    };
  });
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "kelly-gaffney",
    name: "Kelly Gaffney",
    role: "Carer",
    pipelineStatus: "Offer Made",
    tab: "onboarding",
    agency: "Abicare",
    latestUpdate: {
      sentence: "Waiting on candidate; passport scan needed for ID verification.",
      owner: "candidate",
    },
    estStart: { date: null, atRisk: false },
    checks: buildChecks({
      idv: { status: "waiting", note: "Awaiting passport scan" },
      dbs: { status: "waiting", note: "Not started" },
      rtw: { status: "blocked", note: "Share code expired" },
      history: { status: "in-progress", note: "1 of 3 employers contacted" },
      refs: { status: "waiting", note: "Refs requested from candidate" },
      health: { status: "in-progress", note: "Form sent" },
      visa: { status: "done", note: "British citizen, N/A" },
      housing: { status: "done", note: "Confirmed" },
      vehicle: { status: "blocked", note: "No driving licence on file" },
      issues: { status: "blocked", note: "6 outstanding items" },
    }),
    comments: [
      {
        id: "kg-1",
        author: "Nina Lawson",
        role: "team",
        timestamp: "3 days ago",
        text: "Hi Kelly, we still need your passport scan to complete ID verification. Could you upload it via the portal?",
      },
      {
        id: "kg-2",
        author: "Kelly Gaffney",
        role: "candidate",
        timestamp: "2 days ago",
        text: "Sorry for the delay — I've been away. I'll get it uploaded tonight.",
      },
      {
        id: "kg-3",
        author: "Nina Lawson",
        role: "team",
        timestamp: "1 day ago",
        text: "No problem at all. Just flag when it's done and we'll pick it up straight away.",
      },
    ],
    newMessages: 1,
  },
  {
    id: "marcus-williams",
    name: "Marcus Williams",
    role: "Care Assistant",
    pipelineStatus: "Onboarding",
    tab: "onboarding",
    agency: "Abicare",
    latestUpdate: {
      sentence: "DBS submitted; awaiting result from Disclosure Scotland.",
      owner: "external",
    },
    estStart: { date: "2 May 2026", atRisk: false },
    checks: buildChecks({
      idv: { status: "done", note: "Verified" },
      dbs: { status: "in-progress", note: "Submitted; awaiting result" },
      rtw: { status: "done", note: "Verified" },
      history: { status: "done", note: "3 of 3 employers verified" },
      refs: { status: "in-progress", note: "1 of 2 received" },
      health: { status: "done", note: "Cleared" },
      visa: { status: "done", note: "British citizen, N/A" },
      housing: { status: "done", note: "Confirmed" },
      vehicle: { status: "done", note: "Licence verified" },
      issues: { status: "waiting", note: "No issues" },
    }),
    comments: [
      {
        id: "mw-1",
        author: "Nina Lawson",
        role: "team",
        timestamp: "4 days ago",
        text: "DBS has been submitted to Disclosure Scotland. We'll keep you updated as soon as the result comes back.",
      },
      {
        id: "mw-2",
        author: "Marcus Williams",
        role: "candidate",
        timestamp: "3 days ago",
        text: "Thanks for the update. Roughly how long does it usually take?",
      },
      {
        id: "mw-3",
        author: "Nina Lawson",
        role: "team",
        timestamp: "3 days ago",
        text: "Usually 2 to 5 working days. We'll be in touch the moment we hear back.",
      },
    ],
    newMessages: 0,
  },
  {
    id: "aisha-patel",
    name: "Aisha Patel",
    role: "Senior Carer",
    pipelineStatus: "Onboarding",
    tab: "onboarding",
    agency: "Helping Hands",
    latestUpdate: {
      sentence: "References received; Lifted reviewing before sign-off.",
      owner: "lifted",
    },
    estStart: { date: "28 Apr 2026", atRisk: false },
    checks: buildChecks({
      idv: { status: "done", note: "Verified" },
      dbs: { status: "done", note: "Cleared" },
      rtw: { status: "done", note: "Verified" },
      history: { status: "done", note: "5 of 5 employers verified" },
      refs: { status: "in-progress", note: "Verifying with Lifted" },
      health: { status: "done", note: "Cleared" },
      visa: { status: "done", note: "ILR confirmed" },
      housing: { status: "done", note: "Confirmed" },
      vehicle: { status: "done", note: "Licence verified" },
      issues: { status: "waiting", note: "No issues" },
    }),
    comments: [
      {
        id: "ap-1",
        author: "Nina Lawson",
        role: "team",
        timestamp: "2 days ago",
        text: "Both references have come through, Aisha. We're just doing our final review before signing you off.",
      },
      {
        id: "ap-2",
        author: "Aisha Patel",
        role: "candidate",
        timestamp: "1 day ago",
        text: "That's great to hear! Let me know if you need anything else from me.",
      },
    ],
    newMessages: 1,
  },
  {
    id: "tom-edwards",
    name: "Tom Edwards",
    role: "Carer",
    pipelineStatus: "Signed Off",
    tab: "signed-off",
    agency: "Abicare",
    latestUpdate: {
      sentence: "All checks complete; ready to start.",
      owner: "clear",
    },
    estStart: { date: "1 May 2026", atRisk: false },
    checks: buildChecks({
      idv: { status: "done", note: "Verified" },
      dbs: { status: "done", note: "Cleared" },
      rtw: { status: "done", note: "Verified" },
      history: { status: "done", note: "4 of 4 employers verified" },
      refs: { status: "done", note: "2 of 2 received" },
      health: { status: "done", note: "Cleared" },
      visa: { status: "done", note: "British citizen, N/A" },
      housing: { status: "done", note: "Confirmed" },
      vehicle: { status: "done", note: "Licence verified" },
      issues: { status: "done", note: "None" },
    }),
    comments: [
      {
        id: "te-1",
        author: "Nina Lawson",
        role: "team",
        timestamp: "5 days ago",
        text: "All checks are complete, Tom. Welcome to the team!",
      },
      {
        id: "te-2",
        author: "Tom Edwards",
        role: "candidate",
        timestamp: "5 days ago",
        text: "Brilliant news — really looking forward to getting started!",
      },
    ],
    newMessages: 0,
  },
  {
    id: "sofia-costa",
    name: "Sofia Costa",
    role: "Care Assistant",
    pipelineStatus: "Onboarding",
    tab: "onboarding",
    agency: "Bluebird Care",
    latestUpdate: {
      sentence: "Health declaration form sent; awaiting response from candidate.",
      owner: "candidate",
    },
    estStart: { date: "10 May 2026", atRisk: true },
    checks: buildChecks({
      idv: { status: "done", note: "Verified" },
      dbs: { status: "in-progress", note: "Submitted" },
      rtw: { status: "done", note: "Verified" },
      history: { status: "done", note: "3 of 3 employers verified" },
      refs: { status: "in-progress", note: "1 of 2 received" },
      health: { status: "waiting", note: "Form sent; awaiting response" },
      visa: { status: "done", note: "EU settled status" },
      housing: { status: "done", note: "Confirmed" },
      vehicle: { status: "blocked", note: "MOT expired" },
      issues: { status: "in-progress", note: "1 outstanding" },
    }),
    comments: [
      {
        id: "sc-1",
        author: "Nina Lawson",
        role: "team",
        timestamp: "4 days ago",
        text: "Hi Sofia, we sent the health declaration form last Tuesday. Could you fill it in when you get a chance?",
      },
      {
        id: "sc-2",
        author: "Sofia Costa",
        role: "candidate",
        timestamp: "3 days ago",
        text: "Of course, I'll get it done today.",
      },
      {
        id: "sc-3",
        author: "Nina Lawson",
        role: "team",
        timestamp: "2 days ago",
        text: "Also flagging that your MOT appears to have expired. You'll need a valid one before you can start.",
      },
      {
        id: "sc-4",
        author: "Sofia Costa",
        role: "candidate",
        timestamp: "1 day ago",
        text: "I'm booking it in this week. Will send confirmation once it's sorted.",
      },
    ],
    newMessages: 2,
  },
  {
    id: "james-oconnor",
    name: "James O'Connor",
    role: "Carer",
    pipelineStatus: "Offer Made",
    tab: "onboarding",
    agency: "Abicare",
    latestUpdate: {
      sentence: "ID verification in progress with provider.",
      owner: "external",
    },
    estStart: { date: null, atRisk: false },
    checks: buildChecks({
      idv: { status: "in-progress", note: "Submitted to provider" },
      dbs: { status: "waiting", note: "Not started" },
      rtw: { status: "waiting", note: "Not started" },
      history: { status: "waiting", note: "Not started" },
      refs: { status: "waiting", note: "Not started" },
      health: { status: "waiting", note: "Not started" },
      visa: { status: "done", note: "British citizen, N/A" },
      housing: { status: "waiting", note: "Not confirmed" },
      vehicle: { status: "waiting", note: "Not confirmed" },
      issues: { status: "waiting", note: "No issues" },
    }),
    comments: [
      {
        id: "jo-1",
        author: "Nina Lawson",
        role: "team",
        timestamp: "2 days ago",
        text: "Hi James, your ID verification has been submitted to our provider. We should have a result within 48 hours.",
      },
    ],
    newMessages: 0,
  },
  {
    id: "priya-shah",
    name: "Priya Shah",
    role: "Senior Carer",
    pipelineStatus: "Onboarding",
    tab: "onboarding",
    agency: "Helping Hands",
    latestUpdate: {
      sentence: "Right to work share code expired; new code needed from candidate.",
      owner: "candidate",
    },
    estStart: { date: "15 May 2026", atRisk: true },
    checks: buildChecks({
      idv: { status: "done", note: "Verified" },
      dbs: { status: "done", note: "Cleared" },
      rtw: { status: "blocked", note: "Share code expired" },
      history: { status: "in-progress", note: "2 of 4 employers verified" },
      refs: { status: "in-progress", note: "1 of 2 received" },
      health: { status: "done", note: "Cleared" },
      visa: { status: "done", note: "Skilled worker visa verified" },
      housing: { status: "done", note: "Confirmed" },
      vehicle: { status: "done", note: "Licence verified" },
      issues: { status: "blocked", note: "1 outstanding" },
    }),
    comments: [
      {
        id: "ps-1",
        author: "Nina Lawson",
        role: "team",
        timestamp: "3 days ago",
        text: "Hi Priya, your right-to-work share code has expired. Could you generate a new one and send it over?",
      },
      {
        id: "ps-2",
        author: "Priya Shah",
        role: "candidate",
        timestamp: "2 days ago",
        text: "My apologies for the delay. I'll get a new one sorted today.",
      },
      {
        id: "ps-3",
        author: "Nina Lawson",
        role: "team",
        timestamp: "2 days ago",
        text: "No problem at all — just let us know once it's ready.",
      },
    ],
    newMessages: 1,
  },
  {
    id: "daniel-reyes",
    name: "Daniel Reyes",
    role: "Carer",
    pipelineStatus: "Onboarding",
    tab: "onboarding",
    agency: "Bluebird Care",
    latestUpdate: {
      sentence: "Work history confirmed; final references with Lifted for review.",
      owner: "lifted",
    },
    estStart: { date: "5 May 2026", atRisk: false },
    checks: buildChecks({
      idv: { status: "done", note: "Verified" },
      dbs: { status: "done", note: "Cleared" },
      rtw: { status: "done", note: "Verified" },
      history: { status: "done", note: "4 of 4 employers verified" },
      refs: { status: "in-progress", note: "Final review with Lifted" },
      health: { status: "done", note: "Cleared" },
      visa: { status: "done", note: "British citizen, N/A" },
      housing: { status: "done", note: "Confirmed" },
      vehicle: { status: "done", note: "Licence verified" },
      issues: { status: "waiting", note: "No issues" },
    }),
    comments: [
      {
        id: "dr-1",
        author: "Nina Lawson",
        role: "team",
        timestamp: "2 days ago",
        text: "Work history looks great, Daniel. Your references are with us now and in final review — shouldn't be long.",
      },
      {
        id: "dr-2",
        author: "Daniel Reyes",
        role: "candidate",
        timestamp: "1 day ago",
        text: "Glad to hear it. Let me know if you need anything else from me.",
      },
    ],
    newMessages: 1,
  },
  {
    id: "hannah-bell",
    name: "Hannah Bell",
    role: "Care Assistant",
    pipelineStatus: "Offer Made",
    tab: "onboarding",
    agency: "Abicare",
    latestUpdate: {
      sentence: "Awaiting signed offer letter from candidate.",
      owner: "candidate",
    },
    estStart: { date: null, atRisk: false },
    checks: buildChecks({
      idv: { status: "waiting", note: "Not started" },
      dbs: { status: "waiting", note: "Not started" },
      rtw: { status: "waiting", note: "Not started" },
      history: { status: "waiting", note: "Not started" },
      refs: { status: "waiting", note: "Not started" },
      health: { status: "waiting", note: "Not started" },
      visa: { status: "waiting", note: "Not confirmed" },
      housing: { status: "waiting", note: "Not confirmed" },
      vehicle: { status: "waiting", note: "Not confirmed" },
      issues: { status: "in-progress", note: "Awaiting signed offer" },
    }),
    comments: [
      {
        id: "hb-1",
        author: "Nina Lawson",
        role: "team",
        timestamp: "5 days ago",
        text: "Hi Hannah, we need your signed offer letter back before we can kick off onboarding. Please sign and return it at your earliest convenience.",
      },
      {
        id: "hb-2",
        author: "Hannah Bell",
        role: "candidate",
        timestamp: "4 days ago",
        text: "Will get that back to you by end of the week.",
      },
    ],
    newMessages: 1,
  },
  {
    id: "nathaniel-asare",
    name: "Nathaniel Asare",
    role: "Carer",
    pipelineStatus: "Onboarding",
    tab: "onboarding",
    agency: "Helping Hands",
    latestUpdate: {
      sentence: "Visa documentation under review by Home Office.",
      owner: "external",
    },
    estStart: { date: "20 May 2026", atRisk: false },
    checks: buildChecks({
      idv: { status: "done", note: "Verified" },
      dbs: { status: "done", note: "Cleared" },
      rtw: { status: "in-progress", note: "Awaiting visa confirmation" },
      history: { status: "done", note: "3 of 3 employers verified" },
      refs: { status: "done", note: "2 of 2 received" },
      health: { status: "done", note: "Cleared" },
      visa: { status: "in-progress", note: "Under review by Home Office" },
      housing: { status: "done", note: "Confirmed" },
      vehicle: { status: "done", note: "Licence verified" },
      issues: { status: "waiting", note: "No issues" },
    }),
    comments: [
      {
        id: "na-1",
        author: "Nina Lawson",
        role: "team",
        timestamp: "6 days ago",
        text: "Hi Nathaniel, your visa documentation has been submitted to the Home Office. We'll update you as soon as we hear back.",
      },
      {
        id: "na-2",
        author: "Nathaniel Asare",
        role: "candidate",
        timestamp: "6 days ago",
        text: "Thank you for keeping me in the loop.",
      },
      {
        id: "na-3",
        author: "Nina Lawson",
        role: "team",
        timestamp: "1 day ago",
        text: "Still awaiting confirmation from the Home Office — these reviews can take a little while. We'll be in touch as soon as we have an update.",
      },
    ],
    newMessages: 0,
  },
];

export const TEAM_TABS: Array<{ id: TeamTab; label: string }> = [
  { id: "all", label: "All" },
  { id: "onboarding", label: "Onboarding" },
  { id: "signed-off", label: "Signed Off" },
  { id: "ops", label: "Ops" },
];

export const AGENCIES = ["Abicare", "Helping Hands", "Bluebird Care"] as const;

export function progressFor(member: TeamMember): {
  done: number;
  total: number;
  pct: number;
} {
  const total = member.checks.length;
  const done = member.checks.filter((c) => c.status === "done").length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, pct };
}
