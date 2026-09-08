
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const challengeData: Record<
  string,
  {
    id: string;
    title: string;
    category: string;
    difficulty: string;
    points: number;
    description: string;
    problem: string;
    objective: string[];
    requirements: string[];
    deliverables: string[];
  }
> = {
  "SH-01": {
    id: "SH-01",
    title: "AI-Powered Cyber Threat Detection",
    category: "Cybersecurity",
    difficulty: "Advanced",
    points: 100,
    description:
      "Build an intelligent system that can identify suspicious network activity and help security teams respond to potential cyber threats.",
    problem:
      "Modern organizations generate large volumes of network traffic every second. Detecting malicious or unusual activity manually can be difficult and time-consuming. The challenge is to develop an intelligent solution that can analyze network activity and identify potential threats.",
    objective: [
      "Detect suspicious network behaviour",
      "Classify potential cyber threats",
      "Provide useful security alerts",
      "Present results through a simple dashboard",
    ],
    requirements: [
      "Use AI, machine learning or intelligent rule-based detection",
      "Process network or security-related data",
      "Display meaningful threat information",
      "Focus on usability and real-world applicability",
    ],
    deliverables: [
      "Working prototype",
      "Source code",
      "Project documentation",
      "Demo or presentation",
    ],
  },

  "SH-02": {
    id: "SH-02",
    title: "Smart Campus Security",
    category: "IoT",
    difficulty: "Intermediate",
    points: 80,
    description:
      "Design a smart security solution for monitoring and protecting college campus infrastructure.",
    problem:
      "Educational campuses contain classrooms, laboratories, hostels and other important facilities. A smart system is required to improve security monitoring and quickly identify unusual events.",
    objective: [
      "Improve campus security monitoring",
      "Detect unusual activity",
      "Provide real-time alerts",
      "Create a centralized monitoring interface",
    ],
    requirements: [
      "Use IoT, sensors or smart monitoring technologies",
      "Provide useful security alerts",
      "Design an easy-to-use interface",
      "Demonstrate a practical campus use case",
    ],
    deliverables: [
      "Working prototype",
      "Source code",
      "Project documentation",
      "Demo or presentation",
    ],
  },

  "SH-03": {
    id: "SH-03",
    title: "AI Student Assistant",
    category: "Artificial Intelligence",
    difficulty: "Intermediate",
    points: 80,
    description:
      "Create an AI-powered assistant that helps students with academics, schedules, resources and campus information.",
    problem:
      "Students often need information from multiple sources such as schedules, academic resources, announcements and campus services. A centralized intelligent assistant can make this information easier to access.",
    objective: [
      "Create an intelligent student assistant",
      "Answer common student queries",
      "Provide useful academic information",
      "Improve student productivity",
    ],
    requirements: [
      "Use AI or natural language processing",
      "Provide a conversational interface",
      "Handle common student queries",
      "Focus on accuracy and usability",
    ],
    deliverables: [
      "Working prototype",
      "Source code",
      "Project documentation",
      "Demo or presentation",
    ],
  },

  "SH-04": {
    id: "SH-04",
    title: "Digital Health Innovation",
    category: "Healthcare",
    difficulty: "Advanced",
    points: 100,
    description:
      "Develop a technology-driven solution that can improve healthcare accessibility, monitoring or diagnosis.",
    problem:
      "Technology can help improve healthcare accessibility and monitoring. Participants are encouraged to design innovative solutions that address practical healthcare challenges.",
    objective: [
      "Solve a real healthcare problem",
      "Improve accessibility or monitoring",
      "Use technology effectively",
      "Create a practical prototype",
    ],
    requirements: [
      "Clearly define the healthcare problem",
      "Demonstrate the proposed solution",
      "Consider usability and reliability",
      "Explain the real-world impact",
    ],
    deliverables: [
      "Working prototype",
      "Source code",
      "Project documentation",
      "Demo or presentation",
    ],
  },

  "SH-05": {
    id: "SH-05",
    title: "Smart City Solution",
    category: "Smart City",
    difficulty: "Intermediate",
    points: 80,
    description:
      "Build a technology solution that solves a real-world problem related to transportation, waste, energy or public services.",
    problem:
      "Rapidly growing cities face challenges involving transportation, waste management, energy consumption and public services. Participants must propose an innovative technology-based solution.",
    objective: [
      "Identify a real smart-city problem",
      "Design a technology-based solution",
      "Demonstrate measurable impact",
      "Create a scalable prototype",
    ],
    requirements: [
      "Define a clear real-world problem",
      "Use suitable technologies",
      "Demonstrate the proposed workflow",
      "Explain scalability",
    ],
    deliverables: [
      "Working prototype",
      "Source code",
      "Project documentation",
      "Demo or presentation",
    ],
  },

  "SH-06": {
    id: "SH-06",
    title: "Future FinTech Security",
    category: "FinTech",
    difficulty: "Advanced",
    points: 100,
    description:
      "Create an innovative financial technology solution with strong security, privacy and fraud prevention.",
    problem:
      "Digital financial services are increasingly targeted by fraud and cyber threats. Participants must create a solution that improves security, trust or fraud detection in financial technology.",
    objective: [
      "Improve digital financial security",
      "Detect suspicious transactions or behaviour",
      "Protect user information",
      "Build a practical FinTech prototype",
    ],
    requirements: [
      "Focus on security or fraud prevention",
      "Demonstrate the proposed workflow",
      "Consider privacy and usability",
      "Explain the potential real-world impact",
    ],
    deliverables: [
      "Working prototype",
      "Source code",
      "Project documentation",
      "Demo or presentation",
    ],
  },
};

