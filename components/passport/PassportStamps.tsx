import type { PassportItem } from "@/lib/types";

export default function PassportStamps({ stages }: { stages: PassportItem[] }) {
  return <div className="passport-stamps">{stages.map((stage, index) => <div className={`passport-stamp ${stage.complete ? "is-complete" : ""}`} key={stage.label}><span>{stage.complete ? "✓" : String(index + 1).padStart(2, "0")}</span><strong>{stage.shortLabel}</strong><small>{stage.label}</small></div>)}</div>;
}
