import { findingsByPillar, pillarMeta } from "../_data/findings";
import FindingCard from "../_components/finding-card";

const meta = pillarMeta["config-audit"];

export const metadata = {
  title: `${meta.name} · ChamaScope`,
};

const checklist: { feature: string; required: boolean; status: "missing" | "broken" | "partial" }[] = [
  { feature: "M-Pesa STK Push integration (Daraja)", required: true, status: "missing" },
  { feature: "Bulk member import (CSV / contacts)", required: true, status: "missing" },
  { feature: "Flexible meeting cadence (weekly / biweekly / monthly)", required: true, status: "missing" },
  { feature: "Multiple document upload (constitution, bylaws, minutes)", required: true, status: "missing" },
  { feature: "Minimum member enforcement on chama creation", required: true, status: "broken" },
  { feature: "Loan amount client side validation", required: true, status: "broken" },
  { feature: "Email field validation", required: true, status: "broken" },
  { feature: "Password show or hide toggle", required: false, status: "missing" },
  { feature: "Working profile and account dropdown", required: true, status: "broken" },
];

const statusClass: Record<typeof checklist[number]["status"], string> = {
  missing: "bg-red-950/40 text-red-300 ring-1 ring-red-900/60",
  broken: "bg-orange-950/40 text-orange-300 ring-1 ring-orange-900/60",
  partial: "bg-yellow-950/40 text-yellow-300 ring-1 ring-yellow-900/60",
};

export default function Page() {
  const items = findingsByPillar("config-audit");
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          {meta.name}
        </h1>
        <p className="mt-2 text-zinc-400">{meta.tagline}</p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-zinc-100">
          Production ready checklist
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Features a Kenyan chama platform must support to handle real
          contributions, real members, and real schedules.
        </p>
        <ul className="mt-4 divide-y divide-[var(--border)] rounded-md border border-[var(--border)] bg-[var(--surface)]">
          {checklist.map((c) => (
            <li
              key={c.feature}
              className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
            >
              <div>
                <p className="font-medium text-zinc-100">{c.feature}</p>
                {c.required && (
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    Required for production
                  </p>
                )}
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${statusClass[c.status]}`}
              >
                {c.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-100">
          Documented findings
        </h2>
        <div className="mt-4 grid gap-4">
          {items.map((f) => (
            <FindingCard key={f.id} finding={f} />
          ))}
        </div>
      </section>
    </div>
  );
}
