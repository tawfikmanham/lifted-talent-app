"use client";

import { Info, Search, Pencil } from "lucide-react";
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

const TOGGLE_BASE =
  "w-full border border-gray-300 px-3 py-2 text-sm transition-colors duration-300 first:rounded-l-md last:rounded-r-md";

export function RoleFilterPanel() {
  const [relocators, setRelocators] = useState<"yes" | "no">("yes");

  return (
    <section className="w-full space-y-6 rounded-2xl border border-gray-300 bg-white p-4">
      <label className="block text-xs text-gray-500">
        <span className="mb-1 block">Search by name</span>
        <div className="flex min-h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-sm text-brand-ink hover:bg-primary-50 focus-within:border-primary-300">
          <Search className="size-5 shrink-0 text-gray-400" />
          <input
            type="text"
            className="w-full grow bg-transparent outline-none"
          />
        </div>
      </label>

      <div className="block text-xs text-gray-500">
        <span className="mb-1 flex items-center gap-1">
          Show relocators
          <Info className="size-4 text-blue-500" />
        </span>
        <div className="flex w-full">
          <button
            type="button"
            onClick={() => setRelocators("yes")}
            className={`${TOGGLE_BASE} ${
              relocators === "yes"
                ? "border-primary-600 bg-primary-600 text-white"
                : "border-l-transparent bg-white text-brand-ink hover:bg-gray-100"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setRelocators("no")}
            className={`${TOGGLE_BASE} ${
              relocators === "no"
                ? "border-primary-600 bg-primary-600 text-white"
                : "border-l-transparent bg-white text-brand-ink hover:bg-gray-100"
            }`}
          >
            No
          </button>
        </div>
        <button
          type="button"
          className="mt-2 block text-left text-xs font-medium text-primary-700 hover:text-primary-900 hover:underline hover:underline-offset-4"
        >
          Read about the support we offer for relocating candidates here
        </button>
      </div>

      <div>
        <p className="mb-1 text-xs text-gray-500">Filter by role requirements</p>
        <div className="grid grid-cols-1 gap-2 pb-2">
          <button
            type="button"
            className="flex items-center justify-center gap-1 rounded-lg bg-primary-600 px-3 py-2 text-sm text-white shadow-sm transition-colors duration-300 hover:bg-primary-900"
          >
            Default
            <span className="text-xs text-white/80">
              ({TOTAL_MATCHES.toLocaleString()} matches)
            </span>
          </button>

          <div className="grid grid-cols-1 gap-y-4 rounded-lg border border-gray-300 bg-white p-4 text-sm">
            {ROWS.map((r) => (
              <div key={r.label}>
                <span className="text-xs text-gray-500">{r.label}</span>
                <p className="text-brand-ink">{r.value}</p>
              </div>
            ))}
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-brand-ink shadow-sm transition-colors duration-300 hover:bg-gray-100"
            >
              <Pencil className="size-4" />
              Edit role
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium text-primary-700 hover:text-primary-900 hover:underline hover:underline-offset-4"
        >
          Show all candidates
        </button>
      </div>

      <section className="flex items-start gap-3 rounded-lg bg-lifted-pink-400 p-4 text-sm shadow-sm">
        <Info className="hidden size-8 shrink-0 md:block" />
        <div className="grow space-y-1">
          <h2 className="font-medium">Not seeing the right candidates?</h2>
          <p>
            Add a new role, or update your existing roles, to refresh your
            dashboard{" "}
            <a
              href="#"
              className="underline decoration-primary-700 decoration-2 underline-offset-4 hover:font-medium hover:text-primary-700"
            >
              here.
            </a>
          </p>
        </div>
      </section>
    </section>
  );
}
