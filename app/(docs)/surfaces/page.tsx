import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";

export const metadata: Metadata = {
  title: "Product surfaces",
  description:
    "The dashboard is split into a small number of named surfaces. Most operator tasks happen in one of these.",
};

export default function SurfacesPage() {
  return (
    <DocPage
      href="/surfaces"
      title="Product surfaces"
      description="The dashboard is split into a small number of named surfaces. Most operator tasks happen in one of these."
      toc={[
        { id: "reviews", title: "Reviews", depth: 2 },
        { id: "findings", title: "Findings", depth: 2 },
        { id: "security", title: "Security", depth: 2 },
        { id: "settings", title: "Settings", depth: 2 },
        { id: "scan-history", title: "Scan history", depth: 2 },
        { id: "run-detail", title: "Scan run detail", depth: 2 },
        { id: "command-palette", title: "Command palette", depth: 2 },
      ]}
    >
      <h2 id="reviews" className="anchor-target">
        Reviews
      </h2>
      <p>
        The default landing surface at <code>/</code>. Lists recent reviews and opens detail for the selected one — story insights, readiness, and a rerun affordance when readiness allows it. Active runs poll for status every few seconds while you watch.
      </p>

      <h2 id="findings" className="anchor-target">
        Findings
      </h2>
      <p>
        At <code>/findings</code>. The cross-review backlog. Filter by severity, source, exploitability, delta state (<code>new</code>, <code>recurring</code>, <code>regressed</code>, <code>fixed</code>, <code>suppressed</code>), category, suppression scope, and free-text search. Selecting a finding opens identity, location, evidence, replay, and bundle access.
      </p>

      <h2 id="security" className="anchor-target">
        Security
      </h2>
      <p>
        At <code>/security</code>. Per-account scanner and runtime-agent configuration: enabled scanners, custom rule paths, severity threshold, exclude paths, exclude rules, runtime agent set, max plans, wall-clock and per-agent timeouts, and evidence detail level. Saved values become dashboard defaults at scan launch — see <Link href="/configuration">Configuration</Link>.
      </p>

      <h2 id="settings" className="anchor-target">
        Settings
      </h2>
      <p>At <code>/settings</code>. Connection state and automation preferences:</p>
      <ul>
        <li>GitHub auto-review repository list (empty list = run on any installed repo).</li>
        <li>Own-PR-only filter — restricts auto-review to PRs whose author matches your connected GitHub username.</li>
        <li>Push debounce window — collapses bursts of <code>synchronize</code> events. Range 1–120 minutes.</li>
        <li>Encrypted repo secrets injected into the sandbox at scan time.</li>
        <li>Completion email preferences.</li>
      </ul>

      <h2 id="scan-history" className="anchor-target">
        Scan history
      </h2>
      <p>
        At <code>/scan-history</code>. Run timeline and quality view: phase durations, scanner coverage, compare counts, trust score, gaps, and recommendations. Useful when triaging a degraded scan or deciding whether to rerun.
      </p>

      <h2 id="run-detail" className="anchor-target">
        Scan run detail
      </h2>
      <p>
        At <code>/runs/&#123;id&#125;</code>. Status badge, branch badge, started and completed timestamps, a degradation notice when applicable, the findings list, live progress while running, and a CSV download once the run reaches a terminal status.
      </p>

      <h2 id="command-palette" className="anchor-target">
        Command palette
      </h2>
      <p>
        Press <kbd>Cmd</kbd> <kbd>K</kbd> (or <kbd>Ctrl</kbd> <kbd>K</kbd>) to navigate across reviews, findings, settings, security configuration, scan history, and finding detail.
      </p>
    </DocPage>
  );
}
