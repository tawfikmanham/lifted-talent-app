"use client";

import { Menu } from "lucide-react";

export function MobileBottomBar({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-center bg-brand-sidebar lg:hidden">
      <button
        onClick={onOpen}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-amber-400 text-white hover:bg-white/10"
      >
        <Menu className="h-5 w-5" />
      </button>
    </div>
  );
}
