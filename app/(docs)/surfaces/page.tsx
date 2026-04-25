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
        { id: "command-palette", title: "Command palette", depth: 2 },
      ]}
    >
      <h2 id="reviews" className="anchor-target">
        Reviews
      </h2>
      <p>
        The default landing surface. Lists recent reviews and opens detail for the selected one — story insights, readiness, and rerun affordance when readiness allows it.
      </p>

      <h2 id="findings" className="anchor-target">
        Findings
      </h2>
      <p>
        The cross-review backlog. Filter by severity, source, exploitability, delta state (new, recurring, regressed, fixed, suppressed), category, suppression scope, and free-text search. Selecting a finding opens identity, location, evidence, replay, and bundle access.
      </p>

      <h2 id="security" className="anchor-target">
        Security
      </h2>
      <p>
        Per-user scanner and runtime-agent configuration: enabled scanners, custom rule paths, severity threshold, exclude paths, exclude rules, runtime agent set, max plans, wall-clock and per-agent timeouts, and evidence detail level. Saved values become dashboard defaults at scan launch — see <Link href="/configuration">Configuration</Link>.
      </p>

      <h2 id="settings" className="anchor-target">
        Settings
      </h2>
      <p>
        Connection state and automation preferences:
      </p>
      <ul>
        <li>GitHub auto-review repository list (empty list = run on any installed repo).</li>
        <li>Own-PR-only filter — restricts auto-review to PRs whose author matches your connected GitHub username.</li>
        <li>Push debounce window — collapses bursts of <code>synchronize</code> events.</li>
        <li>Encrypted repo secrets injected into the sandbox at scan time.</li>
        <li>Completion email preferences.</li>
      </ul>

      <h2 id="scan-history" className="anchor-target">
        Scan history
      </h2>
      <p>
        Run timeline and quality view: phase durations, scanner coverage, compare counts, trust score, gaps, and recommendations. Useful when triaging a degraded scan or deciding whether to rerun.
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
