"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, RotateCcw } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { StoreIcon } from "@/components/brand/LiftedIcons";
import { useEffect, useRef, useState } from "react";

const ITEM_BASE =
  "relative flex w-full gap-2 rounded-lg p-2 text-white transition";
const ITEM_HOVER = "hover:bg-primary-400";

export function Sidebar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isActive = (href: string) => {
    if (href === "/candidates/all") return pathname.startsWith("/candidates");
    if (href === "/compliance/alerts") return pathname.startsWith("/compliance");
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="relative w-16 shrink-0">
      <nav className="group/nav fixed inset-y-0 left-0 z-30 flex h-screen w-16 flex-col overflow-hidden bg-primary-700 p-3 shadow-lg shadow-primary-600/30 transition-[width] duration-200 ease-out hover:w-60">
        <div className="flex grow flex-col gap-y-2 overflow-y-auto overflow-x-hidden md:gap-y-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            const labelEl = (
              <span className="whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100">
                {item.label}
              </span>
            );

            const trailingChevron = item.expandable && (
              <ChevronDown className="ml-auto size-5 shrink-0 opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100" />
            );

            if (item.disabled) {
              return (
                <button
                  key={item.href}
                  type="button"
                  aria-label={item.label}
                  disabled
                  className={`${ITEM_BASE} cursor-not-allowed opacity-50`}
                >
                  <Icon className="size-6 shrink-0" />
                  {labelEl}
                  {trailingChevron}
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`${ITEM_BASE} ${ITEM_HOVER} ${active ? "bg-primary-500" : ""}`}
              >
                <Icon className="size-6 shrink-0" />
                {labelEl}
                {trailingChevron}
              </Link>
            );
          })}
        </div>

        <div className="mt-2 flex flex-col gap-y-1 border-t border-white/10 pt-3">
          <div className="flex items-center justify-between px-2 pb-1 opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100">
            <span className="text-[11px] uppercase tracking-wide text-white/55">
              Selected agency
            </span>
            <button
              type="button"
              className="text-white/60 hover:text-white"
              aria-label="Reset agency"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            aria-label="Selected agency: Sample Name"
            className={`${ITEM_BASE} ${ITEM_HOVER}`}
          >
            <StoreIcon className="size-6 shrink-0" />
            <span className="whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100">
              Sample Name
            </span>
            <ChevronDown className="ml-auto size-5 shrink-0 opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100" />
          </button>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Account menu"
              className={`${ITEM_BASE} ${ITEM_HOVER}`}
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-white text-[10px] font-semibold text-brand-ink">
                NI
              </span>
              <span className="whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100">
                Nex Ifa
              </span>
              <ChevronDown className="ml-auto size-5 shrink-0 opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100" />
            </button>

            {menuOpen && (
              <div className="absolute bottom-full left-0 right-0 z-40 mb-2 overflow-hidden rounded-md border border-border-subtle bg-white shadow-lg">
                <div className="border-b border-border-subtle px-3 py-2">
                  <div className="text-sm font-semibold text-brand-ink">
                    Nex Ifa
                  </div>
                  <div className="truncate text-xs text-muted">
                    nexifa3806@mypethealh.com
                  </div>
                </div>
                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
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
        </div>
      </nav>
    </div>
  );
}
