export type Participant = {
  fullName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  college: string;
  department?: string;
  yearOfStudy?: string;
  city?: string;
  participationType?: "Solo" | "Team" | "Looking for Team";
  technicalSkills?: string;
  github?: string;
  linkedin?: string;
  teamName?: string;
  whyParticipate?: string;
  registrationId: string;
  participantId?: string;
  hackathonId?: string;
  course?: string;
  year?: string;
  role?: string;
  qrToken?: string;
  qrCodeData?: string;
  verificationStatus?: "VERIFIED" | "PENDING";
  registeredAt: string;
  teamId?: string;
  teamRegistrationId?: string;
};

export type TeamMember = {
  participantId: string;
  name: string;
  college: string;
  email?: string;
  phone?: string;
  course?: string;
  year?: string;
  role?: string;
  hackathonId?: string;
  department?: string;
};

export type Team = {
  teamId: string;
  teamRegistrationId?: string;
  teamName: string;
  teamCode: string;
  leaderId: string;
  leaderName: string;
  members: TeamMember[];
  registrationStatus?: "VERIFIED" | "PENDING";
  registeredAt?: string;
  college?: string;
  department?: string;
  city?: string;
};

export type PassportRecord = {
  participantId: string;
  hackathonId: string;
  teamId: string;
  qrToken: string;
  passportStatus: "ACTIVE" | "PENDING";
  checkpointProgress: number;
  createdAt: string;
};

export type Challenge = {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  owner: string;
  description: string;
  problem: string;
  whyItMatters: string;
  objective: string[];
  requirements: string[];
  deliverables: string[];
  tags: string[];
};

export type PassportItem = {
  label: string;
  shortLabel: string;
  complete: boolean;
};

export type CheckpointName = "Registration" | "Idea Validation" | "Development" | "Final Submission" | "Final Evaluation";

export type CheckpointVerification = {
  id: string;
  participantId: string;
  teamId: string;
  teamName: string;
  checkpoint: CheckpointName;
  verifiedAt: string;
  verifiedBy: "Admin" | "Judge";
  status: "COMPLETED";
};

export type ScanRecord = {
  id: string;
  participantId: string;
  teamId: string;
  checkpoint?: CheckpointName;
  scannedAt: string;
  scannedBy: "Admin" | "Judge";
  status: "VERIFIED";
};

export type LeaderboardEntry = {
  rank: string;
  team: string;
  challenge: string;
  score: string;
};
