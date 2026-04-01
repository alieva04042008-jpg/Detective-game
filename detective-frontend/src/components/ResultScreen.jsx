export default function ResultScreen({ result }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>{result.is_correct ? "Correct!" : "Wrong!"}</h2>

      <p>Score: {result.score}</p>
      <p>Culprit: {result.culprit_name}</p>
      <p>{result.feedback}</p>
    </div>
  );
}