"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, CornerDownLeft } from "lucide-react";
import { FLAT_NAV, NAV } from "./nav-config";

export function SearchDesktopTrigger({ mac, onClick }: { mac: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex h-9 w-full items-center border border-border bg-bg-elevated/70 pl-8 pr-12 text-[13px] text-text-muted transition-colors hover:border-border-accent"
    >
      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
      Search docs
      <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
        {mac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  );
}

export function SearchMobileTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Search docs"
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center border border-border text-text-secondary transition-colors hover:border-border-accent hover:text-text"
    >
      <Search className="h-3.5 w-3.5" />
    </button>
  );
}

export { SearchDialog };

function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FLAT_NAV;
    return FLAT_NAV.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.description ?? "").toLowerCase().includes(q),
    );
  }, [query]);

  const navigate = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = listRef.current?.children[selected] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter" && results[selected]) {
        e.preventDefault();
        navigate(results[selected].href);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, results, selected, navigate]);

  const groupForItem = (href: string) =>
    NAV.find((g) => g.items.some((it) => it.href === href))?.label ?? "";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[min(20vh,160px)]">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="fixed inset-0 bg-bg/80 backdrop-blur-[4px]"
      />
      <div className="relative w-full max-w-[560px] mx-4 border border-border bg-bg-elevated shadow-2xl shadow-black/40">
        <div className="flex items-center border-b border-border px-4">
          <Search className="h-4 w-4 shrink-0 text-text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs..."
            className="h-12 flex-1 bg-transparent px-3 text-[15px] text-text placeholder:text-text-muted outline-none"
          />
          <kbd className="text-[10px]">ESC</kbd>
        </div>
        <div ref={listRef} className="scroll-area max-h-[360px] overflow-y-auto py-2">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center font-mono text-[12px] text-text-muted">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((item, i) => (
              <button
                key={item.href}
                type="button"
                onClick={() => navigate(item.href)}
                onMouseEnter={() => setSelected(i)}
                data-selected={selected === i}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors data-[selected=true]:bg-bg-card"
              >
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-text-muted" />
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-medium text-text">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="mt-0.5 truncate text-[12px] text-text-muted">
                      {item.description}
                    </div>
                  )}
                </div>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                  {groupForItem(item.href)}
                </span>
                {selected === i && (
                  <CornerDownLeft className="h-3 w-3 shrink-0 text-lime" />
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
