import type { Participant, Team, TeamMember } from "./types";

const PARTICIPANTS_KEY = "solutionHuntParticipants";
const CURRENT_PARTICIPANT_KEY = "solutionHuntCurrentParticipant";
const TEAMS_KEY = "solutionHuntTeams";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function createToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID().replaceAll("-", "");
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
}

function generateRegistrationId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let candidate = "";
  for (let index = 0; index < 6; index += 1) {
    candidate += chars[Math.floor(Math.random() * chars.length)];
  }
  const existing = listParticipants();
  if (existing.some((item) => item.registrationId === `SH26-${candidate}`)) {
    return generateRegistrationId();
  }
  return `SH26-${candidate}`;
}

export function listParticipants() {
  return readJson<Participant[]>(PARTICIPANTS_KEY, []);
}

export function listTeams() {
  return readJson<Team[]>(TEAMS_KEY, []);
}

export function getCurrentParticipant() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CURRENT_PARTICIPANT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Participant;
  } catch {
    return null;
  }
}

export function setCurrentParticipant(participant: Participant) {
  writeJson(CURRENT_PARTICIPANT_KEY, participant);
}

export function clearCurrentParticipant() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CURRENT_PARTICIPANT_KEY);
}

export function registerParticipant(input: {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  yearOfStudy: string;
  city: string;
  participationType: "Solo" | "Team" | "Looking for Team";
  technicalSkills?: string;
  github?: string;
  linkedin?: string;
  teamName?: string;
  whyParticipate?: string;
}) {
  const fullName = input.fullName.trim();
  const email = normalizeEmail(input.email);
  const phone = normalizePhone(input.phone);
  const college = input.college.trim();
  const department = input.department.trim();
  const yearOfStudy = input.yearOfStudy.trim();
  const city = input.city.trim();

  if (!fullName || !email || !phone || !college || !department || !yearOfStudy || !city || !input.participationType) {
    throw new Error("Please complete all required registration fields.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  const existing = listParticipants();
  const duplicate = existing.find((participant) => {
    const existingEmail = normalizeEmail(participant.email);
    const existingPhone = normalizePhone(participant.phone);
    return existingEmail === email || existingPhone === phone;
  });

  if (duplicate) {
    throw new Error("You're already registered.\nAn existing Solution Hunt registration was found.");
  }

  const registrationId = generateRegistrationId();
  const registeredAt = new Date().toISOString();
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ") || "Participant";
  const participant: Participant = {
    fullName,
    firstName,
    lastName,
    email,
    phone,
    college,
    department,
    yearOfStudy,
    city,
    participationType: input.participationType,
    technicalSkills: input.technicalSkills?.trim() || "",
    github: input.github?.trim() || "",
    linkedin: input.linkedin?.trim() || "",
    teamName: input.teamName?.trim() || "",
    whyParticipate: input.whyParticipate?.trim() || "",
    registrationId,
    participantId: registrationId,
    hackathonId: registrationId,
    qrToken: createToken(),
    qrCodeData: `Solution Hunt 2026\nRegistration ID: ${registrationId}`,
    verificationStatus: "VERIFIED",
    registeredAt,
  };

  const updatedParticipants = [...existing, participant];
  writeJson(PARTICIPANTS_KEY, updatedParticipants);
  setCurrentParticipant(participant);

  return participant;
}

export function verifyParticipant(email: string, registrationId: string) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedId = registrationId.trim();
  return listParticipants().find(
    (participant) => normalizeEmail(participant.email) === normalizedEmail && participant.registrationId === normalizedId,
  ) ?? null;
}

export function createTeamForParticipant(participant: Participant, teamName: string) {
  const trimmedTeam = teamName.trim();
  if (!trimmedTeam) {
    throw new Error("Team name is required.");
  }
  const teamId = `TEAM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const teamCode = Math.random().toString(36).slice(2, 8).toUpperCase();
  const nextTeam: Team = {
    teamId,
    teamName: trimmedTeam,
    teamCode,
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

  const teams = listTeams();
  const updated = [...teams.filter((item) => item.teamCode !== nextTeam.teamCode), nextTeam];
  writeJson(TEAMS_KEY, updated);
  return nextTeam;
}

export function findTeamForParticipant(participant: Participant) {
  const code = participant.teamName?.trim();
  if (!code) return null;
  return listTeams().find((team) => team.members.some((member) => member.participantId === participant.registrationId)) ?? null;
}
