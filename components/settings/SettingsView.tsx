"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { TabNav } from "@/components/ui/TabNav";
import { AgencyDetailsPanel } from "./AgencyDetailsPanel";
import { UsersPanel } from "./UsersPanel";
import { PlaceholderPanel } from "./PlaceholderPanel";

const TABS = [
  { id: "agency", label: "Agency Details" },
  { id: "addresses", label: "Addresses" },
  { id: "app", label: "App Profile" },
  { id: "jobs", label: "Job Descriptions" },
  { id: "roles", label: "Role Requirements" },
  { id: "users", label: "Users" },
];

export function SettingsView() {
  const [active, setActive] = useState("agency");

  return (
    <div>
      <PageHeader
        section="Organisation"
        title="Settings"
        description="View and manage your organisation settings"
      />
      <TabNav tabs={TABS} active={active} onChange={setActive} />
      <div className="flex justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          {active === "agency" && <AgencyDetailsPanel />}
          {active === "users" && <UsersPanel />}
          {active === "addresses" && (
            <PlaceholderPanel title="Addresses" body="Manage agency addresses." />
          )}
          {active === "app" && (
            <PlaceholderPanel title="App Profile" body="Your app profile." />
          )}
          {active === "jobs" && (
            <PlaceholderPanel
              title="Job Descriptions"
              body="Manage your job descriptions."
            />
          )}
          {active === "roles" && (
            <PlaceholderPanel
              title="Role Requirements"
              body="Manage your role requirements."
            />
          )}
        </div>
      </div>
    </div>
  );
}
