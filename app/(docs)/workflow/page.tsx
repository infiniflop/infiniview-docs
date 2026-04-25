import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "Scan workflow",
  description:
    "From trigger to proof bundle. Every scan runs through the same five phases, regardless of whether it was launched from the dashboard or a pull request.",
};

const phases = [
  {
    n: "01",
    label: "Trigger",
    title: "Start from a PR, comment, rerun, or dashboard scan.",
    body: "Manual dashboard scans create reviews from a selected repo and branch. GitHub scans start from pull request webhooks or trusted bot commands. Review detail can trigger reruns when readiness says the repo is runnable.",
  },
  {
    n: "02",
    label: "Snapshot",
    title: "Scan settings are frozen at launch.",
    body: "Dashboard settings and optional .infiniview.yml values are merged into a snapshot. Changing settings mid-run affects later scans, not the active run.",
  },
  {
    n: "03",
    label: "Sandbox",
    title: "The repo is cloned, built, and tested in isolation.",
    body: "Repo secrets are decrypted server-side only for sandbox injection. Scanners and runtime agents run with coverage tracked for skipped tools, missing credentials, and degraded execution.",
  },
  {
    n: "04",
    label: "Proof",
    title: "Findings become evidence, not warning noise.",
    body: "Infiniview persists severity, category, confidence, exploitability, fingerprints, locations, evidence, artifacts, delta state, and suppression state.",
  },
  {
    n: "05",
    label: "Decide",
    title: "Compare, trust, readiness, and exports guide follow-up.",
    body: "Compare answers what changed. Trust explains run quality. Readiness identifies rerun blockers. CSV exports and proof bundles provide handoff artifacts.",
  },
];

export default function WorkflowPage() {
  return (
    <DocPage
      href="/workflow"
      title="Scan workflow"
      description="From trigger to proof bundle. Every scan runs through the same five phases, regardless of whether it was launched from the dashboard or a pull request."
      toc={[
        { id: "lifecycle", title: "Lifecycle", depth: 2 },
        { id: "snapshot-rules", title: "Snapshot rules", depth: 2 },
        { id: "sandbox-execution", title: "Sandbox execution", depth: 2 },
        { id: "rerun-eligibility", title: "Rerun eligibility", depth: 2 },
      ]}
    >
      <h2 id="lifecycle" className="anchor-target">
        Lifecycle
      </h2>
      <p>
        Each scan moves through five phases. The dashboard timeline labels each one, so you can read durations and coverage at a glance.
      </p>

      <div className="not-prose mt-6 grid gap-px border border-border bg-border">
        {phases.map((p) => (
          <div key={p.n} className="grid bg-bg md:grid-cols-[110px_1fr_1.4fr]">
            <div className="border-b border-border p-5 md:border-b-0 md:border-r">
              <div className="font-mono text-[10.5px] text-text-muted">[{p.n}]</div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-lime">
                {p.label}
              </div>
            </div>
            <div className="border-b border-border p-5 md:border-b-0 md:border-r">
              <h3 className="text-[15px] font-bold tracking-[-0.02em] text-text">{p.title}</h3>
            </div>
            <p className="p-5 text-[13.5px] leading-relaxed text-text-secondary">{p.body}</p>
          </div>
        ))}
      </div>

      <h2 id="snapshot-rules" className="anchor-target">
        Snapshot rules
      </h2>
      <p>
        At trigger time Infiniview merges your dashboard settings with the repo&rsquo;s <code>.infiniview.yml</code>, then freezes the merged result for the run. Repo config wins for overlapping fields. Once the snapshot is taken:
      </p>
      <ul>
        <li>Editing dashboard settings affects future scans, not the active run.</li>
        <li>Editing <code>.infiniview.yml</code> on the branch is reflected on the next scan triggered from that branch.</li>
        <li>Repo secrets are read at trigger time and decrypted server-side only when injected into the sandbox.</li>
      </ul>

      <h2 id="sandbox-execution" className="anchor-target">
        Sandbox execution
      </h2>
      <p>
        The repo is cloned, built, and tested inside an isolated sandbox. Static, dependency, secret, and IaC scanners run alongside runtime agents (when enabled). Coverage is tracked per-tool — skipped scanners, missing credentials, and degraded execution all show up in the run&rsquo;s trust score.
      </p>

      <Callout tone="warn" title="Unsupported apps">
        If Infiniview can&rsquo;t run the repository as a supported browser web app, the PR check completes neutrally with an <strong>Unsupported App</strong> status instead of pretending coverage exists. The <Link href="/github">GitHub automation</Link> page covers the rules.
      </Callout>

      <h2 id="rerun-eligibility" className="anchor-target">
        Rerun eligibility
      </h2>
      <p>
        Rerun is offered from review detail when readiness says the repo is runnable. Readiness checks GitHub access, missing env-var signals, scanner gaps, and replay prerequisites — see <Link href="/trust">Trust &amp; readiness</Link>.
      </p>
    </DocPage>
  );
}
