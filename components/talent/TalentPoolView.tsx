"use client";

import { useEffect, useMemo, useState } from "react";
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
const FAVOURITES_STORAGE_KEY = "lifted-talent:favourite-candidates";
const DEFAULT_FAVOURITE_IDS = CANDIDATES.filter((candidate) => candidate.favourited).map(
  (candidate) => candidate.id,
);

export function TalentPoolView() {
  const [active, setActive] = useState("review");
  const [page, setPage] = useState(1);
  const [favouriteIds, setFavouriteIds] = useState<Set<string>>(
    () => new Set(DEFAULT_FAVOURITE_IDS),
  );
  const [favouritesLoaded, setFavouritesLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(FAVOURITES_STORAGE_KEY);
      if (!stored) return;

      const ids = JSON.parse(stored);
      if (Array.isArray(ids)) {
        setFavouriteIds(
          new Set(ids.filter((id): id is string => typeof id === "string")),
        );
      }
    } catch {
      window.localStorage.removeItem(FAVOURITES_STORAGE_KEY);
    } finally {
      setFavouritesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!favouritesLoaded) return;
    window.localStorage.setItem(
      FAVOURITES_STORAGE_KEY,
      JSON.stringify(Array.from(favouriteIds)),
    );
  }, [favouriteIds, favouritesLoaded]);

  const visibleCandidates = useMemo(() => {
    if (active === "all") return CANDIDATES;
    if (active === "favourites") {
      return CANDIDATES.filter((candidate) => favouriteIds.has(candidate.id));
    }
    return CANDIDATES.filter((candidate) => candidate.status === active);
  }, [active, favouriteIds]);

  useEffect(() => {
    setPage(1);
  }, [active]);

  const toggleFavourite = (candidateId: string) => {
    setFavouriteIds((current) => {
      const next = new Set(current);
      if (next.has(candidateId)) {
        next.delete(candidateId);
      } else {
        next.add(candidateId);
      }
      return next;
    });
  };

  const canPrev = page > 1;
  const canNext = page < TOTAL_PAGES;

  return (
    <div>
      <PageHeader
        section="Talent pool"
        title="All"
        description="Find talent based upon your specific role requirements"
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-3 py-2 text-sm text-white shadow-sm transition-colors duration-300 hover:bg-brand-primary-hover">
            <Info className="h-5 w-5" />
            Show tour
          </button>
        }
      />

      <TabNav tabs={TABS} active={active} onChange={setActive} />

      <div className="bg-gray-200 p-4 md:px-12 md:py-6">
        <div className="flex flex-wrap-reverse gap-4 md:flex-nowrap">
          <div className="min-w-0 flex-1">
            {visibleCandidates.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
                {visibleCandidates.map((c) => (
                  <CandidateCard
                    key={c.id}
                    candidate={c}
                    favourited={favouriteIds.has(c.id)}
                    onToggleFavourite={toggleFavourite}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-gray-300 bg-white p-6 text-sm text-muted shadow-sm">
                {active === "favourites"
                  ? "No favourite candidates yet. Use the heart icon to add candidates here."
                  : "No candidates match the selected status."}
              </div>
            )}

            <div className="mt-6 flex w-full items-center justify-between text-sm">
              <div className="text-brand-ink">
                Page {page} of {TOTAL_PAGES}
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => canPrev && setPage((p) => p - 1)}
                  disabled={!canPrev}
                  className={`relative flex flex-row items-center justify-center whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors duration-300 ${
                    canPrev
                      ? "mr-2 border border-gray-300 bg-white hover:bg-gray-200"
                      : "mr-2 cursor-not-allowed border border-gray-300 bg-gray-100 text-gray-400"
                  }`}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => canNext && setPage((p) => p + 1)}
                  disabled={!canNext}
                  className={`relative flex flex-row items-center justify-center whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors duration-300 ${
                    canNext
                      ? "border border-gray-300 bg-white hover:bg-gray-200 shadow-sm"
                      : "cursor-not-allowed border border-gray-300 bg-gray-100 text-gray-400"
                  }`}
                >
                  Next
                </button>
              </div>
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
