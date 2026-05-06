import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "Exports & proof bundles",
  description:
    "CSV exports, replay artifacts, and proof bundles produce the handoff artifacts you need to triage outside the dashboard.",
};

const csvColumns = [
  "findingId",
  "reviewId",
  "scanRunId",
  "severity",
  "category",
  "exploitability",
  "confidence",
  "priorityScore",
  "title",
  "description",
  "fingerprint",
  "primaryFile",
  "lineStart",
  "lineEnd",
  "sourcePhase",
  "scannerName",
  "ruleId",
  "deltaStatus",
  "suppressed",
  "suppressionScope",
  "createdAt",
];

export default function ExportsPage() {
  return (
    <DocPage
      href="/exports"
      title="Exports & proof bundles"
      description="CSV exports, replay artifacts, and proof bundles produce the handoff artifacts you need to triage outside the dashboard."
      toc={[
        { id: "run-csv", title: "Run CSV", depth: 2 },
        { id: "backlog-csv", title: "Backlog CSV", depth: 2 },
        { id: "columns", title: "CSV columns", depth: 2 },
        { id: "replay", title: "Replay artifacts", depth: 2 },
        { id: "proof-bundle", title: "Proof bundle", depth: 2 },
        { id: "summary", title: "Summary", depth: 2 },
      ]}
    >
      <h2 id="run-csv" className="anchor-target">
        Run CSV
      </h2>
      <p>
        Exports the persisted findings for one owned scan run. Available once the run reaches a terminal status (<code>completed</code>, <code>degraded</code>, <code>blocked</code>, or <code>failed</code>).
      </p>
      <pre><code>{`GET /api/scan-runs/{id}/csv
# filename: infiniview-scan-run-{id}-findings.csv`}</code></pre>

      <h2 id="backlog-csv" className="anchor-target">
        Backlog CSV
      </h2>
      <p>
        Exports the filtered findings backlog for the signed-in user. Same shape as the per-run CSV, but spans every owned run.
      </p>
      <pre><code>{`GET /api/security-findings/export?scope=active|archived|all
                                  &reviewId=...&scanRunId=...
# filename: infiniview-security-findings.csv`}</code></pre>
      <Callout tone="info">
        <code>scope=active</code> is the default: it excludes findings from archived reviews. Use <code>scope=all</code> when you need a complete dump across active and archived runs.
      </Callout>

      <h2 id="columns" className="anchor-target">
        CSV columns
      </h2>
      <p>Both CSV exports share the same columns, in this order:</p>
      <div className="not-prose mt-3 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3">
        {csvColumns.map((c) => (
          <div key={c} className="bg-bg-card px-3 py-2 font-mono text-[11px] text-text-secondary">
            {c}
          </div>
        ))}
      </div>

      <h2 id="replay" className="anchor-target">
        Replay artifacts
      </h2>
      <p>Returns the latest replay artifact for a finding when one exists.</p>
      <pre><code>{`GET /api/security-findings/{id}/replay`}</code></pre>

      <h2 id="proof-bundle" className="anchor-target">
        Proof bundle
      </h2>
      <p>
        Packages identity, location, replay data, proof-of-concept variants, and expected behavior into a single bundle. Useful for handing off to engineering or filing an issue.
      </p>
      <pre><code>{`GET /api/security-findings/{id}/bundle`}</code></pre>

      <h2 id="summary" className="anchor-target">
        Summary
      </h2>
      <table>
        <thead>
          <tr>
            <th>Artifact</th>
            <th>Endpoint</th>
            <th>What it contains</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Run CSV</td>
            <td>
              <code>/api/scan-runs/&#123;id&#125;/csv</code>
            </td>
            <td>One row per finding for one owned scan run.</td>
          </tr>
          <tr>
            <td>Backlog CSV</td>
            <td>
              <code>/api/security-findings/export</code>
            </td>
            <td>Filtered backlog for the signed-in user.</td>
          </tr>
          <tr>
            <td>Replay</td>
            <td>
              <code>/api/security-findings/&#123;id&#125;/replay</code>
            </td>
            <td>Latest replay artifact for one finding.</td>
          </tr>
          <tr>
            <td>Bundle</td>
            <td>
              <code>/api/security-findings/&#123;id&#125;/bundle</code>
            </td>
            <td>Identity, location, replay, PoC, expected behavior.</td>
          </tr>
        </tbody>
      </table>
    </DocPage>
  );
}
