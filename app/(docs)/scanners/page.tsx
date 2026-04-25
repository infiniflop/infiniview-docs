import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";

export const metadata: Metadata = {
  title: "Scanners & agents",
  description:
    "Static, dependency, secret, and configuration scanners alongside runtime agents. Toggle them in dashboard or .infiniview.yml.",
};

const scannerGroups = [
  {
    title: "Static analysis",
    body: "Source-level rule engines run against the cloned repo without execution.",
    items: [
      "Semgrep",
      "ESLint Security",
      "Bandit",
      "gosec",
      "Brakeman",
      "SpotBugs",
      "PHPStan",
      "Bearer",
      "njsscan",
      "SonarQube",
    ],
  },
  {
    title: "Dependency audit",
    body: "Manifest- and lockfile-driven CVE detection across language ecosystems.",
    items: [
      "npm audit",
      "pip-audit",
      "cargo-audit",
      "OSV Scanner",
      "Safety",
      "Grype",
      "Retire.js",
      "Snyk Open Source",
    ],
  },
  {
    title: "Secrets detection",
    body: "Pattern and entropy detection for committed credentials.",
    items: ["Gitleaks", "detect-secrets", "TruffleHog"],
  },
  {
    title: "Configuration & IaC",
    body: "Cloud-native and container manifest checks.",
    items: ["Trivy", "Checkov", "tfsec", "Hadolint", "kube-linter"],
  },
];

const agents = [
  ["API Fuzzer", "Malformed HTTP input testing"],
  ["Injection Tester", "SQL, NoSQL, and OS injection payloads"],
  ["UI Crawler", "Automated navigation and element discovery"],
  ["SSRF Prober", "Server-side request forgery checks"],
  ["CORS Tester", "Cross-origin policy testing"],
  ["Session Tester", "Session management weaknesses"],
  ["Crypto Auditor", "Cryptographic implementation review"],
  ["Auth Attacker", "LLM-guided authentication attacks"],
  ["Business Logic Prober", "LLM-guided flow abuse testing"],
  ["Prompt Injection Tester", "AI endpoint prompt injection testing"],
  ["File Upload Tester", "Upload vulnerability checks"],
  ["Rate Limit Tester", "Brute-force and throttling checks"],
];

export default function ScannersPage() {
  return (
    <DocPage
      href="/scanners"
      title="Scanners & runtime agents"
      description="Static, dependency, secret, and configuration scanners run during sandbox execution alongside runtime agents. Toggle them in dashboard configuration or .infiniview.yml."
      toc={[
        { id: "scanners", title: "Scanners", depth: 2 },
        { id: "static-analysis", title: "Static analysis", depth: 3 },
        { id: "dependency-audit", title: "Dependency audit", depth: 3 },
        { id: "secrets-detection", title: "Secrets detection", depth: 3 },
        { id: "configuration-iac", title: "Configuration & IaC", depth: 3 },
        { id: "runtime-agents", title: "Runtime agents", depth: 2 },
      ]}
    >
      <h2 id="scanners" className="anchor-target">
        Scanners
      </h2>
      <p>
        Each scanner runs against the cloned repo in the sandbox. Coverage is tracked per-tool: skipped scanners, missing credentials, and degraded execution show up in the run&rsquo;s trust score.
      </p>

      {scannerGroups.map((group) => {
        const id = group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        return (
          <div key={group.title}>
            <h3 id={id} className="anchor-target">
              {group.title}
            </h3>
            <p>{group.body}</p>
            <div className="not-prose mt-3 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 md:grid-cols-4">
              {group.items.map((name) => (
                <div
                  key={name}
                  className="bg-bg-card px-3 py-2 font-mono text-[11px] text-text-secondary"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <h2 id="runtime-agents" className="anchor-target">
        Runtime agents
      </h2>
      <p>
        Runtime agents probe the running app inside the sandbox. They&rsquo;re opt-in per scan and share the run&rsquo;s wall-clock and per-agent timeouts.
      </p>
      <div className="not-prose mt-4 grid gap-px border border-border bg-border sm:grid-cols-2">
        {agents.map(([name, body]) => (
          <div key={name} className="bg-bg-card px-4 py-3.5">
            <div className="font-mono text-[11px] text-lime">{name}</div>
            <div className="mt-1 text-[12.5px] text-text-secondary">{body}</div>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
