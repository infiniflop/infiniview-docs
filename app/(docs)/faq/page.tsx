import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";

export const metadata: Metadata = {
  title: "Operator FAQ",
  description: "Short answers for real scan decisions.",
};

const faqs = [
  {
    q: "What does verified mean?",
    a: (
      <>
        The issue was confirmed through runtime or interaction testing. It’s stronger than an unverified static hit, but you should still inspect the evidence and trust context before prioritizing work. See <Link href="/findings#verified">Findings &amp; evidence</Link>.
      </>
    ),
  },
  {
    q: "Which severities block merge?",
    a: (
      <>
        <code>critical</code> and <code>high</code> findings cause the PR check to fail. <code>medium</code>, <code>low</code>, and <code>info</code> are reported but non-blocking. See <Link href="/findings#severity">Severity &amp; merge blocking</Link>.
      </>
    ),
  },
  {
    q: "What is a degraded scan?",
    a: (
      <>
        A scan that completed with limited coverage. Findings still persist, but trust drops and the run should be reviewed for skipped scanners, coverage gaps, missing secrets, or sandbox limitations. See <Link href="/trust#degraded">Trust &amp; readiness</Link>.
      </>
    ),
  },
  {
    q: "What apps does Infiniview support?",
    a: (
      <>
        Browser-based web applications. Scans against repositories that can’t be served as one finish in a <strong>blocked</strong> state with an <strong>Unsupported App</strong> message — the PR check completes neutrally instead of returning a misleading pass.
      </>
    ),
  },
  {
    q: "How do suppressions work?",
    a: (
      <>
        Suppressions are fingerprint-based. <strong>Repo</strong> scope hides the finding only for that repository. <strong>User</strong> scope applies across that user’s matching findings, regardless of repo. When multiple suppressions match the same fingerprint, the most recent one wins. Deleting the suppression restores the finding presentation without touching history.
      </>
    ),
  },
  {
    q: "Where should I configure secrets?",
    a: (
      <>
        Use <strong>Settings &gt; Environment Secrets</strong> or persist new env vars from the scan launcher. Values are encrypted at rest with AES-256-GCM and decrypted server-side only when injected into the sandbox at scan time. Listing endpoints return key names and metadata only — values are masked.
      </>
    ),
  },
  {
    q: "Can I use repo config instead of dashboard config?",
    a: (
      <>
        Yes. Add <code>.infiniview.yml</code> at the repo root for scanner, threshold, exclusion, runtime-agent, timeout, plan, and evidence-detail overrides. Repo config wins for overlapping fields. See <Link href="/configuration">Configuration</Link>.
      </>
    ),
  },
  {
    q: "Can I validate .infiniview.yml in CI?",
    a: (
      <>
        Yes. <code>POST /api/validate-infiniview-yml</code> is unauthenticated. POST <code>{`{ "yaml": "..." }`}</code> and you’ll get <code>{`{ valid, errors }`}</code> back.
      </>
    ),
  },
  {
    q: "Why didn’t Infiniview scan my pull request?",
    a: (
      <>
        Most common reasons: the PR is still in draft, the repo isn’t in the auto-review allowlist, own-PR-only is enabled and the PR was opened by another author, the PR was previously ignored with <code>@infiniview ignore</code>, or the synchronize event landed inside the push debounce window.
      </>
    ),
  },
  {
    q: "Who can run @infiniview commands?",
    a: (
      <>
        Owners, members, or collaborators on the repository, or users with <code>write</code>, <code>maintain</code>, or <code>admin</code> permission. Comments from anyone else are ignored.
      </>
    ),
  },
  {
    q: "How do I watch a scan in progress?",
    a: (
      <>
        Open the run from review detail. The page streams updates over Server-Sent Events at <code>/api/scan-runs/{`{id}`}/live</code>. For one-shot polling there’s also <code>/api/scan-runs/{`{id}`}/progress</code>.
      </>
    ),
  },
  {
    q: "How long do scans take?",
    a: (
      <>
        Budgets adapt to the size and complexity of the repo. The wall-clock cap is one hour; smaller repositories typically finish well under that. The configured wall-clock setting acts as a floor.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <DocPage
      href="/faq"
      title="Operator FAQ"
      description="Short answers for real scan decisions."
      toc={[]}
    >
      {faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </DocPage>
  );
}
