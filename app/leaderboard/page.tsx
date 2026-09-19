import Link from "next/link";

const teams = [
  { rank: 1, name: "Code Titans", track: "AI Healthcare", score: 94.8, delta: "+2.4" },
  { rank: 2, name: "Cyber Nova", track: "Cyber Defense", score: 92.4, delta: "+1.1" },
  { rank: 3, name: "Byte Force", track: "Smart Campus", score: 89.7, delta: "+0.8" },
  { rank: 4, name: "Tech Hunters", track: "FinTech", score: 87.9, delta: "+3.1" },
  { rank: 5, name: "Quantum Pioneers", track: "Smart City", score: 85.6, delta: "+0.5" },
  { rank: 6, name: "Signal Forge", track: "Deep Learning", score: 82.1, delta: "-0.2" },
];

export default function LeaderboardPage() {
  return (
    <main className="platform-page leaderboard-page">
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
          <Link href="/leaderboard" className="active">Leaderboard</Link>
          <Link href="/updates">Updates</Link>
          <Link href="/judge">Judge</Link>
        </div>

        <div className="nav-actions">
          <Link href="/login" className="ghost-button small-button">Login</Link>
          <Link href="/register" className="primary-button small-button">Register</Link>
        </div>
      </nav>

      <section className="page-shell">
        <header className="page-header">
          <div>
            <span className="eyebrow">LIVE RANKINGS</span>
            <h1>
              Leaderboard <span>pulse.</span>
            </h1>
          </div>
          <div className="header-status">
            <span className="pulse-dot" />
            Updated 3 min ago
          </div>
        </header>

        <div className="stats-card-grid">
          <article className="metric-card metric-card-accent">
            <span>TOP TEAM</span>
            <strong>Code Titans</strong>
            <small>94.8 pts</small>
          </article>
          <article className="metric-card">
            <span>ACTIVE TEAMS</span>
            <strong>50</strong>
            <small>Qualified</small>
          </article>
          <article className="metric-card">
            <span>JUDGING ROUND</span>
            <strong>Round 3</strong>
            <small>Final review</small>
          </article>
        </div>

        <section className="panel-card table-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">CURRENT STANDINGS</span>
              <h2>Top performers</h2>
            </div>
          </div>

          <div className="leaderboard-table">
            <div className="leaderboard-head">
              <span>Rank</span>
              <span>Team</span>
              <span>Challenge</span>
              <span>Score</span>
              <span>Trend</span>
            </div>

            {teams.map((team) => (
              <div className="leaderboard-row" key={team.rank}>
                <span className="rank-badge">#{team.rank}</span>
                <strong>{team.name}</strong>
                <span>{team.track}</span>
                <span className="score-pill">{team.score}</span>
                <span className="trend-pill">{team.delta}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
