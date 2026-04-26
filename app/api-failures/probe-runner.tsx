"use client";

import { useState } from "react";

type ProbeResult = {
  ok: boolean;
  status: number;
  latencyMs: number;
  headers: Record<string, string>;
  bodySnippet?: string;
  error?: string;
};

const DEFAULT_TARGETS = [
  "https://chamaconnect.io/",
  "https://chamaconnect.io/api/proxy/member-transactions/pending/test-id",
  "https://chamaconnect.co.ke/",
];

export default function ProbeRunner() {
  const [url, setUrl] = useState(DEFAULT_TARGETS[0]);
  const [result, setResult] = useState<ProbeResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/probe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data: ProbeResult = await res.json();
      setResult(data);
    } catch (e) {
      setResult({
        ok: false,
        status: 0,
        latencyMs: 0,
        headers: {},
        error: e instanceof Error ? e.message : String(e),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-zinc-100 placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
          placeholder="https://chamaconnect.io/..."
        />
        <button
          onClick={run}
          disabled={loading}
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[var(--accent-strong)] hover:text-white disabled:opacity-50"
        >
          {loading ? "Probing..." : "Probe"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {DEFAULT_TARGETS.map((t) => (
          <button
            key={t}
            onClick={() => setUrl(t)}
            className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {t.replace("https://", "")}
          </button>
        ))}
      </div>

      {result && (
        <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
          {result.error ? (
            <p className="text-red-400">Error: {result.error}</p>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex h-2 w-2 rounded-full ${
                    result.ok ? "bg-[var(--accent)]" : "bg-red-500"
                  }`}
                />
                <span className="font-mono text-zinc-100">{result.status}</span>
                <span className="text-[var(--muted)]">
                  {result.latencyMs} ms
                </span>
              </div>
              <details className="mt-3">
                <summary className="cursor-pointer text-zinc-400">
                  Selected headers
                </summary>
                <pre className="mt-2 overflow-x-auto rounded bg-[var(--surface-2)] p-3 text-xs text-zinc-200">
                  {Object.entries(result.headers)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join("\n")}
                </pre>
              </details>
              {result.bodySnippet && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-zinc-400">
                    Body snippet
                  </summary>
                  <pre className="mt-2 max-h-48 overflow-auto rounded bg-[var(--surface-2)] p-3 text-xs text-zinc-200">
                    {result.bodySnippet}
                  </pre>
                </details>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
