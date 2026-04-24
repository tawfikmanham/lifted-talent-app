"use client";

import {
  User,
  Building2,
  Home,
  Home as HomeIn,
  CreditCard,
  Car,
  Clock,
  Video,
  Heart,
  AudioLines,
} from "lucide-react";
import { useState } from "react";
import type { Candidate } from "@/lib/mock";

function TraitPresent({
  Icon,
  label,
}: {
  Icon: typeof User;
  label: string;
}) {
  return (
    <span className="flex items-center gap-1.5 text-brand-primary">
      <Icon className="h-4 w-4" strokeWidth={1.8} />
      <span className="text-sm text-brand-ink">{label}</span>
    </span>
  );
}

function TraitAbsent({
  Icon,
  label,
}: {
  Icon: typeof User;
  label: string;
}) {
  return (
    <span className="flex items-center gap-1.5 text-muted line-through">
      <Icon className="h-4 w-4" strokeWidth={1.8} />
      <span className="text-sm">{label}</span>
    </span>
  );
}

export function CandidateCard({ candidate }: { candidate: Candidate }) {
  const [fav, setFav] = useState(!!candidate.favourited);
  const c = candidate;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-border-subtle">
      <div className="p-5">
        <h3 className="text-lg font-semibold text-brand-ink">{c.name}</h3>
        <div className="mt-3 flex gap-4">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-brand-ink/70"
            style={{ backgroundColor: c.avatarColor }}
            aria-hidden
          >
            {c.avatarInitials}
          </div>
          <div className="grid flex-1 grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
            <TraitPresent Icon={User} label={c.gender} />
            {c.care.residential ? (
              <TraitPresent Icon={Building2} label="Residential care" />
            ) : (
              <TraitAbsent Icon={Building2} label="Residential care" />
            )}
            {c.care.home ? (
              <TraitPresent Icon={Home} label="Home care" />
            ) : (
              <TraitAbsent Icon={Home} label="Home care" />
            )}
            {c.care.liveIn ? (
              <TraitPresent Icon={HomeIn} label="Live in care" />
            ) : (
              <TraitAbsent Icon={HomeIn} label="Live in care" />
            )}
            {c.driver ? (
              <TraitPresent Icon={CreditCard} label="Driver" />
            ) : (
              <TraitAbsent Icon={CreditCard} label="Driver" />
            )}
            {c.owner ? (
              <TraitPresent Icon={Car} label="Owner" />
            ) : (
              <TraitAbsent Icon={Car} label="Owner" />
            )}
            {c.fullTime ? (
              <TraitPresent Icon={Clock} label="Full time" />
            ) : (
              <TraitAbsent Icon={Clock} label="Full time" />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border-subtle px-5 py-3">
        <div className="flex items-center gap-2 text-brand-primary">
          {c.hasVideo && (
            <button aria-label="Video" className="hover:opacity-80">
              <Video className="h-5 w-5" strokeWidth={1.8} />
            </button>
          )}
          {c.hasAudio && (
            <button aria-label="Audio" className="hover:opacity-80">
              <AudioLines className="h-5 w-5" strokeWidth={1.8} />
            </button>
          )}
        </div>
        <button className="text-sm font-medium text-brand-primary hover:underline">
          Full Profile
        </button>
        <button
          onClick={() => setFav((v) => !v)}
          aria-label={fav ? "Unfavourite" : "Favourite"}
          className="text-brand-primary"
        >
          <Heart
            className="h-5 w-5"
            strokeWidth={1.8}
            fill={fav ? "currentColor" : "none"}
          />
        </button>
      </div>
    </article>
  );
}
