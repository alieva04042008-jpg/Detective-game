function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function SuspectCard({ suspect, onClick, selected = false }) {
  const used = 3 - suspect.questions_left;

  return (
    <div
      className={`suspect-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="suspect-avatar">{getInitials(suspect.name)}</div>
      <div className="suspect-name">{suspect.name}</div>
      <div className="suspect-role">{suspect.role}</div>

      <div className="q-counter">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`q-dot ${i < used ? "used" : ""}`} />
        ))}
      </div>
    </div>
  );
}