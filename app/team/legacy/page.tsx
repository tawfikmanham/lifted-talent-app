"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ViewToggle } from "@/components/team/ViewToggle";
import {
  Check,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  Clock,
  MessageSquare,
  Minus,
  Search,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  AGENCIES,
  TEAM_MEMBERS,
  TEAM_TABS,
  type Check as ComplianceCheck,
  type CheckKey,
  type TeamTab,
} from "@/lib/team";

type LegacyCheckState =
  | { kind: "ok" }
  | { kind: "alert" }
  | { kind: "pending" }
  | { kind: "na" }
  | { kind: "blank" }
  | { kind: "count"; value: number }
  | { kind: "comment" };

type LegacyKey = CheckKey | "comments";

const LEGACY_COLUMNS: Array<{ key: LegacyKey; label: string }> = [
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

const PIPELINE_STATUS_OPTIONS = [
  "All",
  "Offer Made",
  "Onboarding",
  "Signed Off",
];

function checkToLegacy(c: ComplianceCheck): LegacyCheckState {
  if (c.key === "issues") {
    if (c.status === "blocked") {
      const match = c.note.match(/(\d+)/);
      const value = match ? Number(match[1]) : 1;
      return { kind: "count", value };
    }
    if (c.status === "in-progress") return { kind: "pending" };
    if (c.status === "done") return { kind: "ok" };
    return { kind: "na" };
  }
  switch (c.status) {
    case "done":
      return { kind: "ok" };
    case "in-progress":
      return { kind: "pending" };
    case "blocked":
      return { kind: "alert" };
    case "waiting":
    default:
      return { kind: "blank" };
  }
}

function getLegacyCell(member: (typeof TEAM_MEMBERS)[number], key: LegacyKey): LegacyCheckState {
  if (key === "comments") return { kind: "comment" };
  const found = member.checks.find((c) => c.key === key);
  if (!found) return { kind: "blank" };
  return checkToLegacy(found);
}

export default function LegacyTeamPage() {
  const [activeTab, setActiveTab] = useState<TeamTab>("onboarding");
  const [search, setSearch] = useState("");
  const [pipelineStatus, setPipelineStatus] = useState("All");
  const [agency, setAgency] = useState<string>(AGENCIES[0]);

  const visibleMembers = useMemo(() => {
    return TEAM_MEMBERS.filter((m) => {
      if (activeTab !== "all" && m.tab !== activeTab) return false;
      if (pipelineStatus !== "All" && m.pipelineStatus !== pipelineStatus)
        return false;
      if (agency && m.agency !== agency) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (!`${m.name} ${m.role}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [activeTab, search, pipelineStatus, agency]);

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        section="Team"
        title="Overview (legacy)"
        description="Original design, kept for side-by-side comparison."
        actions={
          <div className="flex items-center gap-3">
            <ViewToggle current="original" />
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
        <div className="mb-4 flex flex-wrap items-end gap-4">
          <div className="min-w-0 w-1/2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search and press enter"
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </div>
          </div>
          <div className="ml-auto flex flex-wrap items-end gap-4">
            <FilterSelect
              label="Pipeline Status"
              value={pipelineStatus}
              options={PIPELINE_STATUS_OPTIONS}
              onChange={setPipelineStatus}
            />
            <FilterSelect
              label="Agency"
              value={agency}
              options={[...AGENCIES]}
              onChange={setAgency}
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
          <table className="w-full min-w-[1100px] border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 align-middle">
                <th className="sticky left-0 z-10 bg-gray-50 p-5 text-left text-xs font-normal text-gray-500">
                  Candidate
                </th>
                <th className="bg-gray-50 p-5 text-left text-xs font-normal text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    Pipeline Status
                    <SortChevrons />
                  </span>
                </th>
                {LEGACY_COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="h-24 bg-gray-50 px-1 align-middle text-xs font-normal text-gray-500"
                  >
                    <div className="mx-auto flex h-full w-8 items-center justify-center">
                      <span className="-rotate-45 whitespace-nowrap text-xs font-normal italic text-gray-500">
                        {col.label}
                        {(["idv", "rtw", "history", "refs"] as const).includes(
                          col.key as "idv" | "rtw" | "history" | "refs",
                        ) && <InfoDot />}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="bg-gray-50 p-5 text-left text-xs font-normal text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    Target Start
                    <SortChevrons />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleMembers.length === 0 ? (
                <tr>
                  <td
                    colSpan={3 + LEGACY_COLUMNS.length}
                    className="px-5 py-10 text-center text-sm text-muted"
                  >
                    No team members match the current filters.
                  </td>
                </tr>
              ) : (
                visibleMembers.map((m) => (
                  <tr key={m.id} className="border-t border-gray-100">
                    <td className="sticky left-0 z-10 whitespace-nowrap bg-white px-5 py-4">
                      <a
                        href="#"
                        className="font-medium text-brand-primary hover:underline"
                      >
                        {m.name} - {m.role}
                      </a>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-brand-ink">
                        {m.pipelineStatus}
                      </span>
                    </td>
                    {LEGACY_COLUMNS.map((col) => (
                      <td key={col.key} className="px-1 py-4 text-center">
                        <LegacyCheckCell state={getLegacyCell(m, col.key)} />
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-brand-ink">
                      {m.estStart.date ?? "Not set"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 text-sm">
            <span className="text-brand-ink">Page 1 of 1</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-400"
              >
                Previous
              </button>
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-400"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegacyCheckCell({ state }: { state: LegacyCheckState }) {
  switch (state.kind) {
    case "ok":
      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </span>
      );
    case "alert":
      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <CircleAlert className="h-5 w-5" strokeWidth={2} />
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <Clock className="h-4 w-4" strokeWidth={2.25} />
        </span>
      );
    case "na":
      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-400">
          <Minus className="h-4 w-4" />
        </span>
      );
    case "count":
      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-xs font-semibold text-white">
          {state.value}
        </span>
      );
    case "comment":
      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-brand-primary">
          <MessageSquare className="h-5 w-5" fill="currentColor" strokeWidth={0} />
        </span>
      );
    case "blank":
    default:
      return <span className="text-sm text-gray-400">-</span>;
  }
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

function InfoDot() {
  return (
    <svg
      className="ml-1 inline-block h-3 w-3 text-sky-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="8.01" />
      <line x1="12" y1="12" x2="12" y2="16" />
    </svg>
  );
}
