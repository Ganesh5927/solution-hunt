"use client";

import Link from "next/link";

export default function RegistrationSuccessPage() {
  return (
    <main className="auth-page registration-success-page">
      <aside className="auth-aside">
        <Link href="/" className="wordmark">
          <span className="wordmark-mark">S</span>
          <span><strong>SOLUTION</strong><small>HUNT</small></span>
        </Link>
        <div>
          <span className="eyebrow">SOLUTION HUNT 2026 / VERIFIED</span>
          <h1>Welcome to<br /><span>the hunt.</span></h1>
          <p>Your registration has been confirmed. Your unique participant ID and QR pass are ready.</p>
        </div>
        <span className="mono">BUILD · SOLVE · TRANSFORM</span>
      </aside>

      <section className="auth-main">
        <div className="auth-form-wrap">
          <span className="eyebrow">REGISTRATION SUCCESSFUL</span>
          <h2>Confirmed.</h2>
          <p>Your Solution Hunt registration was created successfully.</p>
          <div className="success-id-grid">
            <div><span>STATUS</span><strong>VERIFIED</strong></div>
            <div><span>ACCESS</span><strong>PARTICIPANT PORTAL</strong></div>
          </div>
          <div className="registration-actions">
            <Link href="/participant" className="button button-orange">OPEN PARTICIPANT DASHBOARD <span>↗</span></Link>
            <Link href="/participant-portal" className="button button-outline">RETURNING PARTICIPANT</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
