"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/navigation/SiteHeader";
import { getCurrentParticipant } from "@/lib/identity";
import type { Participant, Team, TeamMember } from "@/lib/types";

function makeCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function TeamPage() {
  const router = useRouter();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const current = getCurrentParticipant();
    if (!current) {
      router.replace("/participant-portal");
      return;
    }

    const storedTeams = JSON.parse(localStorage.getItem("solutionHuntTeams") || "[]") as Team[];
    const found = storedTeams.find((item) => item.members.some((member) => member.participantId === current.registrationId)) ?? null;
    setParticipant(current);
    setTeam(found);
    setChecking(false);
  }, [router]);

  function notify(text: string, type: "success" | "error") {
    setMessage(text);
    setMessageType(type);
  }

  function createTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    notify("Teams must be registered with 4–6 members. Complete the team registration form.", "error");
  }

  function joinTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    notify("Team members are registered together. Return to the team registration form.", "error");
  }

  if (checking || !participant) {
    return <main className="team-shell"><p className="mono">OPENING TEAM WORKSPACE...</p></main>;
  }

  return (
    <main className="team-page">
      <SiteHeader authenticated />
      <div className="team-shell">
        <header className="team-heading">
          <div>
            <p className="team-eyebrow">NEXORA 2026 / MY TEAM</p>
            <h1>My <span>team.</span></h1>
            <p>Build or join a team together and prepare your challenge strategy.</p>
          </div>
          {team && <span className="eyebrow">TEAM ACTIVE</span>}
        </header>

        {message && <p className={`team-message is-${messageType}`} role={messageType === "error" ? "alert" : "status"}>{message}</p>}

        {!team ? (
          <section className="team-setup-grid">
            <article className="team-card">
              <p className="eyebrow">START THE BUILD</p>
              <h2>Create a team</h2>
              <p>Register your complete team together. Teams must have 4–6 members.</p>
              <form onSubmit={createTeam}>
                <label htmlFor="team-name">Team name</label>
                <input id="team-name" value={teamName} onChange={(event) => setTeamName(event.target.value)} placeholder="e.g. Signal Works" maxLength={40} />
                <button className="team-primary-button" type="submit">Create team ↗</button>
              </form>
            </article>

            <article className="team-card">
              <p className="eyebrow">FIND YOUR CREW</p>
              <h2>Join a team</h2>
              <p>Existing team members receive their own participant pass after registration.</p>
              <form onSubmit={joinTeam}>
                <label htmlFor="team-code">Team code</label>
                <input id="team-code" value={teamCode} onChange={(event) => setTeamCode(event.target.value)} placeholder="6-character code" maxLength={6} />
                <button className="team-secondary-button" type="submit">Join team ↗</button>
              </form>
            </article>
          </section>
        ) : (
          <section className="team-dashboard">
            <header className="team-dashboard-header">
              <div>
                <p className="eyebrow">TEAM IDENTITY</p>
                <h2>{team.teamName}</h2>
                <p>{team.teamId}</p>
              </div>
                <span className="mono" style={{ color: "#A8FF3E" }}>{team.members.length} / 6 MEMBERS</span>
            </header>

            <div className="team-overview-grid">
              <div><span>TEAM LEADER</span><strong>{team.leaderName}</strong></div>
              <div><span>TEAM CODE</span><strong>{team.teamCode}</strong></div>
              <div><span>PROBLEM</span><strong>NOT SELECTED</strong></div>
            </div>

            <div className="team-members-panel">
              <div className="team-panel-heading">
                <h3>Team Members</h3>
                <span>{team.members.length} members</span>
              </div>
              <div className="team-member-list">
                {team.members.map((member) => (
                  <div className="team-member-row" key={member.participantId}>
                    <div className="team-member-avatar">{member.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
                    <div className="team-member-info">
                      <strong>{member.name}</strong>
                      <span>{member.college}</span>
                    </div>
                    <span className="mono">{member.participantId === team.leaderId ? "LEADER" : "MEMBER"}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
