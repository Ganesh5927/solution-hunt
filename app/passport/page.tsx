"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Participant = {
  firstName: string;
  lastName: string;
  participantId: string;
  college: string;
  email: string;
  phone: string;
};

type Team = {
  teamName: string;
  teamId: string;
  leaderId: string;
  members: { participantId: string }[];
};

const passportFeatures = [
  ["◎", "Participant Identity", "Your verified event identity"],
  ["◈", "Event Access", "Your passport opens the arena"],
  ["⌁", "Challenge Tracking", "Keep your selected track close"],
  ["◇", "Team Tracking", "Build your team from here"],
  ["↑", "Submission Tracking", "Follow your project journey"],
];

export default function PassportPage() {
  const router = useRouter();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("solutionHuntLoggedIn") === "true";
    const savedUser = localStorage.getItem("solutionHuntUser");

    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    if (!savedUser) {
      router.replace("/register");
      return;
    }

    const hydrationTimer = window.setTimeout(() => {
      try {
        const parsedParticipant = JSON.parse(savedUser) as Participant;
        setParticipant(parsedParticipant);
        const savedTeam = localStorage.getItem("solutionHuntTeam");
        const parsedTeam = savedTeam ? JSON.parse(savedTeam) as Team : null;
        setTeam(parsedTeam?.members.some((member) => member.participantId === parsedParticipant.participantId) ? parsedTeam : null);
        setCheckingSession(false);
      } catch {
        router.replace("/register");
      }
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("solutionHuntLoggedIn");
    router.push("/login");
  }

  if (checkingSession || !participant) {
    return <main className="passport-loading">Verifying passport...</main>;
  }

  const fullName = `${participant.firstName} ${participant.lastName}`;
  const qrValue = `${participant.participantId}:Solution Hunt 2026`;

  return (
    <main className="passport-page">
      <div className="passport-glow passport-glow-one" />
      <div className="passport-glow passport-glow-two" />

      <nav className="passport-nav">
        <Link href="/" className="participant-logo">
          <span className="participant-logo-mark">S</span>
          <span><strong>SOLUTION</strong><small>HUNT</small></span>
        </Link>
        <span className="passport-nav-title">HACKATHON PASSPORT</span>
        <div className="passport-nav-actions">
          <Link href="/dashboard" className="passport-back-link">← Back to Dashboard</Link>
          <button type="button" className="participant-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="passport-shell">
        <header className="passport-heading">
          <div>
            <p className="passport-eyebrow">SOLUTION HUNT 2026 / VERIFIED IDENTITY</p>
            <h1>Your <span>Hackathon Passport.</span></h1>
            <p>Carry your verified participant identity through every stage of the hunt.</p>
          </div>
          <button type="button" className="passport-print-button" onClick={() => window.print()}>▣ Print Passport</button>
        </header>

        <section className="passport-card" aria-label="Hackathon passport">
          <div className="passport-card-topline">
            <div>
              <p className="passport-card-label">SOLUTION HUNT</p>
              <h2>2026</h2>
            </div>
            <div className="passport-card-type">HACKATHON<br /><strong>PASSPORT</strong></div>
          </div>

          <div className="passport-card-body">
            <div className="passport-identity">
              <div className="passport-avatar">{participant.firstName.charAt(0)}{participant.lastName.charAt(0)}</div>
              <p className="passport-field-label">PARTICIPANT NAME</p>
              <h3>{fullName}</h3>
              <p className="passport-id">ID / {participant.participantId}</p>
            </div>

            <div className="passport-details">
              <div><span>COLLEGE / INSTITUTION</span><strong>{participant.college}</strong></div>
              <div><span>EMAIL</span><strong>{participant.email}</strong></div>
              <div><span>PHONE NUMBER</span><strong>{participant.phone}</strong></div>
              <div><span>PARTICIPANT TYPE</span><strong>PARTICIPANT</strong></div>
              <div><span>TEAM</span><strong>{team ? team.teamName : "NOT ASSIGNED"}</strong></div>
              <div><span>TEAM ROLE</span><strong>{team ? (team.leaderId === participant.participantId ? "TEAM LEADER" : "MEMBER") : "NOT ASSIGNED"}</strong></div>
            </div>

            <div className="passport-qr-panel">
              <div className="passport-qr" data-qr-value={qrValue} aria-label="Safe participant identifier QR placeholder">
                <i /><i /><i /><i /><i /><i /><i /><i /><b>SH</b>
              </div>
              <span>SCAN TO VERIFY<br />PARTICIPANT</span>
            </div>
          </div>

          <div className="passport-card-footer">
            <span><i className="passport-status-dot" /> REGISTRATION STATUS <strong>VERIFIED</strong></span>
            <span>EVENT ACCESS / 2026</span>
          </div>
        </section>

        <section className="passport-status-section" aria-label="Passport status">
          <div className="passport-section-heading"><span>01 / STATUS</span><p>Your current progress</p></div>
          <div className="passport-status-grid">
            <article className="passport-status-item is-verified"><span>✓</span><div><small>REGISTRATION</small><strong>VERIFIED</strong></div></article>
            <article className="passport-status-item"><span>◇</span><div><small>TEAM</small><strong>NOT CREATED</strong></div></article>
            <article className="passport-status-item"><span>⌁</span><div><small>CHALLENGE</small><strong>NOT SELECTED</strong></div></article>
            <article className="passport-status-item"><span>↑</span><div><small>SUBMISSION</small><strong>NOT STARTED</strong></div></article>
          </div>
        </section>

        <section className="passport-features-section" aria-label="Passport features">
          <div className="passport-section-heading"><span>02 / FEATURES</span><p>Everything in one identity</p></div>
          <div className="passport-feature-grid">
            {passportFeatures.map(([icon, title, description]) => (
              <article className="passport-feature-card" key={title}>
                <span className="passport-feature-icon">{icon}</span>
                <div><h2>{title}</h2><p>{description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <div className="passport-actions">
          <Link href="/dashboard" className="passport-secondary-action">← Back to Dashboard</Link>
          <Link href="/challenges" className="passport-primary-action">Explore Challenges <span>↗</span></Link>
        </div>
      </div>
    </main>
  );
}