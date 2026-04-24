"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function UserPill({
  initials = "NI",
  name = "Nex Ifa",
}: {
  initials?: string;
  name?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md px-1 py-1 hover:bg-white/10"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-xs font-semibold text-brand-ink">
          {initials}
        </span>
        <span className="text-sm font-medium text-white">{name}</span>
      </button>
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-48 overflow-hidden rounded-md border border-border-subtle bg-white shadow-lg z-50">
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-brand-ink hover:bg-page"
          >
            Account
          </Link>
          <button className="block w-full px-3 py-2 text-left text-sm text-brand-ink hover:bg-page">
            Logout
          </button>
          <button className="block w-full border-t border-border-subtle px-3 py-2 text-left text-sm text-muted hover:bg-page">
            Cookie preferences
          </button>
          <div className="border-t border-border-subtle px-3 py-1 text-[10px] text-muted">
            v2.135.0
          </div>
        </div>
      )}
    </div>
  );
}
