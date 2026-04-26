import { findingsByPillar, pillarMeta } from "../_data/findings";
import FindingCard from "../_components/finding-card";
import HygieneAudit from "./hygiene-audit";

const meta = pillarMeta["hygiene"];

export const metadata = {
  title: `${meta.name} · ChamaScope`,
};

export default function Page() {
  const items = findingsByPillar("hygiene");
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
          Live hygiene scan
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Fetches a chamaconnect.io page and runs a set of hygiene checks
          against the response.
        </p>
        <div className="mt-4">
          <HygieneAudit />
        </div>
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
