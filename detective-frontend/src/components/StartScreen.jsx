export default function StartScreen({ onStart, error }) {
  return (
    <div className="screen active">
      <div style={{ maxWidth: 400 }}>
        <div className="eyebrow">Case file 001</div>
        <div className="title-xl">The Detective</div>
        <div className="body-text" style={{ marginBottom: 32 }}>
          A new mystery awaits. Three suspects. Limited questions. One chance
          to name the killer.
        </div>
        <button className="btn-primary" onClick={onStart}>
          Start new case
        </button>

        {error ? <div className="error-box">{error}</div> : null}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          right: 40,
          display: "flex",
          gap: 24,
        }}
      >
        <div style={{ fontSize: 12, color: "#2a2d35" }}>3 suspects</div>
        <div style={{ fontSize: 12, color: "#2a2d35" }}>9 questions total</div>
        <div style={{ fontSize: 12, color: "#2a2d35" }}>AI-generated case</div>
      </div>
    </div>
  );
}