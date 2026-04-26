import { findingsByPillar, pillarMeta } from "../_data/findings";
import FindingCard from "../_components/finding-card";
import ProbeRunner from "./probe-runner";

const meta = pillarMeta["api-failures"];

export const metadata = {
  title: `${meta.name} · ChamaScope`,
};

export default function Page() {
  const items = findingsByPillar("api-failures");
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          {meta.name}
        </h1>
        <p className="mt-2 text-zinc-400">{meta.tagline}</p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-zinc-100">Live probe</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Run an HTTP probe against any chamaconnect.io URL to see what end
          users see. Status, latency, and selected response headers are
          returned. Authenticated endpoints will return 401 or 400. That is the
          point: the UI swallows these silently.
        </p>
        <div className="mt-4">
          <ProbeRunner />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-100">
          Documented failures
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
