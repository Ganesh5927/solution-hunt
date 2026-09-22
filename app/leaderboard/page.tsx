"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Evaluation = {
  team_id: string;
  team_name: string;
  judge_id: string;
  total_score: number;
  created_at?: string;
};

type LeaderboardTeam = {
  team_id: string;
  team_name: string;
  score: number;
  evaluations: number;
  trend: string;
};

export default function LeaderboardPage() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeaderboard = useCallback(async () => {
    const client = supabase;

    if (!client) {
      setError("Supabase connection not available.");
      setLoading(false);
      return;
    }

    setError("");

    const { data, error } = await client
      .from("judge_evaluations")
      .select(
        "team_id, team_name, judge_id, total_score, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setEvaluations(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadLeaderboard();

    const client = supabase;

    if (!client) return;

    const channel = client
      .channel("leaderboard-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "judge_evaluations",
        },
        () => {
          void loadLeaderboard();
        }
      )
      .subscribe();

    return () => {
      void client.removeChannel(channel);
    };
  }, [loadLeaderboard]);

  const leaderboard = useMemo<LeaderboardTeam[]>(() => {
    const grouped = new Map<
      string,
      {
        team_id: string;
        team_name: string;
        scores: number[];
      }
    >();

    evaluations.forEach((evaluation) => {
      const existing = grouped.get(evaluation.team_id);

      if (existing) {
        existing.scores.push(Number(evaluation.total_score));
      } else {
        grouped.set(evaluation.team_id, {
          team_id: evaluation.team_id,
          team_name: evaluation.team_name,
          scores: [Number(evaluation.total_score)],
        });
      }
    });

    return Array.from(grouped.values())
      .map((team) => {
        const average =
          team.scores.reduce(
            (sum, score) => sum + score,
            0
          ) / team.scores.length;

        return {
          team_id: team.team_id,
          team_name: team.team_name,
          score: average,
          evaluations: team.scores.length,
          trend:
            team.scores.length > 1
              ? "LIVE"
              : "NEW",
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [evaluations]);

  const topTeam = leaderboard[0];

  return (
    <main className="platform-page leaderboard-page">
      {/* NAVBAR */}
      <nav className="platform-nav">
        <Link href="/" className="brand">
          <span className="brand-mark">N</span>

          <span>
            <strong>NEXORA</strong>
            <small>2026</small>
          </span>
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>

          <Link href="/challenges">
            Challenges
          </Link>

          <Link
            href="/leaderboard"
            className="active"
          >
            Leaderboard
          </Link>

          <Link href="/updates">
            Updates
          </Link>

          <Link href="/judge">
            Judge
          </Link>
        </div>

        <div className="nav-actions">
          <Link
            href="/login"
            className="ghost-button small-button"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="primary-button small-button"
          >
            Register
          </Link>
        </div>
      </nav>

      <section className="page-shell">
        {/* HEADER */}
        <header className="page-header">
          <div>
            <span className="eyebrow">
              NEXORA 2026 • LIVE RANKINGS
            </span>

            <h1>
              Leaderboard{" "}
              <span>pulse.</span>
            </h1>

            <p>
              Live team rankings based on judge
              evaluations.
            </p>
          </div>

          <div className="header-status">
            <span className="pulse-dot" />
            Live
          </div>
        </header>

        {/* STATS */}
        <div className="stats-card-grid">
          <article className="metric-card metric-card-accent">
            <span>TOP TEAM</span>

            <strong>
              {topTeam
                ? topTeam.team_name
                : "—"}
            </strong>

            <small>
              {topTeam
                ? `${topTeam.score.toFixed(
                    1
                  )} / 40`
                : "No scores yet"}
            </small>
          </article>

          <article className="metric-card">
            <span>RANKED TEAMS</span>

            <strong>
              {leaderboard.length}
            </strong>

            <small>
              With evaluations
            </small>
          </article>

          <article className="metric-card">
            <span>EVALUATIONS</span>

            <strong>
              {evaluations.length}
            </strong>

            <small>
              Judge submissions
            </small>
          </article>
        </div>

        {/* TOP 3 */}
        {!loading &&
          !error &&
          leaderboard.length > 0 && (
            <section className="panel-card">
              <div className="panel-head">
                <div>
                  <span className="eyebrow">
                    TOP PERFORMERS
                  </span>

                  <h2>
                    Leading teams
                  </h2>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "16px",
                }}
              >
                {leaderboard
                  .slice(0, 3)
                  .map((team, index) => (
                    <article
                      key={team.team_id}
                      style={{
                        padding: "24px",
                        borderRadius: "18px",
                        border:
                          index === 0
                            ? "1px solid rgba(120, 180, 255, 0.5)"
                            : "1px solid rgba(255,255,255,0.1)",
                        background:
                          index === 0
                            ? "rgba(100,140,255,0.10)"
                            : "rgba(255,255,255,0.03)",
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          opacity: 0.65,
                        }}
                      >
                        #{index + 1}
                      </span>

                      <h3
                        style={{
                          margin:
                            "12px 0 8px",
                        }}
                      >
                        {team.team_name}
                      </h3>

                      <strong
                        style={{
                          fontSize: "28px",
                        }}
                      >
                        {team.score.toFixed(
                          1
                        )}
                      </strong>

                      <p
                        style={{
                          opacity: 0.6,
                        }}
                      >
                        / 40 points
                      </p>

                      <small>
                        {team.evaluations}{" "}
                        evaluation
                        {team.evaluations !==
                        1
                          ? "s"
                          : ""}
                      </small>
                    </article>
                  ))}
              </div>
            </section>
          )}

        {/* MAIN LEADERBOARD */}
        <section className="panel-card table-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">
                CURRENT STANDINGS
              </span>

              <h2>
                Team rankings
              </h2>
            </div>

            <span className="mono">
              {leaderboard.length} TEAMS
            </span>
          </div>

          {/* LOADING */}
          {loading ? (
            <div
              style={{
                padding: "30px 0",
              }}
            >
              Loading live leaderboard...
            </div>
          ) : error ? (
            /* ERROR */
            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                background:
                  "rgba(255,80,80,0.08)",
              }}
            >
              <strong>
                Leaderboard error
              </strong>

              <p>{error}</p>
            </div>
          ) : leaderboard.length === 0 ? (
            /* EMPTY */
            <div
              style={{
                padding: "30px 0",
              }}
            >
              <strong>
                No teams have been
                evaluated yet.
              </strong>

              <p>
                Once judges submit
                scores, teams will appear
                here automatically.
              </p>
            </div>
          ) : (
            /* TABLE */
            <div className="leaderboard-table">
              <div className="leaderboard-head">
                <span>Rank</span>
                <span>Team</span>
                <span>
                  Evaluations
                </span>
                <span>Score</span>
                <span>Status</span>
              </div>

              {leaderboard.map(
                (team, index) => (
                  <div
                    className="leaderboard-row"
                    key={team.team_id}
                  >
                    <span className="rank-badge">
                      #{index + 1}
                    </span>

                    <div>
                      <strong>
                        {team.team_name}
                      </strong>

                      <small
                        style={{
                          display: "block",
                          opacity: 0.5,
                          marginTop: "4px",
                        }}
                      >
                        {team.team_id}
                      </small>
                    </div>

                    <span>
                      {team.evaluations}
                    </span>

                    <span className="score-pill">
                      {team.score.toFixed(
                        1
                      )}{" "}
                      / 40
                    </span>

                    <span className="trend-pill">
                      {team.trend}
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}