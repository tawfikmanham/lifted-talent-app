"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { TabNav } from "@/components/ui/TabNav";
import { CandidateCard } from "./CandidateCard";
import { RoleFilterPanel } from "./RoleFilterPanel";
import { CANDIDATES } from "@/lib/mock";

const TABS = [
  { id: "review", label: "Review" },
  { id: "favourites", label: "My favourites" },
  { id: "team-favourites", label: "Team favourites" },
  { id: "interviewing", label: "Interviewing" },
  { id: "offer-made", label: "Offer made" },
  { id: "hired", label: "Hired" },
  { id: "rejected", label: "Rejected" },
  { id: "withdrawn", label: "Withdrawn" },
  { id: "unavailable", label: "Unavailable" },
  { id: "all", label: "All" },
];

export function TalentPoolView() {
  const [active, setActive] = useState("review");

  return (
    <div>
      <PageHeader
        section="Talent pool"
        title="All"
        description="Find talent based upon your specific role requirements"
        actions={
          <button className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-3 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover">
            <Info className="h-4 w-4" />
            Show tour
          </button>
        }
      />

      <TabNav tabs={TABS} active={active} onChange={setActive} />

      <div className="flex flex-col lg:flex-row">
        <div className="min-w-0 flex-1 p-4 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {CANDIDATES.map((c) => (
              <CandidateCard key={c.id} candidate={c} />
            ))}
          </div>
        </div>
        <RoleFilterPanel />
      </div>
    </div>
  );
}
