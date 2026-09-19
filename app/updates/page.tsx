import Link from "next/link";

const updates = [
  {
    time: "10 minutes ago",
    title: "Judging has started for final shortlist",
    text: "Panelists are now advancing through the live review rounds and scoring finalists on impact, execution, and innovation.",
    tag: "Judging",
  },
  {
    time: "32 minutes ago",
    title: "Submission window closed",
    text: "All final projects have been locked securely. Teams are now preparing for the final showcase and expert review.",
    tag: "Operations",
  },
  {
    time: "1 hour ago",
    title: "Leaderboard is now live",
    text: "Track the current standings and challenge trends as the event unfolds across all problem tracks.",
    tag: "Leaderboard",
  },
  {
    time: "Today",
    title: "Mentor office hours have opened",
    text: "Teams can now book mentor sessions for architecture feedback, product polish, and pitch refinement.",
    tag: "Mentors",
  },
];

export default function UpdatesPage() {
  return (
    <main className="platform-page updates-page">
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
          <Link href="/updates" className="active">Updates</Link>
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
            <span className="eyebrow">EVENT SIGNALS</span>
            <h1>
              Live <span>updates.</span>
            </h1>
          </div>
          <Link href="/" className="secondary-button small-button">Back home</Link>
        </header>

        <div className="update-stack">
          {updates.map((update) => (
            <article className="panel-card update-card" key={update.title}>
              <div className="update-meta">
                <span className="tag-pill">{update.tag}</span>
                <small>{update.time}</small>
              </div>
              <h2>{update.title}</h2>
              <p>{update.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
