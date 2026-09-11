import Link from "next/link";

export function ButtonLink({ href, children, variant = "black", className = "" }: { href: string; children: React.ReactNode; variant?: "black" | "orange" | "outline"; className?: string }) {
  return <Link href={href} className={`button button-${variant} ${className}`}>{children}</Link>;
}

export function EmptyState({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <div className="empty-state"><span className="eyebrow">{eyebrow}</span><h3>{title}</h3><p>{body}</p></div>;
}
