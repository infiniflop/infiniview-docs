export type NavItem = {
  title: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const APP_URL = "https://app.infiniview.dev";
export const MARKETING_URL = "https://infiniview.dev";

export const NAV: NavGroup[] = [
  {
    label: "Get started",
    items: [
      { title: "Introduction", href: "/", description: "What Infiniview ships and how the docs are organized." },
      { title: "Quickstart", href: "/quickstart", description: "Five steps from sign-in to your first proof bundle." },
      { title: "Product surfaces", href: "/surfaces", description: "Reviews, Findings, Security, Settings, History, palette." },
    ],
  },
  {
    label: "Operate",
    items: [
      { title: "Scan workflow", href: "/workflow", description: "Trigger, snapshot, sandbox, proof, decide." },
      { title: "GitHub automation", href: "/github", description: "PR scans, debounce, trusted commands, ignored PRs." },
      { title: "Configuration", href: "/configuration", description: "Dashboard defaults, repo overrides, frozen snapshots." },
      { title: "Billing & plans", href: "/billing", description: "Plan status, checkout, upgrades, cancellation." },
    ],
  },
  {
    label: "Tooling",
    items: [
      { title: "Scanners & agents", href: "/scanners", description: "Static, dependency, secret, IaC scanners and runtime agents." },
    ],
  },
  {
    label: "Findings & proof",
    items: [
      { title: "Findings & evidence", href: "/findings", description: "Severity, fingerprints, evidence, replay, suppression." },
      { title: "Trust & readiness", href: "/trust", description: "Compare, trust score, readiness, rerun blockers." },
      { title: "Exports & bundles", href: "/exports", description: "Run CSV, backlog CSV, replay, proof bundles." },
    ],
  },
  {
    label: "Reference",
    items: [
      { title: "API contracts", href: "/api", description: "REST API endpoints for scans, findings, config, and more." },
      { title: "Troubleshooting", href: "/troubleshooting", description: "Common scan issues and how to resolve them." },
      { title: "Glossary", href: "/glossary", description: "Definitions for the terminology used across the docs." },
      { title: "Operator FAQ", href: "/faq", description: "Common questions about scans, findings, and configuration." },
    ],
  },
];

export const FLAT_NAV: NavItem[] = NAV.flatMap((g) => g.items);

export function getPager(href: string) {
  const i = FLAT_NAV.findIndex((it) => it.href === href);
  return {
    prev: i > 0 ? FLAT_NAV[i - 1] : null,
    next: i >= 0 && i < FLAT_NAV.length - 1 ? FLAT_NAV[i + 1] : null,
  };
}
