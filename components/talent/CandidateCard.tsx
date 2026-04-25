"use client";

import {
  User,
  Building2,
  Home,
  CreditCard,
  Car,
  Clock,
  Video,
  Heart,
  AudioLines,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import type { Candidate } from "@/lib/mock";

function Trait({
  Icon,
  label,
  absent,
}: {
  Icon: LucideIcon;
  label: string;
  absent?: boolean;
}) {
  return (
    <span
      className={`mr-4 inline-flex items-center gap-2 text-xs ${
        absent ? "text-gray-400 line-through" : ""
      }`}
    >
      <Icon
        className={`size-4 ${absent ? "text-gray-400" : "text-primary-600"}`}
        strokeWidth={2}
      />
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}

export function CandidateCard({ candidate }: { candidate: Candidate }) {
  const [fav, setFav] = useState(!!candidate.favourited);
  const c = candidate;

  return (
    <article className="relative flex h-full flex-col rounded-xl border border-gray-300 bg-primary-400/5">
      <header className="flex items-center gap-2 p-5">
        <div className="overflow-hidden">
          <span className="block w-full truncate font-medium text-brand-ink">
            {c.name}
          </span>
        </div>
      </header>

      <div className="flex grow items-center gap-4 px-5 pb-5">
        <div
          className="flex aspect-square !size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary-50 bg-white text-lg font-semibold text-brand-ink/70 md:!size-20 lg:!size-24"
          style={{ backgroundColor: c.avatarColor }}
          aria-hidden
        >
          {c.avatarInitials}
        </div>
        <section className="grow space-y-4">
          <div className="flex flex-wrap justify-start gap-y-4">
            <Trait Icon={User} label={c.gender} />
            <Trait
              Icon={Building2}
              label="Residential care"
              absent={!c.care.residential}
            />
            <Trait Icon={Home} label="Home care" absent={!c.care.home} />
            <Trait Icon={Home} label="Live in care" absent={!c.care.liveIn} />
            <Trait Icon={CreditCard} label="Driver" absent={!c.driver} />
            <Trait Icon={Car} label="Owner" absent={!c.owner} />
            <Trait Icon={Clock} label="Full time" absent={!c.fullTime} />
          </div>
        </section>
      </div>

      <footer className="grid grow-0 grid-cols-[1fr_min-content_1fr] items-center justify-between gap-4 border-t border-gray-300 p-5 text-primary-700">
        <div className="flex gap-2">
          {c.hasVideo && (
            <button aria-label="Video" className="hover:opacity-80">
              <Video className="size-5" strokeWidth={2} />
            </button>
          )}
          {c.hasAudio && (
            <button aria-label="Audio" className="hover:opacity-80">
              <AudioLines className="size-5" strokeWidth={2} />
            </button>
          )}
        </div>
        <a
          href="#"
          className="grow whitespace-nowrap text-sm font-medium hover:underline"
        >
          Full Profile
        </a>
        <div className="text-right">
          <button
            onClick={() => setFav((v) => !v)}
            aria-label={fav ? "Unfavourite" : "Favourite"}
          >
            <Heart
              className="size-5"
              strokeWidth={2}
              fill={fav ? "currentColor" : "none"}
            />
          </button>
        </div>
      </footer>
    </article>
  );
}
