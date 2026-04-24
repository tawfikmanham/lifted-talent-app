export function PlaceholderPanel({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="rounded-md bg-white p-6 shadow-sm ring-1 ring-border-subtle">
      <h2 className="text-lg font-semibold text-brand-ink">{title}</h2>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </section>
  );
}
