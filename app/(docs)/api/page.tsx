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
  const toc = [
    { id: "conventions", title: "Conventions", depth: 2 as const },
    { id: "errors", title: "Errors", depth: 2 as const },
    { id: "pagination", title: "Pagination", depth: 2 as const },
    { id: "rate-limits", title: "Rate limits", depth: 2 as const },
    ...groups.map((g) => ({ id: g.id, title: g.title, depth: 2 as const })),
  ];

  return (
    <DocPage
      href="/api"
      title="API reference"
      description="Every API route a user can call. Authentication uses the dashboard session unless noted."
      toc={toc}
    >
      <Callout tone="info">
        Authentication uses the dashboard session unless an endpoint is explicitly marked otherwise. The GitHub webhook receiver verifies signatures from GitHub and rejects anything else. Rate limits are per-user per bucket. All annotated rate limits use the format <code>N/Ws</code> — N requests per W seconds.
      </Callout>

      <h2 id="conventions" className="anchor-target">
        Conventions
      </h2>
      <ul>
        <li>
          <strong>Base URL.</strong> All endpoints are relative to <code>https://app.infiniview.dev</code>.
        </li>
        <li>
          <strong>Content type.</strong> Request and response bodies are JSON unless the endpoint advertises another type — CSV exports return <code>text/csv</code>, live progress streams return <code>text/event-stream</code>.
        </li>
        <li>
          <strong>Authentication.</strong> Endpoints use the dashboard session cookie. Two endpoints are public: <code>GET /api/health</code> and <code>POST /api/validate-infiniview-yml</code>.
        </li>
        <li>
          <strong>Idempotency.</strong> Mutations are not idempotent unless an endpoint says so. The GitHub webhook receiver deduplicates by <code>X-GitHub-Delivery</code>.
        </li>
        <li>
          <strong>Timestamps.</strong> ISO 8601 in UTC, ending with <code>Z</code>.
        </li>
      </ul>

      <h2 id="errors" className="anchor-target">
        Errors
      </h2>
      <p>
        Error responses share a single shape. The <code>code</code> is stable, the <code>message</code> is human-readable, and <code>details</code> may carry field-level validation errors.
      </p>
      <pre><code>{`{
  "error": {
    "code": "validation_failed",
    "message": "Invalid request body.",
    "details": {
      "branch": ["must be a non-empty string"]
    }
  }
}`}</code></pre>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>400</code></td>
            <td>Request body or query parameters failed validation.</td>
          </tr>
          <tr>
            <td><code>401</code></td>
            <td>Session missing or expired. Sign in again from the dashboard.</td>
          </tr>
          <tr>
            <td><code>403</code></td>
            <td>You don&rsquo;t own the requested resource, or the capability is gated by plan.</td>
          </tr>
          <tr>
            <td><code>404</code></td>
            <td>Resource doesn&rsquo;t exist or isn&rsquo;t visible to you.</td>
          </tr>
          <tr>
            <td><code>409</code></td>
            <td>State conflict — for example, asking for a run CSV before the run reaches a terminal status.</td>
          </tr>
          <tr>
            <td><code>422</code></td>
            <td>Request was well-formed but referenced unknown scanner IDs or invalid threshold values.</td>
          </tr>
          <tr>
            <td><code>429</code></td>
            <td>Bucket exhausted. See the <code>Retry-After</code> header.</td>
          </tr>
          <tr>
            <td><code>5xx</code></td>
            <td>Server-side error. The dashboard surfaces a banner; retries are safe for idempotent reads.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="pagination" className="anchor-target">
        Pagination
      </h2>
      <p>
        List endpoints accept <code>?page</code> (1-indexed) and <code>?perPage</code>. Defaults and caps vary by endpoint:
      </p>
      <table>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Default</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Scan runs</td><td>20</td><td>100</td></tr>
          <tr><td>Findings</td><td>20</td><td>500</td></tr>
          <tr><td>Suppressions</td><td>20</td><td>100</td></tr>
          <tr><td>Reviews</td><td>20</td><td>100</td></tr>
        </tbody>
      </table>
      <p>
        Responses include <code>page</code>, <code>perPage</code>, <code>total</code>, and a <code>hasMore</code> flag where applicable.
      </p>

      <h2 id="rate-limits" className="anchor-target">
        Rate limits
      </h2>
      <p>
        Limits are per signed-in user, per route bucket. When a bucket is exhausted, the API returns <code>429</code> with a <code>Retry-After</code> header containing the number of seconds before another request will succeed. Bucketed endpoints are flagged in the tables below — anything without a rate-limit note shares the global account quota.
      </p>
      <ul>
        <li><strong>5/60s</strong> — review creation, billing checkout.</li>
        <li><strong>10/60s</strong> — reruns, repo-secret writes, suppression deletes.</li>
      </ul>

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
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-1 border-t border-border px-3 py-2.5 first:border-t-0 sm:grid-cols-[80px_1fr_auto] sm:px-4"
              >
                <span
                  className={`font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] ${methodColor[ep.method] ?? "text-text-secondary"}`}
                >
                  {ep.method}
                </span>
                <code className="font-mono text-[11.5px] text-text break-all sm:text-[12.5px] sm:break-normal">{ep.path}</code>
                {ep.note && (
                  <span className="col-span-full font-mono text-[10.5px] text-text-muted sm:col-span-1 sm:text-right">
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
