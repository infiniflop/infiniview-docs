import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "API reference",
  description:
    "Every API route Infiniview exposes, in one place.",
};

type Endpoint = { method: string; path: string; note?: string };
type Group = { id: string; title: string; intro?: string; endpoints: Endpoint[] };

const groups: Group[] = [
  {
    id: "health",
    title: "Health",
    endpoints: [
      { method: "GET", path: "/api/health" },
      { method: "GET", path: "/api/health/readiness" },
    ],
  },
  {
    id: "github",
    title: "GitHub",
    intro: "OAuth handshake, repo discovery, and the signed webhook receiver.",
    endpoints: [
      { method: "GET", path: "/api/github/connect" },
      { method: "GET", path: "/api/github/callback" },
      { method: "GET", path: "/api/github/disconnect" },
      { method: "GET", path: "/api/github/repos" },
      { method: "POST", path: "/api/github/webhook" },
    ],
  },
  {
    id: "reviews",
    title: "Reviews",
    intro:
      "Manage reviews and their related views. DELETE archives by default; dev mode can hard-delete.",
    endpoints: [
      { method: "GET", path: "/api/reviews" },
      { method: "POST", path: "/api/reviews" },
      { method: "GET", path: "/api/reviews/{id}" },
      { method: "PATCH", path: "/api/reviews/{id}" },
      { method: "DELETE", path: "/api/reviews/{id}", note: "archive (default) or hard delete (dev)" },
      { method: "GET", path: "/api/reviews/{id}/story-insights" },
      { method: "GET", path: "/api/reviews/{id}/readiness" },
      { method: "POST", path: "/api/reviews/{id}/rerun" },
    ],
  },
  {
    id: "scan-runs",
    title: "Scan runs",
    endpoints: [
      { method: "GET", path: "/api/scan-runs" },
      { method: "GET", path: "/api/scan-runs/{id}" },
      { method: "DELETE", path: "/api/scan-runs/{id}" },
      { method: "GET", path: "/api/scan-runs/{id}/progress" },
      { method: "GET", path: "/api/scan-runs/{id}/live" },
      { method: "GET", path: "/api/scan-runs/{id}/csv" },
      { method: "GET", path: "/api/scan-runs/{id}/compare" },
      { method: "GET", path: "/api/scan-runs/{id}/trust" },
    ],
  },
  {
    id: "findings",
    title: "Findings",
    endpoints: [
      { method: "GET", path: "/api/security-findings" },
      { method: "GET", path: "/api/security-findings/{id}" },
      { method: "PATCH", path: "/api/security-findings/{id}" },
      { method: "GET", path: "/api/security-findings/{id}/replay" },
      { method: "GET", path: "/api/security-findings/{id}/bundle" },
      { method: "GET", path: "/api/security-findings/export" },
    ],
  },
  {
    id: "config",
    title: "Configuration",
    endpoints: [
      { method: "GET", path: "/api/scan-config" },
      { method: "PUT", path: "/api/scan-config" },
      { method: "POST", path: "/api/validate-infiniview-yml" },
      { method: "GET", path: "/api/settings" },
      { method: "PUT", path: "/api/settings" },
      { method: "GET", path: "/api/repo-secrets" },
      { method: "POST", path: "/api/repo-secrets" },
      { method: "DELETE", path: "/api/repo-secrets/{id}" },
    ],
  },
  {
    id: "suppressions",
    title: "Suppressions",
    endpoints: [
      { method: "GET", path: "/api/finding-suppressions" },
      { method: "POST", path: "/api/finding-suppressions" },
      { method: "DELETE", path: "/api/finding-suppressions/{id}" },
    ],
  },
  {
    id: "billing",
    title: "Billing",
    endpoints: [
      { method: "POST", path: "/api/billing/checkout-session" },
      { method: "GET", path: "/api/billing/status" },
      { method: "POST", path: "/api/billing/webhook" },
    ],
  },
];

const methodColor: Record<string, string> = {
  GET: "text-cyan",
  POST: "text-lime",
  PUT: "text-amber",
  PATCH: "text-amber",
  DELETE: "text-red",
};

export default function ApiPage() {
  return (
    <DocPage
      href="/api"
      title="API reference"
      description="Every API route Infiniview exposes, in one place."
      toc={groups.map((g) => ({ id: g.id, title: g.title, depth: 2 }))}
    >
      <Callout tone="info">
        Authentication uses the dashboard session unless noted otherwise. The GitHub webhook receiver verifies signatures from GitHub and rejects anything else.
      </Callout>

      {groups.map((group) => (
        <div key={group.id}>
          <h2 id={group.id} className="anchor-target">
            {group.title}
          </h2>
          {group.intro && <p>{group.intro}</p>}
          <div className="not-prose mt-4 border border-border">
            {group.endpoints.map((ep, i) => (
              <div
                key={`${ep.method}-${ep.path}-${i}`}
                className="grid grid-cols-[80px_1fr] items-center gap-3 border-t border-border px-4 py-2.5 first:border-t-0 sm:grid-cols-[80px_1fr_auto]"
              >
                <span
                  className={`font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] ${methodColor[ep.method] ?? "text-text-secondary"}`}
                >
                  {ep.method}
                </span>
                <code className="font-mono text-[12.5px] text-text">{ep.path}</code>
                {ep.note && (
                  <span className="font-mono text-[10.5px] text-text-muted sm:text-right">
                    {ep.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </DocPage>
  );
}
