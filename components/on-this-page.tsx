"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; title: string; depth?: 2 | 3 };

export function MobileToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="border border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted"
      >
        On this page
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <ul className="border-t border-border px-4 py-3 space-y-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block text-[13px] text-text-secondary transition-colors hover:text-lime"
                style={{ paddingLeft: (item.depth ?? 2) === 3 ? "12px" : undefined }}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function OnThisPage({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;
    const elements = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-[12.5px]">
      <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">
        On this page
      </div>
      <ul className="space-y-px">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-depth={item.depth ?? 2}
              className={cn(
                "toc-link",
                active === item.id &&
                  "text-lime border-l-lime hover:text-lime hover:border-l-lime",
              )}
              style={
                active === item.id
                  ? { color: "var(--color-lime)", borderLeftColor: "var(--color-lime)" }
                  : undefined
              }
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
