import SuspectCard from "./SuspectCard";

export default function SuspectsScreen({ game, onSelect, onAccuse }) {
  const totalQuestionsLeft = game.suspects.reduce(
    (sum, s) => sum + s.questions_left,
    0
  );

  return (
    <div
      className="screen active"
      style={{ justifyContent: "flex-start", paddingTop: 36 }}
    >
      <div className="eyebrow">Choose a suspect to interrogate</div>

      <div className="suspects-grid">
        {game.suspects.map((suspect) => (
          <SuspectCard
            key={suspect.id}
            suspect={suspect}
            onClick={() => onSelect(suspect)}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 8,
        }}
      >
        <div style={{ fontSize: 12, color: "#4b5563" }}>
          {totalQuestionsLeft} questions remaining
        </div>

        <button
          className="btn-ghost"
          style={{ marginLeft: "auto" }}
          onClick={onAccuse}
        >
          Make accusation
        </button>
      </div>
    </div>
  );
}