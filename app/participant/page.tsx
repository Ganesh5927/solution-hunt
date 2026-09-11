"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import SiteHeader from "@/components/navigation/SiteHeader";
import { challenges } from "@/lib/constants";
import { getCurrentParticipant } from "@/lib/identity";
import type { Participant } from "@/lib/types";

const registrationTimeline = [
  { label: "Registration Submitted", done: true },
  { label: "Registration Confirmed", done: true, current: true },
  { label: "Team Formation", done: false },
  { label: "Challenge Selected", done: false },
  { label: "Project Submission", done: false },
  { label: "Final Presentation", done: false },
];

const announcements = [
  { tag: "REGISTRATION CONFIRMED", text: "Your registration has been successfully completed." },
  { tag: "TEAM FORMATION", text: "Build your team and get ready for the challenge." },
  { tag: "HACKATHON UPDATE", text: "Important event information will appear here." },
];

const quickActions = [
  { label: "PARTICIPANT PASS", href: "/participant#pass" },
  { label: "MY TEAM", href: "/team" },
  { label: "CHALLENGES", href: "/challenges" },
  { label: "SCHEDULE", href: "/participant#schedule" },
];

export default function ParticipantDashboardPage() {
  const router = useRouter();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [qrData, setQrData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getCurrentParticipant();
    if (!stored) {
      router.replace("/participant-portal");
      return;
    }

    setParticipant(stored);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!participant?.qrCodeData) return;
    QRCode.toDataURL(`Solution Hunt 2026\nRegistration ID: ${participant.registrationId}`, {
      margin: 1,
      width: 220,
      color: { dark: "#071426", light: "#ffffff" },
    }).then(setQrData).catch(() => setQrData(""));
  }, [participant]);

  const challenge = useMemo(() => challenges[0] ?? null, []);

  if (loading || !participant) {
    return <main className="dashboard-shell"><p className="mono">LOADING PARTICIPANT DASHBOARD...</p></main>;
  }

  const registrationDate = new Date(participant.registeredAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="participant-dashboard">
      <SiteHeader authenticated />
      <div className="dashboard-shell">
        <header className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">SOLUTION HUNT 2026 / PARTICIPANT PORTAL</p>
            <h1>WELCOME TO<br /><span>SOLUTION HUNT 2026</span></h1>
            <p className="dashboard-welcome-copy">{participant.fullName}</p>
            <p className="dashboard-welcome-copy">{participant.college}</p>
            <p className="dashboard-welcome-copy mono">{participant.registrationId}</p>
          </div>
          <div className="profile-summary">
            <div className="avatar">{participant.fullName.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>
            <div>
              <strong>{participant.fullName}</strong>
              <span>{participant.college}</span>
              <small>{participant.registrationId}</small>
            </div>
          </div>
        </header>

        <section className="dashboard-status-grid">
          <article className="status-card">
            <small>Registration</small>
            <strong>Confirmed</strong>
            <span>Registration submitted</span>
            <b>✓</b>
          </article>
          <article className="status-card">
            <small>My team</small>
            <strong>{participant.teamName ? participant.teamName : "TEAM NOT CREATED"}</strong>
            <span>{participant.teamName ? "Team in progress" : "Create or join a team"}</span>
            <b>○</b>
          </article>
          <article className="status-card">
            <small>My challenge</small>
            <strong>{challenge ? challenge.title : "No challenge selected yet"}</strong>
            <span>{challenge ? challenge.category : "Explore challenges"}</span>
            <b>○</b>
          </article>
          <article className="status-card">
            <small>Status</small>
            <strong>Live</strong>
            <span>Participant verified</span>
            <b>✓</b>
          </article>
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-panel dark">
            <span className="eyebrow">REGISTRATION CONFIRMED</span>
            <h2>Your participant pass is active.</h2>
            <p>Your registration has been successfully completed. Keep your Registration ID and QR pass ready for event check-in.</p>
            <Link href="/participant#pass" className="button button-orange">VIEW MY PASS <span>↗</span></Link>
          </article>

          <article className="dashboard-panel">
            <div className="dashboard-panel-heading">
              <div>
                <span className="eyebrow">MY TEAM</span>
                <h2>{participant.teamName ? participant.teamName : "TEAM NOT CREATED"}</h2>
              </div>
              <span className="mono">{participant.teamName ? "ACTIVE" : "—"}</span>
            </div>
            <p>{participant.teamName ? "Your team profile is ready for collaboration." : "No team has been created yet."}</p>
            <div className="dashboard-list">
              <div><small>Team Name</small><strong>{participant.teamName || "—"}</strong></div>
              <div><small>Team Code</small><strong>{participant.teamName ? "SH-TEAM" : "—"}</strong></div>
            </div>
            <Link href="/team" className="button button-black dashboard-footer">CREATE TEAM <span>↗</span></Link>
          </article>
        </section>

        <section className="dashboard-grid" id="pass">
          <article className="dashboard-panel" style={{ gridColumn: "1 / -1" }}>
            <div className="dashboard-panel-heading">
              <div>
                <span className="eyebrow">PARTICIPANT PASS</span>
                <h2>SOLUTION HUNT 2026</h2>
              </div>
              <span className="mono">CONFIRMED</span>
            </div>

            <div className="passport-card" aria-label="Solution Hunt participant pass" style={{ marginTop: 24 }}>
              <div className="passport-card-topline">
                <div>
                  <p className="passport-card-label">PARTICIPANT PASS</p>
                  <h2>2026</h2>
                </div>
                <div className="passport-card-type">CONFIRMED<br /><strong>ACTIVE</strong></div>
              </div>
              <div className="passport-card-body">
                <div className="passport-identity">
                  <div className="passport-avatar">{participant.fullName.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>
                  <p className="passport-field-label">PARTICIPANT NAME</p>
                  <h3>{participant.fullName}</h3>
                  <p className="passport-id">REGISTRATION ID / {participant.registrationId}</p>
                </div>
                <div className="passport-details">
                  <div><span>COLLEGE</span><strong>{participant.college}</strong></div>
                  <div><span>DEPARTMENT</span><strong>{participant.department || "—"}</strong></div>
                  <div><span>PARTICIPATION TYPE</span><strong>{participant.participationType || "Solo"}</strong></div>
                  <div><span>YEAR</span><strong>{participant.yearOfStudy || "—"}</strong></div>
                  <div><span>CITY</span><strong>{participant.city || "—"}</strong></div>
                  <div><span>STATUS</span><strong>CONFIRMED</strong></div>
                </div>
                <div className="passport-qr-panel">
                  {qrData ? <Image className="passport-qr-image" src={qrData} width={180} height={180} unoptimized alt="Participant QR code" /> : <div className="passport-qr"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>}
                  <span>SCAN FOR CHECK-IN</span>
                </div>
              </div>
              <div className="passport-card-footer">
                <span>SOLUTION HUNT 2026</span>
                <span>AM REDDY GROUP OF INSTITUTIONS</span>
              </div>
            </div>

            <div className="registration-actions">
              <button type="button" className="button button-black" onClick={() => window.print()}>PRINT PASS</button>
              <a className="button button-outline" href={qrData || "#"} download="solution-hunt-pass.png">DOWNLOAD PASS</a>
            </div>
          </article>
        </section>

        <section className="dashboard-grid" id="registration">
          <article className="dashboard-panel">
            <span className="eyebrow">REGISTRATION STATUS</span>
            <h2>Progress Timeline</h2>
            <div className="timeline-list" style={{ marginTop: 18 }}>
              {registrationTimeline.map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, color: item.done ? "#9CFF00" : "#6b7280" }}>
                  <span style={{ display: "inline-block", width: 18, height: 18, borderRadius: "50%", background: item.done ? "#9CFF00" : "#E5E7EB", textAlign: "center", lineHeight: "18px", color: item.done ? "#071426" : "#6b7280", fontWeight: 700 }}>{item.done ? "✓" : "○"}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-panel">
            <span className="eyebrow">MY REGISTRATION</span>
            <h2>Participant details</h2>
            <div className="dashboard-list">
              <div><small>Full Name</small><strong>{participant.fullName}</strong></div>
              <div><small>Email</small><strong>{participant.email}</strong></div>
              <div><small>Phone</small><strong>{participant.phone}</strong></div>
              <div><small>College</small><strong>{participant.college}</strong></div>
              <div><small>Department</small><strong>{participant.department || "—"}</strong></div>
              <div><small>Year</small><strong>{participant.yearOfStudy || "—"}</strong></div>
              <div><small>City</small><strong>{participant.city || "—"}</strong></div>
              <div><small>Participation Type</small><strong>{participant.participationType || "Solo"}</strong></div>
              <div><small>Registration ID</small><strong>{participant.registrationId}</strong></div>
              <div><small>Registration Date</small><strong>{registrationDate}</strong></div>
            </div>
          </article>
        </section>

        <section className="dashboard-grid" id="schedule">
          <article className="dashboard-panel">
            <span className="eyebrow">SCHEDULE</span>
            <h2>Hackathon Schedule</h2>
            <div className="dashboard-list">
              {[
                "Registration",
                "Orientation",
                "Team Formation",
                "Hackathon Begins",
                "Mentor Session",
                "Submission Deadline",
                "Judging",
                "Final Pitch",
                "Winner Announcement",
              ].map((event, index) => (
                <div key={event}><small>{index + 1}. {event}</small><strong>{index < 2 ? "LIVE" : "PENDING"}</strong></div>
              ))}
            </div>
          </article>

          <article className="dashboard-panel" id="announcements">
            <span className="eyebrow">ANNOUNCEMENTS</span>
            <h2>Portal Updates</h2>
            <div className="dashboard-list">
              {announcements.map((item) => (
                <div key={item.tag}><small>{item.tag}</small><strong>{item.text}</strong></div>
              ))}
            </div>
          </article>
        </section>

        <section className="dashboard-grid">
          {quickActions.map((item) => (
            <Link key={item.label} href={item.href} className="dashboard-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 140 }}>
              <span className="eyebrow">QUICK ACTION</span>
              <h2>{item.label}</h2>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
