"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkpoints, completeCheckpoint, findParticipantByQrIdentifier, getParticipantVerification, getStaffRole, recordParticipantScan } from "@/lib/verification";
import type { CheckpointName, Participant } from "@/lib/types";

export default function VerificationPage() {
  const router = useRouter();
  const [role, setRole] = useState<"Admin" | "Judge" | null>(null);
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<CheckpointName>("Registration");
  const [refresh, setRefresh] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const currentRole = getStaffRole();
      const value = new URLSearchParams(window.location.search).get("participant");
      if (!currentRole) router.replace("/admin");
      else {
        setRole(currentRole);
        if (value) setParticipant(findParticipantByQrIdentifier(value));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [router]);

  useEffect(() => {
    if (role && participant) {
      recordParticipantScan(participant, role);
      setRefresh((value) => value + 1);
    }
  }, [participant, role]);

  if (!role) return <main className="verify-shell"><p className="mono">VERIFYING STAFF ACCESS...</p></main>;
  if (!participant) return <main className="verify-shell"><header className="verify-nav"><Link href="/verify/scan" className="wordmark"><span className="wordmark-mark">N</span><span><strong>NEXORA</strong><small>2026</small></span></Link></header><div className="verify-wrap verify-empty"><span className="eyebrow">PARTICIPANT NOT FOUND</span><h1>Scan a valid <span>passport.</span></h1><p>The QR identifier did not match a registered participant record.</p><Link href="/verify/scan" className="button button-black">BACK TO SCANNER</Link></div></main>;

  const snapshot = getParticipantVerification(participant);
  const completed = new Set(snapshot.records.map((record) => record.checkpoint));
  const markCheckpoint = () => {
    const created = completeCheckpoint(participant, selectedCheckpoint, role);
    setMessage(created ? `${selectedCheckpoint} marked complete.` : `${selectedCheckpoint} is already complete.`);
    setRefresh((value) => value + 1);
  };
  const formatTime = (value: string) => new Date(value).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return <main className="verify-shell"><header className="verify-nav"><Link href={role === "Admin" ? "/admin" : "/judge"} className="wordmark"><span className="wordmark-mark">N</span><span><strong>NEXORA</strong><small>2026</small></span></Link><span className="staff-badge">{role} VERIFIED</span></header><div className="verify-wrap" key={refresh}>
    <header className="verification-result-heading"><div><span className="eyebrow">PARTICIPANT VERIFIED</span><h1>{participant.fullName}</h1><p>{participant.participantId || participant.registrationId} / {participant.email}</p></div><Link href="/verify/scan" className="button button-outline">SCAN ANOTHER</Link></header>
    <section className="verification-profile"><div><span>PARTICIPANT</span><strong>{participant.fullName}</strong></div><div><span>TEAM</span><strong>{snapshot.team?.teamName || participant.teamName || "—"}</strong></div><div><span>HACKATHON ID</span><strong>{participant.hackathonId || participant.registrationId}</strong></div><div><span>REGISTRATION</span><strong className="confirmed-text">VERIFIED</strong></div><div><span>PASSPORT</span><strong className="confirmed-text">ACTIVE</strong></div><div><span>SUBMISSION</span><strong>{snapshot.submissionStatus}</strong></div></section>
    <div className="verification-columns"><section className="verification-panel"><span className="eyebrow">HACKATHON PASSPORT</span><h2>Live progress</h2><div className="verification-checkpoints">{checkpoints.map((checkpoint, index) => <div className="verification-checkpoint" key={checkpoint}><span className={completed.has(checkpoint) ? "checkpoint-icon complete" : "checkpoint-icon"}>{completed.has(checkpoint) ? "✓" : "·"}</span><div><strong>Checkpoint {index + 1} — {checkpoint}</strong><small>{completed.has(checkpoint) ? "Completed" : "Pending"}</small></div></div>)}</div>{message && <p className="verification-success" role="status">{message}</p>}<div className="verification-control"><label htmlFor="checkpoint">MARK CHECKPOINT COMPLETE</label><div><select id="checkpoint" value={selectedCheckpoint} onChange={(event) => setSelectedCheckpoint(event.target.value as CheckpointName)}>{checkpoints.map((checkpoint) => <option key={checkpoint}>{checkpoint}</option>)}</select><button type="button" className="button button-orange" onClick={markCheckpoint}>VERIFY <span>↗</span></button></div></div></section>
      <section className="verification-panel"><span className="eyebrow">TEAM MEMBERS</span><h2>{snapshot.team?.teamName || "Participant team"}</h2><div className="verification-team-list">{snapshot.team?.members.map((member, index) => <div key={member.participantId} className={member.participantId === (participant.participantId || participant.registrationId) ? "scanned-member" : ""}><span>{String(index + 1).padStart(2, "0")}</span><strong>{member.name}</strong><small>{member.participantId === (participant.participantId || participant.registrationId) ? "SCANNED PARTICIPANT" : member.role || "MEMBER"}</small></div>)}</div></section></div>
      <section className="verification-panel scan-history-panel"><span className="eyebrow">SCAN HISTORY</span><h2>Authorized verifications</h2>{snapshot.history.length ? <div className="verification-history">{snapshot.history.map((scan) => <div key={scan.id}><strong>{formatTime(scan.scannedAt)}</strong><span>{scan.checkpoint || "Passport scan"}</span><small>{scan.status} / {scan.scannedBy}</small></div>)}</div> : <p>No verification scans recorded yet.</p>}</section>
  </div></main>;
}
