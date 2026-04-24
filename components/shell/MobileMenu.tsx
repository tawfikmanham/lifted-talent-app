"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, RotateCcw, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { StoreIcon } from "@/components/brand/LiftedIcons";
import { UserPill } from "./UserPill";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/candidates/all") return pathname.startsWith("/candidates");
    if (href === "/compliance/alerts") return pathname.startsWith("/compliance");
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div
      className={`fixed inset-0 z-40 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/20 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`absolute inset-x-0 bottom-0 top-0 flex flex-col bg-brand-sidebar p-5 text-white transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex justify-center pb-6">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-amber-400 text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const content = (
              <div
                className={`flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium ${active ? "bg-white/20" : ""} ${item.disabled ? "text-white/50" : "text-white"}`}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1">{item.label}</span>
                {item.expandable && <ChevronDown className="h-5 w-5" />}
              </div>
            );
            if (item.disabled) return <div key={item.href}>{content}</div>;
            return (
              <Link key={item.href} href={item.href} onClick={onClose}>
                {content}
              </Link>
            );
          })}
        </div>

        <div className="mt-4 border-t border-white/20 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-white/70">Selected agency</span>
            <button className="text-white/70 hover:text-white" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
          <button className="mb-4 flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-white hover:bg-white/10">
            <span className="flex items-center gap-3">
              <StoreIcon className="h-5 w-5" />
              <span className="font-medium">Sample Name</span>
            </span>
            <ChevronDown className="h-5 w-5" />
          </button>
          <UserPill />
        </div>
      </div>
    </div>
  );
}
