"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ParticipantIdCard from "@/components/admin/ParticipantIdCard";
import { listParticipants } from "@/lib/identity";
import type { Participant } from "@/lib/types";

const stats = [
  { label: "Participants", value: "200+" },
  { label: "Teams", value: "50" },
  { label: "Challenges", value: "6" },
  { label: "Judges", value: "12" },
];

const queue = [
  "Review final mentor feedback",
  "Approve challenge submissions",
  "Confirm judging slots",
  "Publish leaderboard update",
];

export default function AdminPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const loadParticipants = window.setTimeout(() => setParticipants(listParticipants()), 0);
    return () => window.clearTimeout(loadParticipants);
  }, []);
  const liveStats = stats.map((item) => item.label === "Participants" ? { ...item, value: String(participants.length) } : item);

  return (
    <main className="platform-page admin-page">
      <nav className="platform-nav">
        <Link href="/" className="brand">
          <span className="brand-mark">S</span>
          <span>
            <strong>SOLUTION</strong>
            <small>HUNT</small>
          </span>
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/updates">Updates</Link>
          <Link href="/judge">Judge</Link>
          <Link href="/admin" className="active">Admin</Link>
          <Link href="/verify/scan?role=Admin">QR Verify</Link>
        </div>

        <div className="nav-actions">
          <Link href="/login" className="ghost-button small-button">Login</Link>
          <Link href="/register" className="primary-button small-button">Register</Link>
        </div>
      </nav>

      <section className="page-shell">
        <header className="page-header">
          <div>
            <span className="eyebrow">ADMIN CONSOLE</span>
            <h1>
              Event <span>operations.</span>
            </h1>
          </div>
          <div className="header-status">
            <span className="pulse-dot" />
            System healthy
          </div>
        </header>

        <div className="stats-card-grid">
          {liveStats.map((item) => (
            <article className="metric-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>Live status</small>
            </article>
          ))}
        </div>

        <div className="admin-grid">
          <section className="panel-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">QUEUE</span>
                <h2>Priority actions</h2>
              </div>
            </div>

            <ul className="task-list">
              {queue.map((task, index) => (
                <li key={task}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{task}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">OPERATIONS</span>
                <h2>Current status</h2>
              </div>
            </div>

            <div className="status-stack">
              <div className="small-status"><strong>Registration</strong><span>Open</span></div>
              <div className="small-status"><strong>Challenges</strong><span>Live</span></div>
              <div className="small-status"><strong>Judging</strong><span>In progress</span></div>
              <div className="small-status"><strong>Announcements</strong><span>Published</span></div>
            </div>
          </section>

          <section className="panel-card verification-entry-card">
            <div className="panel-head"><div><span className="eyebrow">PASSPORT CONTROL</span><h2>Verify participants</h2></div></div>
            <p>Scan a participant QR and update checkpoint progress from the verified record.</p>
            <Link href="/verify/scan?role=Admin" className="primary-button">OPEN QR SCANNER <span>↗</span></Link>
          </section>
        </div>

        <section className="admin-id-section">
          <div className="panel-head"><div><span className="eyebrow">ID CARD WORKSHOP</span><h2>Generate participant IDs</h2></div><span className="mono">{participants.length} RECORDS</span></div>
          <p className="admin-id-intro">Every registration already has a unique Hackathon ID and QR payload. Print the designed front and back card from this admin-only workspace.</p>
          {participants.length ? <div className="admin-id-list">{participants.map((participant) => <ParticipantIdCard key={participant.participantId || participant.registrationId} participant={participant} />)}</div> : <div className="admin-id-empty">No registrations yet. New participant IDs will appear here immediately after registration.</div>}
        </section>
      </section>
    </main>
  );
}
