import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPager } from "./nav-config";

export function Pager({ href }: { href: string }) {
  const { prev, next } = getPager(href);
  if (!prev && !next) return null;
  return (
    <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-2 bg-bg p-5 transition-colors hover:bg-bg-elevated"
        >
          <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-text-muted">
            <ArrowLeft className="h-3 w-3" /> Previous
          </span>
          <span className="text-[15px] font-bold text-text transition-colors group-hover:text-lime">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="bg-bg" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-2 bg-bg p-5 text-right transition-colors hover:bg-bg-elevated"
        >
          <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-text-muted">
            Next <ArrowRight className="h-3 w-3" />
          </span>
          <span className="text-[15px] font-bold text-text transition-colors group-hover:text-lime">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="bg-bg" />
      )}
    </div>
  );
}
