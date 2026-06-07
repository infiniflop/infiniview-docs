import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Definitions for the terminology Infiniview uses across the dashboard, GitHub integration, and API.",
};

type Entry = {
  term: string;
  body: React.ReactNode;
};

const entries: Entry[] = [
  {
    term: "Review",
    body: (
      <>
        The user-facing product object for a given repo and target — usually a branch or a pull request. A review accumulates one or more <strong>scan runs</strong> over its lifetime and is what you open, rerun, delete, or archive.
      </>
    ),
  },
  {
    term: "Scan run",
    body: (
      <>
        A single execution of the scan pipeline against a review. Each run carries its own frozen configuration <Link href="#snapshot">snapshot</Link>, status, timeline, findings, trust score, and (when applicable) CSV and compare endpoints. Use <em>scan</em> only as shorthand when the sentence is clearly about this execution, not the review container.
      </>
    ),
  },
  {
    term: "Finding",
    body: (
      <>
        A persisted issue discovered by a scanner or runtime agent. Findings carry severity, category, confidence, <Link href="#exploitability">exploitability</Link>, source phase, primary file, line range, <Link href="#fingerprint">fingerprint</Link>, evidence, and remediation guidance.
      </>
    ),
  },
  {
    term: "Fingerprint",
    body: (
      <>
        A stable identifier derived from a finding&rsquo;s rule, location, and signature. Fingerprints power delta computation across scans and are what <Link href="/findings#suppressions">suppressions</Link> match against.
      </>
    ),
  },
  {
    term: "Severity",
    body: (
      <>
        One of <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>. <code>critical</code> and <code>high</code> block PR merges; the rest are reported but non-blocking. <code>info</code> is excluded from the unique-vulnerabilities counter on the overview.
      </>
    ),
  },
  {
    term: "Exploitability",
    body: (
      <>
        Whether the finding has been confirmed against the running application. One of <code>verified</code> (confirmed runtime-side), <code>unverified</code> (reported by analysis only), and <code>not_tested</code> (runtime testing didn&rsquo;t reach this surface).
      </>
    ),
  },
  {
    term: "Delta state",
    body: (
      <>
        Each finding&rsquo;s movement relative to the previous successful scan on the same target: <code>new</code>, <code>recurring</code>, <code>regressed</code>, <code>fixed</code>, or <code>suppressed</code>. See <Link href="/findings#delta">Findings &amp; evidence</Link>.
      </>
    ),
  },
  {
    term: "Source phase",
    body: (
      <>
        The pipeline phase that produced a finding — static analysis, dependency audit, secrets, IaC, code review, runtime verification, or interaction testing.
      </>
    ),
  },
  {
    term: "Trust",
    body: (
      <>
        A 0–100 score (and label: <code>strong</code>, <code>moderate</code>, <code>limited</code>, <code>degraded</code>) reflecting how reliable the scan was. Carries the verification mix, skipped scanners, replay readiness, and coverage gaps. See <Link href="/trust">Trust &amp; readiness</Link>.
      </>
    ),
  },
  {
    term: "Trust gap",
    body: (
      <>
        A typed reason a scan&rsquo;s coverage is reduced. Today: <code>scanner_skipped</code>, <code>runtime_not_tested</code>, <code>replay_unavailable</code>, and <code>degraded</code>. Each gap names the affected tool or capability.
      </>
    ),
  },
  {
    term: "Readiness",
    body: (
      <>
        A precondition check that answers <em>can I rerun?</em>. Verifies GitHub access, environment-variable signals, supported app type, and replay prerequisites. The rerun affordance is hidden when readiness fails.
      </>
    ),
  },
  {
    term: "Compare",
    body: (
      <>
        The view (and endpoint) that explains <em>what changed</em> between a scan run and the previous successful run on the same target. Reports baseline counts and delta movement.
      </>
    ),
  },
  {
    term: "Snapshot",
    body: (
      <>
        The merged, frozen configuration applied to a scan run at trigger time. Combines your dashboard defaults with the repo&rsquo;s <code>.infiniview.yml</code>; repo config wins for overlapping fields. Mid-run edits never affect the active scan.
      </>
    ),
  },
  {
    term: "Capability",
    body: (
      <>
        One of the five things a scan does: code review, security analysis, runtime verification, browser interaction testing, evidence packaging. Coverage and skip reasons are reported per capability.
      </>
    ),
  },
  {
    term: "Scanner",
    body: (
      <>
        A specific named tool that produces findings — for example, Semgrep, Gitleaks, Trivy, OSV Scanner. Each scanner is enabled by default or opt-in; see <Link href="/scanners">Scanners &amp; agents</Link>.
      </>
    ),
  },
  {
    term: "Runtime agent",
    body: (
      <>
        A capability that exercises the running application inside the sandbox — verification probes, interaction testing, exploit confirmation. Specific agents are listed in the Security dashboard and may be tier-gated.
      </>
    ),
  },
  {
    term: "Sandbox",
    body: (
      <>
        The isolated execution environment Infiniview spins up to build, serve, and probe the repository. Sandboxes are ephemeral and torn down at the end of each scan run.
      </>
    ),
  },
  {
    term: "Suppression",
    body: (
      <>
        A fingerprint-scoped rule that hides matching findings. <code>repo</code> scope hides for that repository; <code>user</code> scope applies across the user&rsquo;s matching findings. Deleting a suppression restores presentation without touching history.
      </>
    ),
  },
  {
    term: "Replay artifact",
    body: (
      <>
        Reproducible evidence captured for a runtime or interaction finding — request payloads, response bodies, navigation traces. Linked from the finding detail page and downloadable via the replay endpoint.
      </>
    ),
  },
  {
    term: "Proof bundle",
    body: (
      <>
        A downloadable package per finding: identity, location, replay data, proof-of-concept variants, and expected behavior. Useful for handing off to engineering or filing an issue.
      </>
    ),
  },
  {
    term: "Auto-review",
    body: (
      <>
        The automatic PR-scan path. Governed by Settings: repo allowlist, own-PR-only, push debounce, and per-PR ignores all live here.
      </>
    ),
  },
  {
    term: "Debounce",
    body: (
      <>
        The configured window during which <code>synchronize</code> events on the same PR are coalesced into a single scan. Range 1–120 minutes, off by default.
      </>
    ),
  },
  {
    term: "Trusted command",
    body: (
      <>
        A PR comment beginning with <code>@infiniview</code>. Acted on only when posted by an owner, member, or collaborator with <code>write</code>, <code>maintain</code>, or <code>admin</code> permission.
      </>
    ),
  },
  {
    term: "Frozen snapshot",
    body: (
      <>
        Same as <Link href="#snapshot">snapshot</Link>. The emphasis on <em>frozen</em> is that, once the run starts, no later configuration change can mutate it.
      </>
    ),
  },
  {
    term: "Degraded run",
    body: (
      <>
        A scan that completed with reduced coverage. Findings still persist, but trust drops and the run is annotated with the typed gap reasons.
      </>
    ),
  },
  {
    term: "Unsupported app",
    body: (
      <>
        A repository the sandbox can&rsquo;t build and serve as a browser web app. The PR check completes neutrally instead of returning a misleading pass.
      </>
    ),
  },
];

export default function GlossaryPage() {
  return (
    <DocPage
      href="/glossary"
      title="Glossary"
      description="The terminology Infiniview uses across the dashboard, GitHub integration, and API — in one short reference."
      toc={[]}
    >
      <p>
        Terms are listed alphabetically. Each entry links out to the page where the concept is described in full.
      </p>
      <div className="not-prose mt-6 grid gap-px border border-border bg-border">
        {entries
          .slice()
          .sort((a, b) => a.term.localeCompare(b.term))
          .map((e) => (
            <div
              key={e.term}
              id={e.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="grid bg-bg-card p-5 md:grid-cols-[200px_1fr] md:gap-6"
            >
              <div className="mb-2 font-mono text-[12px] uppercase tracking-[0.08em] text-lime md:mb-0">
                {e.term}
              </div>
              <div className="text-[13.5px] leading-relaxed text-text-secondary">{e.body}</div>
            </div>
          ))}
      </div>
    </DocPage>
  );
}
