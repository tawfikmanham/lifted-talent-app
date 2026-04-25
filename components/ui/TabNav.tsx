"use client";

type Tab = { id: string; label: string };

type Props = {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
};

export function TabNav({ tabs, active, onChange }: Props) {
  return (
    <div
      id="filters"
      className="overflow-x-auto border-y border-gray-300 bg-gray-100 p-1 px-2 text-xs text-gray-600"
    >
      <section className="flex min-w-max items-center gap-1">
        {tabs.map((t) => {
          const is = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={`whitespace-nowrap rounded-xl px-3 py-1 transition ${
                is ? "bg-primary-200 text-brand-ink" : "hover:bg-white"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </section>
    </div>
  );
}
