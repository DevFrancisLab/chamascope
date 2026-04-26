"use client";

import { useState } from "react";

export default function ReconcileForm() {
  const [reported, setReported] = useState("0");
  const [transactionsText, setTransactionsText] = useState("100\n");

  const reportedNum = Number(reported) || 0;
  const observed = transactionsText
    .split(/\s|,/)
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n) && n !== 0);
  const computed = observed.reduce((a, b) => a + b, 0);
  const delta = computed - reportedNum;
  const matches = delta === 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="block text-sm font-medium text-zinc-200">
          Dashboard total (Ksh)
        </label>
        <input
          value={reported}
          onChange={(e) => setReported(e.target.value)}
          className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-zinc-100 focus:border-[var(--accent)] focus:outline-none"
        />

        <label className="mt-4 block text-sm font-medium text-zinc-200">
          Observed transactions (one per line, Ksh)
        </label>
        <textarea
          value={transactionsText}
          onChange={(e) => setTransactionsText(e.target.value)}
          rows={6}
          className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 font-mono text-sm text-zinc-100 focus:border-[var(--accent)] focus:outline-none"
        />
      </div>

      <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">Reported</span>
          <span className="font-mono text-zinc-100">
            Ksh {reportedNum.toFixed(2)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-zinc-400">
            Computed ({observed.length} txns)
          </span>
          <span className="font-mono text-zinc-100">
            Ksh {computed.toFixed(2)}
          </span>
        </div>
        <div className="mt-4 border-t border-[var(--border)] pt-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-zinc-100">Delta</span>
            <span
              className={`font-mono ${matches ? "text-[var(--accent)]" : "text-red-400"}`}
            >
              {delta >= 0 ? "+" : ""}
              {delta.toFixed(2)}
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-400">
            {matches
              ? "Totals reconcile."
              : "Discrepancy detected. The platform is not aggregating contributions correctly."}
          </p>
        </div>
      </div>
    </div>
  );
}
