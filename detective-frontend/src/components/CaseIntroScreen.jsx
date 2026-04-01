export default function CaseIntroScreen({ game, onContinue, onRestart }) {
  return (
    <div className="screen active">
      <div className="case-badge">New case</div>

      <div className="title-lg" style={{ maxWidth: 520 }}>
        {game.title}
      </div>

      <div className="divider-line"></div>

      <div
        className="body-text"
        style={{
          marginBottom: 12,
          maxWidth: 560,
        }}
      >
        {game.case_summary}
      </div>

      <div
        className="body-text"
        style={{
          marginBottom: 28,
          maxWidth: 560,
        }}
      >
        Three people were present at the scene. Each had a reason to want the
        victim gone.
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn-primary" onClick={onContinue}>
          Continue to suspects
        </button>

        <button className="btn-ghost" onClick={onRestart}>
          New case
        </button>
      </div>
    </div>
  );
}
