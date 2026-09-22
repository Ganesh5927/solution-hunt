
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ParticipantIdCard from "@/components/admin/ParticipantIdCard";
import { supabase } from "@/lib/supabase";
import type { Participant } from "@/lib/types";

type TeamRecord = {
  id: string;
  team_id: string;
  team_name: string;
  leader_participant_id?: string | null;
  college?: string | null;
  department?: string | null;
  city?: string | null;
  status?: string | null;
  created_at?: string;
};

type CheckpointRecord = {
  id: string;
  participant_id: string;
  team_id: string;
  checkpoint: string;
  verified_by: string;
  status: string;
  verified_at?: string | null;
};

type ScanRecord = {
  id: string;
  participant_id: string;
  team_id: string;
  checkpoint?: string | null;
  scanned_by: string;
  status: string;
  scanned_at?: string | null;
};

const queue = [
  "Review final mentor feedback",
  "Approve challenge submissions",
  "Confirm judging slots",
  "Publish leaderboard update",
];

export default function AdminPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [teams, setTeams] = useState<TeamRecord[]>([]);
  const [checkpoints, setCheckpoints] = useState<CheckpointRecord[]>([]);
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAdminData() {
      if (!supabase) {
        setError(
          "Supabase is not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [
          participantsResult,
          teamsResult,
          checkpointResult,
          scansResult,
        ] = await Promise.all([
          supabase
            .from("participants")
            .select("*")
            .order("created_at", { ascending: false }),

          supabase
            .from("teams")
            .select("*")
            .order("created_at", { ascending: false }),

          supabase
            .from("checkpoint_verifications")
            .select("*")
            .order("verified_at", { ascending: false }),

          supabase
            .from("scan_history")
            .select("*")
            .order("scanned_at", { ascending: false }),
        ]);

        if (participantsResult.error) {
          throw new Error(
            `Participants: ${participantsResult.error.message}`
          );
        }

        if (teamsResult.error) {
          throw new Error(`Teams: ${teamsResult.error.message}`);
        }

        if (checkpointResult.error) {
          throw new Error(
            `Checkpoint verification: ${checkpointResult.error.message}`
          );
        }

        if (scansResult.error) {
          throw new Error(`Scan history: ${scansResult.error.message}`);
        }

        const participantRows = participantsResult.data ?? [];
        const teamRows = teamsResult.data ?? [];

        /*
         * Convert Supabase participant data into the existing
         * Participant type used by ParticipantIdCard.
         */
        const mappedParticipants: Participant[] = participantRows.map(
          (row: any) => {
            const matchingTeam = teamRows.find(
              (team: any) => team.team_id === row.team_id
            );

            return {
              fullName: row.full_name ?? "",
              email: row.email ?? "",
              phone: row.phone ?? "",
              college: row.college ?? "",
              department: row.department ?? "",
              year: row.year ?? "",
              role: row.role ?? "",
              teamId: row.team_id ?? "",
              teamName: matchingTeam?.team_name ?? "",
              participantId: row.participant_id ?? "",
              registrationId: row.participant_id ?? row.id ?? "",
              qrToken: row.qr_token ?? "",
              qrCodeData: row.qr_token ?? "",
              registeredAt: row.created_at ?? "",
              verificationStatus:
                row.registration_status === "VERIFIED"
                  ? "VERIFIED"
                  : "PENDING",
            };
          }
        );

        setParticipants(mappedParticipants);
        setTeams((teamsResult.data ?? []) as TeamRecord[]);
        setCheckpoints(
          (checkpointResult.data ?? []) as CheckpointRecord[]
        );
        setScans((scansResult.data ?? []) as ScanRecord[]);
      } catch (err) {
        console.error("Admin data loading error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load admin data from Supabase."
        );
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  const stats = [
    {
      label: "Participants",
      value: String(participants.length),
    },
    {
      label: "Teams",
      value: String(teams.length),
    },
    {
      label: "Checkpoints",
      value: String(checkpoints.length),
    },
    {
      label: "QR Scans",
      value: String(scans.length),
    },
  ];

  return (
    <main className="platform-page admin-page">
      {/* NAVBAR */}
      <nav className="platform-nav">
        <Link href="/" className="brand">
          <span className="brand-mark">N</span>

          <span>
            <strong>NEXORA</strong>
            <small>2026</small>
          </span>
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/updates">Updates</Link>
          <Link href="/judge">Judge</Link>
          <Link href="/admin" className="active">
            Admin
          </Link>
          <Link href="/verify/scan?role=Admin">
            QR Verify
          </Link>
        </div>

        <div className="nav-actions">
          <Link
            href="/login"
            className="ghost-button small-button"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="primary-button small-button"
          >
            Register
          </Link>
        </div>
      </nav>

      <section className="page-shell">
        {/* HEADER */}
        <header className="page-header">
          <div>
            <span className="eyebrow">NEXORA 2026 • ADMIN CONSOLE</span>

            <h1>
              Event <span>operations.</span>
            </h1>
          </div>

          <div className="header-status">
            <span className="pulse-dot" />

            {loading ? "Loading Supabase..." : "System healthy"}
          </div>
        </header>

        {/* ERROR */}
        {error && (
          <div
            className="panel-card"
            style={{
              marginBottom: "24px",
              borderColor: "#ef4444",
            }}
          >
            <strong>Supabase Error</strong>
            <p style={{ marginTop: "8px" }}>{error}</p>
          </div>
        )}

        {/* STATS */}
        <div className="stats-card-grid">
          {stats.map((item) => (
            <article className="metric-card" key={item.label}>
              <span>{item.label}</span>

              <strong>
                {loading ? "..." : item.value}
              </strong>

              <small>Live from Supabase</small>
            </article>
          ))}
        </div>

        {/* ADMIN GRID */}
        <div className="admin-grid">
          {/* PRIORITY ACTIONS */}
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
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>{task}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* CURRENT STATUS */}
          <section className="panel-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">OPERATIONS</span>
                <h2>Current status</h2>
              </div>
            </div>

            <div className="status-stack">
              <div className="small-status">
                <strong>Registration</strong>
                <span>Open</span>
              </div>

              <div className="small-status">
                <strong>Participants</strong>
                <span>{participants.length}</span>
              </div>

              <div className="small-status">
                <strong>Teams</strong>
                <span>{teams.length}</span>
              </div>

              <div className="small-status">
                <strong>QR Scans</strong>
                <span>{scans.length}</span>
              </div>
            </div>
          </section>

          {/* QR VERIFICATION */}
          <section className="panel-card verification-entry-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">
                  PASSPORT CONTROL
                </span>

                <h2>Verify participants</h2>
              </div>
            </div>

            <p>
              Scan a participant QR and update checkpoint
              progress from the verified record.
            </p>

            <Link
              href="/verify/scan?role=Admin"
              className="primary-button"
            >
              OPEN QR SCANNER <span>↗</span>
            </Link>
          </section>
        </div>

        {/* PARTICIPANTS */}
        <section
          className="panel-card"
          style={{ marginTop: "24px" }}
        >
          <div className="panel-head">
            <div>
              <span className="eyebrow">
                SUPABASE • PARTICIPANTS
              </span>

              <h2>Registered participants</h2>
            </div>

            <span className="mono">
              {participants.length} RECORDS
            </span>
          </div>

          {loading ? (
            <div className="admin-id-empty">
              Loading participants from Supabase...
            </div>
          ) : participants.length === 0 ? (
            <div className="admin-id-empty">
              No participants found in Supabase.
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
                marginTop: "20px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "900px",
                }}
              >
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Participant ID</th>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>Email</th>
                    <th style={tableHeaderStyle}>College</th>
                    <th style={tableHeaderStyle}>Team ID</th>
                    <th style={tableHeaderStyle}>Role</th>
                    <th style={tableHeaderStyle}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {participants.map((participant) => (
                    <tr
                      key={
                        participant.participantId ||
                        participant.registrationId
                      }
                    >
                      <td style={tableCellStyle}>
                        {participant.participantId || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {participant.fullName || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {participant.email || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {participant.college || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {participant.teamId || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {participant.role || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {participant.verificationStatus ||
                          "PENDING"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* TEAMS */}
        <section
          className="panel-card"
          style={{ marginTop: "24px" }}
        >
          <div className="panel-head">
            <div>
              <span className="eyebrow">
                SUPABASE • TEAMS
              </span>

              <h2>Registered teams</h2>
            </div>

            <span className="mono">
              {teams.length} TEAMS
            </span>
          </div>

          {teams.length === 0 ? (
            <div className="admin-id-empty">
              No teams found in Supabase.
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
                marginTop: "20px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "850px",
                }}
              >
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Team ID</th>
                    <th style={tableHeaderStyle}>Team Name</th>
                    <th style={tableHeaderStyle}>College</th>
                    <th style={tableHeaderStyle}>Department</th>
                    <th style={tableHeaderStyle}>City</th>
                    <th style={tableHeaderStyle}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td style={tableCellStyle}>
                        {team.team_id || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {team.team_name || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {team.college || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {team.department || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {team.city || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {team.status || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* CHECKPOINT VERIFICATION */}
        <section
          className="panel-card"
          style={{ marginTop: "24px" }}
        >
          <div className="panel-head">
            <div>
              <span className="eyebrow">
                SUPABASE • CHECKPOINTS
              </span>

              <h2>Checkpoint verification</h2>
            </div>

            <span className="mono">
              {checkpoints.length} RECORDS
            </span>
          </div>

          {checkpoints.length === 0 ? (
            <div className="admin-id-empty">
              No checkpoint verification records yet.
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
                marginTop: "20px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "850px",
                }}
              >
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>
                      Participant ID
                    </th>

                    <th style={tableHeaderStyle}>
                      Team ID
                    </th>

                    <th style={tableHeaderStyle}>
                      Checkpoint
                    </th>

                    <th style={tableHeaderStyle}>
                      Verified By
                    </th>

                    <th style={tableHeaderStyle}>
                      Status
                    </th>

                    <th style={tableHeaderStyle}>
                      Verified At
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {checkpoints.map((item) => (
                    <tr key={item.id}>
                      <td style={tableCellStyle}>
                        {item.participant_id || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {item.team_id || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {item.checkpoint || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {item.verified_by || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {item.status || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {item.verified_at
                          ? new Date(
                              item.verified_at
                            ).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* SCAN HISTORY */}
        <section
          className="panel-card"
          style={{ marginTop: "24px" }}
        >
          <div className="panel-head">
            <div>
              <span className="eyebrow">
                SUPABASE • SCAN HISTORY
              </span>

              <h2>QR scan history</h2>
            </div>

            <span className="mono">
              {scans.length} SCANS
            </span>
          </div>

          {scans.length === 0 ? (
            <div className="admin-id-empty">
              No QR scan history yet.
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
                marginTop: "20px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "850px",
                }}
              >
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>
                      Participant ID
                    </th>

                    <th style={tableHeaderStyle}>
                      Team ID
                    </th>

                    <th style={tableHeaderStyle}>
                      Checkpoint
                    </th>

                    <th style={tableHeaderStyle}>
                      Scanned By
                    </th>

                    <th style={tableHeaderStyle}>
                      Status
                    </th>

                    <th style={tableHeaderStyle}>
                      Scanned At
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {scans.map((scan) => (
                    <tr key={scan.id}>
                      <td style={tableCellStyle}>
                        {scan.participant_id || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {scan.team_id || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {scan.checkpoint || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {scan.scanned_by || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {scan.status || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {scan.scanned_at
                          ? new Date(
                              scan.scanned_at
                            ).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ID CARD WORKSHOP */}
        <section className="admin-id-section">
          <div className="panel-head">
            <div>
              <span className="eyebrow">
                ID CARD WORKSHOP
              </span>

              <h2>Generate participant IDs</h2>
            </div>

            <span className="mono">
              {participants.length} RECORDS
            </span>
          </div>

          <p className="admin-id-intro">
            Every registration has a participant ID and QR
            payload. Print the designed front and back card
            from this admin-only workspace.
          </p>

          {participants.length ? (
            <div className="admin-id-list">
              {participants.map((participant) => (
                <ParticipantIdCard
                  key={
                    participant.participantId ||
                    participant.registrationId
                  }
                  participant={participant}
                />
              ))}
            </div>
          ) : (
            <div className="admin-id-empty">
              No registrations yet. New participant IDs will
              appear here after registration.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

const tableHeaderStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "14px 12px",
  borderBottom: "1px solid rgba(255,255,255,0.12)",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  whiteSpace: "nowrap",
};

const tableCellStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "14px 12px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  fontSize: "14px",
  whiteSpace: "nowrap",
};