export default function ProblemDetailsPage() {
  const params = useParams();
  const id = String(params.id).toUpperCase();

  const challenge = challengeData[id];

  if (!challenge) {
    return (
      <main className="problem-page">
        <div className="not-found">
          <span>404</span>
          <h1>Challenge Not Found</h1>
          <p>The problem statement you are looking for does not exist.</p>
          <Link href="/challenges">← Back to Challenges</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="problem-page">
      {/* Navbar */}
      <nav className="problem-nav">
        <Link href="/" className="problem-brand">
          <span className="problem-logo">S</span>
          <span>
            <strong>Solution</strong> Hunt
          </span>
        </Link>

        <div className="problem-nav-links">
          <Link href="/">Home</Link>
          <Link href="/challenges">Challenges</Link>
          <Link href="/#leaderboard">Leaderboard</Link>
        </div>

        <button className="problem-register">Register</button>
      </nav>

      {/* Main */}
      <section className="problem-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/challenges">Challenges</Link>
          <span>/</span>
          <span>{challenge.id}</span>
        </div>

        {/* Header */}
        <header className="problem-header">
          <div className="problem-header-left">
            <div className="problem-badges">
              <span className="problem-id">{challenge.id}</span>
              <span className="problem-category">{challenge.category}</span>
              <span className="problem-difficulty">
                {challenge.difficulty}
              </span>
            </div>

            <h1>{challenge.title}</h1>

            <p>{challenge.description}</p>
          </div>

          <div className="points-box">
            <span>CHALLENGE VALUE</span>
            <strong>{challenge.points}</strong>
            <small>POINTS</small>
          </div>
        </header>

        {/* Content */}
        <div className="problem-layout">
          <div className="problem-main">
            <section className="problem-card">
              <div className="problem-card-title">
                <span>01</span>
                <h2>Problem Statement</h2>
              </div>

              <p>{challenge.problem}</p>
            </section>

            <section className="problem-card">
              <div className="problem-card-title">
                <span>02</span>
                <h2>Objectives</h2>
              </div>

              <div className="objective-list">
                {challenge.objective.map((item, index) => (
                  <div className="objective-item" key={item}>
                    <span>0{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="problem-card">
              <div className="problem-card-title">
                <span>03</span>
                <h2>Requirements</h2>
              </div>

              <ul className="requirement-list">
                {challenge.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="problem-card">
              <div className="problem-card-title">
                <span>04</span>
                <h2>Deliverables</h2>
              </div>

              <div className="deliverable-grid">
                {challenge.deliverables.map((item, index) => (
                  <div className="deliverable-item" key={item}>
                    <span>{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="problem-sidebar">
            <div className="action-card">
              <span className="action-label">READY TO BUILD?</span>

              <h3>Take this challenge.</h3>

              <p>
                Register your team and start building a solution for this
                problem statement.
              </p>

              <button>Register Your Team →</button>
            </div>

            <div className="info-card">
              <span>CHALLENGE INFO</span>

              <div>
                <small>Challenge ID</small>
                <strong>{challenge.id}</strong>
              </div>

              <div>
                <small>Track</small>
                <strong>{challenge.category}</strong>
              </div>

              <div>
                <small>Difficulty</small>
                <strong>{challenge.difficulty}</strong>
              </div>

              <div>
                <small>Points</small>
                <strong>{challenge.points}</strong>
              </div>
            </div>

            <Link href="/challenges" className="back-challenges">
              ← Explore all challenges
            </Link>
          </aside>
        </div>
      </section>

      {/* Footer */}
      <footer className="problem-footer">
        <strong>Solution Hunt</strong>
        <span>Innovation starts with a problem.</span>
        <p>© 2026 Solution Hunt</p>
      </footer>
    </main>
  );
}

