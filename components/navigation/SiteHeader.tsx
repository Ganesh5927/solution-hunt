"use client";

import Link from "next/link";
import { useState } from "react";
import { publicNav } from "@/lib/constants";

export default function SiteHeader({ authenticated = false }: { authenticated?: boolean }) {
  const [open, setOpen] = useState(false);
  const links = authenticated
    ? [
        { label: "Dashboard", href: "/participant" },
        { label: "My Registration", href: "/participant#registration" },
        { label: "My Team", href: "/team" },
        { label: "My Challenge", href: "/challenges" },
        { label: "Schedule", href: "/participant#schedule" },
        { label: "Announcements", href: "/participant#announcements" },
      ]
    : publicNav;

  return (
    <header className={`site-header ${authenticated ? "site-header-auth" : ""}`}>
      <div className="site-header-inner">
        <Link href="/" className="wordmark" onClick={() => setOpen(false)}>
          <span className="wordmark-mark">S</span>
          <span><strong>SOLUTION</strong><small>HUNT</small></span>
        </Link>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
        <nav className={`site-nav ${open ? "is-open" : ""}`}>
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          {authenticated ? (
            <Link href="/participant-portal" className="nav-utility" onClick={() => { localStorage.removeItem("solutionHuntCurrentParticipant"); setOpen(false); }}>Exit</Link>
          ) : (
            <>
              <Link href="/participant-portal" className="nav-utility" onClick={() => setOpen(false)}>PARTICIPANT PORTAL</Link>
              <Link href="/register" className="button button-orange nav-cta" onClick={() => setOpen(false)}>REGISTER NOW <span>↗</span></Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
