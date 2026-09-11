"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="ref-site-shell">
      {/* ====================================================================
          1. HEADER & HERO SECTION (DARK NAVY / BLUE POLYGONAL AESTHETIC)
          ==================================================================== */}
      <div className="ref-hero-wrapper">
        {/* GLOBAL HEADER */}
        <header className="ref-header">
          <div className="ref-header-inner">
            <Link href="/" className="ref-brand">
              <Image
                src="/logo.png"
                alt="NEXORA Logo"
                width={36}
                height={36}
                className="ref-brand-logo"
                priority
              />
              <span className="ref-brand-text">
                <strong>NEXORA</strong>
                <small>2026</small>
              </span>
            </Link>

            <nav className={`ref-nav ${menuOpen ? "open" : ""}`}>
              <a href="#the-hunt" onClick={() => setMenuOpen(false)}>The Hunt</a>
              <Link href="/challenges" onClick={() => setMenuOpen(false)}>Challenges</Link>
              <a href="#schedule" onClick={() => setMenuOpen(false)}>Schedule</a>
              <Link href="/leaderboard" onClick={() => setMenuOpen(false)}>Leaderboard</Link>
              <Link href="/team" onClick={() => setMenuOpen(false)}>Teams</Link>
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            </nav>

            <div className="ref-header-actions">
              <Link href="/login" className="ref-login-link">
                Log in
              </Link>
              <Link href="/register" className="ref-btn-primary ref-btn-pill">
                Join NEXORA <span>→</span>
              </Link>
            </div>

            <button
              type="button"
              className="ref-mobile-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </header>

        {/* HERO CONTENT AREA */}
        <section className="ref-hero" id="the-hunt">
          <div className="ref-hero-grid">
            {/* HERO LEFT: HEADLINE & ACTIONS */}
            <div className="ref-hero-left">
              <div className="ref-institution-pill">
                A.M. REDDY MEMORIAL COLLEGE OF ENGINEERING &amp; TECHNOLOGY PRESENTS
              </div>

              <h1 className="ref-hero-title">
                NEXORA<br />
                <span className="ref-hunt-word">
                  2026<span className="ref-lime-dot">.</span>
                </span>
              </h1>

              <div className="ref-hero-motto">
                <span>SOLVE REAL PROBLEMS.</span>
                <span>BUILD REAL SOLUTIONS.</span>
              </div>

              <p className="ref-hero-description">
                A problem-driven 24-hour hackathon where students identify real-world
                challenges, build practical solutions and make an impact.
              </p>

              <div className="ref-hero-actions">
                <Link href="/register" className="ref-btn-primary ref-btn-rounded">
                  Register Now <span>→</span>
                </Link>
                <Link href="/challenges" className="ref-btn-ghost ref-btn-rounded">
                  Explore Challenges
                </Link>
              </div>
            </div>

            {/* HERO RIGHT: CAMPUS SHOWCASE + NEXORA 2026 OVERLAY */}
            <div className="ref-hero-right">
              <div className="ref-campus-card">
                <div className="ref-campus-img-container">
                  <Image
                    src="/amr.jpeg"
                    alt="A.M. Reddy Memorial College of Engineering & Technology Campus"
                    fill
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="ref-campus-photo"
                    priority
                  />
                  {/* Angled polygon lighting & shading accents */}
                  <div className="ref-polygon-accent" />
                  <div className="ref-polygon-accent-subtle" />

                  {/* Top-Right Typographic Tag */}
                  <div className="ref-hero-keywords">
                    <span>IDEAS</span>
                    <span>PEOPLE</span>
                    <span>TECHNOLOGY</span>
                    <strong>A BETTER TOMORROW</strong>
                  </div>

                  {/* Bottom-Right NEXORA 2026 Badge */}
                  <div className="ref-nexora-badge">
                    <span className="ref-nexora-title">NEXORA</span>
                    <span className="ref-nexora-year">2026</span>
                    <p className="ref-nexora-tagline">
                      <span>IN</span>NOVATING FOR A<br />
                      <span>SM</span>ARTER, SUSTAINABLE<br />
                      &amp; CONNECTED FUTURE
                    </p>
                    <div className="ref-nexora-bar" />
                  </div>

                  {/* Bottom-Left Official Venue Overlay */}
                  <div className="ref-venue-overlay">
                    <div className="ref-venue-pin">📍</div>
                    <div className="ref-venue-text">
                      <small>OFFICIAL VENUE</small>
                      <strong>A.M. Reddy Memorial College of Engineering &amp; Technology</strong>
                      <span>Narasaraopet</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS STRIP (6 COLUMNS) */}
        <div className="ref-metrics-bar">
          <div className="ref-metrics-inner">
            <div className="ref-metric-item ref-metric-status">
              <span className="ref-pulse-dot" />
              <div>
                <small>REGISTRATION</small>
                <strong className="ref-open-tag">OPEN</strong>
              </div>
            </div>

            <div className="ref-metric-item">
              <small>TEAMS</small>
              <strong>—</strong>
            </div>

            <div className="ref-metric-item">
              <small>PARTICIPANTS</small>
              <strong>—</strong>
            </div>

            <div className="ref-metric-item">
              <small>CHALLENGES</small>
              <strong>6+</strong>
            </div>

            <div className="ref-metric-item">
              <small>JUDGES</small>
              <strong>—</strong>
            </div>

            <div className="ref-metric-item ref-metric-event">
              <small>NEXT EVENT</small>
              <strong>Problem Statement Reveal</strong>
              <span className="ref-event-date">
                📅 Sep 12, 2026 · 10:00 AM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          2. NOT JUST A HACKATHON SECTION
          ==================================================================== */}
      <section className="ref-not-just-section" id="about">
        <div className="ref-container">
          <div className="ref-not-just-grid">
            <div className="ref-not-just-copy">
              <h2>
                NOT JUST <span>A HACKATHON.</span>
              </h2>
              <p>
                NEXORA brings together the brightest minds from our college to
                tackle real-world problems and turn ideas into impactful solutions.
              </p>

              <div className="ref-pillars-grid">
                <div className="ref-pillar-item">
                  <span className="ref-pillar-icon">📦</span>
                  <div>
                    <small>REAL</small>
                    <strong>PROBLEMS</strong>
                  </div>
                </div>

                <div className="ref-pillar-item">
                  <span className="ref-pillar-icon">👥</span>
                  <div>
                    <small>REAL</small>
                    <strong>TEAMS</strong>
                  </div>
                </div>

                <div className="ref-pillar-item">
                  <span className="ref-pillar-icon">👤</span>
                  <div>
                    <small>REAL</small>
                    <strong>MENTORS</strong>
                  </div>
                </div>

                <div className="ref-pillar-item">
                  <span className="ref-pillar-icon">📊</span>
                  <div>
                    <small>REAL</small>
                    <strong>IMPACT</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="ref-not-just-visual">
              <div className="ref-video-card">
                <Image
                  src="/amr.jpeg"
                  alt="Experience A.M. Reddy Campus"
                  width={680}
                  height={380}
                  className="ref-video-img"
                />
                <div className="ref-video-play-btn" aria-label="Play campus tour">
                  <span>▶</span>
                </div>
                <div className="ref-video-overlay-caption">
                  <strong>Experience Our Campus</strong>
                  <span>A place to learn, create and innovate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. THE HUNT: FROM IDEAS TO IMPACT (8-STAGE JOURNEY)
          ==================================================================== */}
      <section className="ref-journey-section">
        <div className="ref-container">
          <div className="ref-journey-header">
            <div className="ref-journey-title-wrap">
              <span className="ref-sub-eyebrow">NEXORA 2026</span>
              <h2>
                FROM IDEAS TO <span>IMPACT</span>
              </h2>
            </div>

            <div className="ref-journey-desc-wrap">
              <div className="ref-vertical-divider" />
              <p>
                A 24-hour journey of problem solving, collaboration and creation.
                Take on the challenge. Build something meaningful.
              </p>
            </div>

            <a href="#how-it-works" className="ref-how-it-works-link">
              How It Works <span>→</span>
            </a>
          </div>

          <div className="ref-steps-strip" id="how-it-works">
            {[
              { num: "01", icon: "📄", title: "REGISTER", text: "Sign up and be part of the hunt" },
              { num: "02", icon: "👥", title: "FORM A TEAM", text: "Collaborate with diverse minds" },
              { num: "03", icon: "🔍", title: "EXPLORE PROBLEMS", text: "Choose a real-world challenge" },
              { num: "04", icon: "💡", title: "BUILD", text: "Develop your solution" },
              { num: "05", icon: "⚙️", title: "GET FEEDBACK", text: "Interact with mentors and experts" },
              { num: "06", icon: "📤", title: "SUBMIT", text: "Showcase your project" },
              { num: "07", icon: "🏆", title: "PITCH", text: "Present to the jury" },
              { num: "08", icon: "📊", title: "SEE THE IMPACT", text: "Check the leaderboard and results" },
            ].map((step, idx) => (
              <div className="ref-step-item" key={step.num}>
                <div className="ref-step-head">
                  <span className="ref-step-num">{step.num}</span>
                  <span className="ref-step-icon">{step.icon}</span>
                  {idx < 7 && <span className="ref-step-arrow">›</span>}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. 3-COLUMN FEATURE CARDS (CHALLENGES | THEMES | DIGITAL PASSPORT)
          ==================================================================== */}
      <section className="ref-cards-section">
        <div className="ref-container">
          <div className="ref-cards-grid">
            {/* CARD 1: REAL-WORLD CHALLENGES */}
            <div className="ref-dark-card ref-challenges-card">
              <div className="ref-dark-card-content">
                <h3>REAL-WORLD CHALLENGES</h3>
                <p>
                  Explore problem statements from various domains and choose the
                  one that excites you.
                </p>
                <Link href="/challenges" className="ref-btn-primary ref-btn-sm-pill">
                  Explore Challenges <span>→</span>
                </Link>
              </div>
              <div className="ref-card-poly-shape" />
            </div>

            {/* CARD 2: KEY THEMES (6 BOXES) */}
            <div className="ref-light-card ref-themes-card">
              <div className="ref-themes-header">
                <h3>KEY THEMES</h3>
                <Link href="/challenges" className="ref-view-all-link">
                  View All <span>→</span>
                </Link>
              </div>

              <div className="ref-themes-grid">
                <div className="ref-theme-box">
                  <span className="ref-theme-icon green-icon">🍃</span>
                  <p>Technology for Society &amp; Industries</p>
                </div>

                <div className="ref-theme-box">
                  <span className="ref-theme-icon blue-icon">💻</span>
                  <p>AI, Technology &amp; Digital Innovation</p>
                </div>

                <div className="ref-theme-box">
                  <span className="ref-theme-icon pink-icon">💖</span>
                  <p>Healthcare, Medical Technology &amp; Wellness</p>
                </div>

                <div className="ref-theme-box">
                  <span className="ref-theme-icon green-icon">🌿</span>
                  <p>Agriculture, Environment &amp; Sustainability</p>
                </div>

                <div className="ref-theme-box">
                  <span className="ref-theme-icon blue-icon">🏛️</span>
                  <p>Smart Infrastructure, Mobility &amp; Manufacturing</p>
                </div>

                <div className="ref-theme-box">
                  <span className="ref-theme-icon blue-icon">👥</span>
                  <p>Social Impact, Education &amp; Inclusive Solutions</p>
                </div>
              </div>
            </div>

            {/* CARD 3: DIGITAL PASSPORT */}
            <div className="ref-dark-card ref-passport-preview-card">
              <div className="ref-passport-left-copy">
                <h3>DIGITAL PASSPORT</h3>
                <p>
                  Your NEXORA journey. Your milestones. Collect stamps, complete
                  checkpoints and make your mark.
                </p>
                <Link href="/passport" className="ref-btn-primary ref-btn-sm-pill">
                  Learn More <span>→</span>
                </Link>
              </div>

              <div className="ref-passport-mock-graphic">
                <div className="ref-passport-card-shape">
                  <span className="ref-mock-brand">NEXORA 2026</span>
                  <div className="ref-mock-globe">🌐</div>
                  <div className="ref-mock-motto">
                    <span>EXPLORE</span>
                    <span>ENGAGE</span>
                    <span>BUILD</span>
                    <span>LEAVE PROOF</span>
                  </div>
                  <div className="ref-passport-accent-ribbon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. FEED GRID: EVENT SCHEDULE | LEADERBOARD PREVIEW | LATEST UPDATES
          ==================================================================== */}
      <section className="ref-feed-section" id="schedule">
        <div className="ref-container">
          <div className="ref-feed-grid">
            {/* COLUMN 1: EVENT SCHEDULE */}
            <div className="ref-feed-col ref-schedule-col">
              <div className="ref-feed-col-head">
                <div>
                  <h3>EVENT SCHEDULE</h3>
                  <small>A 24-hour journey from ideas to impact.</small>
                </div>
                <Link href="/updates" className="ref-col-action-link">
                  View Full Schedule <span>→</span>
                </Link>
              </div>

              <div className="ref-timeline-list">
                {[
                  { time: "11:30 AM", title: "Opening Ceremony + Rules" },
                  { time: "12:00 PM", title: "Problem Statement + Ideation" },
                  { time: "01:00 PM", title: "Lunch Break" },
                  { time: "01:45 PM", title: "Idea Finalization + Planning" },
                  { time: "03:00 PM", title: "Development – Phase 1" },
                  { time: "...", title: "and much more" },
                ].map((item, idx) => (
                  <div className="ref-timeline-item" key={idx}>
                    <div className="ref-timeline-bullet" />
                    <span className="ref-timeline-time">{item.time}</span>
                    <span className="ref-timeline-title">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 2: LEADERBOARD PREVIEW */}
            <div className="ref-feed-col ref-leaderboard-col">
              <div className="ref-feed-col-head center-head">
                <h3>LEADERBOARD PREVIEW</h3>
                <small>Rankings will appear when the hunt begins.</small>
              </div>

              <div className="ref-leaderboard-empty-state">
                <div className="ref-trophy-icon">🏆</div>
                <strong>Rankings will appear when the hunt begins.</strong>
                <p>Stay tuned! The leaderboard will be updated once judging starts.</p>
              </div>
            </div>

            {/* COLUMN 3: LATEST UPDATES */}
            <div className="ref-feed-col ref-updates-col">
              <div className="ref-feed-col-head">
                <h3>LATEST UPDATES</h3>
                <Link href="/updates" className="ref-col-action-link">
                  View All <span>→</span>
                </Link>
              </div>

              <div className="ref-updates-list">
                {[
                  { icon: "📄", text: "New challenge track coming soon.", time: "2 hours ago" },
                  { icon: "ℹ️", text: "Mentor session schedule will be announced.", time: "5 hours ago" },
                  { icon: "💼", text: "Registrations are now open!", time: "1 day ago" },
                  { icon: "🧭", text: "Follow our social media for more updates.", time: "1 day ago" },
                ].map((item, idx) => (
                  <div className="ref-update-row" key={idx}>
                    <span className="ref-update-icon">{item.icon}</span>
                    <div className="ref-update-copy">
                      <p>{item.text}</p>
                      <small>{item.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. READY TO HUNT THE SOLUTION? (FINAL CTA STRIP)
          ==================================================================== */}
      <section className="ref-cta-strip">
        <div className="ref-container">
          <div className="ref-cta-flex">
            <div className="ref-cta-left">
              <span className="ref-cta-eyebrow">BE PART OF SOMETHING BIGGER</span>
              <h2>
                READY TO JOIN <span>NEXORA?</span>
              </h2>
              <p>Join NEXORA 2026 and turn your ideas into real-world impact.</p>
            </div>

            <div className="ref-cta-actions">
              <Link href="/register" className="ref-btn-primary ref-btn-rounded">
                Register for NEXORA <span>→</span>
              </Link>
              <Link href="/challenges" className="ref-btn-ghost ref-btn-rounded">
                Explore Challenges
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. FOOTER (EXACT MATCH WITH SOCIALS & COLLEGE DETAILS)
          ==================================================================== */}
      <footer className="ref-footer">
        <div className="ref-container">
          <div className="ref-footer-top">
            <Link href="/" className="ref-brand">
              <Image
                src="/logo.png"
                alt="NEXORA Logo"
                width={36}
                height={36}
                className="ref-brand-logo"
              />
              <span className="ref-brand-text">
                <strong>NEXORA</strong>
                <small>2026</small>
              </span>
            </Link>

            <div className="ref-footer-nav">
              <a href="#the-hunt">The Hunt</a>
              <Link href="/challenges">Challenges</Link>
              <a href="#schedule">Schedule</a>
              <Link href="/leaderboard">Leaderboard</Link>
              <Link href="/team">Teams</Link>
              <a href="#about">About</a>
            </div>

            <div className="ref-social-icons">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">📷</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">▶</a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">𝕏</a>
            </div>

            <div className="ref-footer-college">
              <strong>A.M. Reddy Memorial College of Engineering &amp; Technology</strong>
              <span>Narasaraopet</span>
            </div>
          </div>

          <div className="ref-footer-bottom">
            <span>© 2026 NEXORA. All rights reserved.</span>
            <div className="ref-footer-credo">
              <span>People</span>
              <span>|</span>
              <span>Planet</span>
              <span>|</span>
              <span>Progress</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}