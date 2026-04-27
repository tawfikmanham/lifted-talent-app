import Link from "next/link";

export type ViewId = "original" | "expanding" | "drawer";

const VIEWS: Array<{ id: ViewId; label: string; href: string }> = [
  { id: "original", label: "Original", href: "/team/legacy" },
  { id: "expanding", label: "Expanding card", href: "/team" },
  { id: "drawer", label: "Side drawer", href: "/team/drawer" },
];

export function ViewToggle({ current }: { current: ViewId }) {
  return (
    <nav
      aria-label="View switcher"
      className="flex items-center rounded-lg border border-gray-200 bg-gray-100 p-0.5 text-xs"
    >
      {VIEWS.map((v) => {
        const isActive = v.id === current;
        if (isActive) {
          return (
            <span
              key={v.id}
              className="rounded bg-white px-2.5 py-1 font-medium text-brand-ink shadow-sm"
              aria-current="page"
            >
              {v.label}
            </span>
          );
        }
        return (
          <Link
            key={v.id}
            href={v.href}
            className="rounded px-2.5 py-1 text-gray-600 transition-colors hover:text-brand-ink"
          >
            {v.label}
          </Link>
        );
      })}
    </nav>
  );
}
