import { Severity } from "../_data/findings";

const cls: Record<Severity, string> = {
  critical:
    "bg-red-950/40 text-red-300 ring-1 ring-red-900/60",
  high: "bg-orange-950/40 text-orange-300 ring-1 ring-orange-900/60",
  medium: "bg-yellow-950/40 text-yellow-300 ring-1 ring-yellow-900/60",
  low: "bg-sky-950/40 text-sky-300 ring-1 ring-sky-900/60",
  security: "bg-purple-950/40 text-purple-300 ring-1 ring-purple-900/60",
};

export default function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${cls[severity]}`}
    >
      {severity}
    </span>
  );
}
