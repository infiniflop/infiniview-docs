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

  severity_threshold: medium
  exclude_paths:
    - "test/**"
    - "docs/**"
  exclude_rules:
    - "generic.secrets.security.detected-generic-secret"

  runtime:
    enabled_agents:
      - api-fuzzer
      - injection-tester
      - auth-attacker
    max_plans: 20
    wall_clock_timeout: 600000
    per_agent_timeout: 300000
    evidence_detail: summary`;

export default function ConfigurationPage() {
  return (
    <DocPage
      href="/configuration"
      title="Configuration"
      description="Dashboard defaults, repo overrides, frozen snapshots. Configure once, override per-repo when needed, and trust that mid-run edits never touch the active scan."
      toc={[
        { id: "model", title: "How configuration is resolved", depth: 2 },
        { id: "dashboard", title: "Dashboard configuration", depth: 2 },
        { id: "repo-config", title: "Repo configuration (.infiniview.yml)", depth: 2 },
        { id: "secrets", title: "Repo secrets", depth: 2 },
        { id: "validation", title: "Validating .infiniview.yml", depth: 2 },
      ]}
    >
      <h2 id="model" className="anchor-target">
        How configuration is resolved
      </h2>
      <p>
        At trigger time, Infiniview merges your dashboard defaults with the repo&rsquo;s <code>.infiniview.yml</code>, then freezes the result for the run. Repo config wins for overlapping fields.
      </p>
      <ol>
        <li>Read the user&rsquo;s saved dashboard configuration as the base.</li>
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
        Lives under <strong>Security</strong>. Controls which scanners and runtime agents run, the severity threshold, exclusion lists, and the runtime budget.
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
            <td>Which static, dependency, secret, and IaC scanners run.</td>
          </tr>
          <tr>
            <td>Severity threshold</td>
            <td>Minimum severity persisted to findings (low / medium / high / critical).</td>
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
            <td>Which agents run during sandbox execution. See <Link href="/scanners">Scanners &amp; agents</Link>.</td>
          </tr>
          <tr>
            <td>Max plans</td>
            <td>Cap on planning iterations per agent.</td>
          </tr>
          <tr>
            <td>Wall-clock / per-agent timeout</td>
            <td>Hard time budget for the run and for each agent.</td>
          </tr>
          <tr>
            <td>Evidence detail</td>
            <td>How much replay context is persisted per finding (<code>summary</code> or <code>full</code>).</td>
          </tr>
        </tbody>
      </table>
      <pre><code>{`GET /api/scan-config
PUT /api/scan-config         # update dashboard defaults
GET /api/settings
PUT /api/settings`}</code></pre>

      <h2 id="repo-config" className="anchor-target">
        Repo configuration (<code>.infiniview.yml</code>)
      </h2>
      <p>
        Add <code>.infiniview.yml</code> at the repo root for security scanner, threshold, exclusion, runtime-agent, timeout, plan, and evidence-detail overrides. Repo config wins for overlapping fields.
      </p>
      <pre><code>{configExample}</code></pre>

      <h2 id="secrets" className="anchor-target">
        Repo secrets
      </h2>
      <p>
        Configure encrypted secrets under <strong>Settings &gt; Environment Secrets</strong> (or persist new env vars from the scan launcher). Values are encrypted at rest and decrypted server-side only when injected into the sandbox at scan time.
      </p>
      <pre><code>{`GET    /api/repo-secrets
POST   /api/repo-secrets
DELETE /api/repo-secrets/{id}`}</code></pre>

      <h2 id="validation" className="anchor-target">
        Validating <code>.infiniview.yml</code>
      </h2>
      <p>
        Use the validation endpoint to check a repo config before it&rsquo;s committed. The endpoint returns parse errors, unknown keys, and any threshold or scanner-name violations.
      </p>
      <pre><code>{`POST /api/validate-infiniview-yml`}</code></pre>
    </DocPage>
  );
}
