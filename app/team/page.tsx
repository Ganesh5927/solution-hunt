"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Participant = {
  firstName: string;
  lastName: string;
  participantId: string;
  college: string;
};

type TeamMember = {
  participantId: string;
  name: string;
  college: string;
};

type Team = {
  teamId: string;
  teamName: string;
  teamCode: string;
  leaderId: string;
  leaderName: string;
  members: TeamMember[];
};

function parseTeam(savedTeam: string | null) {
  if (!savedTeam) return null;

  try {
    const parsedTeam = JSON.parse(savedTeam) as Team;
    if (!parsedTeam || typeof parsedTeam.teamCode !== "string" || !Array.isArray(parsedTeam.members)) return null;

    return {
      ...parsedTeam,
      teamCode: parsedTeam.teamCode.toUpperCase(),
    };
  } catch {
    return null;
  }
}

function createTeamCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function createTeamId() {
  return `SH-TEAM-${String(Date.now()).slice(-4)}`;
}

export default function TeamPage() {
  const router = useRouter();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [copyFeedback, setCopyFeedback] = useState(false);
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
        setParticipant(JSON.parse(savedUser) as Participant);
        const savedTeam = localStorage.getItem("solutionHuntTeam");
        const parsedTeam = parseTeam(savedTeam);
        setTeam(parsedTeam);
        if (savedTeam && !parsedTeam) {
          showMessage("Team data is corrupted. Please create a new team.", "error");
        }
        setCheckingSession(false);
      } catch {
        router.replace("/login");
      }
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, [router]);

  function showMessage(nextMessage: string, type: "success" | "error") {
    setMessage(nextMessage);
    setMessageType(type);
  }

  function memberForParticipant() {
    if (!participant) return null;

    return {
      participantId: participant.participantId,
      name: `${participant.firstName} ${participant.lastName}`,
      college: participant.college,
    };
  }

  function handleCreateTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = teamName.trim();
    const member = memberForParticipant();

    if (!trimmedName) {
      showMessage("Please enter a team name.", "error");
      return;
    }

    if (!member || team) return;

    const nextTeam: Team = {
      teamId: createTeamId(),
      teamName: trimmedName,
      teamCode: createTeamCode(),
      leaderId: member.participantId,
      leaderName: member.name,
      members: [member],
    };

    localStorage.setItem("solutionHuntTeam", JSON.stringify(nextTeam));
    setTeam(nextTeam);
    setTeamName("");
    showMessage("Team created successfully. Share your invite code with teammates.", "success");
  }

  function handleJoinTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setCopyFeedback(false);

    const enteredCode = teamCode.trim().toUpperCase();

    if (!enteredCode) {
      showMessage("Please enter a team code.", "error");
      return;
    }

    const storedUser = localStorage.getItem("solutionHuntUser");
    if (!storedUser) {
      showMessage("Please login again.", "error");
      router.replace("/login");
      return;
    }

    let user: Participant;
    try {
      user = JSON.parse(storedUser) as Participant;
    } catch {
      showMessage("Your participant data is corrupted. Please login again.", "error");
      router.replace("/login");
      return;
    }

    const storedTeamValue = localStorage.getItem("solutionHuntTeam");
    if (!storedTeamValue) {
      showMessage("No team found with this code.", "error");
      return;
    }

    let storedTeam: Team;
    try {
      storedTeam = JSON.parse(storedTeamValue) as Team;
    } catch {
      showMessage("Team data is corrupted. Please create a new team.", "error");
      return;
    }

    if (!storedTeam || typeof storedTeam.teamCode !== "string" || !Array.isArray(storedTeam.members)) {
      showMessage("Team data is corrupted. Please create a new team.", "error");
      return;
    }

    const normalizedTeam = {
      ...storedTeam,
      teamCode: storedTeam.teamCode.toUpperCase(),
    };

    if (enteredCode !== normalizedTeam.teamCode) {
      showMessage("Invalid team code.", "error");
      return;
    }

    if (normalizedTeam.members.some((member) => member.participantId === user.participantId)) {
      setTeam(normalizedTeam);
      showMessage("You are already a member of this team.", "error");
      return;
    }

    if (normalizedTeam.members.length >= 4) {
      showMessage("Team is full.", "error");
      return;
    }

    const newMember: TeamMember = {
      participantId: user.participantId,
      name: `${user.firstName} ${user.lastName}`,
      college: user.college,
    };

    const updatedTeam = {
      ...normalizedTeam,
      members: [...normalizedTeam.members, newMember],
    };
    localStorage.setItem("solutionHuntTeam", JSON.stringify(updatedTeam));
    setParticipant(user);
    setTeam(updatedTeam);
    setTeamCode("");
    showMessage("You joined the team successfully!", "success");
  }

  function handleLeaveTeam() {
    if (!team || !participant) return;

    if (!team.members.some((member) => member.participantId === participant.participantId)) return;

    if (team.leaderId === participant.participantId && team.members.length > 1) {
      showMessage("Team leaders cannot leave while other members are in the team.", "error");
      return;
    }

    if (!window.confirm("Leave this team?")) return;

    if (team.leaderId === participant.participantId) {
      localStorage.removeItem("solutionHuntTeam");
      setTeam(null);
    } else {
      const nextTeam = {
        ...team,
        members: team.members.filter((member) => member.participantId !== participant.participantId),
      };
      localStorage.setItem("solutionHuntTeam", JSON.stringify(nextTeam));
      setTeam(nextTeam);
    }
    showMessage("You left the team.", "success");
  }

  function handleLogout() {
    localStorage.removeItem("solutionHuntLoggedIn");
    router.push("/login");
  }

  async function handleCopyCode() {
    if (!team) return;

    try {
      await navigator.clipboard.writeText(team.teamCode);
      setCopyFeedback(true);
      window.setTimeout(() => setCopyFeedback(false), 2200);
    } catch {
      showMessage("Copy unavailable. Select the code manually.", "error");
    }
  }

  if (checkingSession || !participant) {
    return <main className="team-loading">Opening team workspace...</main>;
  }

  const isTeamMember = Boolean(team?.members.some((member) => member.participantId === participant.participantId));

  return (
    <main className="team-page">
      <div className="team-glow team-glow-one" />
      <div className="team-glow team-glow-two" />

      <nav className="team-nav">
        <Link href="/" className="participant-logo">
          <span className="participant-logo-mark">S</span>
          <span><strong>SOLUTION</strong><small>HUNT</small></span>
        </Link>
        <span className="team-nav-title">TEAM MANAGEMENT</span>
        <div className="team-nav-links">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/challenges">Challenges</Link>
          <Link href="/passport">Passport</Link>
          <button type="button" className="participant-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="team-shell">
        <header className="team-heading">
          <div>
            <p className="team-eyebrow">SOLUTION HUNT 2026 / COLLABORATION</p>
            <h1>My <span>Team.</span></h1>
            <p>Create or join a team and build your solution together.</p>
          </div>
          {team && isTeamMember && <div className="team-active-pill"><i /> TEAM ACTIVE</div>}
        </header>

        {message && <p className={`team-message is-${messageType}`} role={messageType === "error" ? "alert" : "status"}>{message}</p>}

        {!team ? (
          <section className="team-setup-grid" aria-label="Team setup">
            {!team && <article className="team-setup-card team-create-card">
              <span className="team-card-icon">+</span>
              <p className="team-card-kicker">START THE BUILD</p>
              <h2>Create a Team</h2>
              <p>Start your own hackathon team and invite other participants.</p>
              <form onSubmit={handleCreateTeam}>
                <label htmlFor="team-name">Team Name</label>
                <input id="team-name" value={teamName} onChange={(event) => setTeamName(event.target.value)} placeholder="e.g. Quantum Builders" maxLength={40} />
                <button type="submit" className="team-primary-button">Create Team <span>→</span></button>
              </form>
            </article>}

            <article className="team-setup-card team-join-card">
              <span className="team-card-icon">↗</span>
              <p className="team-card-kicker">FIND YOUR CREW</p>
              <h2>Join a Team</h2>
              <p>Enter the team code shared by your team leader.</p>
              <form onSubmit={handleJoinTeam}>
                <label htmlFor="team-code">Team Code</label>
                <input id="team-code" value={teamCode} onChange={(event) => setTeamCode(event.target.value)} placeholder="6-character code" maxLength={6} />
                <button type="submit" className="team-secondary-button">Join Team <span>↗</span></button>
              </form>
              {process.env.NODE_ENV !== "production" && <small className="team-demo-helper">Demo: Create a team first to generate a team code.</small>}
            </article>
          </section>
        ) : (
          <section className="team-dashboard" aria-label="Team dashboard">
            <header className="team-dashboard-header">
              <div><p className="team-card-kicker">TEAM IDENTITY</p><h2>{team.teamName}</h2><p>{team.teamId}</p></div>
              <div className="team-active-label"><i /> ACTIVE</div>
            </header>

            <div className="team-overview-grid">
              <div><span>TEAM LEADER</span><strong>{team.leaderName}</strong></div>
              <div><span>TEAM CODE</span><strong>{team.teamCode}</strong></div>
              <div><span>MEMBERS</span><strong>{team.members.length} / 4</strong></div>
            </div>

            <aside className="team-invite-card team-invite-feature">
              <div>
                <p className="team-card-kicker">INVITE YOUR TEAMMATES</p>
                <h3>Share your team code.</h3>
                <p>Share your team code with participants so they can join your team.</p>
              </div>
              <div className="team-invite-code-row"><strong>{team.teamCode}</strong><button type="button" className="team-copy-button" onClick={handleCopyCode}>▣ Copy Team Code</button></div>
              {copyFeedback && <span className="team-copy-feedback" role="status">Team code copied!</span>}
              <div className="team-how-to-join"><strong>How to join</strong><ol><li>Open Team Management</li><li>Select Join Team</li><li>Enter this team code</li><li>Click Join Team</li></ol></div>
            </aside>

            <section className="team-members-panel team-members-section">
              <div className="team-panel-heading"><div><p className="team-card-kicker">TEAM MEMBERS</p><h3>Your build crew</h3></div><span>{team.members.length} / 4 ACTIVE</span></div>
              <div className="team-member-list">
                {team.members.map((member) => (
                  <div className="team-member-row" key={member.participantId}>
                    <div className="team-member-avatar">{member.name.split(" ").map((part) => part.charAt(0)).join("").slice(0, 2)}</div>
                    <div className="team-member-info"><strong>{member.name}</strong><span>{member.college}</span></div>
                    <div className="team-member-meta"><span>{member.participantId}</span><b>{member.participantId === team.leaderId ? "TEAM LEADER" : "MEMBER"}</b></div>
                  </div>
                ))}
              </div>
            </section>

            <div className="team-stats-grid">
              <div><span>TEAM MEMBERS</span><strong>{team.members.length}</strong></div>
              <div><span>MAXIMUM MEMBERS</span><strong>4</strong></div>
              <div><span>CHALLENGE</span><strong>NOT SELECTED</strong></div>
              <div><span>SUBMISSION</span><strong>NOT STARTED</strong></div>
            </div>

            <div className="team-dashboard-actions">
              <Link href="/challenges" className="team-primary-button">Explore Challenges <span>↗</span></Link>
              <Link href="/passport" className="team-secondary-button">Hackathon Passport <span>↗</span></Link>
              <Link href="/dashboard" className="team-secondary-button">Back to Dashboard</Link>
            </div>
            {!isTeamMember && <section className={`team-join-existing ${team.members.length >= 4 ? "is-full" : ""}`}>
              <div><p className="team-card-kicker">JOIN A TEAM</p><h3>Enter a team code</h3><p>Use a code shared by a team leader on this device.</p></div>
              <form onSubmit={handleJoinTeam}><label htmlFor="existing-team-code">Team Code</label><div className="team-join-inline"><input id="existing-team-code" value={teamCode} onChange={(event) => setTeamCode(event.target.value)} placeholder="6-character code" maxLength={6} disabled={team.members.length >= 4} /><button type="submit" className="team-secondary-button" disabled={team.members.length >= 4}>Join Team <span>↗</span></button></div></form>
              {team.members.length >= 4 && <strong className="team-full-label">Team is full</strong>}
            </section>}
            {isTeamMember && <button type="button" className="team-leave-button" onClick={handleLeaveTeam}>Leave Team</button>}
          </section>
        )}
      </div>
    </main>
  );
}