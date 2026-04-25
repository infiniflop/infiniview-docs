import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { OnThisPage, type TocItem } from "./on-this-page";
import { Pager } from "./pager";
import { FLAT_NAV, NAV } from "./nav-config";

export function DocPage({
  href,
  eyebrow,
  title,
  description,
  toc = [],
  actions,
  children,
}: {
  href: string;
  eyebrow?: string;
  title: string;
  description?: string;
  toc?: TocItem[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const group = NAV.find((g) => g.items.some((it) => it.href === href));
  const item = FLAT_NAV.find((it) => it.href === href);
  const breadcrumb = group?.label ?? eyebrow ?? "";
  const editPath =
    href === "/"
      ? "app/(docs)/page.tsx"
      : `app/(docs)${href}/page.tsx`;

  return (
    <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1fr)_220px]">
      <article className="min-w-0">
        <div className="mb-6 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-text-muted">
          <Link href="/" className="hover:text-lime">
            Docs
          </Link>
          {breadcrumb && (
            <>
              <ChevronRight className="h-3 w-3 text-text-muted" />
              <span>{breadcrumb}</span>
            </>
          )}
          {item && (
            <>
              <ChevronRight className="h-3 w-3 text-text-muted" />
              <span className="text-text-secondary">{item.title}</span>
            </>
          )}
        </div>

        <header className="mb-10 border-b border-border pb-8">
          <h1 className="text-[clamp(34px,4.4vw,52px)] font-extrabold leading-[1.02] tracking-[-0.045em]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-text-secondary">
              {description}
            </p>
          )}
          {actions && <div className="mt-6 flex flex-wrap gap-2">{actions}</div>}
        </header>

        <div className="prose max-w-3xl">{children}</div>

        <Pager href={href} />

        <div className="mt-10 border-t border-border pt-6 font-mono text-[10.5px] uppercase tracking-[0.16em] text-text-muted">
          <a
            href={`https://github.com/infiniflop/infiniview-docs/edit/main/${editPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-lime"
          >
            Edit on GitHub
          </a>
        </div>
      </article>

      <aside className="hidden xl:block">
        <div className="sticky top-[calc(var(--topbar-h)+24px)]">
          <OnThisPage items={toc} />
        </div>
      </aside>
    </div>
  );
}
