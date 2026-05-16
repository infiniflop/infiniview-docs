import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description:
    "Common scan issues and the fastest way to resolve them. Diagnose triggers, degraded runs, missing findings, and rerun blockers.",
};

export default function TroubleshootingPage() {
  return (
    <DocPage
      href="/troubleshooting"
      title="Troubleshooting"
      description="A direct guide to the things that most often go wrong, with the exact knobs to turn. Symptoms come first — start at the section that matches what you&rsquo;re seeing."
      toc={[
        { id: "trigger", title: "Scan didn’t trigger", depth: 2 },
        { id: "queued", title: "Scan is stuck queued", depth: 2 },
        { id: "degraded", title: "Scan finished degraded", depth: 2 },
        { id: "blocked", title: "Scan finished blocked", depth: 2 },
        { id: "failed", title: "Scan failed", depth: 2 },
        { id: "missing-repos", title: "Repository not visible", depth: 2 },
        { id: "missing-findings", title: "Expected findings are missing", depth: 2 },
        { id: "rerun-disabled", title: "Rerun is disabled", depth: 2 },
        { id: "commands-ignored", title: "@infiniview commands are ignored", depth: 2 },
        { id: "secrets", title: "Secrets aren’t reaching the sandbox", depth: 2 },
        { id: "live", title: "Live progress stream stalls", depth: 2 },
        { id: "csv", title: "CSV download is unavailable", depth: 2 },
        { id: "still-stuck", title: "Still stuck", depth: 2 },
      ]}
    >
      <h2 id="trigger" className="anchor-target">
        Scan didn&rsquo;t trigger
      </h2>
      <p>Work through these in order. The first match is almost always the cause:</p>
      <ul>
        <li>
          <strong>Draft PR.</strong> Draft pull requests are skipped until they&rsquo;re marked ready for review. Switching draft → ready emits a <code>ready_for_review</code> event that triggers a scan.
        </li>
        <li>
          <strong>Outside the auto-review allowlist.</strong> Settings &gt; Repositories controls which repos auto-review runs against. If the list is non-empty and your repo isn&rsquo;t on it, the webhook is acknowledged but no scan starts.
        </li>
        <li>
          <strong>Own-PR-only is enabled.</strong> When that filter is on, PRs by authors other than your connected GitHub username are skipped.
        </li>
        <li>
          <strong>PR was ignored.</strong> <code>@infiniview ignore</code> stores a per-installation skip for that repo and PR number. Re-enable from the dashboard or trigger a manual scan from Reviews.
        </li>
        <li>
          <strong>Push debounce window.</strong> A <code>synchronize</code> event inside the configured debounce window is coalesced. Either wait for the window to elapse or kick a manual scan.
        </li>
        <li>
          <strong>GitHub App not installed on the repo.</strong> The OAuth handshake from Settings only lets the dashboard list repos. PR scans also need the GitHub App installed on the repo or org.
        </li>
      </ul>

      <h2 id="queued" className="anchor-target">
        Scan is stuck queued
      </h2>
      <p>
        The Reviews list shows a <code>queued</code> status and the run never starts. Common causes:
      </p>
      <ul>
        <li>
          <strong>Plan limits reached.</strong> Concurrent scan limits depend on plan tier — see <Link href="/billing">Billing &amp; plans</Link>. Older runs finish or fail out before the queue advances.
        </li>
        <li>
          <strong>Account capability not enabled.</strong> Some scanners and runtime agents are gated by account-level capabilities. Disabled tools show up in the Trust panel after the run starts; nothing about queuing itself blocks here.
        </li>
        <li>
          <strong>Brief platform queue.</strong> If a scan stays queued for more than 10 minutes with no upstream cause, post in the dashboard support channel with the review ID.
        </li>
      </ul>
      <Callout tone="info">
        Manual scans launched from the dashboard are subject to the same 5/60s reviews-create rate limit as the API. Burst beyond that and the launcher returns an HTTP <code>429</code>.
      </Callout>

      <h2 id="degraded" className="anchor-target">
        Scan finished degraded
      </h2>
      <p>
        A <code>degraded</code> result means findings are valid but coverage was reduced. The Trust panel attributes each gap to a typed reason — work through them in this order:
      </p>
      <ol>
        <li>
          <strong><code>scanner_skipped</code></strong> — a scanner exited early or wasn&rsquo;t applicable. Check that the scanner is enabled (Security &gt; Scanners) and that the repo has files it can analyze.
        </li>
        <li>
          <strong><code>runtime_not_tested</code></strong> — runtime testing didn&rsquo;t reach this surface. Most commonly, the app didn&rsquo;t build, the entrypoint wasn&rsquo;t served, or a required credential wasn&rsquo;t set. Add missing values to <Link href="/configuration#secrets">repo secrets</Link>.
        </li>
        <li>
          <strong><code>replay_unavailable</code></strong> — a runtime finding fired but the replay couldn&rsquo;t be persisted. Re-run with <code>evidence_detail: full</code> for richer artifacts.
        </li>
        <li>
          <strong><code>degraded</code></strong> — a generic coverage warning. Skim recommendations in Trust, then rerun from review detail.
        </li>
      </ol>

      <h2 id="blocked" className="anchor-target">
        Scan finished blocked
      </h2>
      <p>
        <code>blocked</code> means the pipeline stopped before scanning. Today the most common cause is <strong>Unsupported App</strong>: the repository isn&rsquo;t a browser-based web app the sandbox can build and serve. The PR check completes neutrally rather than returning a misleading pass.
      </p>
      <ul>
        <li>Web apps with a non-default port: add a <code>.infiniview.yml</code> override or environment variables that document the entry command.</li>
        <li>API-only and library repositories: scans persist static and dependency evidence; runtime testing is intentionally skipped.</li>
        <li>Build prerequisites missing: ensure standard manifests (<code>package.json</code>, <code>pyproject.toml</code>, <code>Gemfile</code>, etc.) and any private dependencies&rsquo; credentials are present in repo secrets.</li>
      </ul>

      <h2 id="failed" className="anchor-target">
        Scan failed
      </h2>
      <p>
        <code>failed</code> means the pipeline couldn&rsquo;t complete. The run records the error class in the timeline. Typical recoveries:
      </p>
      <ul>
        <li>
          <strong>GitHub access lost</strong> — the OAuth or App install was revoked mid-run. Reconnect from Settings, then rerun.
        </li>
        <li>
          <strong>Repository moved or deleted</strong> — fetch returns 404. Update the review&rsquo;s repo reference or open a new review.
        </li>
        <li>
          <strong>Snapshot validation</strong> — the merged <code>.infiniview.yml</code> failed validation. Run <code>POST /api/validate-infiniview-yml</code> against the file to see the exact error.
        </li>
        <li>
          <strong>Time budget exhausted</strong> — the wall-clock cap kicked in. Trim <code>exclude_paths</code>, lower <code>max_plans</code>, or split monorepo scans across paths.
        </li>
      </ul>

      <h2 id="missing-repos" className="anchor-target">
        Repository not visible in the launcher
      </h2>
      <ul>
        <li>
          <strong>You haven&rsquo;t connected GitHub.</strong> Settings &gt; GitHub starts the OAuth handshake.
        </li>
        <li>
          <strong>The repo is in an org you don&rsquo;t have repo:read on.</strong> The dashboard shows what your token can list.
        </li>
        <li>
          <strong>Pagination.</strong> <code>/api/github/repos</code> returns a page of results — use the <code>?q=</code> filter or scroll to load more.
        </li>
      </ul>

      <h2 id="missing-findings" className="anchor-target">
        Expected findings are missing
      </h2>
      <ul>
        <li>
          <strong>Severity threshold.</strong> Anything below the configured threshold is dropped before persistence. Lower it temporarily to inspect.
        </li>
        <li>
          <strong>Exclude paths or rules.</strong> Check the active snapshot — the frozen merge of dashboard config and <code>.infiniview.yml</code>. Excluded paths and rules don&rsquo;t emit findings.
        </li>
        <li>
          <strong>Active suppressions.</strong> Findings matching an active fingerprint suppression are hidden. Findings &gt; suppression filter surfaces them; deleting a suppression restores presentation without touching history.
        </li>
        <li>
          <strong>Scanner skipped.</strong> If the relevant scanner appears in the Trust panel as <code>scanner_skipped</code>, no rules from it ran on this surface.
        </li>
      </ul>

      <h2 id="rerun-disabled" className="anchor-target">
        Rerun is disabled
      </h2>
      <p>
        The rerun affordance only appears when readiness checks pass. The readiness panel calls out exactly what&rsquo;s blocking — pick the matching cause:
      </p>
      <ul>
        <li><strong>GitHub access not reachable</strong> — reconnect the GitHub OAuth, reinstall the GitHub App, or restore repo access.</li>
        <li><strong>Required env signal absent</strong> — a previous run flagged a missing variable; add it via <Link href="/configuration#secrets">repo secrets</Link>.</li>
        <li><strong>Unsupported app type</strong> — runtime testing can&rsquo;t be replayed; static-only rerun is still available via the API.</li>
        <li><strong>Replay prerequisite missing</strong> — usually a previously confirmed exploit lost its artifact. Run a manual scan instead to rebuild from scratch.</li>
      </ul>

      <h2 id="commands-ignored" className="anchor-target">
        <code>@infiniview</code> commands are ignored
      </h2>
      <p>
        Only trusted authors can run commands: owners, members, or collaborators on the repository, or users with <code>write</code>, <code>maintain</code>, or <code>admin</code> permission. Comments from anyone else are silently ignored.
      </p>
      <ul>
        <li>Bot accounts and outside drive-by reviewers won&rsquo;t pass the trust check.</li>
        <li>Forked-PR comments require the commenter to have permission on the upstream repo, not the fork.</li>
        <li>Re-check that the comment body uses one of the documented commands exactly (<code>@infiniview review</code>, <code>@infiniview ignore</code>, <code>@infiniview help</code>). Anything else is treated as conversation.</li>
      </ul>

      <h2 id="secrets" className="anchor-target">
        Secrets aren&rsquo;t reaching the sandbox
      </h2>
      <ul>
        <li>
          Secrets are scoped <strong>per repository</strong>. A value set against <code>org/foo</code> isn&rsquo;t visible to scans of <code>org/bar</code>.
        </li>
        <li>
          The listing endpoint returns only key names — verify the key string matches exactly what the app expects (case-sensitive).
        </li>
        <li>
          Values are decrypted server-side only when injected into the sandbox at scan time. If a value looks malformed, delete and re-add it.
        </li>
        <li>
          If the value is required by the build, runtime, <em>and</em> a runtime agent (e.g., third-party API key), the missing-env-signal flag will appear on Trust. Resolve before rerunning.
        </li>
      </ul>

      <h2 id="live" className="anchor-target">
        Live progress stream stalls
      </h2>
      <p>
        The run detail page connects to <code>/api/scan-runs/&#123;id&#125;/live</code> (Server-Sent Events). If the panel stops updating:
      </p>
      <ul>
        <li>Some corporate proxies buffer SSE — open the page in a network that allows long-lived connections.</li>
        <li>The dashboard falls back to <code>/api/scan-runs/&#123;id&#125;/progress</code> for one-shot polls if the stream drops.</li>
        <li>Closing the tab does not cancel the run. Reopen from Reviews to reattach.</li>
      </ul>

      <h2 id="csv" className="anchor-target">
        CSV download is unavailable
      </h2>
      <p>
        <code>GET /api/scan-runs/&#123;id&#125;/csv</code> requires a terminal status (<code>completed</code>, <code>degraded</code>, <code>blocked</code>, or <code>failed</code>). Active runs return 409 Conflict. Use the backlog export at <code>/api/security-findings/export</code> if you need a cross-run dump instead.
      </p>

      <h2 id="still-stuck" className="anchor-target">
        Still stuck
      </h2>
      <ul>
        <li>
          Capture the review ID and scan run ID (visible at <code>/runs/&#123;id&#125;</code>).
        </li>
        <li>
          Open the Trust panel and Recommendations — copy the typed gap codes into your support thread.
        </li>
        <li>
          Drop the question into the in-app feedback widget. Common questions also have short answers in the <Link href="/faq">Operator FAQ</Link>.
        </li>
      </ul>
    </DocPage>
  );
}
