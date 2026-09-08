"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Participant = {
  firstName: string;
  lastName: string;
  college: string;
  participantId: string;
};

type Team = {
  teamName: string;
  members: { participantId: string }[];
};

const leaderboard = [
  ["2", "Team Alpha", "94.8 pts"],
  ["3", "Cyber Titans", "92.4 pts"],
  ["4", "Innovators", "89.7 pts"],
  ["5", "Code Hunters", "87.9 pts"],
  ["6", "Secure Minds", "85.6 pts"],
];

const announcements = [
  ["01", "Registration successfully completed", "Just now"],
  ["02", "Challenge selection will open soon", "Today"],
  ["03", "Stay tuned for hackathon updates", "Coming up"],
];

export default function DashboardPage() {
  const router = useRouter();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("solutionHuntLoggedIn") === "true";
    const savedUser = localStorage.getItem("solutionHuntUser");

    if (!isLoggedIn || !savedUser) {
      router.replace("/login");
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
        localStorage.removeItem("solutionHuntLoggedIn");
        router.replace("/login");
      }
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("solutionHuntLoggedIn");
    router.push("/login");
  }

  if (checkingSession || !participant) {
    return <main className="participant-dashboard-loading">Opening portal...</main>;
  }

  const fullName = `${participant.firstName} ${participant.lastName}`;
  const initials = `${participant.firstName.charAt(0)}${participant.lastName.charAt(0)}`;

  return (
    <main className="participant-dashboard">
      <div className="participant-dashboard-glow participant-dashboard-glow-one" />
      <div className="participant-dashboard-glow participant-dashboard-glow-two" />

      <nav className="participant-nav">
        <Link href="/" className="participant-logo">
          <span className="participant-logo-mark">S</span>
          <span><strong>SOLUTION</strong><small>HUNT</small></span>
        </Link>
        <span className="participant-portal-label">PARTICIPANT PORTAL</span>
        <div className="participant-nav-links">
          <a href="#dashboard" className="participant-nav-link is-active">Dashboard</a>
          <Link href="/challenges" className="participant-nav-link">Challenges</Link>
          <a href="#passport" className="participant-nav-link">Passport</a>
          <a href="#profile" className="participant-nav-link">Profile</a>
          <button type="button" className="participant-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="participant-dashboard-shell" id="dashboard">
        <header className="participant-welcome" id="profile">
          <div>
            <p className="participant-eyebrow">SOLUTION HUNT 2026 / DASHBOARD</p>
            <h1>Welcome back, <span>{participant.firstName}!</span></h1>
            <p className="participant-welcome-copy">Your Solution Hunt 2026 journey starts here.</p>
          </div>
          <div className="participant-profile-summary">
            <div className="participant-avatar">{initials}</div>
            <div><strong>{fullName}</strong><span>{participant.college}</span><small>{participant.participantId}</small></div>
          </div>
        </header>

        <section className="participant-status-grid" aria-label="Participant status">
          <article className="participant-status-card status-confirmed"><span className="participant-status-icon">✓</span><div><small>REGISTRATION</small><strong>Confirmed</strong><span>Account is active</span></div><b>01</b></article>
          <article className="participant-status-card"><span className="participant-status-icon">◇</span><div><small>TEAM</small><strong>{team ? team.teamName : "Not Created"}</strong><span>{team ? `${team.members.length} member${team.members.length === 1 ? "" : "s"}` : "Find your co-builders"}</span></div><b>02</b></article>
          <article className="participant-status-card"><span className="participant-status-icon">⌁</span><div><small>CHALLENGE</small><strong>Not Selected</strong><span>Choose your track</span></div><b>03</b></article>
          <article className="participant-status-card"><span className="participant-status-icon">↑</span><div><small>SUBMISSION</small><strong>Not Started</strong><span>Your project awaits</span></div><b>04</b></article>
        </section>

        <section className="participant-main-grid">
          <article className="participant-passport-card" id="passport">
            <div className="participant-section-kicker"><span /> HACKATHON PASSPORT</div>
            <h2>Hackathon <span>Passport</span></h2>
            <p>Your digital identity for Solution Hunt 2026.</p>
            <div className="participant-passport-details"><div><small>PARTICIPANT ID</small><strong>{participant.participantId}</strong></div><div><small>STATUS</small><strong className="is-live">ACTIVE</strong></div></div>
            <Link href="/passport" className="participant-outline-button">View Passport <span>↗</span></Link>
            <div className="participant-qr-placeholder" aria-label="QR placeholder"><i /><i /><i /><i /><b>SH</b></div>
          </article>

          <article className="participant-challenge-card">
            <div className="participant-card-topline"><span>01 / 06</span><span className="participant-open-dot">OPEN</span></div>
            <h2>Choose your <span>challenge.</span></h2>
            <p>Explore the available challenge tracks and select the problem you want to solve.</p>
            <Link href="/challenges" className="participant-primary-button">Explore Challenges <span>→</span></Link>
            <div className="participant-track-lines"><i /><i /><i /><i /><i /><i /></div>
          </article>
        </section>

        <section className="participant-secondary-grid" id="team">
          <article className="participant-team-card">
            <div className="participant-section-kicker"><span /> COLLABORATION</div>
            <h2>My <span>Team</span></h2>
            <p>{team ? `${team.teamName} · ${team.members.length} member${team.members.length === 1 ? "" : "s"}` : "Create or join a team to participate in the hackathon."}</p>
            <div className="participant-team-actions"><Link href="/team">{team ? "Manage Team" : "Create Team"} <span>{team ? "↗" : "+"}</span></Link></div>
          </article>

          <article className="participant-leaderboard-card" id="leaderboard">
            <div className="participant-panel-heading"><div><span className="participant-section-kicker"><span /> LIVE PREVIEW</span><h2>Leaderboard</h2></div><button type="button">View Leaderboard ↗</button></div>
            <div className="participant-leaderboard-list">{leaderboard.map(([rank, team, score]) => <div key={rank}><b>{rank}</b><span>{team}</span><small>{score}</small></div>)}</div>
            <p className="participant-demo-note">Demo standings · updated periodically</p>
          </article>
        </section>

        <section className="participant-bottom-grid" id="submission">
          <article className="participant-announcements-card">
            <div className="participant-panel-heading"><div><span className="participant-section-kicker"><span /> EVENT SIGNALS</span><h2>Announcements</h2></div><span className="participant-live-pill">LIVE</span></div>
            <div className="participant-announcement-list">{announcements.map(([number, title, time]) => <div key={number}><b>{number}</b><span><strong>{title}</strong><small>{time}</small></span><i>↗</i></div>)}</div>
          </article>

          <article className="participant-quick-actions-card">
            <div className="participant-section-kicker"><span /> QUICK ACTIONS</div>
            <h2>Keep moving.</h2>
            <div className="participant-action-grid"><Link href="/challenges">Explore Challenges <span>↗</span></Link><a href="#passport">Hackathon Passport <span>↗</span></a><a href="#team">My Team <span>↗</span></a><a href="#submission">Submission <span>↗</span></a><a href="#leaderboard">Leaderboard <span>↗</span></a></div>
          </article>
        </section>
      </div>

      <footer className="participant-footer"><strong>Solution Hunt 2026</strong><span>Think. Build. Solve. Win.</span></footer>
    </main>
  );
}
