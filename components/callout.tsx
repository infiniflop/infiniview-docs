import { Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "info" | "warn" | "ok";

const TONE_MAP: Record<
  Tone,
  { icon: typeof Info; border: string; iconColor: string; label: string }
> = {
  info: {
    icon: Info,
    border: "border-l-lime",
    iconColor: "text-lime",
    label: "Note",
  },
  warn: {
    icon: AlertTriangle,
    border: "border-l-amber",
    iconColor: "text-amber",
    label: "Heads up",
  },
  ok: {
    icon: CheckCircle2,
    border: "border-l-green",
    iconColor: "text-green",
    label: "Verified",
  },
};

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: Tone;
  title?: string;
  children: React.ReactNode;
}) {
  const cfg = TONE_MAP[tone];
  const Icon = cfg.icon;
  return (
    <div
      className={cn(
        "border border-border border-l-[3px] bg-bg-elevated px-4 py-4 text-[14px] leading-relaxed text-text-secondary",
        cfg.border,
      )}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <Icon className={cn("h-3.5 w-3.5", cfg.iconColor)} />
        <span className={cn("font-mono text-[10.5px] uppercase tracking-[0.18em]", cfg.iconColor)}>
          {title ?? cfg.label}
        </span>
      </div>
      <div className="text-text-secondary">{children}</div>
    </div>
  );
}
