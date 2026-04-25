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
        The issue was confirmed through runtime or interaction testing. It&rsquo;s stronger than an unverified static hit, but you should still inspect the evidence and trust context before prioritizing work. See <Link href="/findings#verified">Findings &amp; evidence</Link>.
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
    q: "How do suppressions work?",
    a: (
      <>
        Suppressions are fingerprint-based. Repo scope hides the finding only for that repository. User scope applies across that user&rsquo;s matching findings. Deleting the suppression restores the finding presentation without deleting history.
      </>
    ),
  },
  {
    q: "Where should I configure secrets?",
    a: (
      <>
        Use <strong>Settings &gt; Environment Secrets</strong> or persist new env vars from the scan launcher. Values are encrypted at rest and injected into the sandbox at scan time.
      </>
    ),
  },
  {
    q: "Can I use repo config instead of dashboard config?",
    a: (
      <>
        Yes. Add <code>.infiniview.yml</code> at the repo root for security scanner, threshold, exclusion, runtime-agent, timeout, plan, and evidence-detail overrides. Repo config wins for overlapping fields. See <Link href="/configuration">Configuration</Link>.
      </>
    ),
  },
  {
    q: "Why didn't Infiniview scan my pull request?",
    a: (
      <>
        Most common reasons: the PR is still in draft, the repo isn&rsquo;t in the auto-review allowlist, own-PR-only is enabled and the PR was opened by another author, the PR was previously ignored with <code>@infiniview ignore</code>, or the synchronize event landed inside the push debounce window.
      </>
    ),
  },
  {
    q: "Who can run @infiniview commands?",
    a: (
      <>
        Owners, members, collaborators, or users with write-or-better permission on the repository. Comments from anyone else are ignored.
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
