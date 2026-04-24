type Props = {
  section: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function PageHeader({ section, title, description, actions }: Props) {
  return (
    <div className="border-b border-border-subtle bg-white px-5 py-5 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xl font-semibold md:text-2xl">
            <span className="text-brand-ink">{section}</span>
            <svg
              className="h-4 w-4 text-muted md:h-5 md:w-5"
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
            <span className="text-brand-primary">{title}</span>
          </div>
          {description && (
            <p className="mt-2 max-w-3xl text-sm text-brand-ink md:text-base">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
