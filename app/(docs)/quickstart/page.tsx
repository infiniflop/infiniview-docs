import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "Quickstart",
  description:
    "Five steps from sign-in to your first proof bundle. Connect Infiniview to a repository and read its findings.",
};

export default function QuickstartPage() {
  return (
    <DocPage
      href="/quickstart"
      title="Quickstart"
      description="Five steps from sign-in to your first proof bundle. None of these require code changes — they just connect Infiniview to a repository and read its findings."
      toc={[
        { id: "before-you-start", title: "Before you start", depth: 2 },
        { id: "1-sign-in", title: "1. Sign in", depth: 2 },
        { id: "2-connect-github", title: "2. Connect GitHub", depth: 2 },
        { id: "3-install-app", title: "3. Install the GitHub App", depth: 2 },
        { id: "4-run-scan", title: "4. Create your first review", depth: 2 },
        { id: "5-decide", title: "5. Decide from findings", depth: 2 },
        { id: "next", title: "Where to go next", depth: 2 },
      ]}
    >
      <h2 id="before-you-start" className="anchor-target">
        Before you start
      </h2>
      <p>
        You need a GitHub account and admin or push permission on at least one repository you want Infiniview to review. Public and private repositories both work. Draft pull requests are skipped automatically until they&rsquo;re marked ready for review.
      </p>

      <Callout tone="info">
        Trusted commands (<code>@infiniview review</code>, <code>@infiniview ignore</code>, <code>@infiniview help</code>) require owner, member, or collaborator status on the repository, or <code>write</code>, <code>maintain</code>, or <code>admin</code> permission. Comments from other roles are ignored.
      </Callout>

      <h2 id="1-sign-in" className="anchor-target">
        1. Sign in to the dashboard
      </h2>
      <p>
        Open <a href="https://app.infiniview.dev">app.infiniview.dev</a> and sign in. The dashboard lands on Reviews, which is empty until your first review exists.
      </p>

      <h2 id="2-connect-github" className="anchor-target">
        2. Connect GitHub
      </h2>
      <p>
        Connecting GitHub lets Infiniview list the repositories available for manual scans and lets the GitHub App attribute installations to your account. The handshake is read-only at this stage.
      </p>
      <pre><code>{`GET    /api/github/connect      # start OAuth
GET    /api/github/callback     # OAuth callback (handled by Infiniview)
DELETE /api/github/disconnect   # remove the connection`}</code></pre>

      <h2 id="3-install-app" className="anchor-target">
        3. Install the Infiniview GitHub App
      </h2>
      <p>
        Install the app on the repositories you want auto-reviewed. Auto-review can be scoped to specific repos in <Link href="/configuration">Configuration</Link>; leaving the repo list empty lets the installation run with default settings against any installed repository.
      </p>

      <h2 id="4-run-scan" className="anchor-target">
        4. Create your first review
      </h2>
      <p>You have three ways to create a review or start a new scan run:</p>
      <ol>
        <li>
          <strong>Dashboard:</strong> from Reviews, choose a repo and branch. Infiniview creates the review and starts its first scan run.
        </li>
        <li>
          <strong>Pull request:</strong> open a PR (or move it from draft to ready). The auto-review rules in Configuration decide whether Infiniview runs.
        </li>
        <li>
          <strong>Comment:</strong> post <code>@infiniview review</code> on a PR you&rsquo;re trusted on to create or rerun the PR review.
        </li>
      </ol>

      <h2 id="5-decide" className="anchor-target">
        5. Decide from findings
      </h2>
      <p>
        When the scan run completes, the run detail view shows the timeline, scanner coverage, story insights, and rerun availability. Use these views together:
      </p>
      <ul>
        <li>
          <strong>Findings</strong> — backlog of issues with severity, source, exploitability, delta, and suppression filters.
        </li>
        <li>
          <strong>Compare</strong> — answers what changed against the prior scan: new, regressed, fixed, recurring, suppressed.
        </li>
        <li>
          <strong>Trust</strong> — explains run quality: verification mix, skipped scanners, replay readiness, coverage gaps.
        </li>
        <li>
          <strong>Readiness</strong> — flags rerun blockers: GitHub access, missing env-var signals, replay prerequisites.
        </li>
      </ul>

      <Callout tone="ok" title="Done">
        At this point you have a review, its first scan run, a backlog, and a proof bundle endpoint per finding. Anything else is tuning.
      </Callout>

      <h2 id="next" className="anchor-target">
        Where to go next
      </h2>
      <ul>
        <li>
          <Link href="/configuration">Configuration</Link> — tune scanners, severity threshold, exclusions, and runtime agents.
        </li>
        <li>
          <Link href="/github">GitHub automation</Link> — limit auto-review scope, debounce pushes, control who can trigger.
        </li>
        <li>
          <Link href="/findings">Findings &amp; evidence</Link> — what each finding carries and how suppressions work.
        </li>
      </ul>
    </DocPage>
  );
}
