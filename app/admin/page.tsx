import Link from "next/link";

const stats = [
  { label: "Participants", value: "200+" },
  { label: "Teams", value: "50" },
  { label: "Challenges", value: "6" },
  { label: "Judges", value: "12" },
];

const queue = [
  "Review final mentor feedback",
  "Approve challenge submissions",
  "Confirm judging slots",
  "Publish leaderboard update",
];

export default function AdminPage() {
  return (
    <main className="platform-page admin-page">
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
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/updates">Updates</Link>
          <Link href="/judge">Judge</Link>
          <Link href="/admin" className="active">Admin</Link>
        </div>

        <div className="nav-actions">
          <Link href="/login" className="ghost-button small-button">Login</Link>
          <Link href="/register" className="primary-button small-button">Register</Link>
        </div>
      </nav>

      <section className="page-shell">
        <header className="page-header">
          <div>
            <span className="eyebrow">ADMIN CONSOLE</span>
            <h1>
              Event <span>operations.</span>
            </h1>
          </div>
          <div className="header-status">
            <span className="pulse-dot" />
            System healthy
          </div>
        </header>

        <div className="stats-card-grid">
          {stats.map((item) => (
            <article className="metric-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>Live status</small>
            </article>
          ))}
        </div>

        <div className="admin-grid">
          <section className="panel-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">QUEUE</span>
                <h2>Priority actions</h2>
              </div>
            </div>

            <ul className="task-list">
              {queue.map((task, index) => (
                <li key={task}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{task}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">OPERATIONS</span>
                <h2>Current status</h2>
              </div>
            </div>

            <div className="status-stack">
              <div className="small-status"><strong>Registration</strong><span>Open</span></div>
              <div className="small-status"><strong>Challenges</strong><span>Live</span></div>
              <div className="small-status"><strong>Judging</strong><span>In progress</span></div>
              <div className="small-status"><strong>Announcements</strong><span>Published</span></div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
