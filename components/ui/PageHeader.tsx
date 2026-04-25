type Props = {
  section: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function PageHeader({ section, title, description, actions }: Props) {
  return (
    <header className="flex flex-wrap items-center gap-4 bg-white p-4">
      <section className="min-w-0 grow space-y-2 overflow-hidden">
        <h1 className="flex flex-wrap items-center gap-1 whitespace-nowrap text-xl md:gap-2">
          <span className="font-medium text-brand-ink">{section}</span>
          <svg
            className="h-4 w-4 text-muted"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.22 14.78a.75.75 0 0 1 0-1.06L10.94 10 7.22 6.28a.75.75 0 1 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium text-brand-primary">{title}</span>
        </h1>
        {description && (
          <p className="text-sm text-muted">
            {description}
          </p>
        )}
      </section>
      {actions && <section className="flex items-center gap-2">{actions}</section>}
    </header>
  );
}
