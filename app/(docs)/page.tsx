import Link from "next/link";
import {
  ArrowRight,
  FileCode2,
  GitBranch,
  Layers3,
  Search,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

const surfaces = [
  {
    icon: FileCode2,
    title: "Reviews",
    body: "Default dashboard view for recent reviews, selected review detail, story insights, readiness, and reruns.",
  },
  {
    icon: ShieldAlert,
    title: "Findings",
    body: "Backlog across reviews with severity, source, exploitability, delta, category, suppression, and search filters.",
  },
  {
    icon: Shield,
    title: "Security",
    body: "Scanner, runtime-agent, threshold, exclude-list, timeout, max-plan, and evidence-detail configuration.",
  },
  {
    icon: GitBranch,
    title: "Settings",
    body: "GitHub auto-review repos, own-PR filtering, push debounce, encrypted repo secrets, and completion emails.",
  },
  {
    icon: Layers3,
    title: "Scan history",
    body: "Run timeline with phase durations, scanner coverage, compare counts, trust score, gaps, and recommendations.",
  },
  {
    icon: Search,
    title: "Command palette",
    body: "Cmd+K navigation across reviews, findings, settings, security configuration, scan history, and finding detail.",
  },
];

export default function IntroPage() {
  return (
    <DocPage
      href="/"
      title="Infiniview docs"
      description="Launch scans, connect GitHub, configure scanners, review forensic findings, and export proof."
      toc={[
        { id: "what-is-infiniview", title: "What is Infiniview", depth: 2 },
        { id: "capabilities", title: "What Infiniview ships", depth: 2 },
        { id: "how-the-docs-are-organized", title: "How the docs are organized", depth: 2 },
        { id: "product-surfaces", title: "Product surfaces", depth: 2 },
        { id: "next", title: "What to read next", depth: 2 },
      ]}
      actions={
        <>
          <Link
            href="/quickstart"
            className="btn-lime gap-1.5 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em]"
          >
            Quickstart <ArrowRight className="h-3 w-3" />
          </Link>
          <Link
            href="/api"
            className="btn-ghost gap-1.5 px-4 py-2.5"
          >
            API reference
          </Link>
        </>
      }
    >

      <h2 id="what-is-infiniview" className="anchor-target">
        What is Infiniview
      </h2>
      <p>
        Infiniview is a security review platform that takes a repository, builds and runs it in a sandbox, and combines static analysis, dependency audits, secret detection, IaC scanning, and runtime agents into one stream of evidence. Each scan persists severity, fingerprints, locations, replay artifacts, delta state, and suppression memory so you can decide what to fix without re-deriving context.
      </p>
      <p>
        You operate the product through the dashboard or directly from GitHub pull requests. Settings can live in the dashboard, the repo&rsquo;s <code>.infiniview.yml</code>, or both — repo config wins for overlapping fields, and every scan freezes the merged settings into a snapshot so changing settings mid-run never affects the active scan.
      </p>

      <Callout tone="info">
        These docs cover scan triggers, GitHub automation, scanner and agent configuration, findings, evidence, exports, and the API contract. Infiniview is currently in <strong>public beta</strong>.
      </Callout>

      <h2 id="capabilities" className="anchor-target">
        What Infiniview ships
      </h2>
      <p>
        Five capabilities make up a scan. Every run can use all five — coverage on any one is reported back so you can read trust at a glance.
      </p>
      <ul>
        <li>
          <strong>Code review</strong> — reviews changed code for correctness, maintainability, and security-sensitive logic.
        </li>
        <li>
          <strong>Security analysis</strong> — combines static analysis, dependency audits, secret detection, and configuration review across 25 scanners.
        </li>
        <li>
          <strong>Runtime verification</strong> — confirms high-confidence findings against the running application when a safe test target is available.
        </li>
        <li>
          <strong>Browser interaction testing</strong> — exercises reachable user flows and records evidence for broken or risky behavior.
        </li>
        <li>
          <strong>Evidence packages</strong> — collects reproducible context, affected locations, and remediation guidance for confirmed issues.
        </li>
      </ul>
      <p>
        On pull requests, scans post a check whose <strong>critical</strong> and <strong>high</strong> severity findings block merge. <strong>Medium</strong>, <strong>low</strong>, and <strong>info</strong> are reported but non-blocking.
      </p>

      <h2 id="how-the-docs-are-organized" className="anchor-target">
        How the docs are organized
      </h2>
      <ul>
        <li>
          <strong>Get started</strong> walks first-time operators from sign-in to a proof bundle.
        </li>
        <li>
          <strong>Operate</strong> covers the scan lifecycle, GitHub automation rules, and the configuration model.
        </li>
        <li>
          <strong>Tooling</strong> lists the available scanners and runtime agents.
        </li>
        <li>
          <strong>Findings &amp; proof</strong> explains evidence shape, trust scoring, readiness, and exports.
        </li>
        <li>
          <strong>Reference</strong> contains the dashboard API contract and the operator FAQ.
        </li>
      </ul>

      <h2 id="product-surfaces" className="anchor-target">
        Product surfaces
      </h2>
      <p>
        The dashboard is split into a small number of named surfaces. Most operator tasks happen in one of these — the rest of the docs assume you&rsquo;ve seen them.
      </p>
      <div className="not-prose grid gap-px border border-border bg-border sm:grid-cols-2">
        {surfaces.map((s) => (
          <div key={s.title} className="bg-bg-card p-5">
            <s.icon className="mb-3 h-3.5 w-3.5 text-lime" />
            <div className="text-[14px] font-bold tracking-[-0.02em]">{s.title}</div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">{s.body}</p>
          </div>
        ))}
      </div>

      <h2 id="next" className="anchor-target">
        What to read next
      </h2>
      <ul>
        <li>
          <Link href="/quickstart">Quickstart</Link> if you haven&rsquo;t connected GitHub or run your first scan yet.
        </li>
        <li>
          <Link href="/workflow">Scan workflow</Link> for the trigger-to-proof lifecycle and what the snapshot freezes.
        </li>
        <li>
          <Link href="/github">GitHub automation</Link> for PR triggers, debounce, and trusted bot commands.
        </li>
        <li>
          <Link href="/api">API reference</Link> if you&rsquo;re scripting around the dashboard.
        </li>
      </ul>
    </DocPage>
  );
}
