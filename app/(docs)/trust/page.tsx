import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";

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
        { id: "readiness", title: "Readiness", depth: 2 },
        { id: "degraded", title: "Degraded scans", depth: 2 },
      ]}
    >
      <h2 id="compare" className="anchor-target">
        Compare
      </h2>
      <p>
        Compare answers <em>what changed</em> against the prior successful scan on the same target. It surfaces baseline, new, regressed, fixed, recurring, and suppressed counts plus highlighted movement so you can read churn at a glance.
      </p>
      <pre><code>{`GET /api/scan-runs/{id}/compare`}</code></pre>

      <h2 id="trust" className="anchor-target">
        Trust
      </h2>
      <p>
        Trust explains <em>how reliable</em> the run is. It carries:
      </p>
      <ul>
        <li>Score and label.</li>
        <li>Verification mix — verified vs unverified findings.</li>
        <li>Skipped scanners and the reason each was skipped.</li>
        <li>Replay readiness for runtime-discovered issues.</li>
        <li>Coverage gaps (missing credentials, sandbox limits, build failures).</li>
        <li>Recommended follow-up actions.</li>
      </ul>
      <pre><code>{`GET /api/scan-runs/{id}/trust`}</code></pre>

      <h2 id="readiness" className="anchor-target">
        Readiness
      </h2>
      <p>
        Readiness answers <em>can I rerun</em>. The endpoint checks GitHub access, missing env-var signals, scanner gaps, replay prerequisites, and whether rerun is available. The dashboard surfaces rerun affordance only when readiness is positive.
      </p>
      <pre><code>{`GET  /api/reviews/{id}/readiness
POST /api/reviews/{id}/rerun`}</code></pre>

      <h2 id="degraded" className="anchor-target">
        Degraded scans
      </h2>
      <p>
        A scan completes <strong>degraded</strong> when it ran with limited coverage. Findings still persist, but trust drops and the run should be reviewed for skipped scanners, coverage gaps, missing secrets, or sandbox limitations. Use the <Link href="/configuration#secrets">repo secrets</Link> page to fix missing credentials before rerunning.
      </p>
    </DocPage>
  );
}
