"use client";

import { useState } from "react";

type Check = {
  name: string;
  pass: boolean;
  detail: string;
};

type ProbeResult = {
  ok: boolean;
  status: number;
  latencyMs: number;
  headers: Record<string, string>;
  bodySnippet?: string;
  error?: string;
};

function runChecks(result: ProbeResult): Check[] {
  const checks: Check[] = [];
  const body = result.bodySnippet ?? "";
  const headers = result.headers;
  const currentYear = new Date().getFullYear();

  checks.push({
    name: "Footer copyright is current year",
    pass: !body.includes("© 2025") || body.includes(`© ${currentYear}`),
    detail: body.includes("© 2025")
      ? "Body contains '© 2025' literal."
      : "No stale '© 2025' literal found in returned snippet.",
  });

  checks.push({
    name: "No HMR cookie set",
    pass: !(headers["set-cookie"] ?? "").includes("__next_hmr_refresh_hash__"),
    detail: (headers["set-cookie"] ?? "").includes("__next_hmr_refresh_hash__")
      ? "Set-Cookie includes __next_hmr_refresh_hash__. Production should not."
      : "No HMR cookie in Set-Cookie header.",
  });

  checks.push({
    name: "Content-Security-Policy header present",
    pass: Boolean(headers["content-security-policy"]),
    detail: headers["content-security-policy"]
      ? `CSP: ${headers["content-security-policy"].slice(0, 80)}...`
      : "No Content-Security-Policy header set.",
  });

  checks.push({
    name: "Strict-Transport-Security header present",
    pass: Boolean(headers["strict-transport-security"]),
    detail:
      headers["strict-transport-security"] ??
      "No HSTS header. Browsers cannot enforce HTTPS for this origin.",
  });

  checks.push({
    name: "No localhost references in body",
    pass: !body.includes("localhost:") && !body.includes("127.0.0.1"),
    detail:
      body.includes("localhost:") || body.includes("127.0.0.1")
        ? "Found 'localhost' or '127.0.0.1' string in returned HTML."
        : "No localhost references found in returned snippet.",
  });

  checks.push({
    name: "Response size reasonable (< 1 MB for HTML)",
    pass: (Number(headers["content-length"]) || 0) < 1_000_000,
    detail: `content-length: ${headers["content-length"] ?? "unknown"}`,
  });

  return checks;
}

export default function HygieneAudit() {
  const [url, setUrl] = useState("https://chamaconnect.io/");
  const [checks, setChecks] = useState<Check[] | null>(null);
  const [meta, setMeta] = useState<ProbeResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setChecks(null);
    try {
      const res = await fetch("/api/probe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data: ProbeResult = await res.json();
      setMeta(data);
      setChecks(data.error ? [] : runChecks(data));
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
          className="flex-1 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-zinc-100 focus:border-[var(--accent)] focus:outline-none"
        />
        <button
          onClick={run}
          disabled={loading}
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[var(--accent-strong)] hover:text-white disabled:opacity-50"
        >
          {loading ? "Scanning..." : "Run scan"}
        </button>
      </div>

      {meta && (
        <p className="text-xs text-[var(--muted)]">
          {meta.error
            ? `Fetch error: ${meta.error}`
            : `${meta.status} · ${meta.latencyMs} ms`}
        </p>
      )}

      {checks && checks.length > 0 && (
        <ul className="divide-y divide-[var(--border)] rounded-md border border-[var(--border)] bg-[var(--surface)] text-sm">
          {checks.map((c) => (
            <li key={c.name} className="flex items-start gap-3 px-4 py-3">
              <span
                className={`mt-1 inline-flex h-2 w-2 shrink-0 rounded-full ${
                  c.pass ? "bg-[var(--accent)]" : "bg-red-500"
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-zinc-100">{c.name}</p>
                <p className="mt-0.5 truncate text-xs text-[var(--muted)]">
                  {c.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
