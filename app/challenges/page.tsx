"use client";

import { useState } from "react";
import SiteHeader from "@/components/navigation/SiteHeader";
import ChallengeCard from "@/components/challenges/ChallengeCard";
import { challenges } from "@/lib/constants";

const categories = ["All", ...Array.from(new Set(challenges.map((challenge) => challenge.category)))];

export default function ChallengesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? challenges : challenges.filter((challenge) => challenge.category === activeCategory);
  return <main className="challenges-page"><SiteHeader /><section className="page-intro"><div className="container"><span className="eyebrow">PROBLEM STATEMENTS / {challenges.length} OPEN</span><h1>Choose your <span>problem.</span></h1><p>Real-world challenges from real problem owners. Find the one you can move forward.</p></div></section><section className="container"><div className="challenge-toolbar"><div className="category-list">{categories.map((category) => <button key={category} type="button" className={`category-btn ${activeCategory === category ? "selected" : ""}`} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><span className="mono">{filtered.length} / {challenges.length} SHOWING</span></div><div className="challenge-list-grid">{filtered.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}</div><div className="challenge-cta"><div><span className="eyebrow">READY TO BUILD?</span><h2>Make the problem yours.</h2><p>Register first, then bring your team into the hunt.</p></div><a href="/register" className="button button-orange">Join Solution Hunt <span>↗</span></a></div></section><footer className="footer"><div className="container footer-inner"><span className="wordmark"><span className="wordmark-mark">S</span><span><strong>SOLUTION</strong><small>HUNT</small></span></span><p>© 2026 Solution Hunt</p></div></footer></main>;
}
