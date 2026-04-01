export default function NavDots({ total = 6, current, onGo }) {
  return (
    <div className="nav-dots">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`dot ${current === i + 1 ? "active" : ""}`}
          onClick={() => onGo(i + 1)}
        />
      ))}
    </div>
  );
}