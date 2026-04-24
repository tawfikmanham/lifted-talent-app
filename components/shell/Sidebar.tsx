"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, RotateCcw } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { StoreIcon } from "@/components/brand/LiftedIcons";
import { useEffect, useRef, useState } from "react";

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
      <nav className="group/nav fixed inset-y-0 left-0 z-30 flex h-screen w-16 flex-col overflow-hidden bg-brand-sidebar py-3 shadow-lg transition-[width] duration-200 ease-out hover:w-60">
        <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto overflow-x-hidden px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const rowCls = [
              "group/row relative flex items-center rounded-lg h-11 transition",
              item.disabled
                ? "text-white/45 cursor-not-allowed"
                : active
                  ? "bg-white/20 text-white"
                  : "text-white/85 hover:bg-white/10 hover:text-white",
            ].join(" ");

            const inner = (
              <>
                <span className="grid h-11 w-12 shrink-0 place-items-center">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100">
                  {item.label}
                </span>
                {item.expandable && (
                  <ChevronDown className="ml-auto mr-3 h-4 w-4 shrink-0 opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100" />
                )}
              </>
            );

            if (item.disabled) {
              return (
                <div key={item.href} className={rowCls} aria-disabled>
                  {inner}
                </div>
              );
            }
            return (
              <Link key={item.href} href={item.href} className={rowCls}>
                {inner}
              </Link>
            );
          })}
        </div>

        <div className="mt-2 flex flex-col gap-1 border-t border-white/10 px-2 pt-3">
          <div className="flex items-center justify-between px-3 pb-1 opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100">
            <span className="text-[11px] uppercase tracking-wide text-white/50">
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
            className="flex h-11 items-center rounded-lg text-white/85 hover:bg-white/10 hover:text-white"
            aria-label="Selected agency: Sample Name"
          >
            <span className="grid h-11 w-12 shrink-0 place-items-center">
              <StoreIcon className="h-5 w-5" />
            </span>
            <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100">
              Sample Name
            </span>
            <ChevronDown className="ml-auto mr-3 h-4 w-4 shrink-0 opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100" />
          </button>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-11 w-full items-center rounded-lg text-white hover:bg-white/10"
              aria-label="Account menu"
            >
              <span className="grid h-11 w-12 shrink-0 place-items-center">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-white text-xs font-semibold text-brand-ink">
                  NI
                </span>
              </span>
              <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100">
                Nex Ifa
              </span>
              <ChevronDown className="ml-auto mr-3 h-4 w-4 shrink-0 opacity-0 transition-opacity duration-150 group-hover/nav:opacity-100" />
            </button>

            {menuOpen && (
              <div className="absolute bottom-full left-2 right-2 z-40 mb-2 overflow-hidden rounded-md border border-border-subtle bg-white shadow-lg">
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
