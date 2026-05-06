import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "Configuration",
  description:
    "Dashboard defaults, repo overrides, frozen snapshots. Configure once, override per-repo when needed.",
};

const configExample = `version: 1

security:
  scanners:
    enabled:
      - semgrep
      - trivy
      - gitleaks
    disabled:
      - bandit
    semgrep:
      custom_rules: "security/rules"

  severity_threshold: medium      # critical | high | medium | low | info
  exclude_paths:
    - "test/**"
    - "docs/**"
  exclude_rules:
    - "generic.secrets.security.detected-generic-secret"

  runtime:
    enabled_agents: []            # see Security configuration in the dashboard

max_plans: 20                     # 1–100
wall_clock_timeout: 600000        # ms; equivalent to 600s. API range: 60000–3600000
per_agent_timeout: 300000         # ms; equivalent to 300s. API range: 10000–600000
evidence_detail: summary          # summary | full
`;

export default function ConfigurationPage() {
  return (
    <DocPage
      href="/configuration"
      title="Configuration"
      description="Dashboard defaults, repo overrides, frozen snapshots. Configure once, override per-repo when needed, and trust that mid-run edits never touch the active scan."
      toc={[
        { id: "model", title: "How configuration is resolved", depth: 2 },
        { id: "dashboard", title: "Dashboard configuration", depth: 2 },
        { id: "ranges", title: "Value ranges", depth: 2 },
        { id: "repo-config", title: "Repo configuration (.infiniview.yml)", depth: 2 },
        { id: "secrets", title: "Repo secrets", depth: 2 },
        { id: "validation", title: "Validating .infiniview.yml", depth: 2 },
      ]}
    >
      <h2 id="model" className="anchor-target">
        How configuration is resolved
      </h2>
      <p>
        At trigger time, Infiniview merges your dashboard defaults with the repo’s <code>.infiniview.yml</code>, then freezes the result onto the run. Repo config wins for overlapping fields.
      </p>
      <ol>
        <li>Read the user’s saved dashboard configuration as the base.</li>
        <li>If <code>.infiniview.yml</code> exists at repo root, deep-merge it on top.</li>
        <li>Persist the merged snapshot on the scan run — that snapshot governs the active scan.</li>
      </ol>

      <Callout tone="info" title="Frozen snapshot">
        Editing dashboard or repo config mid-run only affects future scans. The active run keeps the snapshot it was launched with.
      </Callout>

      <h2 id="dashboard" className="anchor-target">
        Dashboard configuration
      </h2>
      <p>
        Lives under <strong>Security</strong>. Controls which scanners and runtime agents run, the severity threshold, exclusion lists, and the time and plan budgets.
      </p>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>What it controls</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Enabled / disabled scanners</td>
            <td>
              Which static, dependency, secret, and IaC scanners run. See <Link href="/scanners">Scanners</Link> for the
              full list and which are default-enabled.
            </td>
          </tr>
          <tr>
            <td>Severity threshold</td>
            <td>
              Minimum severity persisted to findings. One of <code>critical</code>, <code>high</code>, <code>medium</code>, <code>low</code>, <code>info</code>.
            </td>
          </tr>
          <tr>
            <td>Exclude paths</td>
            <td>Glob patterns suppressed before scanners process files.</td>
          </tr>
          <tr>
            <td>Exclude rules</td>
            <td>Specific rule IDs ignored across enabled scanners.</td>
          </tr>
          <tr>
            <td>Runtime agents</td>
            <td>Which runtime agents run during sandbox execution. The dashboard lists the agents available to your account.</td>
          </tr>
          <tr>
            <td>Max plans</td>
            <td>Cap on planning iterations per agent. Range 1–100.</td>
          </tr>
          <tr>
            <td>Wall-clock timeout</td>
            <td>Hard time budget for the run. Range 60–3600 seconds.</td>
          </tr>
          <tr>
            <td>Per-agent timeout</td>
            <td>Hard time budget per runtime agent. Range 10–600 seconds.</td>
          </tr>
          <tr>
            <td>Evidence detail</td>
            <td>
              How much replay context is persisted per finding. <code>summary</code> (default) or <code>full</code>.
            </td>
          </tr>
        </tbody>
      </table>
      <pre><code>{`GET /api/scan-config           # current saved configuration
PUT /api/scan-config           # update dashboard defaults
GET /api/settings              # automation preferences (see GitHub & Settings)
PUT /api/settings`}</code></pre>

      <h2 id="ranges" className="anchor-target">
        Value ranges
      </h2>
      <p>
        The dashboard accepts wall-clock and per-agent timeouts in seconds. <code>.infiniview.yml</code> uses milliseconds. The same numeric ranges apply on both sides:
      </p>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>API (seconds)</th>
            <th>YAML (milliseconds)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>wall_clock_timeout</code>
            </td>
            <td>60–3600</td>
            <td>60000–3600000</td>
          </tr>
          <tr>
            <td>
              <code>per_agent_timeout</code>
            </td>
            <td>10–600</td>
            <td>10000–600000</td>
          </tr>
        </tbody>
      </table>

      <h2 id="repo-config" className="anchor-target">
        Repo configuration (<code>.infiniview.yml</code>)
      </h2>
      <p>
        Add <code>.infiniview.yml</code> at the repo root for scanner, threshold, exclusion, runtime-agent, timeout, plan, and evidence-detail overrides. Repo config wins for overlapping fields. Unknown or retired scanner IDs are auto-reconciled against the current scanner manifest at trigger time.
      </p>
      <pre><code>{configExample}</code></pre>

      <h2 id="secrets" className="anchor-target">
        Repo secrets
      </h2>
      <p>
        Configure encrypted secrets under <strong>Settings &gt; Environment Secrets</strong>, or persist new env vars from the scan launcher. Values are encrypted at rest with AES-256-GCM and decrypted server-side only when injected into the sandbox at scan time. Listing endpoints return key names and metadata only — values are masked.
      </p>
      <pre><code>{`GET    /api/repo-secrets
POST   /api/repo-secrets       # { repoFullName, key, value }
DELETE /api/repo-secrets       # { id }`}</code></pre>

      <h2 id="validation" className="anchor-target">
        Validating <code>.infiniview.yml</code>
      </h2>
      <p>
        The validation endpoint is unauthenticated, so you can call it from CI before committing. It returns parse errors, unknown keys, and any threshold or scanner-name violations.
      </p>
      <pre><code>{`POST /api/validate-infiniview-yml
Content-Type: application/json

{ "yaml": "version: 1\\n…" }    # → { "valid": true, "errors": [] }`}</code></pre>
    </DocPage>
  );
}
