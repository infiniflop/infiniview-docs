import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "Billing & plans",
  description:
    "Plans, plan status, checkout, and upgrades. Infiniview bills per account; checkout runs through an in-app overlay.",
};

export default function BillingPage() {
  return (
    <DocPage
      href="/billing"
      title="Billing & plans"
      description="Infiniview bills per account. Plan tier governs concurrency, monthly scan budget, and which scanners and runtime agents are available."
      toc={[
        { id: "plans", title: "Plans", depth: 2 },
        { id: "status", title: "Reading plan status", depth: 2 },
        { id: "checkout", title: "Starting checkout", depth: 2 },
        { id: "upgrades", title: "Upgrades and downgrades", depth: 2 },
        { id: "cancel", title: "Cancellation", depth: 2 },
        { id: "endpoints", title: "Endpoints", depth: 2 },
      ]}
    >
      <h2 id="plans" className="anchor-target">
        Plans
      </h2>
      <p>
        Three plan tiers ship today. The Settings page in the dashboard shows the exact limits for your account at any time — they may move as the product evolves, so this page only lists the dimensions that are durable across tiers.
      </p>
      <table>
        <thead>
          <tr>
            <th>Dimension</th>
            <th>What it controls</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monthly scan budget</td>
            <td>How many scans the account can complete per billing month before manual-trigger rate limiting tightens.</td>
          </tr>
          <tr>
            <td>Concurrent scans</td>
            <td>How many scan runs may execute simultaneously per account.</td>
          </tr>
          <tr>
            <td>Scanner set</td>
            <td>Default-enabled scanners are available on every tier; opt-in and license-gated scanners are tier-dependent.</td>
          </tr>
          <tr>
            <td>Runtime agent set</td>
            <td>Specific runtime agents (verification, interaction testing, exploit confirmation) may be tier-gated.</td>
          </tr>
          <tr>
            <td>Evidence retention</td>
            <td>How long replay artifacts and proof bundles are retained after a scan completes.</td>
          </tr>
          <tr>
            <td>Email completion alerts</td>
            <td>Tier-dependent — toggle from Settings.</td>
          </tr>
        </tbody>
      </table>

      <Callout tone="info">
        The dashboard always shows your live plan and remaining budget. The API surface below mirrors the same numbers programmatically.
      </Callout>

      <h2 id="status" className="anchor-target">
        Reading plan status
      </h2>
      <p>
        <code>GET /api/billing/status</code> returns the current plan, billing-cycle window, and remaining scan budget for the signed-in account.
      </p>
      <pre><code>{`GET /api/billing/status

{
  "planKey": "team",            // free | team | enterprise (example values)
  "status": "active",            // active | trialing | past_due | canceled
  "currentPeriodEnd": "...",
  "scanBudget": { "used": 42, "limit": 200 },
  "concurrency": { "active": 1, "limit": 3 }
}`}</code></pre>

      <h2 id="checkout" className="anchor-target">
        Starting checkout
      </h2>
      <p>
        The dashboard launches checkout via an in-app overlay rather than a hosted redirect. Posting to the checkout-session endpoint returns a single-use URL the overlay opens.
      </p>
      <pre><code>{`POST /api/billing/checkout-session
{ "planKey": "team" }

# 200 OK
{ "url": "https://checkout.infiniview.dev/..." }   # opened in the overlay`}</code></pre>
      <p>
        The endpoint is rate-limited to 5 requests per 60 seconds per account. The returned URL is short-lived; request a new session if it expires.
      </p>

      <h2 id="upgrades" className="anchor-target">
        Upgrades and downgrades
      </h2>
      <ul>
        <li>
          <strong>Upgrades</strong> take effect immediately. New scanners and runtime agents become available on the next scan; existing snapshots keep the configuration they were launched with.
        </li>
        <li>
          <strong>Downgrades</strong> take effect at the end of the current billing period. Disabled scanners stop running on the next scan after the period flips.
        </li>
        <li>
          A downgrade that drops below your active concurrent-scan count is allowed — in-flight runs finish, but newly queued runs respect the new limit.
        </li>
      </ul>

      <h2 id="cancel" className="anchor-target">
        Cancellation
      </h2>
      <p>
        Cancel from Settings &gt; Billing in the dashboard. The cancellation closes at the end of the current billing period and your data remains accessible (read-only) for the retention window listed in your plan. New scans cannot be launched after cancellation takes effect.
      </p>

      <h2 id="endpoints" className="anchor-target">
        Endpoints
      </h2>
      <pre><code>{`GET  /api/billing/status               # current plan and usage
POST /api/billing/checkout-session     # { planKey } · 5/60s`}</code></pre>
      <p>
        For the full API surface, see the <Link href="/api">API reference</Link>.
      </p>
    </DocPage>
  );
}
