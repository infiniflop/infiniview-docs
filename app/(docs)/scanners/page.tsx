import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { Callout } from "@/components/callout";

export const metadata: Metadata = {
  title: "Scanners & runtime testing",
  description:
    "Static, dependency, secret, and IaC scanners run alongside runtime testing capabilities. Toggle scanners in the dashboard or .infiniview.yml.",
};

type Scanner = { id: string; label: string; description: string; opt?: string };
type Group = { id: string; title: string; body: string; scanners: Scanner[] };

const groups: Group[] = [
  {
    id: "static-analysis",
    title: "Static analysis",
    body: "Source-level rule engines run against the cloned repo without execution.",
    scanners: [
      { id: "semgrep", label: "Semgrep", description: "Multi-language static analysis with custom rules." },
      { id: "eslint-security", label: "ESLint Security", description: "JavaScript and TypeScript security rules." },
      { id: "bandit", label: "Bandit", description: "Python security linter." },
      { id: "gosec", label: "gosec", description: "Go security analyzer." },
      { id: "brakeman", label: "Brakeman", description: "Ruby on Rails security scanner." },
      { id: "spotbugs", label: "SpotBugs", description: "Java static analysis for bugs and vulnerabilities." },
      { id: "phpstan", label: "PHPStan", description: "PHP static analyzer with security rules." },
      { id: "bearer", label: "Bearer", description: "Code security scanner for sensitive data flows." },
      { id: "njsscan", label: "njsscan", description: "Node.js semantic security scanner." },
      {
        id: "sonarqube",
        label: "SonarQube",
        description: "Static code analysis via SonarScanner and SonarQube.",
        opt: "Opt-in. Requires an external SonarQube service and credentials.",
      },
    ],
  },
  {
    id: "dependency-audit",
    title: "Dependency audit",
    body: "Manifest- and lockfile-driven CVE detection across language ecosystems.",
    scanners: [
      { id: "npm-audit", label: "npm audit", description: "Node.js dependency vulnerability scan." },
      { id: "pip-audit", label: "pip-audit", description: "Python dependency vulnerability scan." },
      { id: "cargo-audit", label: "cargo-audit", description: "Rust dependency vulnerability scan." },
      { id: "osv-scanner", label: "OSV Scanner", description: "Open Source Vulnerabilities database scanner." },
      {
        id: "safety",
        label: "Safety",
        description: "Python dependency safety checker.",
        opt: "Opt-in. Overlaps pip-audit for default Python dependency coverage.",
      },
      {
        id: "grype",
        label: "Grype",
        description: "Container and filesystem vulnerability scanner.",
        opt: "Opt-in. Overlaps Trivy and OSV; memory-heavy.",
      },
      {
        id: "retire",
        label: "Retire.js",
        description: "JavaScript library vulnerability scanner.",
        opt: "Opt-in. Overlaps npm audit and OSV for default JavaScript coverage.",
      },
      {
        id: "snyk-open-source",
        label: "Snyk Open Source",
        description: "Snyk dependency vulnerability scanning.",
        opt: "Opt-in. Requires SNYK_TOKEN.",
      },
    ],
  },
  {
    id: "secrets-detection",
    title: "Secrets detection",
    body: "Pattern and entropy detection for committed credentials.",
    scanners: [
      { id: "gitleaks", label: "Gitleaks", description: "Detect hardcoded secrets in git history." },
      { id: "detect-secrets", label: "detect-secrets", description: "Yelp’s secret detection tool." },
      { id: "trufflehog", label: "TruffleHog", description: "High-entropy and verified secret detection." },
    ],
  },
  {
    id: "configuration-iac",
    title: "Configuration & IaC",
    body: "Cloud-native and container manifest checks.",
    scanners: [
      { id: "trivy", label: "Trivy", description: "Misconfiguration and vulnerability scanner." },
      { id: "checkov", label: "Checkov", description: "Infrastructure-as-code security scanner." },
      {
        id: "tfsec",
        label: "tfsec",
        description: "Terraform security scanner.",
        opt: "Opt-in. Superseded by Trivy’s Terraform/IaC coverage.",
      },
      { id: "hadolint", label: "Hadolint", description: "Dockerfile linter and security checker." },
      { id: "kube-linter", label: "kube-linter", description: "Kubernetes manifest linting for security gaps." },
    ],
  },
];

const capabilities = [
  {
    title: "Code review",
    body: "Reviews changed code for correctness, maintainability, and security-sensitive logic.",
  },
  {
    title: "Security analysis",
    body: "Combines static analysis, dependency audits, secret detection, and configuration review across the scanners listed below.",
  },
  {
    title: "Runtime verification",
    body: "Confirms high-confidence findings against the running app when a safe test target is available. Verified findings receive a verified flag and weigh more heavily in trust.",
  },
  {
    title: "Browser interaction testing",
    body: "Exercises reachable user flows in a sandboxed browser and records evidence for broken or risky behavior.",
  },
  {
    title: "Evidence packages",
    body: "Collects reproducible context, affected locations, and remediation guidance for confirmed issues. See ",
    linkLabel: "Findings & evidence",
    href: "/findings",
  },
];

