"use client";

import Link from "next/link";
import { useState } from "react";

const leaderboard = [
  { rank: 1, team: "Code Titans", problem: "AI Healthcare", score: 94.8 },
  { rank: 2, team: "Cyber Nova", problem: "Cyber Defense", score: 92.4 },
  { rank: 3, team: "Byte Force", problem: "Smart Campus", score: 89.7 },
  { rank: 4, team: "Tech Hunters", problem: "FinTech", score: 87.9 },
];

const announcements = [
  {
    time: "10 min ago",
    title: "Final judging has started",
    text: "Judges are now evaluating the shortlisted teams.",
  },
  {
    time: "32 min ago",
    title: "Submission window closed",
    text: "All final project submissions have been successfully locked.",
  },
  {
    time: "1 hr ago",
    title: "Leaderboard is live",
    text: "Track the competition rankings in real time.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="site-shell">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#" className="brand">
            <span className="brand-mark">S</span>
            <span>
              <strong>SOLUTION</strong>
              <small>HUNT</small>
            </span>
          </a>

          <div className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
            <a href="#about">About</a>
            <Link href="/challenges">Challenges</Link>
            <a href="#flow">Flow</a>
            <a href="#leaderboard">Leaderboard</a>
            <a href="#announcements">Announcements</a>
          </div>

          <div className="nav-actions">
            <button className="login-btn">Login</button>
            <button className="primary-btn small-btn">Register</button>
          </div>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="about">
        <div className="hero-grid" />

        <div className="hero-content">
          <div className="live-pill">
            <span className="pulse-dot" />
            HACKATHON 2026 · LIVE
          </div>

          <h1>
            Hunt the
            <span> Solution.</span>
          </h1>

          <p className="hero-description">
            Where bold ideas become real-world solutions.
            Build. Break. Innovate. Compete.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Register Now <span>→</span>
            </button>
            <Link href="/challenges" className="secondary-btn">
              Explore Challenges
            </Link>
          </div>

          <div className="hero-meta">
            <div>
              <span className="meta-label">EVENT</span>
              <strong>24–26 OCT 2026</strong>
            </div>
            <div className="meta-line" />
            <div>
              <span className="meta-label">VENUE</span>
              <strong>AM REDDY CAMPUS</strong>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <div className="hero-card">
            <div className="card-top">
              <span>LIVE EVENT</span>
              <span className="status">
                <i /> ACTIVE
              </span>
            </div>

            <div className="countdown">
              <div>
                <strong>18</strong>
                <small>HRS</small>
              </div>
              <span>:</span>
              <div>
                <strong>42</strong>
                <small>MIN</small>
              </div>
              <span>:</span>
              <div>
                <strong>17</strong>
                <small>SEC</small>
              </div>
            </div>

            <div className="card-footer">
              <span>FINAL JUDGING</span>
              <span>ROUND 03 / 03</span>
            </div>
          </div>

          <div className="floating-chip chip-one">
            <span>⚡</span> 50 Teams
          </div>

          <div className="floating-chip chip-two">
            <span>◈</span> 200+ Builders
          </div>
        </div>
      </section>

      {/* LIVE STATUS */}
      <section className="status-section">
        <div className="section-container">
          <div className="status-header">
            <div>
              <span className="eyebrow">LIVE EVENT STATUS</span>
              <h2>The hunt is <span>on.</span></h2>
            </div>

            <div className="round-status">
              <span className="green-dot" />
              <div>
                <small>CURRENT ROUND</small>
                <strong>FINAL JUDGING</strong>
              </div>
            </div>
          </div>

          <div className="status-bar">
            <div className="progress-track">
              <div className="progress-fill" />
            </div>
            <div className="status-times">
              <span>EVENT STARTED</span>
              <strong>78% COMPLETE</strong>
              <span>RESULTS SOON</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="section-container stats-grid">
          <div className="stat-card">
            <span className="stat-icon">⌁</span>
            <strong>50</strong>
            <span>TEAMS</span>
          </div>

          <div className="stat-card">
            <span className="stat-icon">◉</span>
            <strong>200+</strong>
            <span>PARTICIPANTS</span>
          </div>

          <div className="stat-card">
            <span className="stat-icon">✦</span>
            <strong>12</strong>
            <span>JUDGES</span>
          </div>

          <div className="stat-card">
            <span className="stat-icon">◇</span>
            <strong>47</strong>
            <span>SUBMISSIONS</span>
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="flow-section" id="flow">
        <div className="section-container">
          <div className="section-heading">
            <span className="eyebrow">HOW IT WORKS</span>
            <h2>From idea to <span>impact.</span></h2>
            <p>
              Six stages. One mission. Build something that matters.
            </p>
          </div>

          <div className="flow-grid">
            {[
              ["01", "REGISTER", "Join the hunt and choose your challenge."],
              ["02", "BUILD", "Turn your idea into a working solution."],
              ["03", "FREEZE", "Lock your project before the deadline."],
              ["04", "SUBMIT", "Submit your solution for evaluation."],
              ["05", "JUDGE", "Experts evaluate innovation and impact."],
              ["06", "WIN", "Rise to the top and claim the victory."],
            ].map(([number, title, text]) => (
              <div className="flow-card" key={number}>
                <span className="flow-number">{number}</span>
                <div className="flow-arrow">↗</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="leaderboard-section" id="leaderboard">
        <div className="section-container">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">LIVE LEADERBOARD</span>
              <h2>Who's leading the <span>hunt?</span></h2>
            </div>

            <button className="outline-btn">View Full Leaderboard →</button>
          </div>

          <div className="leaderboard">
            <div className="leader-head">
              <span>RANK</span>
              <span>TEAM</span>
              <span>CHALLENGE</span>
              <span>SCORE</span>
            </div>

            {leaderboard.map((item) => (
              <div className="leader-row" key={item.rank}>
                <span className={`rank rank-${item.rank}`}>
                  {String(item.rank).padStart(2, "0")}
                </span>

                <strong>{item.team}</strong>

                <span className="problem">{item.problem}</span>

                <span className="score">{item.score}</span>

                <span className="rank-up">↑</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PASSPORT */}
      <section className="passport-section" id="challenges">
        <div className="section-container passport-layout">
          <div className="passport-copy">
            <span className="eyebrow">YOUR HACKATHON PASSPORT</span>

            <h2>
              One identity.
              <br />
              <span>Every checkpoint.</span>
            </h2>

            <p>
              Your digital hackathon passport keeps your entire journey
              connected — from registration to the final stage.
            </p>

            <div className="passport-features">
              <div>
                <span>✓</span>
                <div>
                  <strong>Digital Identity</strong>
                  <small>Unique participant QR</small>
                </div>
              </div>

              <div>
                <span>✓</span>
                <div>
                  <strong>Checkpoint Tracking</strong>
                  <small>Never miss a milestone</small>
                </div>
              </div>

              <div>
                <span>✓</span>
                <div>
                  <strong>Live Progress</strong>
                  <small>Track your hackathon journey</small>
                </div>
              </div>
            </div>

            <button className="primary-btn">
              Get Your Passport →
            </button>
          </div>

          <div className="passport-visual">
            <div className="passport-card">
              <div className="passport-top">
                <div>
                  <small>HACKATHON</small>
                  <strong>SOLUTION HUNT</strong>
                </div>
                <span>2026</span>
              </div>

              <div className="passport-body">
                <div className="avatar-placeholder">G</div>

                <div>
                  <small>PARTICIPANT</small>
                  <strong>GANESH</strong>
                  <span>PARTICIPANT · SH-021</span>
                </div>

                <div className="qr-box">
                  <span>▦</span>
                </div>
              </div>

              <div className="passport-progress">
                <div className="passport-progress-head">
                  <span>HUNT PROGRESS</span>
                  <strong>4 / 6</strong>
                </div>
                <div className="mini-progress">
                  <i />
                </div>
              </div>

              <div className="passport-checkpoints">
                <span className="done">✓</span>
                <span className="done">✓</span>
                <span className="done">✓</span>
                <span className="done">✓</span>
                <span>5</span>
                <span>6</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section className="announcement-section" id="announcements">
        <div className="section-container">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">LIVE UPDATES</span>
              <h2>What's <span>happening?</span></h2>
            </div>

            <button className="outline-btn">All Announcements →</button>
          </div>

          <div className="announcement-grid">
            {announcements.map((announcement, index) => (
              <article className="announcement-card" key={index}>
                <div className="announcement-icon">↗</div>
                <small>{announcement.time}</small>
                <h3>{announcement.title}</h3>
                <p>{announcement.text}</p>
                <a href="#">Read update →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="sponsors-section">
        <div className="section-container">
          <div className="section-heading center-heading">
            <span className="eyebrow">POWERED BY</span>
            <h2>Our <span>partners.</span></h2>
          </div>

          <div className="sponsor-grid">
            <div>TECH<span>CORE</span></div>
            <div>NOVA<span>LABS</span></div>
            <div>CYBER<span>GRID</span></div>
            <div>QUANTUM<span>WORKS</span></div>
            <div>INNO<span>VERSE</span></div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="cta-glow" />

        <div className="section-container cta-content">
          <span className="eyebrow">THE NEXT SOLUTION STARTS WITH YOU</span>

          <h2>
            Ready to hunt
            <br />
            <span>the impossible?</span>
          </h2>

          <p>
            Bring your ideas. Build with your team.
            Leave your mark.
          </p>

          <button className="primary-btn cta-btn">
            Register for Solution Hunt →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="section-container footer-top">
          <div className="brand footer-brand">
            <span className="brand-mark">S</span>
            <span>
              <strong>SOLUTION</strong>
              <small>HUNT</small>
            </span>
          </div>

          <p>
            A live hackathon platform built for ideas,
            innovation and impact.
          </p>

          <div className="footer-links">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
          </div>
        </div>

        <div className="section-container footer-bottom">
          <span>© 2026 Solution Hunt. All rights reserved.</span>
          <span>Built for innovators.</span>
        </div>
      </footer>
    </main>
  );
}