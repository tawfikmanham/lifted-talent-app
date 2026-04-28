"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  Check,
  Clock,
  MessageCircle,
  RefreshCw,
  Search,
} from "lucide-react";
import {
  progressFor,
  type ActivityEvent,
  type Check as ComplianceCheck,
  type CheckStatus,
  type PipelineStatus,
  type TeamMember,
} from "@/lib/team";

export function CandidateDetailView({ member }: { member: TeamMember }) {
  const { done, total, pct } = progressFor(member);
  const estDate = member.estStart.date;
  const daysRemaining = estDate ? 15 : null;
  const atLimit = (member.daysSinceHired ?? 0) >= 21;

  return (
    <div className="flex min-h-full flex-col bg-gray-200">
      {/* Back nav */}
      <div className="border-b border-gray-200 bg-white px-4 py-3 md:px-8">
        <Link
          href="/team/self-serve"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to team overview
        </Link>
      </div>

      <div className="flex-1 space-y-5 p-4 md:px-8 md:py-6">
        {/* Hero card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {/* Identity row */}
          <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 px-5 py-4">
            <Avatar name={member.name} size={48} />
            <div className="min-w-0 flex-1">
              <div className="text-base font-semibold text-brand-ink">
                {member.name}
              </div>
              <div className="text-xs text-gray-500">
                {member.role} · {member.agency}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <PipelineStatusPill status={member.pipelineStatus} />
              {member.hiredDate && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
                  Hired {member.hiredDate}
                </span>
              )}
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 lg:grid-cols-4 lg:divide-y-0">
            {/* Progress */}
            <StatCard label="Progress">
              <div className="text-2xl font-bold text-brand-ink">{pct}%</div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-brand-primary transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {done} of {total} checks done
              </div>
            </StatCard>

            {/* Est. start */}
            <StatCard label="Est. start date">
              {estDate ? (
                <>
                  <div className="text-lg font-semibold text-brand-primary">
                    {estDate}
                  </div>
                  {daysRemaining !== null && (
                    <div className="mt-0.5 text-xs text-gray-500">
                      {daysRemaining} days remaining
                    </div>
                  )}
                </>
              ) : (
                <div className="text-sm text-gray-400">Not set</div>
              )}
            </StatCard>

            {/* Last activity */}
            <StatCard label="Last candidate activity">
              {member.lastCandidateActivity ? (
                <>
                  <div className="text-lg font-semibold text-brand-ink">
                    {member.lastCandidateActivity.timeAgo}
                  </div>
                  <div className="mt-0.5 text-xs text-gray-500">
                    {member.lastCandidateActivity.description}
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-400">No recent activity</div>
              )}
            </StatCard>

            {/* Days since hired */}
            <StatCard label="Days since hired">
              <div
                className={`text-2xl font-bold ${atLimit ? "text-rose-600" : "text-brand-ink"}`}
              >
                {member.daysSinceHired ?? "—"}
              </div>
              {atLimit && (
                <div className="mt-0.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                  <AlertTriangle className="h-3 w-3" />
                  At target limit
                </div>
              )}
            </StatCard>
          </div>
        </div>

        {/* Compliance checks */}
        <section>
          <SectionLabel>Compliance checks</SectionLabel>
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            }}
          >
            {member.checks.map((c) => (
              <CheckCard key={c.key} check={c} />
            ))}
          </div>
        </section>

        {/* Recent activity + Actions — side by side on large screens */}
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          {/* Recent activity */}
          <section>
            <SectionLabel>Recent activity</SectionLabel>
            <div className="rounded-xl border border-gray-200 bg-white">
              {member.activityFeed && member.activityFeed.length > 0 ? (
                <ActivityFeed events={member.activityFeed} />
              ) : (
                <div className="px-5 py-6 text-sm text-gray-400">
                  No activity recorded yet.
                </div>
              )}
            </div>
          </section>

          {/* Actions */}
          <section>
            <SectionLabel>Actions</SectionLabel>
            <div className="flex flex-col gap-3">
              <ActionButton
                variant="primary"
                icon={<Bell className="h-4 w-4" />}
                title="Nudge candidate"
                description="Send a reminder to complete outstanding items"
              />
              <ActionButton
                variant="amber"
                icon={<Search className="h-4 w-4" />}
                title="Follow up on DBS"
                description="Chase the external DBS result directly"
              />
              <ActionButton
                variant="blue"
                icon={<MessageCircle className="h-4 w-4" />}
                title="Contact Lifted ops"
                description="Message the team about this candidate"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Sub-components ----------------------------- */

function StatCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5 px-5 py-4">
      <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-gray-400">
        {label}
      </div>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
      {children}
    </div>
  );
}

function CheckCard({ check }: { check: ComplianceCheck }) {
  const isOverdue = (check.overdueBy ?? 0) > 0;
  const borderCls =
    check.status === "blocked" || isOverdue
      ? "border-[#F7C1C1]"
      : check.status === "waiting"
        ? "border-[#FAC775]"
        : "border-gray-200";

  return (
    <div className={`rounded-xl border bg-white p-4 ${borderCls}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-brand-ink">{check.label}</span>
        <CheckStatusPill status={check.status} />
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{check.note}</p>
      {check.dueDate && (
        <div className="mt-2 text-[11px]">
          <span className="text-gray-400">Due {check.dueDate}</span>
          {isOverdue && (
            <span className="ml-1.5 font-medium text-rose-500">
              · {check.overdueBy} days overdue
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function CheckStatusPill({ status }: { status: CheckStatus }) {
  const map: Record<
    CheckStatus,
    { icon: React.ReactNode; label: string; cls: string }
  > = {
    done: {
      icon: <Check className="h-3 w-3" strokeWidth={2.5} />,
      label: "Done",
      cls: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    },
    "in-progress": {
      icon: <RefreshCw className="h-3 w-3" />,
      label: "In progress",
      cls: "bg-amber-50 text-amber-700 ring-amber-200",
    },
    waiting: {
      icon: <Clock className="h-3 w-3" />,
      label: "Waiting",
      cls: "bg-sky-50 text-sky-700 ring-sky-200",
    },
    blocked: {
      icon: <AlertTriangle className="h-3 w-3" />,
      label: "Blocked",
      cls: "bg-rose-100 text-rose-700 ring-rose-200",
    },
    "not-required": {
      icon: null,
      label: "Not required",
      cls: "bg-gray-100 text-gray-500 ring-gray-200",
    },
  };
  const { icon, label, cls } = map[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${cls}`}
    >
      {icon}
      {label}
    </span>
  );
}

function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  const dotColor: Record<ActivityEvent["type"], string> = {
    completed: "bg-emerald-400",
    update: "bg-amber-400",
    system: "bg-gray-300",
  };
  return (
    <ul>
      {events.map((ev, i) => (
        <li
          key={i}
          className={`flex items-start gap-3 px-5 py-3.5 ${
            i < events.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <span
            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColor[ev.type]}`}
          />
          <span className="flex-1 text-sm text-brand-ink">{ev.text}</span>
          <span className="shrink-0 text-xs text-gray-400">{ev.timeAgo}</span>
        </li>
      ))}
    </ul>
  );
}

function ActionButton({
  variant,
  icon,
  title,
  description,
}: {
  variant: "primary" | "amber" | "blue";
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  const styles = {
    primary: {
      wrap: "bg-[#EEEDFE] border-[#534AB7]",
      icon: "text-[#534AB7]",
      title: "text-[#3C3489]",
    },
    amber: {
      wrap: "bg-[#FAEEDA] border-amber-200",
      icon: "text-amber-600",
      title: "text-amber-800",
    },
    blue: {
      wrap: "bg-[#E6F1FB] border-blue-200",
      icon: "text-blue-600",
      title: "text-blue-800",
    },
  };
  const s = styles[variant];
  return (
    <button
      type="button"
      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-opacity hover:opacity-80 ${s.wrap}`}
    >
      <span className={`mt-0.5 shrink-0 ${s.icon}`}>{icon}</span>
      <div className="min-w-0">
        <div className={`text-sm font-semibold ${s.title}`}>{title}</div>
        <div className="mt-0.5 text-xs text-gray-600">{description}</div>
      </div>
    </button>
  );
}

function Avatar({ name, size }: { name: string; size: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-[#EEEDFE] text-sm font-semibold text-[#3C3489]"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
}

function PipelineStatusPill({ status }: { status: PipelineStatus }) {
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
