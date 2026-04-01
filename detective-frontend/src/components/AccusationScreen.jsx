import { useState } from "react";
import { accuse } from "../api/client";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AccusationScreen({ game, onResult }) {
  const [selectedId, setSelectedId] = useState(game.suspects[0]?.id ?? null);
  const [reasoning, setReasoning] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!selectedId || !reasoning.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await accuse({
        game_id: game.game_id,
        chosen_suspect_id: selectedId,
        reasoning: reasoning.trim(),
      });

      onResult(res);
    } catch (err) {
      setError(err.message || "Failed to submit accusation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="screen active"
      style={{ justifyContent: "flex-start", paddingTop: 32 }}
    >
      <div className="eyebrow">Make your accusation</div>
      <div style={{ fontSize: 15, color: "#6b7280", marginBottom: 4 }}>
        Who committed the murder?
      </div>

      <div className="accuse-grid">
        {game.suspects.map((suspect) => (
          <div
            key={suspect.id}
            className={`accuse-card ${selectedId === suspect.id ? "selected" : ""}`}
            onClick={() => setSelectedId(suspect.id)}
          >
            <div className="suspect-mini-avatar" style={{ margin: "0 auto" }}>
              {getInitials(suspect.name)}
            </div>
            <span>{suspect.name}</span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13, color: "#4b5563", marginBottom: 8 }}>
        Explain your reasoning
      </div>

      <textarea
        className="reason-input"
        rows="3"
        placeholder="She had access to the study, and her alibi doesn't hold up because..."
        value={reasoning}
        onChange={(e) => setReasoning(e.target.value)}
      />

      <button
        className="btn-primary"
        style={{ marginTop: 14, alignSelf: "flex-start" }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit accusation"}
      </button>

      {error ? <div className="error-box">{error}</div> : null}
    </div>
  );
}