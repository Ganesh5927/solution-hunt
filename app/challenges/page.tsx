"use client";

import Link from "next/link";
import { useState } from "react";

const challenges = [
  {
    id: "SH-01",
    title: "AI-Powered Cyber Threat Detection",
    category: "Cybersecurity",
    difficulty: "Advanced",
    points: 100,
    description:
      "Build an intelligent system that can detect and classify suspicious network activity using AI or machine learning.",
    tags: ["AI", "ML", "Cybersecurity"],
  },
  {
    id: "SH-02",
    title: "Smart Campus Security",
    category: "IoT",
    difficulty: "Intermediate",
    points: 80,
    description:
      "Design a smart security solution for monitoring and protecting college campus infrastructure.",
    tags: ["IoT", "Security", "Smart Campus"],
  },
  {
    id: "SH-03",
    title: "AI Student Assistant",
    category: "Artificial Intelligence",
    difficulty: "Intermediate",
    points: 80,
    description:
      "Create an AI-powered assistant that helps students with academics, schedules, resources and campus information.",
    tags: ["AI", "Chatbot", "Education"],
  },
  {
    id: "SH-04",
    title: "Digital Health Innovation",
    category: "Healthcare",
    difficulty: "Advanced",
    points: 100,
    description:
      "Develop a technology-driven solution that can improve healthcare accessibility, monitoring or diagnosis.",
    tags: ["Healthcare", "AI", "Innovation"],
  },
  {
    id: "SH-05",
    title: "Smart City Solution",
    category: "Smart City",
    difficulty: "Intermediate",
    points: 80,
    description:
      "Build a technology solution that solves a real-world problem related to transportation, waste, energy or public services.",
    tags: ["Smart City", "IoT", "Sustainability"],
  },
  {
    id: "SH-06",
    title: "Future FinTech Security",
    category: "FinTech",
    difficulty: "Advanced",
    points: 100,
    description:
      "Create an innovative financial technology solution with strong security, privacy and fraud prevention.",
    tags: ["FinTech", "Fraud Detection", "Security"],
  },
];

const categories = [
  "All",
  "Cybersecurity",
  "Artificial Intelligence",
  "IoT",
  "Healthcare",
  "Smart City",
  "FinTech",
];

export default function ChallengesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredChallenges =
    activeCategory === "All"
      ? challenges
      : challenges.filter(
          (challenge) => challenge.category === activeCategory
        );

  return (
    <main className="challenges-page">
      {/* Navbar */}
      <nav className="challenges-nav">
        <a href="/" className="brand">
          <span className="brand-mark">S</span>
          <span>
            <strong>Solution</strong> Hunt
          </span>
        </a>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/challenges" className="active">
            Challenges
          </a>
          <a href="/#flow">Flow</a>
          <a href="/#leaderboard">Leaderboard</a>
          <a href="/#announcements">Announcements</a>
        </div>

        <div className="nav-actions">
          <button className="login-btn">Login</button>
          <button className="register-btn">Register</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="challenge-hero">
        <div className="hero-glow"></div>

        <div className="hero-content">
          <div className="live-badge">
            <span></span>
            LIVE CHALLENGES
          </div>

          <h1>
            Choose Your
            <span> Challenge.</span>
          </h1>

          <p>
            Explore real-world problem statements and build solutions
            that create meaningful impact.
          </p>

          <div className="hero-stats">
            <div>
              <strong>{challenges.length}</strong>
              <small>Challenges</small>
            </div>

            <div>
              <strong>6</strong>
              <small>Tracks</small>
            </div>

            <div>
              <strong>500+</strong>
              <small>Points</small>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="challenge-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">PROBLEM STATEMENTS</span>
            <h2>Find your challenge</h2>
          </div>

          <span className="challenge-count">
            {filteredChallenges.length} Challenges
          </span>
        </div>

        <div className="category-list">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "category-btn selected"
                  : "category-btn"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="challenge-grid">
          {filteredChallenges.map((challenge) => (
            <article className="challenge-card" key={challenge.id}>
              <div className="card-top">
                <span className="challenge-id">{challenge.id}</span>

                <span
                  className={
                    challenge.difficulty === "Advanced"
                      ? "difficulty advanced"
                      : "difficulty intermediate"
                  }
                >
                  {challenge.difficulty}
                </span>
              </div>

              <div className="card-icon">
                {challenge.category === "Cybersecurity" && "◈"}
                {challenge.category === "IoT" && "⌁"}
                {challenge.category === "Artificial Intelligence" && "✦"}
                {challenge.category === "Healthcare" && "＋"}
                {challenge.category === "Smart City" && "⌂"}
                {challenge.category === "FinTech" && "◉"}
              </div>

              <span className="category-name">
                {challenge.category}
              </span>

              <h3>{challenge.title}</h3>

              <p>{challenge.description}</p>

              <div className="tag-list">
                {challenge.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="card-bottom">
                <div className="points">
                  <strong>{challenge.points}</strong>
                  <span>POINTS</span>
                </div>

                <Link
  href={`/challenges/${challenge.id}`}
  className="view-btn"
>
  View Problem →
</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="challenge-cta">
        <div>
          <span className="eyebrow">READY TO BUILD?</span>
          <h2>Turn problems into possibilities.</h2>
          <p>
            Pick a challenge, build your solution and hunt for the win.
          </p>
        </div>

        <button className="cta-button">Register for Hackathon →</button>
      </section>

      {/* Footer */}
      <footer className="challenge-footer">
        <div>
          <strong>Solution Hunt</strong>
          <span>Innovation starts with a problem.</span>
        </div>

        <p>© 2026 Solution Hunt. All rights reserved.</p>
      </footer>
    </main>
  );
}