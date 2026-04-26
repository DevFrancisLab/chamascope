export type Severity = "critical" | "high" | "medium" | "low" | "security";

export type Pillar =
  | "api-failures"
  | "reconciliation"
  | "config-audit"
  | "hygiene";

export type Finding = {
  id: number;
  severity: Severity;
  category: string;
  title: string;
  description: string;
  repro: string;
  pillar: Pillar;
};

export const findings: Finding[] = [
  {
    id: 1,
    severity: "critical",
    category: "Real-time",
    title: "Production WebSocket hardcoded to localhost:3080",
    description:
      "The platform attempts to open ws://localhost:3080/socket.io/ from production. The connection fails for every end user, breaking real-time notifications and pending-action alerts.",
    repro: "Devtools → Console on any logged-in page",
    pillar: "api-failures",
  },
  {
    id: 2,
    severity: "critical",
    category: "Data integrity",
    title: "Pending transactions API returns 400; UI ignores",
    description:
      "/api/proxy/member-transactions/pending/<id> consistently returns HTTP 400. The UI silently asserts pending counts anyway, so admins see notifications they cannot action.",
    repro: "Devtools → Network on /admin/chamas",
    pillar: "api-failures",
  },
  {
    id: 3,
    severity: "critical",
    category: "Payments",
    title: "No M-Pesa STK Push configuration",
    description:
      "Payments setup accepts a paybill number but ships no Daraja/STK integration. The platform cannot initiate collection prompts on members' phones nor confirm payments.",
    repro: "Create Chama → Step 3 (Payments)",
    pillar: "config-audit",
  },
  {
    id: 4,
    severity: "critical",
    category: "Onboarding",
    title: "Chama can be created with zero members",
    description:
      "The Members step does not require any members before submission, allowing creation of orphan chamas with no participants.",
    repro:
      "Create Chama → Step 5 → click 'Create Chama' without adding a member",
    pillar: "config-audit",
  },
  {
    id: 5,
    severity: "high",
    category: "Onboarding",
    title: "No bulk member import",
    description:
      "Members must be added one at a time via form. Real chamas have 10–30 members; CSV/contact import is missing.",
    repro: "Create Chama → Step 5",
    pillar: "config-audit",
  },
  {
    id: 6,
    severity: "high",
    category: "Scheduling",
    title: "Meeting frequency: day-of-week only",
    description:
      "Group Settings only allows choosing a day of the week. There is no support for weekly, biweekly, or monthly cadences common to real chamas.",
    repro: "Create Chama → Step 2 (Group Settings)",
    pillar: "config-audit",
  },
  {
    id: 7,
    severity: "high",
    category: "Production",
    title: "Debug console.log instrumentation in production",
    description:
      "Production console is filled with DEBUG logs (rotation schedule fetches, token presence, API responses). Internal state is leaked to anyone who opens devtools.",
    repro: "Devtools → Console on any authenticated page",
    pillar: "hygiene",
  },
  {
    id: 8,
    severity: "high",
    category: "Production",
    title: "Next.js HMR cookie present in production",
    description:
      "Production responses set __next_hmr_refresh_hash__ cookie — a Hot Module Reload marker that should never appear in production builds.",
    repro: "Devtools → Application → Cookies",
    pillar: "hygiene",
  },
  {
    id: 9,
    severity: "high",
    category: "Performance",
    title: "Catastrophic page-load weight and duplication",
    description:
      "A single page load issued 447 requests totalling 23 MB over 10+ minutes. The same /member-transactions/pending API was fired 6+ times; 'All Groups Response' was logged 25+ times.",
    repro: "Devtools → Network — record a single navigation",
    pillar: "hygiene",
  },
  {
    id: 10,
    severity: "medium",
    category: "Forms",
    title: "Loan form accepts amounts above stated max",
    description:
      "The Apply for Loan modal shows 'Maximum loan amount allowed is Ksh 0.00' but lets the user type 20 and proceed. No client-side validation is enforced.",
    repro: "Open a chama → Loans → Apply for Loan",
    pillar: "config-audit",
  },
  {
    id: 11,
    severity: "medium",
    category: "Validation",
    title: "Email field accepts invalid input like '123@'",
    description:
      "Strings such as '123@' pass email validation. Affects the support form (and likely member invites), risking dead invitations and broken support replies.",
    repro: "Support form / signup / invite member form",
    pillar: "config-audit",
  },
  {
    id: 12,
    severity: "medium",
    category: "UX",
    title: "Landing page loads scrolled to footer",
    description:
      "On first visit, chamaconnect.io initial scroll position is at the footer instead of the hero section.",
    repro: "Visit chamaconnect.io in a fresh tab",
    pillar: "hygiene",
  },
  {
    id: 13,
    severity: "medium",
    category: "UX",
    title: "Profile dropdown: redundant items, broken close",
    description:
      "Dropdown shows both 'Profile' and 'Account' where only one is functional, and the menu does not close after clicking an item.",
    repro: "Click avatar in top-right",
    pillar: "config-audit",
  },
  {
    id: 14,
    severity: "medium",
    category: "UX",
    title: "Document upload: single file only",
    description:
      "The Communication step accepts one document. A chama typically needs to upload constitution, bylaws, minutes, and member contracts separately.",
    repro: "Create Chama → Step 4 (Communication)",
    pillar: "config-audit",
  },
  {
    id: 15,
    severity: "low",
    category: "Polish",
    title: "Typo: 'merrry go around' in Group Type dropdown",
    description:
      "The Group Type select option reads 'merrry go around' (extra r). Visible to every chama creator.",
    repro: "Create Chama → Step 2 → Group Type dropdown",
    pillar: "hygiene",
  },
  {
    id: 16,
    severity: "low",
    category: "Polish",
    title: "Footer reads '© 2025' in April 2026",
    description:
      "Public footer text is hardcoded to '© 2025 Chama Connect'. The current year is 2026.",
    repro: "Any page footer",
    pillar: "hygiene",
  },
  {
    id: 17,
    severity: "low",
    category: "Charts",
    title: "Chart axes show stale months (Nov/Dec/Jan in April)",
    description:
      "Contributions vs Expenses chart axes show Nov, Dec, Jan instead of recent months. Suggests a hardcoded month range rather than a rolling window.",
    repro: "Open a chama → Overview",
    pillar: "reconciliation",
  },
  {
    id: 18,
    severity: "low",
    category: "UX",
    title: "No password show/hide toggle",
    description:
      "Password reset and login flows lack a show/hide eye icon, increasing input errors on mobile.",
    repro: "Password reset flow",
    pillar: "config-audit",
  },
  {
    id: 19,
    severity: "low",
    category: "UX",
    title: "Inconsistent icon arrangement",
    description:
      "Icon ordering and grouping shifts between admin screens, harming visual consistency.",
    repro: "Visual scan across admin pages",
    pillar: "hygiene",
  },
  {
    id: 20,
    severity: "security",
    category: "Auth",
    title: "JWT has no exp claim; sent in cookie + Authorization header",
    description:
      "The auth_token JWT lacks an exp claim, so stolen tokens never expire. The token is sent in both Cookie and Authorization headers, which requires JavaScript access — meaning any XSS results in full account takeover.",
    repro: "Decode the auth_token cookie payload at jwt.io",
    pillar: "hygiene",
  },
  {
    id: 21,
    severity: "security",
    category: "Headers",
    title: "Missing Content-Security-Policy header",
    description:
      "Responses from chamaconnect.io do not set a Content-Security-Policy or Permissions-Policy header, weakening defense-in-depth against XSS and feature abuse.",
    repro: "Devtools → Network → any response → Headers tab",
    pillar: "hygiene",
  },
];

