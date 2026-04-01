export default function VerdictScreen({ result, onRestart }) {
  return (
    <div
      className="screen active"
      style={{ justifyContent: "flex-start", paddingTop: 36 }}
    >
      <div className="eyebrow">Case closed</div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 4,
        }}
      >
        <div className="score-ring">
          <span className="score-num">{result.score}</span>
        </div>

        <div>
          <div className="title-lg" style={{ marginBottom: 4 }}>
            {result.is_correct ? "Good detective work" : "Case unresolved"}
          </div>
          <div style={{ fontSize: 13, color: "#4b5563" }}>
            {result.is_correct
              ? "You identified the right suspect"
              : "You identified the wrong suspect"}
          </div>
        </div>
      </div>

      <div className="verdict-detail">
        <strong>{result.culprit_name}</strong> was the killer. {result.feedback}
      </div>

      <button className="btn-primary" style={{ marginTop: 24 }} onClick={onRestart}>
        Play again
      </button>
    </div>
  );
}