export default function ScannersPage() {
  return (
    <DocPage
      href="/scanners"
      title="Scanners & runtime testing"
      description="Five capabilities make up a scan. Static, dependency, secret, and IaC scanners run alongside runtime testing in a sandboxed build of your repo."
      toc={[
        { id: "capabilities", title: "Capabilities", depth: 2 },
        { id: "scanners", title: "Scanners", depth: 2 },
        { id: "static-analysis", title: "Static analysis", depth: 3 },
        { id: "dependency-audit", title: "Dependency audit", depth: 3 },
        { id: "secrets-detection", title: "Secrets detection", depth: 3 },
        { id: "configuration-iac", title: "Configuration & IaC", depth: 3 },
        { id: "runtime-testing", title: "Runtime testing", depth: 2 },
        { id: "configuring", title: "Enabling and disabling tools", depth: 2 },
      ]}
    >
      <h2 id="capabilities" className="anchor-target">
        Capabilities
      </h2>
      <p>
        Each scan run draws from five capabilities. Coverage and skip reasons are reported per-tool, so the trust panel always tells you what actually ran.
      </p>
      <div className="not-prose grid gap-px border border-border bg-border sm:grid-cols-2">
        {capabilities.map((c) => (
          <div key={c.title} className="bg-bg-card p-5">
            <div className="text-[14px] font-bold tracking-[-0.02em]">{c.title}</div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">
              {c.body}
              {c.linkLabel && c.href ? (
                <Link href={c.href}>{c.linkLabel}</Link>
              ) : null}
              {c.linkLabel ? "." : null}
            </p>
          </div>
        ))}
      </div>

      <h2 id="scanners" className="anchor-target">
        Scanners
      </h2>
      <p>
        Twenty-five scanners cover four families. Default-enabled tools run automatically when the repo contains files they can analyze. Opt-in tools are available but disabled by default — usually because they overlap a default scanner or require external credentials.
      </p>

      <Callout tone="info">
        Coverage is tracked per-tool. Skipped scanners and missing credentials show up in the run’s trust panel — they don’t silently degrade the result.
      </Callout>

      {groups.map((group) => (
        <div key={group.id}>
          <h3 id={group.id} className="anchor-target">
            {group.title}
          </h3>
          <p>{group.body}</p>
          <div className="not-prose mt-3 grid gap-px border border-border bg-border sm:grid-cols-2">
            {group.scanners.map((s) => (
              <div key={s.id} className="bg-bg-card px-4 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-mono text-[11px] text-lime">{s.label}</div>
                  {s.opt ? (
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-amber">
                      opt-in
                    </span>
                  ) : null}
                </div>
                <div className="mt-1 text-[12.5px] text-text-secondary">{s.description}</div>
                {s.opt ? (
                  <div className="mt-1.5 text-[11.5px] leading-relaxed text-text-muted">{s.opt}</div>
                ) : null}
                <div className="mt-2 font-mono text-[10.5px] text-text-muted">id: {s.id}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h2 id="runtime-testing" className="anchor-target">
        Runtime testing
      </h2>
      <p>
        Runtime verification and browser interaction testing run inside the sandbox after the repo builds. They probe the app for reachable issues — input handling, auth surfaces, session management, request forgery, file uploads, and rate limits — and attach replay artifacts to any finding they confirm.
      </p>
      <p>
        Specific runtime agents are listed in the <strong>Security</strong> dashboard so you can toggle them per-account; opt into them with the runtime configuration in <Link href="/configuration"><code>.infiniview.yml</code></Link> or the dashboard. Runtime testing only fires for browser-based web apps the sandbox can build and serve — see <Link href="/github#unsupported">Unsupported apps</Link>.
      </p>

      <h2 id="configuring" className="anchor-target">
        Enabling and disabling tools
      </h2>
      <p>Two surfaces, one snapshot:</p>
      <ul>
        <li>
          <strong>Dashboard</strong> — Security configuration sets your defaults. Saved values become the base for every new scan.
        </li>
        <li>
          <strong>Repo</strong> — <code>.infiniview.yml</code> at the repo root overrides those defaults for any scan triggered from that branch. See <Link href="/configuration">Configuration</Link>.
        </li>
      </ul>
      <p>
        Repo config wins for overlapping fields. The merged result is frozen onto the run at trigger time, so editing settings mid-scan only affects later runs.
      </p>
    </DocPage>
  );
}
