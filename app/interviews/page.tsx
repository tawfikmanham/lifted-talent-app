"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { TabNav } from "@/components/ui/TabNav";

const TABS = [
  { id: "upcoming", label: "Upcoming" },
  { id: "pending", label: "Pending" },
  { id: "completed", label: "Completed" },
  { id: "missed", label: "Missed" },
  { id: "cancelled", label: "Cancelled/Rejected" },
  { id: "expired", label: "Expired" },
  { id: "all", label: "All" },
];

export default function InterviewsPage() {
  const [active, setActive] = useState("upcoming");

  return (
    <div>
      <PageHeader
        section="Interviews"
        title="All Interview Requests"
        description="Manage interview requests for all candidates"
      />
      <TabNav tabs={TABS} active={active} onChange={setActive} />
      <div className="flex items-center justify-center p-12 text-sm text-muted">
        No interview requests found
      </div>
    </div>
  );
}
