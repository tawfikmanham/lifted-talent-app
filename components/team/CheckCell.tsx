import { Check, CircleAlert, Clock, MessageSquare, Minus } from "lucide-react";
import type { CheckState } from "@/lib/team";

export function CheckCell({ state }: { state: CheckState }) {
  switch (state.kind) {
    case "ok":
      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </span>
      );
    case "alert":
      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <CircleAlert className="h-5 w-5" strokeWidth={2} />
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <Clock className="h-4 w-4" strokeWidth={2.25} />
        </span>
      );
    case "na":
      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-400">
          <Minus className="h-4 w-4" />
        </span>
      );
    case "count":
      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-xs font-semibold text-white">
          {state.value}
        </span>
      );
    case "comment":
      return (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-brand-primary">
          <MessageSquare className="h-5 w-5" fill="currentColor" strokeWidth={0} />
        </span>
      );
    case "blank":
    default:
      return <span className="text-sm text-gray-400">-</span>;
  }
}
