"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pillarMeta } from "../_data/findings";

const navItems = [
  { name: "Overview", href: "/", tagline: "Summary of all four audits." },
  pillarMeta["api-failures"],
  pillarMeta["reconciliation"],
  pillarMeta["config-audit"],
  pillarMeta["hygiene"],
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="mt-4 flex flex-col gap-0.5 px-3 pb-4">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              active
                ? "block rounded-md bg-[var(--accent-soft)] px-3 py-2 text-sm font-medium text-[var(--accent)]"
                : "block rounded-md px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-[var(--surface-2)] hover:text-white"
            }
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