export const severityClass: Record<Severity, string> = {
  critical:
    "bg-red-100 text-red-800 ring-red-200 dark:bg-red-950 dark:text-red-300 dark:ring-red-900",
  high: "bg-orange-100 text-orange-800 ring-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:ring-orange-900",
  medium:
    "bg-yellow-100 text-yellow-800 ring-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:ring-yellow-900",
  low: "bg-blue-100 text-blue-800 ring-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-900",
  security:
    "bg-purple-100 text-purple-800 ring-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:ring-purple-900",
};

export const pillarMeta: Record<
  Pillar,
  { name: string; href: string; tagline: string }
> = {
  "api-failures": {
    name: "API Failures",
    href: "/api-failures",
    tagline: "Catches HTTP and WebSocket errors the UI silently ignores.",
  },
  reconciliation: {
    name: "Reconciliation",
    href: "/reconciliation",
    tagline: "Compares platform-reported totals to raw transaction data.",
  },
  "config-audit": {
    name: "Config Audit",
    href: "/config-audit",
    tagline: "Checks for production-ready chama features and validations.",
  },
  hygiene: {
    name: "Production Hygiene",
    href: "/hygiene",
    tagline:
      "Flags debug code, hardcoded dev URLs, stale dates, and missing security headers.",
  },
};

export function findingsByPillar(p: Pillar) {
  return findings.filter((f) => f.pillar === p);
}
