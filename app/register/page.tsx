"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerParticipant } from "@/lib/identity";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    yearOfStudy: "",
    city: "",
    participationType: "Solo",
    technicalSkills: "",
    github: "",
    linkedin: "",
    teamName: "",
    whyParticipate: "",
    rulesAccepted: false,
  });
  const [error, setError] = useState("");

  function changeField(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.rulesAccepted) {
      setError("Please agree to the rules and terms before registering.");
      return;
    }

    try {
      const participant = registerParticipant({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        college: form.college,
        department: form.department,
        yearOfStudy: form.yearOfStudy,
        city: form.city,
        participationType: form.participationType as "Solo" | "Team" | "Looking for Team",
        technicalSkills: form.technicalSkills,
        github: form.github,
        linkedin: form.linkedin,
        teamName: form.teamName,
        whyParticipate: form.whyParticipate,
      });

      localStorage.setItem("solutionHuntCurrentParticipant", JSON.stringify(participant));
      router.push("/participant");
    } catch (registrationError) {
      const message = registrationError instanceof Error ? registrationError.message : "Registration could not be completed.";
      setError(message.replace("\n", " "));
    }
  }

  return (
    <main className="auth-page registration-page">
      <aside className="auth-aside">
        <Link href="/" className="wordmark">
          <span className="wordmark-mark">S</span>
          <span><strong>SOLUTION</strong><small>HUNT</small></span>
        </Link>
        <div>
          <span className="eyebrow">SOLUTION HUNT 2026 / DIRECT REGISTRATION</span>
          <h1>Register for<br /><span>the hunt.</span></h1>
          <p>One-time registration. Instant participant ID. Unique QR pass. No password creation required.</p>
        </div>
        <span className="mono">BUILD · SOLVE · TRANSFORM</span>
      </aside>

      <section className="auth-main registration-main">
        <div className="registration-wrap">
          <div className="registration-progress">
            <span className="is-active">01 <b>Registration</b></span>
            <span>02 <b>Verification</b></span>
            <span>03 <b>Participant pass</b></span>
          </div>

          <div className="auth-form-wrap">
            <span className="eyebrow">REGISTRATION</span>
            <h2>Join Solution Hunt.</h2>
            <p>Complete the form and receive your unique registration ID and QR code.</p>

            {error && <p className="form-error" role="alert">{error}</p>}

            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input id="fullName" value={form.fullName} onChange={(event) => changeField("fullName", event.target.value)} required />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input id="email" type="email" value={form.email} onChange={(event) => changeField("email", event.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input id="phone" type="tel" value={form.phone} onChange={(event) => changeField("phone", event.target.value)} required />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="college">College / Institution *</label>
                  <input id="college" value={form.college} onChange={(event) => changeField("college", event.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="department">Department *</label>
                  <input id="department" value={form.department} onChange={(event) => changeField("department", event.target.value)} required />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="yearOfStudy">Year of Study *</label>
                  <input id="yearOfStudy" value={form.yearOfStudy} onChange={(event) => changeField("yearOfStudy", event.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input id="city" value={form.city} onChange={(event) => changeField("city", event.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="participationType">Participation Type *</label>
                <select id="participationType" value={form.participationType} onChange={(event) => changeField("participationType", event.target.value)}>
                  <option value="Solo">Solo</option>
                  <option value="Team">Team</option>
                  <option value="Looking for Team">Looking for Team</option>
                </select>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="technicalSkills">Technical Skills</label>
                  <input id="technicalSkills" value={form.technicalSkills} onChange={(event) => changeField("technicalSkills", event.target.value)} placeholder="e.g. React, Python, AI" />
                </div>
                <div className="form-group">
                  <label htmlFor="teamName">Team Name (optional)</label>
                  <input id="teamName" value={form.teamName} onChange={(event) => changeField("teamName", event.target.value)} placeholder="Your team name" />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="github">GitHub</label>
                  <input id="github" value={form.github} onChange={(event) => changeField("github", event.target.value)} placeholder="https://github.com/yourprofile" />
                </div>
                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn</label>
                  <input id="linkedin" value={form.linkedin} onChange={(event) => changeField("linkedin", event.target.value)} placeholder="https://linkedin.com/in/yourprofile" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="whyParticipate">Why do you want to participate?</label>
                <textarea id="whyParticipate" rows={4} value={form.whyParticipate} onChange={(event) => changeField("whyParticipate", event.target.value)} style={{ width: "100%", padding: 12, border: "1px solid #E5E7EB" }} />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#071426" }}>
                <input type="checkbox" checked={form.rulesAccepted} onChange={(event) => changeField("rulesAccepted", event.target.checked)} />
                I agree to the Solution Hunt rules and code of conduct.
              </label>

              <button type="submit" className="button button-orange">REGISTER FOR SOLUTION HUNT <span>↗</span></button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
