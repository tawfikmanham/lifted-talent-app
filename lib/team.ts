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

export type CheckDocument = {
  filename: string;
  url: string;
};

export type CheckPortal = {
  label: string;
  url: string;
};

export type Check = {
  key: CheckKey;
  label: string;
  status: CheckStatus;
  note: string;
  reference?: string;
  portal?: CheckPortal;
  documents?: CheckDocument[];
  unavailableNote?: string;
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

export const CHECK_PORTALS = {
  idv: { label: "Yoti portal", url: "https://yoti.com" },
  dbs: { label: "DBS update service", url: "https://www.gov.uk/dbs-update-service" },
  rtw: { label: "UKVI right-to-work check", url: "https://www.gov.uk/view-right-to-work" },
  visa: { label: "UKVI immigration status", url: "https://www.gov.uk/check-immigration-status" },
} as const;

type CheckEntry = {
  status: CheckStatus;
  note: string;
  reference?: string;
  portal?: CheckPortal;
  documents?: CheckDocument[];
  unavailableNote?: string;
};

const buildChecks = (
  partial: Partial<Record<CheckKey, CheckEntry>>,
): Check[] => {
  return (Object.keys(CHECK_LABELS) as CheckKey[]).map((key) => {
    const entry = partial[key];
    return {
      key,
      label: CHECK_LABELS[key],
      status: entry?.status ?? "waiting",
      note: entry?.note ?? "Not started",
      reference: entry?.reference,
      portal: entry?.portal,
      documents: entry?.documents,
      unavailableNote: entry?.unavailableNote,
    };
  });
};

const doc = (filename: string): CheckDocument => ({ filename, url: "#" });

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
      idv: {
        status: "waiting",
        note: "Awaiting passport scan",
        portal: CHECK_PORTALS.idv,
      },
      dbs: {
        status: "waiting",
        note: "Not started",
        portal: CHECK_PORTALS.dbs,
        unavailableNote: "Reference not yet available — check not started",
      },
      rtw: {
        status: "blocked",
        note: "Share code expired",
        portal: CHECK_PORTALS.rtw,
      },
      history: {
        status: "in-progress",
        note: "1 of 3 employers contacted",
        documents: [doc("employment_history_kelly_gaffney.pdf")],
      },
      refs: { status: "waiting", note: "Refs requested from candidate" },
      health: {
        status: "in-progress",
        note: "Form sent",
        reference: "HLTH-FA-20260412",
      },
      visa: {
        status: "done",
        note: "British citizen, N/A",
        unavailableNote: "Not required for this candidate",
      },
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
      idv: {
        status: "done",
        note: "Verified",
        portal: CHECK_PORTALS.idv,
        documents: [doc("idv_report_marcus_williams.pdf")],
      },
      dbs: {
        status: "in-progress",
        note: "Submitted; awaiting result",
        reference: "E001234567890",
        portal: CHECK_PORTALS.dbs,
      },
      rtw: {
        status: "done",
        note: "Verified",
        portal: CHECK_PORTALS.rtw,
        documents: [
          doc("share_code_confirmation_marcus_williams.pdf"),
          doc("passport_scan_marcus_williams.pdf"),
        ],
      },
      history: {
        status: "done",
        note: "3 of 3 employers verified",
        documents: [
          doc("employment_history_marcus_williams.pdf"),
          doc("p45_marcus_williams.pdf"),
        ],
      },
      refs: {
        status: "in-progress",
        note: "1 of 2 received",
        documents: [doc("reference_letter_jane_smith.pdf")],
      },
      health: {
        status: "done",
        note: "Cleared",
        reference: "HLTH-FA-20260326",
        documents: [doc("signed_health_declaration_marcus_williams.pdf")],
      },
      visa: {
        status: "done",
        note: "British citizen, N/A",
        unavailableNote: "Not required for this candidate",
      },
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
      idv: {
        status: "done",
        note: "Verified",
        portal: CHECK_PORTALS.idv,
        documents: [doc("idv_report_aisha_patel.pdf")],
      },
      dbs: {
        status: "done",
        note: "Cleared",
        reference: "E002345678901",
        portal: CHECK_PORTALS.dbs,
        documents: [doc("dbs_certificate_aisha_patel.pdf")],
      },
      rtw: {
        status: "done",
        note: "Verified",
        portal: CHECK_PORTALS.rtw,
        documents: [doc("share_code_confirmation_aisha_patel.pdf")],
      },
      history: {
        status: "done",
        note: "5 of 5 employers verified",
        documents: [
          doc("employment_history_aisha_patel.pdf"),
          doc("p45_aisha_patel.pdf"),
        ],
      },
      refs: {
        status: "in-progress",
        note: "Verifying with Lifted",
        documents: [
          doc("reference_letter_dr_okafor.pdf"),
          doc("reference_letter_helen_briggs.pdf"),
        ],
      },
      health: {
        status: "done",
        note: "Cleared",
        reference: "HLTH-FA-20260308",
        documents: [doc("signed_health_declaration_aisha_patel.pdf")],
      },
      visa: {
        status: "done",
        note: "ILR confirmed",
        reference: "GWF-2024-08812",
        portal: CHECK_PORTALS.visa,
        documents: [doc("brp_card_aisha_patel.pdf")],
      },
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
      idv: {
        status: "done",
        note: "Verified",
        portal: CHECK_PORTALS.idv,
        documents: [doc("idv_report_tom_edwards.pdf")],
      },
      dbs: {
        status: "done",
        note: "Cleared",
        reference: "E003456789012",
        portal: CHECK_PORTALS.dbs,
        documents: [doc("dbs_certificate_tom_edwards.pdf")],
      },
      rtw: {
        status: "done",
        note: "Verified",
        portal: CHECK_PORTALS.rtw,
        documents: [
          doc("share_code_confirmation_tom_edwards.pdf"),
          doc("passport_scan_tom_edwards.pdf"),
        ],
      },
      history: {
        status: "done",
        note: "4 of 4 employers verified",
        documents: [
          doc("employment_history_tom_edwards.pdf"),
          doc("p45_tom_edwards.pdf"),
        ],
      },
      refs: {
        status: "done",
        note: "2 of 2 received",
        documents: [
          doc("reference_letter_george_morton.pdf"),
          doc("reference_letter_amanda_pierce.pdf"),
        ],
      },
      health: {
        status: "done",
        note: "Cleared",
        reference: "HLTH-FA-20260219",
        documents: [doc("signed_health_declaration_tom_edwards.pdf")],
      },
      visa: {
        status: "done",
        note: "British citizen, N/A",
        unavailableNote: "Not required for this candidate",
      },
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
      idv: {
        status: "done",
        note: "Verified",
        portal: CHECK_PORTALS.idv,
        documents: [doc("idv_report_sofia_costa.pdf")],
      },
      dbs: {
        status: "in-progress",
        note: "Submitted",
        reference: "E004567890123",
        portal: CHECK_PORTALS.dbs,
      },
      rtw: {
        status: "done",
        note: "Verified",
        portal: CHECK_PORTALS.rtw,
        documents: [
          doc("share_code_confirmation_sofia_costa.pdf"),
          doc("passport_scan_sofia_costa.pdf"),
        ],
      },
      history: {
        status: "done",
        note: "3 of 3 employers verified",
        documents: [doc("employment_history_sofia_costa.pdf")],
      },
      refs: {
        status: "in-progress",
        note: "1 of 2 received",
        documents: [doc("reference_letter_marco_rossi.pdf")],
      },
      health: {
        status: "waiting",
        note: "Form sent; awaiting response",
        unavailableNote: "Waiting on candidate to submit documents",
      },
      visa: {
        status: "done",
        note: "EU settled status",
        reference: "GWF-2025-04221",
        portal: CHECK_PORTALS.visa,
        documents: [doc("settled_status_letter_sofia_costa.pdf")],
      },
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
      idv: {
        status: "in-progress",
        note: "Submitted to provider",
        portal: CHECK_PORTALS.idv,
      },
      dbs: {
        status: "waiting",
        note: "Not started",
        portal: CHECK_PORTALS.dbs,
        unavailableNote: "Reference not yet available — check not started",
      },
      rtw: {
        status: "waiting",
        note: "Not started",
        portal: CHECK_PORTALS.rtw,
        unavailableNote: "Waiting on candidate to submit documents",
      },
      history: {
        status: "waiting",
        note: "Not started",
        unavailableNote: "Waiting on candidate to submit documents",
      },
      refs: {
        status: "waiting",
        note: "Not started",
        unavailableNote: "Waiting on candidate to submit documents",
      },
      health: {
        status: "waiting",
        note: "Not started",
        unavailableNote: "Reference not yet available — check not started",
      },
      visa: {
        status: "done",
        note: "British citizen, N/A",
        unavailableNote: "Not required for this candidate",
      },
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
      idv: {
        status: "done",
        note: "Verified",
        portal: CHECK_PORTALS.idv,
        documents: [doc("idv_report_priya_shah.pdf")],
      },
      dbs: {
        status: "done",
        note: "Cleared",
        reference: "E005678901234",
        portal: CHECK_PORTALS.dbs,
        documents: [doc("dbs_certificate_priya_shah.pdf")],
      },
      rtw: {
        status: "blocked",
        note: "Share code expired",
        portal: CHECK_PORTALS.rtw,
      },
      history: {
        status: "in-progress",
        note: "2 of 4 employers verified",
        documents: [doc("employment_history_priya_shah.pdf")],
      },
      refs: {
        status: "in-progress",
        note: "1 of 2 received",
        documents: [doc("reference_letter_dr_kapoor.pdf")],
      },
      health: {
        status: "done",
        note: "Cleared",
        reference: "HLTH-FA-20260315",
        documents: [doc("signed_health_declaration_priya_shah.pdf")],
      },
      visa: {
        status: "done",
        note: "Skilled worker visa verified",
        reference: "GWF-2025-09144",
        portal: CHECK_PORTALS.visa,
        documents: [
          doc("visa_copy_priya_shah.pdf"),
          doc("brp_card_priya_shah.pdf"),
        ],
      },
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
      idv: {
        status: "done",
        note: "Verified",
        portal: CHECK_PORTALS.idv,
        documents: [doc("idv_report_daniel_reyes.pdf")],
      },
      dbs: {
        status: "done",
        note: "Cleared",
        reference: "E006789012345",
        portal: CHECK_PORTALS.dbs,
        documents: [doc("dbs_certificate_daniel_reyes.pdf")],
      },
      rtw: {
        status: "done",
        note: "Verified",
        portal: CHECK_PORTALS.rtw,
        documents: [
          doc("share_code_confirmation_daniel_reyes.pdf"),
          doc("passport_scan_daniel_reyes.pdf"),
        ],
      },
      history: {
        status: "done",
        note: "4 of 4 employers verified",
        documents: [
          doc("employment_history_daniel_reyes.pdf"),
          doc("p45_daniel_reyes.pdf"),
        ],
      },
      refs: {
        status: "in-progress",
        note: "Final review with Lifted",
        documents: [
          doc("reference_letter_paul_jenkins.pdf"),
          doc("reference_letter_olivia_chen.pdf"),
        ],
      },
      health: {
        status: "done",
        note: "Cleared",
        reference: "HLTH-FA-20260402",
        documents: [doc("signed_health_declaration_daniel_reyes.pdf")],
      },
      visa: {
        status: "done",
        note: "British citizen, N/A",
        unavailableNote: "Not required for this candidate",
      },
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
      idv: {
        status: "waiting",
        note: "Not started",
        portal: CHECK_PORTALS.idv,
        unavailableNote: "Waiting on candidate to submit documents",
      },
      dbs: {
        status: "waiting",
        note: "Not started",
        portal: CHECK_PORTALS.dbs,
        unavailableNote: "Reference not yet available — check not started",
      },
      rtw: {
        status: "waiting",
        note: "Not started",
        portal: CHECK_PORTALS.rtw,
        unavailableNote: "Waiting on candidate to submit documents",
      },
      history: {
        status: "waiting",
        note: "Not started",
        unavailableNote: "Waiting on candidate to submit documents",
      },
      refs: {
        status: "waiting",
        note: "Not started",
        unavailableNote: "Waiting on candidate to submit documents",
      },
      health: {
        status: "waiting",
        note: "Not started",
        unavailableNote: "Reference not yet available — check not started",
      },
      visa: {
        status: "waiting",
        note: "Not confirmed",
        portal: CHECK_PORTALS.visa,
        unavailableNote: "Reference not yet available — check not started",
      },
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
      idv: {
        status: "done",
        note: "Verified",
        portal: CHECK_PORTALS.idv,
        documents: [doc("idv_report_nathaniel_asare.pdf")],
      },
      dbs: {
        status: "done",
        note: "Cleared",
        reference: "E007890123456",
        portal: CHECK_PORTALS.dbs,
        documents: [doc("dbs_certificate_nathaniel_asare.pdf")],
      },
      rtw: {
        status: "in-progress",
        note: "Awaiting visa confirmation",
        portal: CHECK_PORTALS.rtw,
      },
      history: {
        status: "done",
        note: "3 of 3 employers verified",
        documents: [
          doc("employment_history_nathaniel_asare.pdf"),
          doc("p45_nathaniel_asare.pdf"),
        ],
      },
      refs: {
        status: "done",
        note: "2 of 2 received",
        documents: [
          doc("reference_letter_kofi_mensah.pdf"),
          doc("reference_letter_sarah_mwangi.pdf"),
        ],
      },
      health: {
        status: "done",
        note: "Cleared",
        reference: "HLTH-FA-20260318",
        documents: [doc("signed_health_declaration_nathaniel_asare.pdf")],
      },
      visa: {
        status: "in-progress",
        note: "Under review by Home Office",
        reference: "GWF-2026-00812",
        portal: CHECK_PORTALS.visa,
      },
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
