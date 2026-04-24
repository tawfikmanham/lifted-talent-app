"use client";

import { ChevronDown, RotateCcw, Store } from "lucide-react";
import { UserPill } from "./UserPill";

export function DesktopAgencyBar() {
  return (
    <div className="hidden border-t border-white/10 bg-brand-sidebar p-3 lg:block">
      <div className="mb-2 flex items-center justify-between text-white/70">
        <span className="text-xs">Selected agency</span>
        <button aria-label="Reset" className="hover:text-white">
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
      <button className="mb-3 flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-white hover:bg-white/10">
        <span className="flex min-w-0 items-center gap-2">
          <Store className="h-4 w-4 shrink-0" />
          <span className="truncate text-sm font-medium">Sample Name</span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0" />
      </button>
      <UserPill />
    </div>
  );
}
