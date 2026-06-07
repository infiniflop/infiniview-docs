import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "Scan workflow",
  description:
    "From trigger to proof bundle. Every scan run moves through the same pipeline whether it was launched from the dashboard or a pull request.",
};

const phases = [
  {
    id: "setup",
    label: "Setup",
    body: "Prepare environment and load configuration.",
  },
  {
    id: "graph-build",
    label: "Graph build",
    body: "Parse the codebase and build the security knowledge graph.",
  },
  {
    id: "scanning",
    label: "Scanning",
    body: "Run security scanners against the codebase.",
  },
  {
    id: "analysis",
    label: "Analysis",
    body: "Analyze code changes and correlate findings.",
  },
  {
    id: "review",
    label: "Review",
    body: "Review code for quality and security issues.",
  },
  {
    id: "testing",
    label: "Testing",
    body: "Test application flows and interactions in a sandboxed browser when supported.",
  },
  {
    id: "reporting",
    label: "Report",
    body: "Generate the findings report and recommendations.",
  },
];

const statuses = [
  { id: "queued", label: "queued", body: "Scan run accepted; waiting for a worker." },
  { id: "running", label: "running", body: "Pipeline in progress; live events stream to the UI." },
  { id: "completed", label: "completed", body: "Pipeline finished with full coverage." },
  {
    id: "degraded",
    label: "degraded",
    body: "Pipeline finished with reduced coverage. Findings still persist; trust drops and the run is annotated.",
  },
  {
    id: "blocked",
    label: "blocked",
    body: "Pipeline stopped before scanning. Most common cause: the repository is not a supported browser web app.",
  },
  { id: "failed", label: "failed", body: "Pipeline could not complete. The run records the error." },
];

export default function WorkflowPage() {
  return (
    <DocPage
      href="/workflow"
      title="Scan workflow"
      description="From trigger to proof bundle. Every scan run moves through the same pipeline whether it was launched from the dashboard or a pull request."
      toc={[
        { id: "trigger", title: "Triggering a scan run", depth: 2 },
        { id: "phases", title: "Pipeline phases", depth: 2 },
        { id: "snapshot", title: "Snapshot rules", depth: 2 },
        { id: "live", title: "Live progress", depth: 2 },
        { id: "statuses", title: "Run statuses", depth: 2 },
        { id: "rerun", title: "Reruns", depth: 2 },
      ]}
    >
      <h2 id="trigger" className="anchor-target">
        Triggering a scan run
      </h2>
      <p>You have four ways to start a scan run:</p>
      <ul>
        <li>
          <strong>Dashboard</strong> — choose a repo and branch from Reviews to create a review and start its first run.
        </li>
        <li>
          <strong>Pull request</strong> — open a PR or move it from draft to ready. The auto-review rules in <Link href="/github">Settings</Link> decide whether Infiniview runs.
        </li>
        <li>
          <strong>PR comment</strong> — post <code>@infiniview review</code> on a PR you’re trusted on.
        </li>
        <li>
          <strong>Rerun</strong> — from review detail, when readiness allows it.
        </li>
      </ul>

      <h2 id="phases" className="anchor-target">
        Pipeline phases
      </h2>
      <p>
        The dashboard timeline labels each phase. Most scans pass through every phase; runtime testing is skipped for repositories that can’t be served as a browser web app.
      </p>

      <div className="not-prose mt-6 grid gap-px border border-border bg-border">
        {phases.map((p, i) => (
          <div key={p.id} className="grid bg-bg md:grid-cols-[110px_180px_1fr]">
            <div className="border-b border-border p-5 md:border-b-0 md:border-r">
              <div className="font-mono text-[10.5px] text-text-muted">[{String(i + 1).padStart(2, "0")}]</div>
            </div>
            <div className="border-b border-border p-5 md:border-b-0 md:border-r">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime">{p.label}</div>
            </div>
            <p className="p-5 text-[13.5px] leading-relaxed text-text-secondary">{p.body}</p>
          </div>
        ))}
      </div>

      <h2 id="snapshot" className="anchor-target">
        Snapshot rules
      </h2>
      <p>
        At trigger time, Infiniview merges your dashboard configuration with the repo’s <code>.infiniview.yml</code> and freezes the merged result onto the run. Repo config wins for overlapping fields. Once the snapshot is taken:
      </p>
      <ul>
        <li>Editing dashboard settings affects future scans, not the active run.</li>
        <li>Editing <code>.infiniview.yml</code> on the branch is reflected on the next scan triggered from that branch.</li>
        <li>Repo secrets are decrypted server-side only when injected into the sandbox at scan time.</li>
        <li>Unknown or stale scanner IDs in your snapshot are auto-reconciled against the current scanner manifest.</li>
      </ul>

      <Callout tone="info" title="Adaptive analysis">
        Scan budgets adapt to the size and complexity of the repo. A small project finishes well under the wall-clock cap; a large monorepo gets the full budget. The maximum is one hour per run.
      </Callout>

      <h2 id="live" className="anchor-target">
        Live progress
      </h2>
      <p>
        While a scan is in progress, the run detail page streams updates over Server-Sent Events. The stream emits an initial snapshot, incremental events, and a final snapshot when the run reaches a terminal status.
      </p>
      <pre><code>{`GET /api/scan-runs/{id}/live      # text/event-stream
GET /api/scan-runs/{id}/progress  # one-shot status poll`}</code></pre>

      <h2 id="statuses" className="anchor-target">
        Run statuses
      </h2>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((s) => (
            <tr key={s.id}>
              <td>
                <code>{s.label}</code>
              </td>
              <td>{s.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Callout tone="warn" title="Unsupported apps">
        If Infiniview can’t run the repository as a supported browser web app, the PR check completes with an <strong>Unsupported App</strong> status instead of pretending coverage exists. See <Link href="/github#unsupported">GitHub automation</Link>.
      </Callout>

      <h2 id="rerun" className="anchor-target">
        Reruns
      </h2>
      <p>
        Rerun is offered from review detail when readiness says the repo is runnable. Readiness checks GitHub access, missing env-var signals, scanner gaps, and replay prerequisites — see <Link href="/trust">Trust &amp; readiness</Link>.
      </p>
    </DocPage>
  );
}
