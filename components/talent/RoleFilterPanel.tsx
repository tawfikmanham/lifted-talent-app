"use client";

import { Info, Search } from "lucide-react";
import { useState } from "react";
import { TOTAL_MATCHES } from "@/lib/mock";

const ROWS = [
  { label: "Location(s)", value: "NW95BZ (20 mile radius)" },
  { label: "Gender", value: "No Preference" },
  { label: "Driver", value: "No Preference" },
  { label: "Immigration status", value: "Both" },
  { label: "Visa type(s)", value: "No preference" },
  { label: "Sponsor licence status", value: "Any" },
  { label: "Contract type(s)", value: "Not set" },
  { label: "Care type(s)", value: "Home Care" },
  { label: "Minimum experience (years)", value: "Not set" },
];

export function RoleFilterPanel() {
  const [relocators, setRelocators] = useState<"yes" | "no">("yes");
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="flex flex-col gap-4 bg-white p-4 lg:w-[360px] lg:shrink-0 lg:border-l lg:border-border-subtle">
      <div>
        <label className="mb-1 block text-xs text-muted">Search by name</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder=""
            className="w-full rounded-md border border-border-subtle bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      <div>
        <div className="mb-1 flex items-center gap-1">
          <span className="text-xs text-muted">Show relocators</span>
          <Info className="h-3.5 w-3.5 text-brand-primary" />
        </div>
        <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-md border border-border-subtle">
          <button
            type="button"
            onClick={() => setRelocators("yes")}
            className={`py-2 text-sm font-medium transition ${relocators === "yes" ? "bg-brand-primary text-white" : "bg-white text-brand-ink"}`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setRelocators("no")}
            className={`py-2 text-sm font-medium transition ${relocators === "no" ? "bg-brand-primary text-white" : "bg-white text-brand-ink"}`}
          >
            No
          </button>
        </div>
        <a
          href="#"
          className="mt-2 block text-xs font-medium text-brand-primary hover:underline"
        >
          Read about the support we offer for relocating candidates here
        </a>
      </div>

      <div>
        <div className="mb-1 text-xs text-muted">Filter by role requirements</div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full rounded-md bg-brand-primary py-2.5 text-center text-sm font-medium text-white hover:bg-brand-primary-hover"
        >
          Default ({TOTAL_MATCHES.toLocaleString()} matches)
        </button>
      </div>

      <dl className="rounded-md border border-border-subtle p-4">
        {ROWS.map((r, i) => (
          <div key={r.label} className={i > 0 ? "mt-3" : ""}>
            <dt className="text-xs text-muted">{r.label}</dt>
            <dd className="text-sm text-brand-ink">{r.value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        className="rounded-md border border-border-subtle bg-white py-2.5 text-sm font-medium text-brand-ink hover:bg-page"
      >
        <span className="inline-flex items-center gap-2">
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-8.5 8.5a2 2 0 0 1-.879.506l-3 1a.5.5 0 0 1-.633-.633l1-3a2 2 0 0 1 .506-.879l8.5-8.5z" />
          </svg>
          Edit role
        </span>
      </button>

      <button
        type="button"
        className="text-sm font-medium text-brand-primary hover:underline"
      >
        Show all candidates
      </button>

      <div className="rounded-md bg-alert-pink p-3 text-sm">
        <p className="font-semibold text-brand-ink">
          Not seeing the right candidates?
        </p>
        <p className="mt-1 text-brand-ink">
          Add a new role, or update your existing roles, to refresh your
          dashboard{" "}
          <a href="#" className="underline">
            here.
          </a>
        </p>
      </div>
    </aside>
  );
}
