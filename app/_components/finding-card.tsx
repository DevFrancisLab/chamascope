import { Finding } from "../_data/findings";
import SeverityBadge from "./severity-badge";

export default function FindingCard({ finding }: { finding: Finding }) {
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm shadow-black/30 transition-colors hover:border-[var(--accent)]/40">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            #{finding.id} · {finding.category}
          </p>
          <h3 className="mt-1 text-base font-semibold text-zinc-100">
            {finding.title}
          </h3>
        </div>
        <SeverityBadge severity={finding.severity} />
      </header>
      <p className="mt-3 text-sm leading-6 text-zinc-300">
        {finding.description}
      </p>
      <p className="mt-3 text-xs text-[var(--muted)]">
        <span className="font-medium text-zinc-300">Reproduce:</span>{" "}
        {finding.repro}
      </p>
    </article>
  );
}
