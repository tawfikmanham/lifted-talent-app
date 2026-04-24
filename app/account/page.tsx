import { Shield } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

export default function AccountPage() {
  return (
    <div>
      <PageHeader section="Account Settings" title="Nex Ifa" />
      <div className="flex justify-center p-4 md:p-8">
        <div className="flex w-full max-w-2xl flex-col gap-6">
          <section className="rounded-md bg-white p-6 shadow-sm ring-1 ring-border-subtle">
            <h2 className="text-lg font-semibold text-brand-ink">
              User Information
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <div className="text-sm text-muted">Name</div>
                <div className="text-base text-brand-ink">Nex Ifa</div>
              </div>
              <div>
                <div className="text-sm text-muted">Email</div>
                <div className="text-base text-brand-ink">
                  nexifa3806@mypethealh.com
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-md bg-white p-6 shadow-sm ring-1 ring-border-subtle">
            <h2 className="text-lg font-semibold text-brand-ink">
              Two-Factor Authentication (2FA)
            </h2>
            <p className="mt-2 text-sm text-muted">
              Add an extra layer of security to your account by requiring a code
              from your authenticator app when you sign in.
            </p>
            <div className="mt-4 flex items-center gap-4 rounded-md bg-page p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-muted">
                <Shield className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-brand-ink">
                  2FA is not enabled
                </div>
                <div className="text-sm text-muted">
                  Protect your account with 2FA
                </div>
              </div>
              <button className="shrink-0 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover">
                Enable 2FA
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
