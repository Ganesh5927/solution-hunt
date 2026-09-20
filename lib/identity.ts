import type { Participant, Team, TeamMember } from "./types";
import { supabase } from "./supabase";

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

function generateTeamRegistrationId() {
  const existing = listTeams();
  let candidate = "";
  do {
    candidate = `SH26-TEAM-${Math.floor(1000 + Math.random() * 9000)}`;
  } while (existing.some((team) => (team.teamRegistrationId || team.teamId) === candidate));
  return candidate;
}

function generateParticipantId(existing: Participant[], index: number) {
  const candidate = `SH26-P-${String(existing.length + index + 1).padStart(3, "0")}`;
  if (existing.some((participant) => participant.participantId === candidate)) {
    return `SH26-P-${createToken().slice(0, 8).toUpperCase()}`;
  }
  return candidate;
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
    qrCodeData: `NEXORA 2026 | Team Name: ${input.teamName?.trim() || "INDIVIDUAL"} | Participant Name: ${fullName} | Participant ID: ${registrationId}`,
    verificationStatus: "VERIFIED",
    registeredAt,
  };

  const updatedParticipants = [...existing, participant];
  writeJson(PARTICIPANTS_KEY, updatedParticipants);
  setCurrentParticipant(participant);

  return participant;
}

export type TeamRegistrationInput = {
  teamName: string;
  city: string;
  leader: Omit<TeamMember, "participantId" | "hackathonId" | "role">;
  members: Array<Omit<TeamMember, "participantId" | "hackathonId" | "role">>;
};

