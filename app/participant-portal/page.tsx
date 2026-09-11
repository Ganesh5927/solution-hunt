"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyParticipant } from "@/lib/identity";

export default function ParticipantPortalPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedId = registrationId.trim();

    if (!trimmedEmail || !trimmedId) {
      setError("Enter both your email and Registration ID to continue.");
      return;
    }

    const participant = verifyParticipant(trimmedEmail, trimmedId);
    if (!participant) {
      setError("No existing registration was found. Please register first or check the details.");
      return;
    }

    localStorage.setItem("solutionHuntCurrentParticipant", JSON.stringify(participant));
    router.push("/participant");
  }

  return (
    <main className="auth-page">
      <aside className="auth-aside">
        <Link href="/" className="wordmark">
          <span className="wordmark-mark">S</span>
          <span><strong>SOLUTION</strong><small>HUNT</small></span>
        </Link>
        <div>
          <span className="eyebrow">SOLVING TOGETHER / RETURNING PARTICIPANT</span>
          <h1>Welcome<br /><span>back.</span></h1>
          <p>Use your existing registration details to open your participant dashboard and keep your hackathon journey moving.</p>
        </div>
        <span className="mono">ONE REGISTRATION. ONE ID. ONE PASS.</span>
      </aside>

      <section className="auth-main">
        <div className="auth-form-wrap">
          <span className="eyebrow">PARTICIPANT PORTAL</span>
          <h2>Verify your registration.</h2>
          <p>Existing participants can continue with their saved Solution Hunt record.</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="portal-email">Email</label>
              <input id="portal-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" />
            </div>

            <div className="form-group">
              <label htmlFor="portal-id">Registration ID</label>
              <input id="portal-id" value={registrationId} onChange={(event) => setRegistrationId(event.target.value)} placeholder="SH26-8F42K" />
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <button type="submit" className="button button-black">OPEN PARTICIPANT PORTAL <span>↗</span></button>
          </form>

          <p className="auth-switch">
            New participant? <Link href="/register">Register for Solution Hunt</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
