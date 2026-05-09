"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Topbar onMobileNavToggle={() => setOpen((o) => !o)} />
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 px-4 md:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-[280px] border-r border-border bg-bg pt-[calc(var(--topbar-h)+8px)] transition-transform lg:sticky lg:top-[var(--topbar-h)] lg:z-0 lg:h-[calc(100vh-var(--topbar-h))] lg:w-auto lg:translate-x-0 lg:border-r-0 lg:bg-transparent lg:pt-6",
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <div className="h-full px-4 lg:pr-6 lg:pl-0">
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </aside>

        {open && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-20 bg-bg/70 backdrop-blur-[2px] lg:hidden"
          />
        )}

        <main className="min-w-0 py-10 md:py-14">{children}</main>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1480px] flex-wrap items-center gap-4 px-4 py-6 md:px-6">
          <span className="brand-mark" />
          <span className="text-[13px] font-bold tracking-[-0.02em]">
            INFINIVIEW<span className="text-lime">/</span> docs
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-text-muted">
            Product documentation
          </span>
          <div className="ml-auto flex items-center gap-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-text-secondary">
            <a className="hover:text-lime" href="https://app.infiniview.dev" target="_blank" rel="noopener noreferrer">
              Dashboard
            </a>
            <a className="hover:text-lime" href="https://github.com/infiniflop/infiniview-docs" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
