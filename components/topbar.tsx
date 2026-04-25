"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { APP_URL, MARKETING_URL } from "./nav-config";
import { SearchTrigger } from "./search";

export function Topbar({ onMobileNavToggle }: { onMobileNavToggle: () => void }) {
  const [mac, setMac] = useState(false);
  useEffect(() => {
    setMac(
      typeof navigator !== "undefined" &&
        ("userAgentData" in navigator
          ? (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform === "macOS"
          : /Mac|iPhone|iPad/.test(navigator.platform)),
    );
  }, []);

  return (
    <header className="sticky top-0 z-40 h-[var(--topbar-h)] border-b border-border bg-bg/85 backdrop-blur-[10px]">
      <div className="mx-auto flex h-full max-w-[1480px] items-center gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="brand-mark" />
          <span className="text-[14px] font-bold tracking-[-0.02em]">
            INFINIVIEW<span className="text-lime">/</span>
          </span>
          <span className="ml-1 hidden font-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted sm:inline">
            docs
          </span>
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={onMobileNavToggle}
          className="ml-auto flex h-8 w-8 items-center justify-center border border-border text-text-secondary lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3 w-4">
            <span className="absolute inset-x-0 top-0 h-px bg-current" />
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
            <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
          </span>
        </button>

        <div className="hidden lg:block flex-1 max-w-[420px] ml-auto">
          <SearchTrigger mac={mac} />
        </div>

        <nav className="hidden items-center gap-5 font-mono text-[11px] tracking-[0.04em] text-text-secondary lg:flex">
          <a
            className="transition-colors hover:text-lime"
            href={MARKETING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            marketing
          </a>
          <a
            className="flex items-center gap-1.5 transition-colors hover:text-lime"
            href="https://github.com/infiniflop/infiniview-docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </nav>

        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 border border-lime bg-lime px-3 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-bg transition-transform hover:-translate-y-px sm:inline-flex"
        >
          Open app
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </header>
  );
}
