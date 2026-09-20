"use client";

import Link from "next/link";
import { useState } from "react";
import type { Team, Participant } from "@/lib/types";

type RegistrationResult = { team: Team; leader: Participant };

export default function RegistrationSuccessPage() {
  const [result] = useState<RegistrationResult | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem("solutionHuntRegistrationResult");
    return raw ? JSON.parse(raw) as RegistrationResult : null;
  });
  const team = result?.team;
  return <main className="team-registration-page registration-success-page">
    <aside className="team-registration-aside"><Link href="/" className="wordmark"><span className="wordmark-mark">N</span><span><strong>NEXORA</strong><small>2026</small></span></Link><div><span className="eyebrow">NEXORA 2026 / VERIFIED</span><h1>Welcome to<br /><span>your future.</span></h1><p>Your team registration and individual participant passes are ready.</p></div><span className="mono">BUILD · SOLVE · TRANSFORM</span></aside>
    <section className="team-registration-main"><div className="team-registration-wrap success-content"><span className="eyebrow">REGISTRATION CONFIRMED</span><h2>Welcome to NEXORA 2026.</h2><div className="success-id-grid team-confirmation-grid"><div><span>TEAM NAME</span><strong>{team?.teamName || "TEAM REGISTRATION"}</strong></div><div><span>TEAM SIZE</span><strong>{team ? `${team.members.length} MEMBERS` : "—"}</strong></div><div><span>TEAM LEADER</span><strong>{team?.leaderName || "—"}</strong></div><div><span>REGISTRATION STATUS</span><strong className="confirmed-text">CONFIRMED</strong></div></div><div className="admin-issuance-note"><strong>Participant IDs generated</strong><p>Unique Hackathon IDs and QR codes have been created for every team member. The ID cards are available to event admins for printing and issue.</p></div><div className="registration-actions"><Link href="/participant" className="button button-orange">OPEN PARTICIPANT DASHBOARD <span>↗</span></Link><Link href="/team" className="button button-outline">VIEW TEAM</Link></div></div></section>
+  </main>;
}
