import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "GitHub automation",
  description:
    "PR scans obey repo access and operator intent. When Infiniview triggers, debounces, or skips.",
};

export default function GithubPage() {
  return (
    <DocPage
      href="/github"
      title="GitHub automation"
      description="PR scans obey repo access and operator intent. These rules describe exactly when Infiniview triggers, debounces, or skips."
      toc={[
        { id: "events", title: "Events that can trigger", depth: 2 },
        { id: "scope", title: "Auto-review scope", depth: 2 },
        { id: "own-prs", title: "Own PRs only", depth: 2 },
        { id: "debounce", title: "Push debounce", depth: 2 },
        { id: "ignored", title: "Ignored PRs", depth: 2 },
        { id: "commands", title: "Trusted commands", depth: 2 },
        { id: "check", title: "Merge-blocking check", depth: 2 },
        { id: "unsupported", title: "Unsupported apps", depth: 2 },
      ]}
    >
      <h2 id="events" className="anchor-target">
        Events that can trigger
      </h2>
      <p>
        Infiniview listens for <code>opened</code>, <code>synchronize</code>, and <code>ready_for_review</code> pull request events. Draft PRs are skipped until they’re marked ready for review. Comment commands are read from <code>issue_comment</code> events on PRs.
      </p>
      <pre><code>{`POST /api/github/webhook   # GitHub-signed webhook receiver`}</code></pre>
      <Callout tone="info">
        The webhook receiver verifies the <code>X-Hub-Signature-256</code> HMAC signature and rejects unsigned requests. Deliveries are idempotent by <code>X-GitHub-Delivery</code> and considered stale after 15 minutes.
      </Callout>

      <h2 id="scope" className="anchor-target">
        Auto-review scope
      </h2>
      <p>
        Settings can limit automation to specific repositories. Leaving the repo list empty means the installation can run with default settings against any installed repo.
      </p>

      <Callout tone="info">
        Settings &gt; Repositories controls the auto-review allowlist. The list is per-installation, so different orgs see different scopes.
      </Callout>

      <h2 id="own-prs" className="anchor-target">
        Own PRs only
      </h2>
      <p>
        When enabled, Infiniview compares the pull request author to your connected GitHub username and skips PRs by other authors. Useful for solo developers who only want to review their own work.
      </p>

      <h2 id="debounce" className="anchor-target">
        Push debounce
      </h2>
      <p>
        <code>synchronize</code> events that land inside the configured debounce window are coalesced, so a burst of commits doesn’t start redundant scans. The window applies per PR. Defaults: debounce off, 10-minute window when enabled. The window can be set to any value between 1 and 120 minutes.
      </p>

      <h2 id="ignored" className="anchor-target">
        Ignored PRs
      </h2>
      <p>
        <code>@infiniview ignore</code> stores an installation-level skip for that repo and pull request number. Future synchronize events on that PR will not trigger auto-review until the suppression is cleared.
      </p>

      <h2 id="commands" className="anchor-target">
        Trusted commands
      </h2>
      <p>
        These commands only run for owners, members, or collaborators on the repository, or users with <code>write</code>, <code>maintain</code>, or <code>admin</code> permission. Comments from anyone else are ignored.
      </p>

      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>@infiniview review</code>
            </td>
            <td>Starts a trusted manual PR scan.</td>
          </tr>
          <tr>
            <td>
              <code>@infiniview ignore</code>
            </td>
            <td>Skips future auto-reviews for that repo + PR number.</td>
          </tr>
          <tr>
            <td>
              <code>@infiniview help</code>
            </td>
            <td>Replies with the current command list.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="check" className="anchor-target">
        Merge-blocking check
      </h2>
      <p>
        After every scan, Infiniview posts a check run on the PR. The check fails when the run produces any <code>critical</code> or <code>high</code> finding, blocking merge. <code>medium</code>, <code>low</code>, and <code>info</code> findings are reported but non-blocking.
      </p>

      <h2 id="unsupported" className="anchor-target">
        Unsupported apps
      </h2>
      <p>
        Infiniview currently supports browser-based web applications. If the repository can’t be served as one, the scan stops in a <strong>blocked</strong> state with an <strong>Unsupported App</strong> message — the PR check completes neutrally instead of returning a misleading pass. Coverage gaps from skipped runtime testing are tracked in <Link href="/trust">Trust &amp; readiness</Link>.
      </p>
    </DocPage>
  );
}
