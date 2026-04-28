import { notFound } from "next/navigation";
import { TEAM_MEMBERS } from "@/lib/team";
import { CandidateDetailView } from "@/components/team/CandidateDetailView";

export default async function CandidateDetailPage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;
  const member = TEAM_MEMBERS.find((m) => m.id === memberId);
  if (!member) notFound();
  return <CandidateDetailView member={member} />;
}
