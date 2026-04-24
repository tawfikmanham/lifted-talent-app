"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { TabNav } from "@/components/ui/TabNav";

const TABS = [
  { id: "critical", label: "Critical" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
  { id: "all", label: "All" },
];

export function ComplianceView() {
  const [active, setActive] = useState("critical");

  return (
    <div>
      <PageHeader
        section="Compliance"
        title="Alerts"
        description="View and action all of your compliance alerts to stay compliant with CQC and Home Office regulations"
        actions={
          <button className="rounded-md bg-brand-primary px-3 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover">
            Download CSV
          </button>
        }
      />

      <TabNav tabs={TABS} active={active} onChange={setActive} />

      <div className="p-4 md:p-6">
        <div className="mb-4 max-w-sm">
          <label className="mb-1 block text-xs text-muted">Processor</label>
          <div className="relative">
            <select
              className="w-full appearance-none rounded-md border border-border-subtle bg-white px-3 py-2 pr-9 text-sm outline-none focus:border-brand-primary"
              defaultValue="all"
            >
              <option value="all">All</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
        </div>

        <div className="overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-border-subtle">
          <div className="px-5 py-4">
            <h2 className="text-base font-semibold text-brand-ink">
              Compliance issues
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-page px-5 py-3 text-xs text-muted">
            <div>Candidate</div>
            <div>Issue</div>
          </div>
          <div className="flex items-center justify-center bg-white px-5 py-8 text-sm text-muted">
            No issues
          </div>
        </div>
      </div>
    </div>
  );
}
