import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "Compare, trust & readiness",
  description:
    "Three companion views answer: what changed, how reliable is this scan, and can I rerun?",
};

export default function TrustPage() {
  return (
    <DocPage
      href="/trust"
      title="Compare, trust & readiness"
      description="Three companion views answer: what changed, how reliable is this scan, and can I rerun?"
      toc={[
        { id: "compare", title: "Compare", depth: 2 },
        { id: "trust", title: "Trust", depth: 2 },
        { id: "labels", title: "Trust labels", depth: 2 },
        { id: "readiness", title: "Readiness", depth: 2 },
        { id: "degraded", title: "Degraded scans", depth: 2 },
      ]}
    >
      <h2 id="compare" className="anchor-target">
        Compare
      </h2>
      <p>
        Compare answers <em>what changed</em> against the prior successful scan on the same target. It surfaces baseline counts plus delta movement (<code>new</code>, <code>recurring</code>, <code>regressed</code>, <code>fixed</code>, <code>suppressed</code>) so you can read churn at a glance.
      </p>
      <pre><code>{`GET /api/scan-runs/{id}/compare`}</code></pre>

      <h2 id="trust" className="anchor-target">
        Trust
      </h2>
      <p>Trust explains <em>how reliable</em> the run is. It carries:</p>
      <ul>
        <li>Score (0–100) and label.</li>
        <li>Verification mix — verified vs unverified findings.</li>
        <li>Skipped scanners and the reason each was skipped.</li>
        <li>Replay readiness for runtime-discovered issues.</li>
        <li>Coverage gaps (missing credentials, sandbox limits, build failures).</li>
        <li>Recommended follow-up actions.</li>
      </ul>
      <pre><code>{`GET /api/scan-runs/{id}/trust`}</code></pre>

      <h2 id="labels" className="anchor-target">
        Trust labels
      </h2>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Score</th>
            <th>What it means</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>strong</code>
            </td>
            <td>≥ 80</td>
            <td>Full coverage; verified findings present where applicable.</td>
          </tr>
          <tr>
            <td>
              <code>moderate</code>
            </td>
            <td>≥ 55</td>
            <td>Some scanners skipped or runtime testing limited.</td>
          </tr>
          <tr>
            <td>
              <code>limited</code>
            </td>
            <td>&lt; 55</td>
            <td>Substantial coverage gaps; treat findings as a starting point.</td>
          </tr>
          <tr>
            <td>
              <code>degraded</code>
            </td>
            <td>—</td>
            <td>Coverage was reduced enough that the run is annotated as degraded.</td>
          </tr>
        </tbody>
      </table>

      <Callout tone="info">
        Trust gaps are typed: <code>scanner_skipped</code>, <code>runtime_not_tested</code>, <code>replay_unavailable</code>, and <code>degraded</code>. Each gap names the affected tool or capability so you know what to fix before rerunning.
      </Callout>

      <h2 id="readiness" className="anchor-target">
        Readiness
      </h2>
      <p>
        Readiness answers <em>can I rerun</em>. Review detail surfaces a rerun affordance only when readiness is positive: GitHub access reachable, env-var signals present, supported app type, and replay prerequisites met.
      </p>
      <pre><code>{`POST /api/reviews/{id}/rerun`}</code></pre>

      <h2 id="degraded" className="anchor-target">
        Degraded scans
      </h2>
      <p>
        A scan completes <strong>degraded</strong> when it ran with limited coverage. Findings still persist, but trust drops and the run should be reviewed for skipped scanners, coverage gaps, missing secrets, or sandbox limitations. Use <Link href="/configuration#secrets">repo secrets</Link> to fix missing credentials before rerunning.
      </p>
    </DocPage>
  );
}
