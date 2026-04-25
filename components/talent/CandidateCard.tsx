"use client";

import {
  User,
  Video,
  Heart,
  AudioLines,
} from "lucide-react";
import type { ComponentType } from "react";
import type { Candidate } from "@/lib/mock";

type Props = {
  candidate: Candidate;
  favourited: boolean;
  onToggleFavourite: (candidateId: string) => void;
};

type TraitIcon = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

function OwnerCarIcon({
  className,
  strokeWidth,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 13H8M2 9L4 10L5.27064 6.18807C5.53292 5.40125 5.66405 5.00784 5.90729 4.71698C6.12208 4.46013 6.39792 4.26132 6.70951 4.13878C7.06236 4 7.47705 4 8.30643 4H15.6936C16.523 4 16.9376 4 17.2905 4.13878C17.6021 4.26132 17.8779 4.46013 18.0927 4.71698C18.3359 5.00784 18.4671 5.40125 18.7294 6.18807L20 10L22 9M16 13H19M6.8 10H17.2C18.8802 10 19.7202 10 20.362 10.327C20.9265 10.6146 21.3854 11.0735 21.673 11.638C22 12.2798 22 13.1198 22 14.8V17.5C22 17.9647 22 18.197 21.9616 18.3902C21.8038 19.1836 21.1836 19.8038 20.3902 19.9616C20.197 20 19.9647 20 19.5 20H19C17.8954 20 17 19.1046 17 18C17 17.7239 16.7761 17.5 16.5 17.5H7.5C7.22386 17.5 7 17.7239 7 18C7 19.1046 6.10457 20 5 20H4.5C4.03534 20 3.80302 20 3.60982 19.9616C2.81644 19.8038 2.19624 19.1836 2.03843 18.3902C2 18.197 2 17.9647 2 17.5V14.8C2 13.1198 2 12.2798 2.32698 11.638C2.6146 11.0735 3.07354 10.6146 3.63803 10.327C4.27976 10 5.11984 10 6.8 10Z"
        stroke="currentColor"
        strokeWidth={strokeWidth ?? 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FullTimeClockIcon({
  className,
  strokeWidth,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.7 11.5L20.7005 13.5L18.7 11.5M20.9451 13C20.9814 12.6717 21 12.338 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.8273 21 17.35 19.6963 19 17.6573M12 7V12L15 14"
        stroke="currentColor"
        strokeWidth={strokeWidth ?? 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeCareIcon({
  className,
  strokeWidth,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 21V13.6C9 13.0399 9 12.7599 9.109 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75993 12 10.04 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V21M2 9.5L11.04 2.72C11.3843 2.46181 11.5564 2.33271 11.7454 2.28294C11.9123 2.23902 12.0877 2.23902 12.2546 2.28295C12.4436 2.33271 12.6157 2.46181 12.96 2.72L22 9.5M4 8V17.8C4 18.9201 4 19.4802 4.21799 19.908C4.40974 20.2843 4.7157 20.5903 5.09202 20.782C5.51985 21 6.0799 21 7.2 21H16.8C17.9201 21 18.4802 21 18.908 20.782C19.2843 20.5903 19.5903 20.2843 19.782 19.908C20 19.4802 20 18.9201 20 17.8V8L13.92 3.44C13.2315 2.92361 12.8872 2.66542 12.5091 2.56589C12.1754 2.47804 11.8246 2.47804 11.4909 2.56589C11.1128 2.66542 10.7685 2.92361 10.08 3.44L4 8Z"
        stroke="currentColor"
        strokeWidth={strokeWidth ?? 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LiveInCareIcon({
  className,
  strokeWidth,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 21V13.6C9 13.0399 9 12.7599 9.10899 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75992 12 10.0399 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V21M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z"
        stroke="currentColor"
        strokeWidth={strokeWidth ?? 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ResidentialCareIcon({
  className,
  strokeWidth,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7.5 11H4.6C4.03995 11 3.75992 11 3.54601 11.109C3.35785 11.2049 3.20487 11.3578 3.10899 11.546C3 11.7599 3 12.0399 3 12.6V21M16.5 11H19.4C19.9601 11 20.2401 11 20.454 11.109C20.6422 11.2049 20.7951 11.3578 20.891 11.546C21 11.7599 21 12.0399 21 12.6V21M16.5 21V6.2C16.5 5.0799 16.5 4.51984 16.282 4.09202C16.0903 3.71569 15.7843 3.40973 15.408 3.21799C14.9802 3 14.4201 3 13.3 3H10.7C9.57989 3 9.01984 3 8.59202 3.21799C8.21569 3.40973 7.90973 3.71569 7.71799 4.09202C7.5 4.51984 7.5 5.0799 7.5 6.2V21M22 21H2M11 7H13M11 11H13M11 15H13"
        stroke="currentColor"
        strokeWidth={strokeWidth ?? 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DriverCardIcon({
  className,
  strokeWidth,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        opacity="0.12"
        d="M2 8.2V10H22V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2Z"
        fill="currentColor"
      />
      <path
        d="M22 10H2M11 14H6M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2Z"
        stroke="currentColor"
        strokeWidth={strokeWidth ?? 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Trait({
  Icon,
  label,
  absent,
}: {
  Icon: TraitIcon;
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

export function CandidateCard({
  candidate,
  favourited,
  onToggleFavourite,
}: Props) {
  const c = candidate;

  return (
    <article className="relative flex h-full flex-col rounded-xl border border-gray-300 bg-white">
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
              Icon={ResidentialCareIcon}
              label="Residential care"
              absent={!c.care.residential}
            />
            <Trait Icon={HomeCareIcon} label="Home care" absent={!c.care.home} />
            <Trait Icon={LiveInCareIcon} label="Live in care" absent={!c.care.liveIn} />
            <Trait Icon={DriverCardIcon} label="Driver" absent={!c.driver} />
            <Trait Icon={OwnerCarIcon} label="Owner" absent={!c.owner} />
            <Trait Icon={FullTimeClockIcon} label="Full time" absent={!c.fullTime} />
          </div>
        </section>
      </div>

      <footer className="grid grow-0 grid-cols-[1fr_minmax(0,auto)_1fr] items-center gap-4 border-t border-gray-300 p-5 text-primary-700">
        <div className="flex gap-2">
          {c.hasVideo && (
            <button
              type="button"
              aria-label="Video"
              className="hover:opacity-80"
            >
              <Video className="size-5" strokeWidth={2} />
            </button>
          )}
          {c.hasAudio && (
            <button
              type="button"
              aria-label="Audio"
              className="hover:opacity-80"
            >
              <AudioLines className="size-5" strokeWidth={2} />
            </button>
          )}
        </div>
        <a
          href="#"
          className="min-w-0 whitespace-nowrap text-center text-sm font-medium hover:underline"
        >
          Full Profile
        </a>
        <div className="text-right">
          <button
            type="button"
            onClick={() => onToggleFavourite(c.id)}
            aria-label={favourited ? "Unfavourite" : "Favourite"}
          >
            <Heart
              className="size-5"
              strokeWidth={2}
              fill={favourited ? "currentColor" : "none"}
            />
          </button>
        </div>
      </footer>
    </article>
  );
}
