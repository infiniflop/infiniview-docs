import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "Findings & evidence",
  description:
    "Each finding carries enough context to decide without guessing: identity, location, evidence, replay, delta, and suppression state.",
};

export default function FindingsPage() {
  return (
    <DocPage
      href="/findings"
      title="Findings & evidence"
      description="Each finding carries enough context to decide without guessing: identity, location, evidence, replay, delta, and suppression state."
      toc={[
        { id: "anatomy", title: "Anatomy of a finding", depth: 2 },
        { id: "severity", title: "Severity & merge blocking", depth: 2 },
        { id: "delta", title: "Delta state", depth: 2 },
        { id: "verified", title: "Exploitability", depth: 2 },
        { id: "evidence", title: "Evidence & replay", depth: 2 },
        { id: "suppressions", title: "Suppressions", depth: 2 },
      ]}
    >
      <h2 id="anatomy" className="anchor-target">
        Anatomy of a finding
      </h2>
      <p>Each persisted finding carries:</p>
      <ul>
        <li>Severity, category, confidence, exploitability, and source phase.</li>
        <li>Stable fingerprint, primary file, line range, scanner, and rule metadata.</li>
        <li>Title, description, attack path, affected files, evidence, and remediation guidance.</li>
        <li>Runtime replay, interaction replay, proof-of-concept, and bundle artifacts when present.</li>
        <li>Delta state: <code>new</code>, <code>recurring</code>, <code>regressed</code>, <code>fixed</code>, or <code>suppressed</code>.</li>
        <li>Repo-scoped or user-scoped suppression memory.</li>
      </ul>

      <h2 id="severity" className="anchor-target">
        Severity & merge blocking
      </h2>
      <p>Severity is one of:</p>
      <table>
        <thead>
          <tr>
            <th>Severity</th>
            <th>Effect on PR check</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>critical</code>
            </td>
            <td>Blocks merge.</td>
          </tr>
          <tr>
            <td>
              <code>high</code>
            </td>
            <td>Blocks merge.</td>
          </tr>
          <tr>
            <td>
              <code>medium</code>
            </td>
            <td>Reported, non-blocking.</td>
          </tr>
          <tr>
            <td>
              <code>low</code>
            </td>
            <td>Reported, non-blocking.</td>
          </tr>
          <tr>
            <td>
              <code>info</code>
            </td>
            <td>Reported, non-blocking. Excluded from the unique-vulnerabilities count on the dashboard overview.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Set the minimum severity persisted to findings via <Link href="/configuration">scan configuration</Link>’s severity threshold.
      </p>

      <h2 id="delta" className="anchor-target">
        Delta state
      </h2>
      <p>
        Delta is computed against the previous successful scan on the same target. Each finding is exactly one of:
      </p>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>new</code>
            </td>
            <td>Fingerprint not seen on the prior scan.</td>
          </tr>
          <tr>
            <td>
              <code>recurring</code>
            </td>
            <td>Same fingerprint as prior scan, comparable severity.</td>
          </tr>
          <tr>
            <td>
              <code>regressed</code>
            </td>
            <td>Same fingerprint as prior scan, but severity or exploitability worsened.</td>
          </tr>
          <tr>
            <td>
              <code>fixed</code>
            </td>
            <td>Present on the prior scan, absent on this one.</td>
          </tr>
          <tr>
            <td>
              <code>suppressed</code>
            </td>
            <td>An active suppression (repo-scoped or user-scoped) hides this fingerprint.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="verified" className="anchor-target">
        Exploitability
      </h2>
      <p>Each finding has one of three exploitability states:</p>
      <ul>
        <li>
          <code>verified</code> — confirmed through runtime or interaction testing. Stronger than a static-only hit.
        </li>
        <li>
          <code>unverified</code> — reported by analysis but not confirmed runtime-side.
        </li>
        <li>
          <code>not_tested</code> — runtime testing didn’t reach this surface (for example, missing credentials, the app couldn’t be served, or the relevant runtime agent was disabled).
        </li>
      </ul>

      <Callout tone="info">
        Trust score weights verified findings differently from unverified ones. See <Link href="/trust">Trust &amp; readiness</Link>.
      </Callout>

      <h2 id="evidence" className="anchor-target">
        Evidence & replay
      </h2>
      <p>
        Where applicable, a finding includes a replay artifact and a downloadable proof bundle. The bundle packages identity, location, replay data, proof-of-concept variants, and expected behavior into a single export — useful for handing off to engineering or filing an issue.
      </p>
      <pre><code>{`GET /api/security-findings/{id}/replay   # latest replay artifact
GET /api/security-findings/{id}/bundle   # proof bundle`}</code></pre>

      <h2 id="suppressions" className="anchor-target">
        Suppressions
      </h2>
      <p>Suppressions are fingerprint-based:</p>
      <ul>
        <li>
          <strong>Repo scope</strong> — hides the finding only for that repository.
        </li>
        <li>
          <strong>User scope</strong> — applies across that user’s matching findings, regardless of repo.
        </li>
      </ul>
      <p>
        When multiple suppressions match the same fingerprint, the most recent one wins. Deleting a suppression restores the finding presentation without touching history.
      </p>
      <pre><code>{`GET    /api/finding-suppressions          # paginated; max 100/page
POST   /api/finding-suppressions          # { query, scope, reviewId?, scanRunId?, repoFullName? }
DELETE /api/finding-suppressions/{id}     # 204 on success`}</code></pre>
    </DocPage>
  );
}
