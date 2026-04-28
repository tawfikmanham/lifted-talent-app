"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Copy,
  FileText,
  Paperclip,
  RefreshCw,
  Search,
  Send,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ViewToggle } from "@/components/team/ViewToggle";
import {
  AGENCIES,
  TEAM_MEMBERS,
  TEAM_TABS,
  progressFor,
  type Check as ComplianceCheck,
  type CheckDocument,
  type CheckPortal,
  type CheckStatus,
  type Comment,
  type CommentAuthorRole,
  type PipelineStatus,
  type Responsibility,
  type TeamMember,
  type TeamTab,
} from "@/lib/team";

const PIPELINE_STATUS_OPTIONS = [
  "All",
  "Offer Made",
  "Onboarding",
  "Signed Off",
] as const;

export function TeamSelfServeView() {
  const [activeTab, setActiveTab] = useState<TeamTab>("onboarding");
  const [search, setSearch] = useState("");
  const [pipelineStatus, setPipelineStatus] = useState<string>("All");
  const [agency, setAgency] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const visibleMembers = useMemo(() => {
    return TEAM_MEMBERS.filter((m) => {
      if (activeTab !== "all" && m.tab !== activeTab) return false;
      if (pipelineStatus !== "All" && m.pipelineStatus !== pipelineStatus)
        return false;
      if (agency && agency !== "All" && m.agency !== agency) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!`${m.name} ${m.role}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [activeTab, search, pipelineStatus, agency]);

  const toggleOpen = (id: string) =>
    setOpenId((current) => (current === id ? null : id));

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        section="Team"
        title="Overview"
        description="View all of your current and prospective team members."
        actions={
          <div className="flex items-center gap-3">
            <ViewToggle current="self-serve" />
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-brand-primary-hover"
            >
              Add team members
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        }
      />

      <div className="border-y border-gray-300 bg-gray-100 p-1 px-2 text-xs text-gray-600">
        <div className="flex min-w-max items-center gap-1">
          {TEAM_TABS.map((t) => {
            const is = t.id === activeTab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`whitespace-nowrap rounded-xl px-3 py-1 transition ${
                  is ? "bg-primary-200 text-brand-ink" : "hover:bg-white"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 bg-gray-200 p-4 md:px-12 md:py-6">
        {/* Filter row — desktop / tablet */}
        <div className="mb-4 hidden flex-wrap items-end gap-4 md:flex">
          <div className="min-w-0 w-1/2">
            <SearchInput value={search} onChange={setSearch} />
          </div>
          <div className="ml-auto flex flex-wrap items-end gap-4">
            <FilterSelect
              label="Pipeline Status"
              value={pipelineStatus}
              options={PIPELINE_STATUS_OPTIONS as readonly string[]}
              onChange={setPipelineStatus}
            />
            <FilterSelect
              label="Agency"
              value={agency}
              options={["All", ...AGENCIES]}
              onChange={setAgency}
            />
          </div>
        </div>

        {/* Filter row — mobile */}
        <div className="mb-4 flex items-center gap-2 md:hidden">
          <div className="min-w-0 flex-1">
            <SearchInput value={search} onChange={setSearch} />
          </div>
          <button
            type="button"
            onClick={() => setFilterDrawerOpen(true)}
            aria-label="Open filters"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white text-brand-ink hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Desktop / tablet table */}
        <div className="hidden overflow-x-auto rounded-xl border border-gray-300 bg-white md:block">
          <table className="w-full min-w-[960px] border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 align-middle text-left text-xs font-normal text-gray-500">
                <th className="w-10 px-3 py-3" aria-label="Expand row" />
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">
                  <span className="inline-flex items-center gap-1">
                    Pipeline Status
                    <SortChevrons />
                  </span>
                </th>
                <th className="px-4 py-3">Latest update</th>
                <th className="w-24 px-4 py-3 text-center">Progress</th>
                <th className="w-40 px-4 py-3">
                  <span className="inline-flex items-center gap-1">
                    Est. start
                    <SortChevrons />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleMembers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-muted"
                  >
                    No team members match the current filters.
                  </td>
                </tr>
              ) : (
                visibleMembers.map((m) => {
                  const isOpen = openId === m.id;
                  return (
                    <RowGroup
                      key={m.id}
                      member={m}
                      isOpen={isOpen}
                      onToggle={() => toggleOpen(m.id)}
                    />
                  );
                })
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 text-sm">
            <span className="text-muted">
              {visibleMembers.length === 0
                ? "No candidates found"
                : `${visibleMembers.length} ${visibleMembers.length === 1 ? "candidate" : "candidates"}`}
            </span>
          </div>
        </div>

        {/* Mobile card list */}
        <div className="md:hidden">
          {visibleMembers.length === 0 ? (
            <div className="rounded-xl border border-gray-300 bg-white px-5 py-10 text-center text-sm text-muted">
              No team members match the current filters.
            </div>
          ) : (
            <ul className="space-y-3">
              {visibleMembers.map((m) => {
                const isOpen = openId === m.id;
                return (
                  <MobileCard
                    key={m.id}
                    member={m}
                    isOpen={isOpen}
                    onToggle={() => toggleOpen(m.id)}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <MobileFilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        pipelineStatus={pipelineStatus}
        setPipelineStatus={setPipelineStatus}
        agency={agency}
        setAgency={setAgency}
      />
    </div>
  );
}

/* --------------------------------- Row --------------------------------- */

function RowGroup({
  member,
  isOpen,
  onToggle,
}: {
  member: TeamMember;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { done, total } = progressFor(member);
  return (
    <>
      <tr
        onClick={onToggle}
        className={`cursor-pointer align-middle transition-colors ${
          isOpen
            ? "border-t border-gray-300 bg-gray-50"
            : "border-t border-gray-100 hover:bg-gray-50"
        }`}
      >
        <td className="px-3 py-4 text-gray-400">
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </td>
        <td className="whitespace-nowrap px-4 py-4">
          <div className="flex flex-col">
            <a
              href="#"
              onClick={(e) => e.stopPropagation()}
              className="font-medium text-brand-primary hover:underline"
            >
              {member.name}
            </a>
            <span className="text-xs text-muted">{member.role}</span>
          </div>
        </td>
        <td className="px-4 py-4">
          <StatusPill status={member.pipelineStatus} />
        </td>
        <td className="max-w-0 px-4 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="truncate text-sm text-brand-ink">
              {member.latestUpdate.sentence}
            </span>
            <ResponsibilityLabel owner={member.latestUpdate.owner} />
          </div>
        </td>
        <td className="px-4 py-4">
          <div className="flex justify-center">
            <ProgressDonut done={done} total={total} />
          </div>
        </td>
        <td className="whitespace-nowrap px-4 py-4">
          <EstStartLabel value={member.estStart} />
        </td>
      </tr>
      {isOpen && (
        <tr className="bg-white">
          <td colSpan={6} className="px-6 pb-6 pt-4">
            <ExpandedDetail member={member} />
          </td>
        </tr>
      )}
    </>
  );
}

/* ------------------------------ Mobile card ------------------------------ */

function MobileCard({
  member,
  isOpen,
  onToggle,
}: {
  member: TeamMember;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { done, total } = progressFor(member);
  return (
    <li
      className={`overflow-hidden rounded-xl border bg-white transition-colors ${
        isOpen ? "border-brand-primary" : "border-gray-300"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full flex-col gap-3 p-4 text-left transition-colors ${
          isOpen ? "bg-gray-50" : "active:bg-gray-50"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="font-medium text-brand-primary">{member.name}</div>
            <div className="text-xs text-muted">{member.role}</div>
          </div>
          <StatusPill status={member.pipelineStatus} />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm text-brand-ink">
            {member.latestUpdate.sentence}
          </span>
          <ResponsibilityLabel owner={member.latestUpdate.owner} />
        </div>
        <div className="flex items-center justify-between">
          <ProgressDonut done={done} total={total} />
          <EstStartLabel value={member.estStart} />
        </div>
      </button>
      {isOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-3">
          <ExpandedDetail member={member} compact />
        </div>
      )}
    </li>
  );
}

/* --------------------------- Expanded detail --------------------------- */

function ExpandedDetail({
  member,
  compact = false,
}: {
  member: TeamMember;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={
          compact
            ? "flex flex-col gap-3"
            : "grid gap-3 lg:grid-cols-2"
        }
      >
        {member.checks.map((c) => (
          <CheckDetailCard key={c.key} check={c} compact={compact} />
        ))}
      </div>
      <div className="border-t border-gray-200 pt-5">
        <div className="max-w-2xl rounded-lg border border-[#E5E5E5] bg-[#F9F9F9] p-4">
          <CommentsThread initialComments={member.comments} />
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Check detail card --------------------------- */

function CheckDetailCard({
  check,
  compact = false,
}: {
  check: ComplianceCheck;
  compact?: boolean;
}) {
  const blocked = check.status === "blocked";
  const cardCls = blocked
    ? "border-rose-200 bg-rose-50"
    : "border-gray-200 bg-white";

  const hasReference = !!check.reference;
  const hasPortal = !!check.portal;
  const hasDocuments = !!check.documents && check.documents.length > 0;
  const hasContent = hasReference || hasPortal || hasDocuments;

  return (
    <div className={`rounded-xl border p-4 ${cardCls}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-brand-ink">
          {check.label}
        </span>
        <CheckStatusPill status={check.status} />
      </div>
      {check.note && (
        <p className="mt-1 text-xs text-muted">{check.note}</p>
      )}

      <div className="mt-3 flex flex-col gap-2">
        {hasReference && (
          <DetailRow label="Reference" compact={compact}>
            <ReferencePill value={check.reference!} />
          </DetailRow>
        )}
        {hasPortal && (
          <DetailRow label="Portal" compact={compact}>
            <PortalLink portal={check.portal!} />
          </DetailRow>
        )}
        {hasDocuments && (
          <DetailRow label="Documents" compact={compact}>
            <div className="flex flex-wrap gap-2">
              {check.documents!.map((d) => (
                <DocumentChip key={d.filename} document={d} />
              ))}
            </div>
          </DetailRow>
        )}
        {!hasContent && check.unavailableNote && (
          <p className="text-xs italic text-muted">{check.unavailableNote}</p>
        )}
      </div>
    </div>
  );
}

function DetailRow({
  label,
  children,
  compact,
}: {
  label: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "flex flex-col gap-1"
          : "flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3"
      }
    >
      <span
        className={
          compact
            ? "text-[11px] font-medium uppercase tracking-wide text-gray-400"
            : "shrink-0 text-[11px] font-medium uppercase tracking-wide text-gray-400 sm:w-20 sm:pt-1.5"
        }
      >
        {label}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

/* ------------------------------ Primitives ------------------------------ */

function ReferencePill({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  function handleCopy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopied(true);
  }

  return (
    <div className="inline-flex items-center gap-2">
      <span className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-1 font-mono text-[13px] text-brand-ink">
        {value}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy reference"}
        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
          copied
            ? "bg-emerald-50 text-emerald-600"
            : "text-brand-primary hover:bg-primary-50"
        }`}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copy
          </>
        )}
      </button>
    </div>
  );
}

function PortalLink({ portal }: { portal: CheckPortal }) {
  return (
    <a
      href={portal.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
    >
      {portal.label}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  );
}

function DocumentChip({ document }: { document: CheckDocument }) {
  return (
    <a
      href={document.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-brand-ink transition-colors hover:border-brand-primary hover:text-brand-primary"
    >
      <FileText className="h-3.5 w-3.5 shrink-0 text-gray-400" />
      <span className="truncate">{document.filename}</span>
    </a>
  );
}

function CheckStatusPill({ status }: { status: CheckStatus }) {
  const map: Record<
    CheckStatus,
    { icon: React.ReactNode; label: string; cls: string }
  > = {
    done: {
      icon: <Check className="h-3.5 w-3.5" strokeWidth={2.5} />,
      label: "Done",
      cls: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    },
    "in-progress": {
      icon: <RefreshCw className="h-3.5 w-3.5" />,
      label: "In progress",
      cls: "bg-sky-50 text-sky-700 ring-sky-200",
    },
    waiting: {
      icon: <Clock className="h-3.5 w-3.5" />,
      label: "Waiting",
      cls: "bg-amber-50 text-amber-700 ring-amber-200",
    },
    blocked: {
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
      label: "Blocked",
      cls: "bg-rose-100 text-rose-700 ring-rose-200",
    },
  };
  const { icon, label, cls } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${cls}`}
    >
      {icon}
      {label}
    </span>
  );
}

/* ------------------------------ Comments ------------------------------ */

function CommentsThread({ initialComments }: { initialComments: Comment[] }) {
  const [allComments, setAllComments] = useState<Comment[]>(initialComments);
  const [draft, setDraft] = useState("");

  function addComment(text: string) {
    setAllComments((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        author: "You",
        role: "team" as CommentAuthorRole,
        timestamp: "just now",
        text,
      },
    ]);
  }

  return (
    <div>
      <div className="mb-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Comments{allComments.length > 0 ? ` (${allComments.length})` : ""}
        </span>
      </div>
      {allComments.length === 0 && (
        <p className="mb-2 text-xs text-muted">No comments yet.</p>
      )}
      <div className="relative">
        <div className="max-h-[200px] space-y-2 overflow-y-auto pb-6 pr-1">
          {allComments.map((c) => (
            <CommentCard key={c.id} comment={c} />
          ))}
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#F9F9F9] to-transparent" />
      </div>
      <div className="mt-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const text = draft.trim();
              if (text) {
                addComment(text);
                setDraft("");
              }
            }
          }}
          placeholder="Leave a comment…"
          className="w-full bg-transparent text-sm text-brand-ink placeholder:text-gray-400 focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-end gap-1">
          <button
            type="button"
            aria-label="Attach file"
            className="inline-flex h-7 w-7 items-center justify-center text-gray-400 transition-colors hover:text-brand-ink"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              const text = draft.trim();
              if (text) {
                addComment(text);
                setDraft("");
              }
            }}
            disabled={!draft.trim()}
            aria-label="Send comment"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary text-white transition-colors hover:bg-brand-primary-hover disabled:opacity-30"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentCard({ comment }: { comment: Comment }) {
  const isTeam = comment.role === "team";
  const initials = comment.author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const avatarCls = isTeam
    ? "bg-brand-primary text-white"
    : "bg-amber-100 text-amber-700";
  const roleCls = isTeam ? "text-brand-primary" : "text-amber-700";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      <div className="mb-2 flex items-center gap-2">
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${avatarCls}`}
        >
          {initials}
        </div>
        <span className="text-xs font-semibold text-brand-ink">
          {comment.author}
        </span>
        <span className={`text-xs font-medium ${roleCls}`}>
          {isTeam ? "Team" : "Candidate"}
        </span>
        <span className="text-xs text-gray-400">{comment.timestamp}</span>
      </div>
      <p className="ml-8 text-sm leading-snug text-brand-ink">{comment.text}</p>
    </div>
  );
}

/* ----------------------------- Shared UI ----------------------------- */

function StatusPill({ status }: { status: PipelineStatus }) {
  const styles: Record<PipelineStatus, string> = {
    "Offer Made": "bg-amber-100 text-amber-800 ring-amber-200",
    Onboarding: "bg-sky-100 text-sky-800 ring-sky-200",
    "Signed Off": "bg-emerald-100 text-emerald-800 ring-emerald-200",
    Ops: "bg-gray-100 text-gray-700 ring-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function ResponsibilityLabel({ owner }: { owner: Responsibility }) {
  const map: Record<Responsibility, { label: string; cls: string }> = {
    candidate: { label: "Waiting on candidate", cls: "text-amber-700" },
    external: { label: "Waiting on external body", cls: "text-sky-700" },
    lifted: { label: "With Lifted", cls: "text-brand-primary" },
    clear: { label: "All clear", cls: "text-emerald-700" },
  };
  const { label, cls } = map[owner];
  return <span className={`text-xs font-medium ${cls}`}>{label}</span>;
}

function EstStartLabel({
  value,
}: {
  value: { date: string | null; atRisk: boolean };
}) {
  if (!value.date) {
    return <span className="text-sm text-gray-400">Not set</span>;
  }
  if (value.atRisk) {
    return (
      <span className="inline-flex items-center gap-1 text-sm text-gray-500">
        <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
        {value.date}
      </span>
    );
  }
  return <span className="text-sm text-gray-500">{value.date}</span>;
}

function ProgressDonut({ done, total }: { done: number; total: number }) {
  const safeDone = Number.isFinite(done) ? done : 0;
  const safeTotal = Number.isFinite(total) && total > 0 ? total : 1;
  const pct = Math.round((safeDone / safeTotal) * 100);
  const size = 44;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  const colour =
    pct === 100
      ? "#10b981"
      : pct >= 60
        ? "#5b3cff"
        : pct >= 30
          ? "#f59e0b"
          : "#f43f5e";
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="block shrink-0"
      role="img"
      aria-label={`${done} of ${total} checks complete`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={colour}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="48%"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#26253e"
        style={{ fontSize: 9, fontWeight: 700 }}
      >
        {done}/{total}
      </text>
    </svg>
  );
}

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search and press enter"
        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-primary-200"
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex w-44 flex-col gap-1 text-xs text-muted">
      <span>{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-8 text-sm text-brand-ink focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-primary-200"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </label>
  );
}

function SortChevrons() {
  return (
    <span className="flex flex-col leading-none text-gray-400">
      <ChevronUp className="h-3 w-3 -mb-0.5" strokeWidth={2} />
      <ChevronDown className="h-3 w-3 -mt-0.5" strokeWidth={2} />
    </span>
  );
}

function MobileFilterDrawer({
  open,
  onClose,
  pipelineStatus,
  setPipelineStatus,
  agency,
  setAgency,
}: {
  open: boolean;
  onClose: () => void;
  pipelineStatus: string;
  setPipelineStatus: (v: string) => void;
  agency: string;
  setAgency: (v: string) => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute inset-x-0 top-0 rounded-b-2xl bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <span className="text-sm font-medium text-brand-ink">Filters</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="text-gray-400 hover:text-brand-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <FilterSelect
            label="Pipeline Status"
            value={pipelineStatus}
            options={PIPELINE_STATUS_OPTIONS as readonly string[]}
            onChange={setPipelineStatus}
          />
          <FilterSelect
            label="Agency"
            value={agency}
            options={["All", ...AGENCIES]}
            onChange={setAgency}
          />
          <button
            type="button"
            onClick={onClose}
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
