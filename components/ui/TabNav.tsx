"use client";

type Tab = { id: string; label: string };

type Props = {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
};

export function TabNav({ tabs, active, onChange }: Props) {
  return (
    <div className="overflow-x-auto no-scrollbar border-b border-border-subtle">
      <div className="flex min-w-max gap-1 px-5 py-2 md:px-8">
        {tabs.map((t) => {
          const is = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm transition ${
                is
                  ? "bg-lavender text-brand-primary"
                  : "text-brand-ink hover:bg-page"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
