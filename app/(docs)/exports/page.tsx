import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";

export const metadata: Metadata = {
  title: "Exports & proof bundles",
  description:
    "CSV exports, replay artifacts, and proof bundles produce the handoff artifacts you need to triage outside the dashboard.",
};

export default function ExportsPage() {
  return (
    <DocPage
      href="/exports"
      title="Exports & proof bundles"
      description="CSV exports, replay artifacts, and proof bundles produce the handoff artifacts you need to triage outside the dashboard."
      toc={[
        { id: "run-csv", title: "Run CSV", depth: 2 },
        { id: "backlog-csv", title: "Backlog CSV", depth: 2 },
        { id: "replay", title: "Replay artifacts", depth: 2 },
        { id: "proof-bundle", title: "Proof bundle", depth: 2 },
      ]}
    >
      <h2 id="run-csv" className="anchor-target">
        Run CSV
      </h2>
      <p>Exports the persisted findings for a single owned scan run.</p>
      <pre><code>{`GET /api/scan-runs/{id}/csv`}</code></pre>

      <h2 id="backlog-csv" className="anchor-target">
        Backlog CSV
      </h2>
      <p>Exports the filtered findings backlog for the signed-in user — same filters as the Findings surface.</p>
      <pre><code>{`GET /api/security-findings/export`}</code></pre>

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
