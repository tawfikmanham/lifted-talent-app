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

const TOTAL_PAGES = 17;

export function TalentPoolView() {
  const [active, setActive] = useState("review");
  const [page, setPage] = useState(1);

  const canPrev = page > 1;
  const canNext = page < TOTAL_PAGES;

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

      <div className="bg-gray-200 p-4 md:px-12 md:py-6">
        <div className="flex flex-wrap-reverse gap-4 md:flex-nowrap">
          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
              {CANDIDATES.map((c) => (
                <CandidateCard key={c.id} candidate={c} />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 text-sm">
              <button
                type="button"
                onClick={() => canPrev && setPage((p) => p - 1)}
                disabled={!canPrev}
                className={`rounded-lg border px-3 py-2 shadow-sm transition-colors ${
                  canPrev
                    ? "border-gray-300 bg-white text-brand-ink hover:bg-gray-200"
                    : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
                }`}
              >
                Previous
              </button>
              <span className="text-brand-ink">
                Page {page} of {TOTAL_PAGES}
              </span>
              <button
                type="button"
                onClick={() => canNext && setPage((p) => p + 1)}
                disabled={!canNext}
                className={`rounded-lg border px-3 py-2 shadow-sm transition-colors ${
                  canNext
                    ? "border-gray-300 bg-white text-brand-ink hover:bg-gray-200"
                    : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
                }`}
              >
                Next
              </button>
            </div>
          </div>
          <div className="w-full md:w-[340px] md:shrink-0 xl:w-[360px]">
            <RoleFilterPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
