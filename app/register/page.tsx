"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerTeam } from "@/lib/identity";

type MemberForm = { name: string; email: string; phone: string; college: string; department: string; year: string };
const emptyMember = (): MemberForm => ({ name: "", email: "", phone: "", college: "", department: "", year: "" });
const memberFields: Array<{ key: keyof MemberForm; label: string; type?: string }> = [
  { key: "name", label: "Full Name" }, { key: "email", label: "Email", type: "email" }, { key: "phone", label: "Phone", type: "tel" },
  { key: "college", label: "College / Institution" }, { key: "department", label: "Department" }, { key: "year", label: "Year of Study" },
];

function MemberCard({ number, label, optional, member, onChange, readOnly = false }: { number: number; label: string; optional?: boolean; member: MemberForm; onChange: (field: keyof MemberForm, value: string) => void; readOnly?: boolean }) {
  return <article className="team-member-card">
    <div className="team-member-card-heading"><div><span className="team-member-number">{String(number).padStart(2, "0")}</span><h3>{label}</h3></div><span className={optional ? "member-optional" : "member-required"}>{optional ? "OPTIONAL" : "REQUIRED"}</span></div>
    <div className="form-grid">{memberFields.map((field) => <div className="form-group" key={field.key}><label htmlFor={`member-${number}-${field.key}`}>{field.label}{!optional && " *"}</label><input id={`member-${number}-${field.key}`} type={field.type} value={member[field.key]} readOnly={readOnly} onChange={(event) => onChange(field.key, event.target.value)} required={!optional} /></div>)}</div>
  </article>;
}

export default function RegisterPage() {
  const router = useRouter();
  const [teamName, setTeamName] = useState(""); const [city, setCity] = useState(""); const [leader, setLeader] = useState<MemberForm>(emptyMember());
  const [members, setMembers] = useState<MemberForm[]>([emptyMember(), emptyMember(), emptyMember(), emptyMember(), emptyMember()]);
  const [error, setError] = useState(""); const [submitting, setSubmitting] = useState(false);
  function changeMember(index: number, field: keyof MemberForm, value: string) { if (index === 0) setLeader((current) => ({ ...current, [field]: value })); else setMembers((current) => current.map((member, memberIndex) => memberIndex === index - 1 ? { ...member, [field]: value } : member)); }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setSubmitting(true);
    try { const result = await registerTeam({ teamName, city, leader, members }); localStorage.setItem("solutionHuntRegistrationResult", JSON.stringify(result)); router.push("/register/success"); }
    catch (registrationError) { setError(registrationError instanceof Error ? registrationError.message : "Team registration could not be completed."); setSubmitting(false); }
  }
  return <main className="team-registration-page">
    <aside className="team-registration-aside"><Link href="/" className="wordmark"><span className="wordmark-mark">N</span><span><strong>NEXORA</strong><small>2026</small></span></Link><div><span className="eyebrow">NEXORA 2026 / TEAM REGISTRATION</span><h1>Build your<br /><span>team.</span></h1><p>One team registration creates a confirmed team and an individual participant pass for every member.</p></div><span className="mono">BUILD · SOLVE · TRANSFORM</span></aside>
    <section className="team-registration-main"><div className="team-registration-wrap">
      <header className="team-registration-header"><div><span className="eyebrow">REGISTRATION</span><h2>REGISTER YOUR TEAM</h2><p>Build your team. Choose your challenge. Create your solution.</p></div><span className="team-size-badge">TEAM SIZE: 4–6 MEMBERS</span></header>
      {error && <p className="team-registration-error" role="alert">{error}</p>}
      <form className="team-registration-form" onSubmit={handleSubmit}>
        <section className="team-form-section"><div className="team-section-heading"><span>01</span><div><p className="eyebrow">TEAM DETAILS</p><h3>Set your team identity</h3></div></div><div className="form-grid">
          <div className="form-group"><label htmlFor="team-name">Team Name *</label><input id="team-name" value={teamName} onChange={(event) => setTeamName(event.target.value)} required /></div><div className="form-group"><label htmlFor="team-city">City *</label><input id="team-city" value={city} onChange={(event) => setCity(event.target.value)} required /></div>
          {memberFields.map((field) => <div className="form-group" key={`leader-detail-${field.key}`}><label htmlFor={`leader-detail-${field.key}`}>Team Leader {field.label} *</label><input id={`leader-detail-${field.key}`} type={field.type} value={leader[field.key]} onChange={(event) => changeMember(0, field.key, event.target.value)} required /></div>)}
        </div></section>
        <section className="team-form-section"><div className="team-section-heading"><span>02</span><div><p className="eyebrow">TEAM MEMBERS</p><h3>Every pass starts with a person</h3></div></div><MemberCard number={1} label="TEAM LEADER" member={leader} onChange={(field, value) => changeMember(0, field, value)} readOnly />{members.map((member, index) => <MemberCard key={index + 2} number={index + 2} label={index < 3 ? "MEMBER" : "OPTIONAL"} optional={index >= 3} member={member} onChange={(field, value) => changeMember(index + 1, field, value)} />)}</section>
        <button className="team-registration-submit" type="submit" disabled={submitting}>{submitting ? "CREATING TEAM..." : "REGISTER TEAM"}<span>↗</span></button>
      </form>
    </div></section>
  </main>;
}
