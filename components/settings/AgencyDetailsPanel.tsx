"use client";

export function AgencyDetailsPanel() {
  return (
    <section className="rounded-md bg-white p-6 shadow-sm ring-1 ring-border-subtle">
      <h2 className="text-lg font-semibold text-brand-ink">Agency details</h2>
      <hr className="my-4 border-border-subtle" />
      <form className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-ink">
            Agency name
          </label>
          <input
            type="text"
            defaultValue="Sample Name"
            readOnly
            className="w-full rounded-md border border-transparent bg-page px-3 py-2 text-sm text-brand-ink"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-ink">
            Email domain
          </label>
          <p className="mb-2 text-sm text-muted">
            Used to match new users to this organisation during registration.
            Only change if the whole organisation has moved to a new domain and
            you are correcting a mistake—this should rarely be updated.
          </p>
          <input
            type="text"
            defaultValue="mypethealh.com"
            readOnly
            className="w-full rounded-md border border-transparent bg-page px-3 py-2 text-sm text-brand-ink"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-ink">
            CQC registration number
          </label>
          <input
            type="text"
            defaultValue=""
            readOnly
            className="w-full rounded-md border border-transparent bg-page px-3 py-2 text-sm text-brand-ink"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md bg-brand-primary px-5 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover"
          >
            Edit
          </button>
        </div>
      </form>
    </section>
  );
}
