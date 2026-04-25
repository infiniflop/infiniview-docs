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
        { id: "unsupported", title: "Unsupported apps", depth: 2 },
      ]}
    >
      <h2 id="events" className="anchor-target">
        Events that can trigger
      </h2>
      <p>
        Infiniview listens for <code>opened</code>, <code>synchronize</code>, and <code>ready_for_review</code> pull request events. Draft PRs are skipped until they&rsquo;re marked ready for review.
      </p>
      <pre><code>{`POST /api/github/webhook   # GitHub-signed webhook receiver`}</code></pre>

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
        <code>synchronize</code> events inside the configured debounce window are ignored, so a burst of commits doesn&rsquo;t start redundant scans. The debounce window applies per PR.
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
        These commands only run for owners, members, collaborators, or users with write-or-better permission on the repository. Comments from anyone else are ignored.
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

      <h2 id="unsupported" className="anchor-target">
        Unsupported apps
      </h2>
      <p>
        If Infiniview can&rsquo;t run the repository as a supported browser web app, the PR check completes neutrally with an <strong>Unsupported App</strong> status instead of returning a misleading pass. Coverage gaps are tracked in trust — see <Link href="/trust">Trust &amp; readiness</Link>.
      </p>
    </DocPage>
  );
}
