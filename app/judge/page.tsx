import Link from "next/link";

const submissions = [
  { name: "Code Titans", track: "AI Healthcare", score: 94.8, status: "Shortlisted" },
  { name: "Cyber Nova", track: "Cyber Defense", score: 92.4, status: "Reviewing" },
  { name: "Byte Force", track: "Smart Campus", score: 89.7, status: "Shortlisted" },
  { name: "Tech Hunters", track: "FinTech", score: 87.9, status: "Pending" },
];

const rubric = [
  { label: "Innovation", value: 9.4 },
  { label: "Impact", value: 9.2 },
  { label: "Execution", value: 8.9 },
  { label: "Presentation", value: 9.1 },
];

export default function JudgePage() {
  return (
    <main className="platform-page judge-page">
      <nav className="platform-nav">
        <Link href="/" className="brand">
          <span className="brand-mark">S</span>
          <span>
            <strong>SOLUTION</strong>
            <small>HUNT</small>
          </span>
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/challenges">Challenges</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/updates">Updates</Link>
          <Link href="/judge" className="active">Judge</Link>
        </div>

        <div className="nav-actions">
          <Link href="/login" className="ghost-button small-button">Login</Link>
          <Link href="/register" className="primary-button small-button">Register</Link>
        </div>
      </nav>

      <section className="page-shell">
        <header className="page-header">
          <div>
            <span className="eyebrow">JUDGE PANEL</span>
            <h1>
              Review <span>submissions.</span>
            </h1>
          </div>
          <div className="header-status">
            <span className="pulse-dot" />
            4 teams in queue
          </div>
        </header>

        <div className="judge-grid">
          <section className="panel-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">SHORTLIST</span>
                <h2>Submission review</h2>
              </div>
            </div>

            <div className="submission-list">
              {submissions.map((item) => (
                <div className="submission-row" key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.track}</small>
                  </div>
                  <span className="score-pill">{item.score}</span>
                  <span className="status-pill">{item.status}</span>
                </div>
              ))}
            </div>
          </section>

          <aside className="panel-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">RUBRIC</span>
                <h2>Evaluation</h2>
              </div>
            </div>

            <div className="rubric-list">
              {rubric.map((item) => (
                <div key={item.label} className="rubric-row">
                  <span>{item.label}</span>
                  <div className="rubric-track">
                    <i style={{ width: `${(item.value / 10) * 100}%` }} />
                  </div>
                  <strong>{item.value.toFixed(1)}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
