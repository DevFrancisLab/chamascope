import Link from "next/link";
import { findings, pillarMeta, Pillar } from "./_data/findings";

const pillars: Pillar[] = [
  "api-failures",
  "reconciliation",
  "config-audit",
  "hygiene",
];

function severityCounts() {
  const counts = { critical: 0, high: 0, medium: 0, low: 0, security: 0 };
  for (const f of findings) counts[f.severity]++;
  return counts;
}

export default function Home() {
  const counts = severityCounts();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
          Trust layer for the ChamaConnect platform
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          ChamaScope surfaces what the platform itself does not disclose:
          silent API failures, dashboard totals that don&apos;t reconcile,
          missing production ready configuration, and deployment hygiene that
          erodes trust in a financial product. Findings below were captured
          across April 24 to 26, 2026.
        </p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-zinc-100">
          Findings by severity
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {(["critical", "high", "medium", "low", "security"] as const).map(
            (s) => (
              <div
                key={s}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <dt className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                  {s}
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-zinc-50">
                  {counts[s]}
                </dd>
              </div>
            ),
          )}
        </dl>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-100">Audits</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {pillars.map((p) => {
            const meta = pillarMeta[p];
            const count = findings.filter((f) => f.pillar === p).length;
            return (
              <Link
                key={p}
                href={meta.href}
                className="block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)]"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-semibold text-zinc-100">
                    {meta.name}
                  </h3>
                  <span className="text-xs text-[var(--muted)]">
                    {count} finding{count === 1 ? "" : "s"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">{meta.tagline}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-zinc-100">
          Innovation roadmap
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          ChamaScope extends naturally into the three areas MUIAA itself stakes
          its identity on: blockchain, AI, and ethical innovation for Africa.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            {
              tag: "AI",
              title: "Plain language audit summaries",
              body: "LLM generated explanations of each finding in English and Swahili, so a treasurer with no technical background understands what is wrong and why.",
            },
            {
              tag: "Web3",
              title: "Tamper evident audit anchoring",
              body: "Every audit run hashes its findings and anchors the hash on Base (or OpenTimestamps) so members can verify what state the platform was in.",
            },
            {
              tag: "SMS",
              title: "Push alerts to feature phones",
              body: "Africa's Talking SMS plus WhatsApp Cloud API push critical findings to the treasurer's phone the moment they happen.",
            },
          ].map((c) => (
            <div
              key={c.tag}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <span className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-[var(--accent)]">
                {c.tag}
              </span>
              <h3 className="mt-3 text-base font-semibold text-zinc-100">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
