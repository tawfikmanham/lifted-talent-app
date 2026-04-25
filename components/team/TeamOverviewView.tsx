"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { CheckCell } from "./CheckCell";
import {
  AGENCIES,
  CHECK_COLUMNS,
  TEAM_MEMBERS,
  TEAM_TABS,
  type TeamTab,
} from "@/lib/team";

const PIPELINE_STATUS_OPTIONS = ["All", "Offer Made", "Onboarding", "Signed Off"];

export function TeamOverviewView() {
  const [activeTab, setActiveTab] = useState<TeamTab>("onboarding");
  const [search, setSearch] = useState("");
  const [pipelineStatus, setPipelineStatus] = useState("All");
  const [agency, setAgency] = useState<string>(AGENCIES[0]);

  const visibleMembers = useMemo(() => {
    return TEAM_MEMBERS.filter((m) => {
      if (activeTab !== "all" && m.tab !== activeTab) return false;
      if (pipelineStatus !== "All" && m.pipelineStatus !== pipelineStatus) return false;
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
        title="Overview"
        description="View all of your current and prospective team members."
        actions={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-brand-primary-hover"
          >
            Add team members
            <ChevronDown className="h-4 w-4" />
          </button>
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
                {CHECK_COLUMNS.map((col) => (
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
                    colSpan={3 + CHECK_COLUMNS.length}
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
                    {CHECK_COLUMNS.map((col) => (
                      <td key={col.key} className="px-1 py-4 text-center">
                        <CheckCell state={m.checks[col.key]} />
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-brand-ink">
                      {m.targetStart ?? "Not set"}
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
