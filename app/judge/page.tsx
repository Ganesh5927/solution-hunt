"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Team = {
  id: string;
  team_id: string;
  team_name: string;
  college?: string;
  department?: string;
};

type Evaluation = {
  team_id: string;
  team_name: string;
  judge_id: string;
  innovation: number;
  impact: number;
  execution: number;
  presentation: number;
  total_score: number;
  feedback: string;
};

export default function JudgePage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [judgeId, setJudgeId] = useState("JUDGE-001");

  const [innovation, setInnovation] = useState("");
  const [impact, setImpact] = useState("");
  const [execution, setExecution] = useState("");
  const [presentation, setPresentation] = useState("");
  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (!supabase) {
      setMessage("Supabase connection not available.");
      setLoading(false);
      return;
    }

    setLoading(true);

    const [teamsResult, evaluationsResult] = await Promise.all([
      supabase
        .from("teams")
        .select("id, team_id, team_name, college, department")
        .order("created_at", { ascending: false }),

      supabase
        .from("judge_evaluations")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (teamsResult.error) {
      setMessage(`Teams error: ${teamsResult.error.message}`);
    } else {
      setTeams(teamsResult.data || []);
    }

    if (evaluationsResult.error) {
      setMessage(`Evaluation error: ${evaluationsResult.error.message}`);
    } else {
      setEvaluations(evaluationsResult.data || []);
    }

    setLoading(false);
  }

  const selectedTeam = teams.find(
    (team) => team.team_id === selectedTeamId
  );

  const totalScore =
    Number(innovation || 0) +
    Number(impact || 0) +
    Number(execution || 0) +
    Number(presentation || 0);

  function validateScore(value: string) {
    const number = Number(value);

    if (value === "") return true;

    return number >= 0 && number <= 10;
  }

  async function submitEvaluation() {
    if (!supabase) {
      setMessage("Supabase connection not available.");
      return;
    }

    if (!selectedTeam) {
      setMessage("Please select a team.");
      return;
    }

    if (
      !validateScore(innovation) ||
      !validateScore(impact) ||
      !validateScore(execution) ||
      !validateScore(presentation)
    ) {
      setMessage("Each score must be between 0 and 10.");
      return;
    }

    setSaving(true);
    setMessage("");

    const evaluation = {
      team_id: selectedTeam.team_id,
      team_name: selectedTeam.team_name,
      judge_id: judgeId,
      innovation: Number(innovation || 0),
      impact: Number(impact || 0),
      execution: Number(execution || 0),
      presentation: Number(presentation || 0),
      total_score: totalScore,
      feedback,
    };

    const { data, error } = await supabase
      .from("judge_evaluations")
      .insert(evaluation)
      .select()
      .single();

    if (error) {
      setMessage(`Save failed: ${error.message}`);
      setSaving(false);
      return;
    }

    setEvaluations((current) => [data, ...current]);

    setInnovation("");
    setImpact("");
    setExecution("");
    setPresentation("");
    setFeedback("");

    setMessage("Evaluation saved successfully.");
    setSaving(false);
  }

  return (
    <main className="platform-page judge-page">
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
          <Link href="/challenges">Challenges</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/updates">Updates</Link>
          <Link href="/judge" className="active">
            Judge
          </Link>
          <Link href="/verify/scan?role=Judge">QR Verify</Link>
        </div>

        <div className="nav-actions">
          <Link href="/login" className="ghost-button small-button">
            Login
          </Link>
          <Link href="/register" className="primary-button small-button">
            Register
          </Link>
        </div>
      </nav>

      <section className="page-shell">
        <header className="page-header">
          <div>
            <span className="eyebrow">NEXORA 2026 • JUDGE PANEL</span>

            <h1>
              Evaluate <span>teams.</span>
            </h1>

            <p>
              Review team submissions and submit structured evaluation scores.
            </p>
          </div>

          <div className="header-status">
            <span className="pulse-dot" />
            {teams.length} teams available
          </div>
        </header>

        {message && (
          <div className="panel-card" style={{ marginBottom: "20px" }}>
            <strong>{message}</strong>
          </div>
        )}

        <div className="judge-grid">
          {/* TEAM SELECTION */}
          <section className="panel-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">TEAM SELECTION</span>
                <h2>Choose a team</h2>
              </div>
            </div>

            {loading ? (
              <p>Loading teams...</p>
            ) : (
              <>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 600,
                  }}
                >
                  Team
                </label>

                <select
                  value={selectedTeamId}
                  onChange={(event) =>
                    setSelectedTeamId(event.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                    color: "inherit",
                    fontSize: "15px",
                  }}
                >
                  <option value="">Select a team</option>

                  {teams.map((team) => (
                    <option key={team.team_id} value={team.team_id}>
                      {team.team_name}
                    </option>
                  ))}
                </select>

                {selectedTeam && (
                  <div style={{ marginTop: "20px" }}>
                    <h3>{selectedTeam.team_name}</h3>

                    <p>
                      Team ID: <strong>{selectedTeam.team_id}</strong>
                    </p>

                    {selectedTeam.college && (
                      <p>{selectedTeam.college}</p>
                    )}

                    {selectedTeam.department && (
                      <p>{selectedTeam.department}</p>
                    )}
                  </div>
                )}
              </>
            )}
          </section>

          {/* EVALUATION */}
          <section className="panel-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow">EVALUATION</span>
                <h2>Score submission</h2>
              </div>
            </div>

            <div className="rubric-list">
              <ScoreInput
                label="Innovation"
                value={innovation}
                setValue={setInnovation}
              />

              <ScoreInput
                label="Impact"
                value={impact}
                setValue={setImpact}
              />

              <ScoreInput
                label="Execution"
                value={execution}
                setValue={setExecution}
              />

              <ScoreInput
                label="Presentation"
                value={presentation}
                setValue={setPresentation}
              />
            </div>

            <div
              style={{
                marginTop: "24px",
                padding: "18px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <span className="eyebrow">TOTAL SCORE</span>

              <div
                style={{
                  fontSize: "38px",
                  fontWeight: 800,
                  marginTop: "5px",
                }}
              >
                {totalScore.toFixed(1)}
                <span style={{ fontSize: "16px", opacity: 0.6 }}>
                  {" "}
                  / 40
                </span>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Judge ID
              </label>

              <input
                value={judgeId}
                onChange={(event) => setJudgeId(event.target.value)}
                placeholder="Enter judge ID"
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  color: "inherit",
                }}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Feedback
              </label>

              <textarea
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder="Write feedback for this team..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  color: "inherit",
                  resize: "vertical",
                }}
              />
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={submitEvaluation}
              disabled={saving}
              style={{
                marginTop: "20px",
                width: "100%",
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "SAVING..." : "SUBMIT EVALUATION ↗"}
            </button>
          </section>
        </div>

        {/* PREVIOUS EVALUATIONS */}
        <section className="panel-card" style={{ marginTop: "24px" }}>
          <div className="panel-head">
            <div>
              <span className="eyebrow">EVALUATION HISTORY</span>
              <h2>Recent evaluations</h2>
            </div>

            <span className="mono">
              {evaluations.length} RECORDS
            </span>
          </div>

          {evaluations.length === 0 ? (
            <p>No evaluations submitted yet.</p>
          ) : (
            <div className="submission-list">
              {evaluations.map((evaluation, index) => (
                <div
                  className="submission-row"
                  key={`${evaluation.team_id}-${evaluation.judge_id}-${index}`}
                >
                  <div>
                    <strong>{evaluation.team_name}</strong>
                    <small>
                      Judge: {evaluation.judge_id} • Team ID:{" "}
                      {evaluation.team_id}
                    </small>
                  </div>

                  <span className="score-pill">
                    {Number(evaluation.total_score).toFixed(1)} / 40
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* QR VERIFICATION */}
        <section className="panel-card verification-entry-card">
          <div className="panel-head">
            <div>
              <span className="eyebrow">HACKATHON PASSPORT</span>
              <h2>Verify a participant</h2>
            </div>
          </div>

          <p>
            Use the participant QR to open their team, progress, submission,
            and scan history.
          </p>

          <Link
            href="/verify/scan?role=Judge"
            className="primary-button"
          >
            OPEN QR SCANNER <span>↗</span>
          </Link>
        </section>
      </section>
    </main>
  );
}

function ScoreInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div
      className="rubric-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 100px",
        gap: "15px",
        alignItems: "center",
        marginBottom: "15px",
      }}
    >
      <div>
        <strong>{label}</strong>

        <div
          className="rubric-track"
          style={{ marginTop: "8px" }}
        >
          <i
            style={{
              width: `${Math.min(
                Math.max(Number(value || 0), 0),
                10
              ) * 10}%`,
            }}
          />
        </div>
      </div>

      <input
        type="number"
        min="0"
        max="10"
        step="0.1"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="0-10"
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.05)",
          color: "inherit",
        }}
      />
    </div>
  );
}