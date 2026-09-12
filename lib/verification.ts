import { findTeamForParticipant, listParticipants } from "./identity";
import type { CheckpointName, CheckpointVerification, Participant, ScanRecord, Team } from "./types";

const VERIFICATIONS_KEY = "nexoraCheckpointVerifications";
const SCANS_KEY = "nexoraScanHistory";
const STAFF_ROLE_KEY = "nexoraStaffRole";

export const checkpoints: CheckpointName[] = ["Registration", "Idea Validation", "Development", "Final Submission", "Final Evaluation"];

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(value));
}

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

export function getStaffRole() {
  if (typeof window === "undefined") return null;
  const role = window.sessionStorage.getItem(STAFF_ROLE_KEY);
  return role === "Admin" || role === "Judge" ? role : null;
}

export function setStaffRole(role: "Admin" | "Judge") {
  if (typeof window !== "undefined") window.sessionStorage.setItem(STAFF_ROLE_KEY, role);
}

export function clearStaffRole() {
  if (typeof window !== "undefined") window.sessionStorage.removeItem(STAFF_ROLE_KEY);
}

export function findParticipantByQrIdentifier(identifier: string) {
  const value = identifier.trim();
  if (!value) return null;
  return listParticipants().find((participant) => {
    const participantId = participant.participantId || participant.registrationId;
    return participantId === value || participant.registrationId === value || participant.qrToken === value || participant.qrCodeData?.includes(value) || value.includes(`Participant ID: ${participantId}`);
  }) ?? null;
}

export function getParticipantVerification(participant: Participant) {
  const team = findTeamForParticipant(participant);
  const records = readJson<CheckpointVerification[]>(VERIFICATIONS_KEY, []).filter((item) => item.participantId === (participant.participantId || participant.registrationId));
  const history = readJson<ScanRecord[]>(SCANS_KEY, []).filter((item) => item.participantId === (participant.participantId || participant.registrationId)).sort((a, b) => b.scannedAt.localeCompare(a.scannedAt));
  return { participant, team, records, history, submissionStatus: "Not Submitted" as const };
}

export function recordParticipantScan(participant: Participant, role: "Admin" | "Judge", checkpoint?: CheckpointName) {
  const team = findTeamForParticipant(participant);
  const scan: ScanRecord = {
    id: createId(),
    participantId: participant.participantId || participant.registrationId,
    teamId: team?.teamId || participant.teamId || "—",
    checkpoint,
    scannedAt: new Date().toISOString(),
    scannedBy: role,
    status: "VERIFIED",
  };
  const existing = readJson<ScanRecord[]>(SCANS_KEY, []);
  writeJson(SCANS_KEY, [...existing, scan]);
  return scan;
}

export function completeCheckpoint(participant: Participant, checkpoint: CheckpointName, role: "Admin" | "Judge") {
  const participantId = participant.participantId || participant.registrationId;
  const existing = readJson<CheckpointVerification[]>(VERIFICATIONS_KEY, []);
  const alreadyComplete = existing.some((item) => item.participantId === participantId && item.checkpoint === checkpoint && item.status === "COMPLETED");
  if (alreadyComplete) return false;
  const team = findTeamForParticipant(participant);
  const record: CheckpointVerification = {
    id: createId(), participantId, teamId: team?.teamId || participant.teamId || "—", teamName: team?.teamName || participant.teamName || "—", checkpoint,
    verifiedAt: new Date().toISOString(), verifiedBy: role, status: "COMPLETED",
  };
  writeJson(VERIFICATIONS_KEY, [...existing, record]);
  recordParticipantScan(participant, role, checkpoint);
  return true;
}

export function getTeamForVerification(snapshot: { team: Team | null }) {
  return snapshot.team;
}