import Link from "next/link";
import SiteHeader from "@/components/navigation/SiteHeader";
import ChallengeCard from "@/components/challenges/ChallengeCard";
import { ButtonLink, EmptyState } from "@/components/ui/Button";
import { challenges, leaderboardPreview, passportStages } from "@/lib/constants";

const journey = [
  ["01", "Discover", "Explore the challenges."],
  ["02", "Form", "Build your team."],
  ["03", "Build", "Create your solution."],
  ["04", "Validate", "Get mentor and judge feedback."],
  ["05", "Submit", "Send in your final project."],
  ["06", "Win", "Present, compete, celebrate."],
];

const highlights = [
  ["SEP 12", "EVENT UPDATE", "Problem statement reveal", "The six Solution Hunt tracks go live."],
  ["SEP 16", "COMMUNITY", "Team formation opens", "Find your co-builders and make a plan."],
  ["SEP 20", "WORKSHOP", "Build with intent", "A practical session on shaping a strong prototype."],
  ["OCT 24", "FINALE", "Solution Hunt begins", "Bring the problem, the people and the work."],
];

export default function Home() {
  return (
    <main className="site-shell platform-home">
      <SiteHeader />

      <section className="platform-hero">
        <div className="container platform-hero-grid">
          <div className="platform-hero-copy">
            <span className="eyebrow">SOLUTION HUNT 2026 / AM REDDY GROUP OF INSTITUTIONS</span>
            <h1>Build solutions.<br /><span>Shape tomorrow.</span></h1>
            <p>A problem-driven college hackathon where students turn real-world challenges into meaningful solutions.</p>
            <div className="hero-actions">
              <ButtonLink href="/register" variant="orange">REGISTER FOR SOLUTION HUNT <span>↗</span></ButtonLink>
              <ButtonLink href="/challenges" variant="outline">EXPLORE CHALLENGES</ButtonLink>
            </div>
            <div className="platform-hero-meta"><span><strong>48H</strong> BUILD WINDOW</span><span><strong>SEP 2026</strong> AM REDDY CAMPUS</span></div>
          </div>
          <div className="platform-hero-visual">
            <div className="visual-grid" />
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-core"><span>IDEAS</span><b>+</b><span>PEOPLE</span><b>+</b><span>TECHNOLOGY</span><strong>IMPACT</strong></div>
            <div className="visual-label visual-label-top">REAL PROBLEMS<br />REAL SOLUTIONS</div>
            <div className="visual-label visual-label-bottom">SH / 2026<br />AM REDDY CAMPUS</div>
          </div>
        </div>
      </section>

      <section className="platform-intro section" id="about"><div className="container platform-intro-grid"><div><span className="eyebrow">BUILD WHAT MATTERS</span><h2>Not just a hackathon.<br /><span>A place to begin.</span></h2></div><div><p>Solution Hunt brings together students, builders, designers and problem solvers to work on challenges that matter.</p><div className="intro-lines"><span>Learn by building.</span><span>Collaborate with teams.</span><span>Solve real problems.</span></div></div></div></section>

      <section className="platform-event section" id="schedule"><div className="container"><div className="section-topline"><span className="eyebrow">UPCOMING EVENT</span><span className="mono">01 / 01</span></div><div className="event-card"><div><span className="event-card-kicker">SOLUTION HUNT 2026 / HACKATHON</span><h2>Make the problem<br /><span>yours.</span></h2><p>September 2026 · AM Reddy Group of Institutions</p></div><div className="event-card-side"><span className="status-chip">REGISTRATION OPEN</span><strong>24—26</strong><small>OCTOBER 2026</small><ButtonLink href="/register" variant="orange">REGISTER FOR SOLUTION HUNT <span>↗</span></ButtonLink><Link href="/challenges">View event <span>↗</span></Link></div></div></div></section>

      <section className="platform-stats"><div className="container platform-stats-grid">{[["6+", "Challenge tracks"], ["—", "Participants / coming soon"], ["—", "Teams / coming soon"], ["—", "Mentors / coming soon"], ["—", "Prize pool / coming soon"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>

      <section className="platform-challenges section" id="teams"><div className="container"><div className="platform-heading"><div><span className="eyebrow">CHALLENGE DISCOVERY</span><h2>Real problems.<br /><span>Real impact.</span></h2></div><p>Explore challenges designed to turn ideas into working solutions.</p></div><div className="challenge-preview-grid">{challenges.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}</div></div></section>

      <section className="platform-journey section" id="hunt"><div className="container"><div className="platform-heading"><div><span className="eyebrow">THE HACKATHON JOURNEY</span><h2>Six moves.<br /><span>One build.</span></h2></div><p>From the first question to the final pitch, every stage is a chance to learn and move forward.</p></div><div className="journey-grid">{journey.map(([number, title, text]) => <article key={number}><span className="mono">{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="platform-community section"><div className="container"><div className="platform-heading"><div><span className="eyebrow">OUR COMMUNITY</span><h2>More people.<br /><span>More possibility.</span></h2></div><p>Impact metrics will appear here as the Solution Hunt community grows.</p></div><div className="community-grid">{[["—", "Hackathons"], ["—", "Projects"], ["—", "Participants"], ["—", "Mentors"], ["—", "Hours of learning"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}<em>COMING SOON</em></span></div>)}</div></div></section>

      <section className="platform-highlights section"><div className="container"><div className="platform-heading"><div><span className="eyebrow">HIGHLIGHTS</span><h2>What&apos;s<br /><span>happening.</span></h2></div><p>Follow the moments that bring the event together.</p></div><div className="highlight-grid">{highlights.map(([date, category, title, description]) => <article key={title}><span className="mono">{date}</span><small>{category}</small><h3>{title}</h3><p>{description}</p><span className="highlight-arrow">↗</span></article>)}</div></div></section>

      <section className="platform-passport section"><div className="container platform-passport-grid"><div><span className="eyebrow">HACKATHON PASSPORT</span><h2>Your hackathon<br /><span>identity.</span></h2><p>One digital passport for your complete Solution Hunt journey.</p><ButtonLink href="/participant-portal" variant="black">PARTICIPANT PORTAL <span>↗</span></ButtonLink></div><div className="passport-ticket"><div className="passport-ticket-head"><span>PARTICIPANT ID / QR IDENTITY</span><span>2026</span></div><h3>Every step.<br /><span>One passport.</span></h3><div className="passport-dots">{passportStages.map((stage) => <span key={stage.label} />)}</div><div className="passport-ticket-foot"><span>TEAM / CHALLENGE / SUBMISSION</span><span>02 / 08</span></div></div></div></section>

      <section className="platform-leaderboard section" id="leaderboard"><div className="container"><div className="platform-heading"><div><span className="eyebrow">LIVE LEADERBOARD / PREVIEW</span><h2>See where<br /><span>you stand.</span></h2></div><p>Rankings will be published after judging begins.</p></div>{leaderboardPreview.length ? <div className="leaderboard-preview">{leaderboardPreview.map((entry) => <div key={entry.rank}><span>{entry.rank}</span><strong>{entry.team}</strong><span>{entry.challenge}</span><b>{entry.score}</b><em>PREVIEW</em></div>)}</div> : <EmptyState eyebrow="LEADERBOARD" title="Rankings will appear when the hunt begins." body="No verified standings are available yet." />}<ButtonLink href="/participant" variant="outline">PARTICIPANT PORTAL <span>↗</span></ButtonLink></div></section>

      <section className="platform-ecosystem section" id="sponsors"><div className="container"><div className="platform-heading"><div><span className="eyebrow">OUR ECOSYSTEM</span><h2>Built by a<br /><span>community.</span></h2></div><p>Partner categories will be filled as the event ecosystem comes together.</p></div><div className="ecosystem-grid">{["Technology Partner", "Knowledge Partner", "Community Partner", "Innovation Partner", "Prize Partner"].map((label) => <div key={label}>{label}</div>)}</div></div></section>

      <section className="platform-ecosystem section" id="faq"><div className="container"><div className="platform-heading"><div><span className="eyebrow">FAQ</span><h2>Find your<br /><span>answers.</span></h2></div><p>Registration is direct and once-only. Returning participants can verify their existing registration through the participant portal.</p></div><div className="faq-list">{["Can I register only once?", "How do I join a team?", "How do I access my pass?"].map((item) => <div key={item} className="faq-item"><span>•</span><p>{item}</p></div>)}</div></div></section>

      <section className="platform-final"><div className="container"><span className="eyebrow">SOLUTION HUNT 2026</span><h2>Ready to build<br /><span>what&apos;s next?</span></h2><p>Bring your idea. Build with your team. Solve a problem that matters.</p><div className="hero-actions"><ButtonLink href="/register" variant="black">REGISTER FOR SOLUTION HUNT <span>↗</span></ButtonLink><ButtonLink href="/challenges" variant="outline">EXPLORE CHALLENGES</ButtonLink></div></div></section>

      <footer className="platform-footer"><div className="container platform-footer-grid"><div><span className="wordmark"><span className="wordmark-mark">S</span><span><strong>SOLUTION</strong><small>HUNT</small></span></span><p>Think. Build. Solve. Win.</p></div><div><strong>EXPLORE</strong><Link href="/#hunt">The Hunt</Link><Link href="/challenges">Challenges</Link><Link href="/#schedule">Schedule</Link><Link href="/#leaderboard">Leaderboard</Link><Link href="/#teams">Teams</Link></div><div><strong>PARTICIPATE</strong><Link href="/register">Register</Link><Link href="/participant-portal">Participant Portal</Link><Link href="/participant">Dashboard</Link><Link href="/passport">Passport</Link></div><div><strong>ABOUT</strong><Link href="/#about">About Solution Hunt</Link><span>Rules</span><span>Sponsors</span><span>College innovation cell</span></div></div><div className="container platform-footer-bottom"><span>SOLUTION HUNT 2026</span><span>College Innovation &amp; Hackathon Platform</span></div></footer>
    </main>
  );
}
