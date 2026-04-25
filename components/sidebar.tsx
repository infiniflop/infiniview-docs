"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { NAV } from "./nav-config";
import { cn } from "@/lib/utils";

export function Sidebar({ onNavigate }: { onNavigate?: () => void } = {}) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV;
    return NAV.map((g) => ({
      ...g,
      items: g.items.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          (it.description ?? "").toLowerCase().includes(q),
      ),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  return (
    <div className="flex h-full flex-col">
      <div className="px-1 pb-3 lg:hidden">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter docs"
          className="h-9 w-full border border-border bg-bg-elevated/70 px-3 text-[13px] text-text-secondary placeholder:text-text-muted outline-none focus:border-lime/60"
        />
      </div>
      <nav className="scroll-area flex-1 overflow-y-auto pr-2">
        <ul className="space-y-7 pb-12">
          {groups.map((group) => (
            <li key={group.label}>
              <div className="mb-2 px-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">
                {group.label}
              </div>
              <ul className="space-y-px">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        data-active={active}
                        className={cn("docs-nav-link")}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
          {groups.length === 0 && (
            <li className="px-1 font-mono text-xs text-text-muted">No matches.</li>
          )}
        </ul>
      </nav>
    </div>
  );
}
