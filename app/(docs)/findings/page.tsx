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
        { id: "delta", title: "Delta state", depth: 2 },
        { id: "verified", title: "Verified vs unverified", depth: 2 },
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
        <li>Attack path, affected files, evidence, suggested fix, and parsed fix prompt.</li>
        <li>Runtime replay, interaction replay, proof-of-concept, and bundle artifacts when present.</li>
        <li>Delta state: new, recurring, regressed, fixed, or suppressed.</li>
        <li>Repo-scoped or user-scoped suppression memory.</li>
      </ul>

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
            <td>Active suppression (repo-scoped or user-scoped) hides this fingerprint.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="verified" className="anchor-target">
        Verified vs unverified
      </h2>
      <p>
        A <strong>verified</strong> finding was confirmed through runtime or interaction testing. It&rsquo;s stronger than an unverified static hit, but you should still inspect the evidence and trust context before prioritizing work.
      </p>

      <Callout tone="info">
        Trust score weights verified findings differently from unverified ones. See <Link href="/trust">Trust &amp; readiness</Link>.
      </Callout>

      <h2 id="suppressions" className="anchor-target">
        Suppressions
      </h2>
      <p>
        Suppressions are fingerprint-based:
      </p>
      <ul>
        <li>
          <strong>Repo scope</strong> — hides the finding only for that repository.
        </li>
        <li>
          <strong>User scope</strong> — applies across that user&rsquo;s matching findings, regardless of repo.
        </li>
      </ul>
      <p>
        Deleting the suppression restores the finding presentation without deleting history.
      </p>
      <pre><code>{`GET    /api/finding-suppressions
POST   /api/finding-suppressions
DELETE /api/finding-suppressions/{id}`}</code></pre>
    </DocPage>
  );
}