export async function registerTeam(input: TeamRegistrationInput) {
  const memberInputs = input.members;
  const teamName = input.teamName.trim();
  const city = input.city.trim();

  if (!teamName) throw new Error("Team Name is required.");

  const requiredFields: Array<keyof Omit<TeamMember, "participantId" | "hackathonId" | "role">> = ["name", "email", "phone", "college", "department", "year"];
  const hasAnyValue = (member: Omit<TeamMember, "participantId" | "hackathonId" | "role">) => requiredFields.some((field) => String(member[field] || "").trim());
  const hasAllValues = (member: Omit<TeamMember, "participantId" | "hackathonId" | "role">) => requiredFields.every((field) => String(member[field] || "").trim());
  const optionalIncompleteIndex = memberInputs.findIndex((member, index) => index >= 3 && hasAnyValue(member) && !hasAllValues(member));
  if (optionalIncompleteIndex !== -1) {
    throw new Error(`Member ${optionalIncompleteIndex + 2} is incomplete. Complete all fields or leave Member ${optionalIncompleteIndex + 2} empty.`);
  }
  const allMembers = [input.leader, ...memberInputs.filter((member, index) => index < 3 || hasAnyValue(member))];
  if (allMembers.length < 4) throw new Error("Your team must have at least 4 members.");
  if (allMembers.length > 6) throw new Error("Your team cannot have more than 6 members.");

  const incompleteIndex = allMembers.findIndex((member) => requiredFields.some((field) => !String(member[field] || "").trim()));
  if (incompleteIndex !== -1) {
    const memberNumber = incompleteIndex + 1;
    throw new Error(`Please complete Member ${memberNumber} details.`);
  }

  if (!city) throw new Error("City is required.");

  const emails = allMembers.map((member) => normalizeEmail(member.email || ""));
  const phones = allMembers.map((member) => normalizePhone(member.phone || ""));
  if (emails.some((email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    throw new Error("Every required email must have a valid email format.");
  }
  if (phones.some((phone) => phone.length < 7 || phone.length > 15)) {
    throw new Error("Every required phone number must be valid.");
  }
  if (new Set(emails).size !== emails.length) throw new Error("Duplicate email addresses are not allowed inside the same team.");
  if (new Set(phones).size !== phones.length) throw new Error("Duplicate phone numbers are not allowed inside the same team.");

  const existingParticipants = listParticipants();
  const hasExistingParticipant = existingParticipants.some((participant) => {
    const email = normalizeEmail(participant.email);
    const phone = normalizePhone(participant.phone);
    return emails.includes(email) || phones.includes(phone);
  });
  if (hasExistingParticipant) throw new Error("This participant is already registered with Solution Hunt.");

  const teamRegistrationId = generateTeamRegistrationId();
  const registeredAt = new Date().toISOString();
  const participants = allMembers.map((member, index) => {
    const fullName = member.name.trim();
    const [firstName, ...rest] = fullName.split(" ");
    const participantId = generateParticipantId(existingParticipants, index);
    const participant: Participant = {
      fullName,
      firstName,
      lastName: rest.join(" ") || "Participant",
      email: normalizeEmail(member.email || ""),
      phone: normalizePhone(member.phone || ""),
      college: member.college.trim(),
      department: member.department?.trim() || "",
      yearOfStudy: member.year?.trim() || "",
      city,
      participationType: "Team",
      teamName,
      registrationId: participantId,
      participantId,
      hackathonId: teamRegistrationId,
      teamId: teamRegistrationId,
      teamRegistrationId,
      qrToken: createToken(),
      qrCodeData: `NEXORA 2026 | Team: ${teamName} | Team ID: ${teamRegistrationId} | Participant: ${fullName} | Participant ID: ${participantId}`,
      verificationStatus: "VERIFIED",
      registeredAt,
    };
    return participant;
  });

  const teamMembers: TeamMember[] = participants.map((participant, index) => ({
    participantId: participant.participantId || participant.registrationId,
    hackathonId: teamRegistrationId,
    name: participant.fullName,
    college: participant.college,
    email: participant.email,
    phone: participant.phone,
    course: participant.department,
    department: participant.department,
    year: participant.yearOfStudy,
    role: index === 0 ? "Team Leader" : "Member",
  }));
  const team: Team = {
    teamId: teamRegistrationId,
    teamRegistrationId,
    teamName,
    teamCode: teamRegistrationId,
    leaderId: teamMembers[0].participantId,
    leaderName: teamMembers[0].name,
    members: teamMembers,
    registrationStatus: "VERIFIED",
    registeredAt,
    college: teamMembers[0].college,
    department: teamMembers[0].department,
    city,
  };

  if (supabase) {
    const { error: teamError } = await supabase.from("teams").insert({
      team_id: teamRegistrationId,
      team_name: teamName,
      leader_participant_id: teamMembers[0].participantId,
      college: team.college,
      department: team.department,
      city,
      status: "CONFIRMED",
      created_at: registeredAt,
    });
    if (teamError) {
      if (teamError.code === "23505") throw new Error("This team or participant is already registered.");
      throw new Error(`Team registration could not be saved: ${teamError.message}`);
    }

    const { error: participantError } = await supabase.from("participants").insert(participants.map((participant, index) => ({
      participant_id: participant.participantId,
      team_id: teamRegistrationId,
      full_name: participant.fullName,
      email: participant.email,
      phone: participant.phone,
      college: participant.college,
      department: participant.department,
      year: participant.yearOfStudy,
      role: index === 0 ? "Team Leader" : "Member",
      qr_token: participant.qrToken,
      registration_status: "CONFIRMED",
      created_at: registeredAt,
    })));
    if (participantError) {
      throw new Error(participantError.code === "23505" ? "This participant is already registered with NEXORA 2026." : `Participant records could not be saved: ${participantError.message}`);
    }
  }

  writeJson(PARTICIPANTS_KEY, [...existingParticipants, ...participants]);
  writeJson(TEAMS_KEY, [...listTeams(), team]);
  setCurrentParticipant(participants[0]);
  return { team, participants, leader: participants[0] };
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
  const participantId = participant.participantId || participant.registrationId;
  return listTeams().find((team) => {
    return team.members.some((member) => member.participantId === participantId)
      || team.teamId === participant.teamId
      || team.teamRegistrationId === participant.teamRegistrationId;
  }) ?? null;
}
