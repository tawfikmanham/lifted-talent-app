import { PageHeader } from "./PageHeader";

export function EmptyPage({
  section,
  title,
  description,
  body,
}: {
  section: string;
  title: string;
  description?: string;
  body?: string;
}) {
  return (
    <div>
      <PageHeader section={section} title={title} description={description} />
      <div className="flex items-center justify-center p-10 text-sm text-muted">
        {body ?? "Nothing here yet."}
      </div>
    </div>
  );
}
