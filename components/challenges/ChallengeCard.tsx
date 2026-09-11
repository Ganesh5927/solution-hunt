import Link from "next/link";
import type { Challenge } from "@/lib/types";

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return <article className="challenge-card">
    <div className="challenge-card-meta"><span className="mono">{challenge.id}</span><span className="tag">{challenge.category}</span></div>
    <p className="challenge-owner">PROBLEM OWNER / {challenge.owner}</p>
    <h3>{challenge.title}</h3>
    <p>{challenge.description}</p>
    <div className="challenge-card-footer"><span>{challenge.difficulty} / {challenge.points} pts</span><Link href={`/challenges/${challenge.id}`}>Read the problem <span>↗</span></Link></div>
  </article>;
}
