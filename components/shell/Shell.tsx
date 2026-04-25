"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MobileMenu } from "./MobileMenu";
import { MobileBottomBar } from "./MobileBottomBar";
import { Footer } from "./Footer";

export function Shell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:relative lg:z-[100] lg:block">
        <div className="sticky top-0">
          <Sidebar />
        </div>
      </aside>

      <div className="relative z-0 flex min-w-0 flex-1 flex-col bg-page pb-14 lg:pb-0">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>

      <MobileBottomBar onOpen={() => setMobileOpen(true)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
