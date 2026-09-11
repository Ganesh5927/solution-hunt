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
    if (!participant) return;
    if (!teamName.trim()) return notify("Enter a team name to continue.", "error");

    const nextTeam: Team = {
      teamId: `TEAM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      teamName: teamName.trim(),
      teamCode: makeCode(),
      leaderId: participant.registrationId,
      leaderName: participant.fullName,
      members: [{
        participantId: participant.registrationId,
        hackathonId: participant.registrationId,
        name: participant.fullName,
        college: participant.college,
        email: participant.email,
        phone: participant.phone,
        course: participant.department,
        year: participant.yearOfStudy,
        role: participant.participationType,
      }],
      registrationStatus: "VERIFIED",
      registeredAt: new Date().toISOString(),
    };

    const teams = JSON.parse(localStorage.getItem("solutionHuntTeams") || "[]") as Team[];
    localStorage.setItem("solutionHuntTeams", JSON.stringify([...teams, nextTeam]));
    setTeam(nextTeam);
    setTeamName("");
    notify("Team created successfully. Share your team code with your teammates.", "success");
  }

  function joinTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!participant) return;
    const entered = teamCode.trim().toUpperCase();
    if (!entered) return notify("Enter a valid team code.", "error");

    const teams = JSON.parse(localStorage.getItem("solutionHuntTeams") || "[]") as Team[];
    const selected = teams.find((item) => item.teamCode === entered);
    if (!selected) return notify("That team code could not be found.", "error");
    if (selected.members.some((member) => member.participantId === participant.registrationId)) return notify("You are already part of this team.", "success");

    const nextMember: TeamMember = {
      participantId: participant.registrationId,
      hackathonId: participant.registrationId,
      name: participant.fullName,
      college: participant.college,
      email: participant.email,
      phone: participant.phone,
      course: participant.department,
      year: participant.yearOfStudy,
      role: participant.participationType,
    };

    const nextTeam: Team = { ...selected, members: [...selected.members, nextMember] };
    const nextTeams = teams.map((item) => item.teamCode === entered ? nextTeam : item);
    localStorage.setItem("solutionHuntTeams", JSON.stringify(nextTeams));
    setTeam(nextTeam);
    setTeamCode("");
    notify("You joined the team successfully.", "success");
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
            <p className="team-eyebrow">SOLUTION HUNT 2026 / MY TEAM</p>
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
              <p>Start the build and invite other participants with a short team code.</p>
              <form onSubmit={createTeam}>
                <label htmlFor="team-name">Team name</label>
                <input id="team-name" value={teamName} onChange={(event) => setTeamName(event.target.value)} placeholder="e.g. Signal Works" maxLength={40} />
                <button className="team-primary-button" type="submit">Create team ↗</button>
              </form>
            </article>

            <article className="team-card">
              <p className="eyebrow">FIND YOUR CREW</p>
              <h2>Join a team</h2>
              <p>Enter a team code shared by a participant on this device.</p>
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
              <span className="mono">{team.members.length} / 4 MEMBERS</span>
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
