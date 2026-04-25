import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <span className="brand-mark mb-6 !h-6 !w-6" />
      <h1 className="text-[clamp(48px,6vw,72px)] font-extrabold leading-none tracking-[-0.04em]">
        404
      </h1>
      <p className="mt-3 text-[15px] text-text-secondary">
        This page doesn&rsquo;t exist in the docs.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 border border-lime bg-lime px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-bg transition-transform hover:-translate-y-px"
      >
        Back to docs
      </Link>
    </div>
  );
}
