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
    intro:
      "Public health probe. Returns 200 with status ok or 503 with status degraded.",
    endpoints: [{ method: "GET", path: "/api/health" }],
  },
  {
    id: "github",
    title: "GitHub",
    intro:
      "OAuth handshake, repo discovery, and the signed webhook receiver.",
    endpoints: [
      { method: "GET", path: "/api/github/connect", note: "redirects to GitHub OAuth" },
      { method: "GET", path: "/api/github/callback", note: "handled by Infiniview" },
      { method: "DELETE", path: "/api/github/disconnect" },
      { method: "GET", path: "/api/github/repos", note: "?page, ?q" },
      { method: "POST", path: "/api/github/webhook", note: "signature-verified" },
    ],
  },
  {
    id: "reviews",
    title: "Reviews",
    intro:
      "Manage reviews and trigger reruns. DELETE archives by default; hard-delete is available in dev mode.",
    endpoints: [
      { method: "GET", path: "/api/reviews" },
      { method: "POST", path: "/api/reviews", note: "{ repoFullName, branch? } · 5/60s" },
      { method: "GET", path: "/api/reviews/{id}", note: "?includeOverviewStats=1" },
      { method: "PATCH", path: "/api/reviews/{id}", note: "{ name }" },
      { method: "DELETE", path: "/api/reviews/{id}", note: "?mode=hard-delete (dev only)" },
      { method: "POST", path: "/api/reviews/{id}/rerun", note: "10/60s" },
    ],
  },
  {
    id: "scan-runs",
    title: "Scan runs",
    intro:
      "Listing is paginated (default 20 per page, max 100). Live progress is delivered as Server-Sent Events.",
    endpoints: [
      { method: "GET", path: "/api/scan-runs", note: "?scope=active|archived|all" },
      { method: "GET", path: "/api/scan-runs/{id}/progress" },
      { method: "GET", path: "/api/scan-runs/{id}/live", note: "text/event-stream" },
      { method: "GET", path: "/api/scan-runs/{id}/csv" },
      { method: "GET", path: "/api/scan-runs/{id}/compare" },
      { method: "GET", path: "/api/scan-runs/{id}/trust" },
    ],
  },
  {
    id: "findings",
    title: "Findings",
    intro:
      "Listing is paginated (default 20, max 500) with filters: severity, category, exploitability, sourcePhase, reviewId, scanRunId, repoFullName, scope, q.",
    endpoints: [
      { method: "GET", path: "/api/security-findings" },
      { method: "GET", path: "/api/security-findings/{id}/replay" },
      { method: "GET", path: "/api/security-findings/{id}/bundle" },
      { method: "GET", path: "/api/security-findings/export", note: "?scope, ?reviewId, ?scanRunId" },
    ],
  },
  {
    id: "config",
    title: "Configuration",
    intro:
      "Scan configuration is gated by an account-level capability. The validation endpoint is unauthenticated.",
    endpoints: [
      { method: "GET", path: "/api/scan-config" },
      { method: "PUT", path: "/api/scan-config" },
      { method: "POST", path: "/api/validate-infiniview-yml", note: "no auth" },
      { method: "GET", path: "/api/settings" },
      { method: "PUT", path: "/api/settings" },
      { method: "GET", path: "/api/repo-secrets", note: "?repoFullName" },
      { method: "POST", path: "/api/repo-secrets", note: "{ repoFullName, key, value } · 10/60s" },
      { method: "DELETE", path: "/api/repo-secrets", note: "{ id } · 10/60s" },
    ],
  },
  {
    id: "suppressions",
    title: "Suppressions",
    intro:
      "Listing is paginated (max 100/page) with optional filters scope, repoFullName, search.",
    endpoints: [
      { method: "GET", path: "/api/finding-suppressions" },
      {
        method: "POST",
        path: "/api/finding-suppressions",
        note: "{ query, scope, reviewId?, scanRunId?, repoFullName? }",
      },
      { method: "DELETE", path: "/api/finding-suppressions/{id}", note: "10/60s" },
    ],
  },
  {
    id: "billing",
    title: "Billing",
    intro:
      "Plan status and checkout. The dashboard launches checkout via an in-app overlay.",
    endpoints: [
      { method: "GET", path: "/api/billing/status" },
      { method: "POST", path: "/api/billing/checkout-session", note: "{ planKey } · 5/60s" },
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
      description="Every API route a user can call. Authentication uses the dashboard session unless noted."
      toc={groups.map((g) => ({ id: g.id, title: g.title, depth: 2 }))}
    >
      <Callout tone="info">
        Authentication uses the dashboard session unless an endpoint is explicitly marked otherwise. The GitHub webhook receiver verifies signatures from GitHub and rejects anything else. Rate limits are per-user per bucket.
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
