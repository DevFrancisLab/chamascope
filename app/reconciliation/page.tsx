import { findingsByPillar, pillarMeta } from "../_data/findings";
import FindingCard from "../_components/finding-card";
import ReconcileForm from "./reconcile-form";

const meta = pillarMeta["reconciliation"];

export const metadata = {
  title: `${meta.name} · ChamaScope`,
};

export default function Page() {
  const items = findingsByPillar("reconciliation");
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
          Reconciliation worksheet
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Enter what the ChamaConnect dashboard reports, then list the
          individual transactions you can see (e.g. in &ldquo;Recent
          Activity&rdquo;). ChamaScope shows the gap. During testing on April
          24 to 26 we observed the dashboard reading Ksh 0.00 while a Ksh 100
          contribution appeared in Recent Activity, a correctness bug at the
          aggregation layer.
        </p>
        <div className="mt-4">
          <ReconcileForm />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-100">
          Documented findings
        </h2>
        <div className="mt-4 grid gap-4">
          {items.length > 0 ? (
            items.map((f) => <FindingCard key={f.id} finding={f} />)
          ) : (
            <p className="text-sm text-[var(--muted)]">
              No findings yet for this pillar.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
