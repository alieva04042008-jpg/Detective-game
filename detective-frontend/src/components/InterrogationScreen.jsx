import { useMemo, useState } from "react";
import { interrogateSuspect } from "../api/client";
import ChatMessage from "./ChatMessage";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function InterrogationScreen({
  game,
  suspect,
  onBack,
  onUpdateSuspect,
}) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "suspect",
      content:
        "I've already told the police everything I know. But go ahead, ask your questions.",
    },
  ]);

  const currentQuestionsLeft =
    game.suspects.find((s) => s.id === suspect.id)?.questions_left ??
    suspect.questions_left;

  const placeholderName = useMemo(() => suspect.name.split(" ")[0], [suspect.name]);

  const handleSend = async () => {
    if (!question.trim() || loading || currentQuestionsLeft <= 0) return;

    const cleanQuestion = question.trim();
    setError("");

    setMessages((prev) => [
      ...prev,
      { sender: "player", content: cleanQuestion },
    ]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await interrogateSuspect({
        game_id: game.game_id,
        suspect_id: suspect.id,
        question: cleanQuestion,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "suspect", content: res.answer },
      ]);

      onUpdateSuspect(suspect.id, res.questions_left);
    } catch (err) {
      setError(err.message || "Failed to send question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="screen active"
      style={{ justifyContent: "flex-start", paddingTop: 32 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <div className="suspect-header">
          <div className="suspect-mini-avatar">{getInitials(suspect.name)}</div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#e2e8f0",
              }}
            >
              {suspect.name}
            </div>
            <div style={{ fontSize: 11, color: "#4b5563" }}>
              {suspect.role} · {currentQuestionsLeft} questions left
            </div>
          </div>
        </div>

        <button className="btn-ghost" onClick={onBack}>
          ← Back
        </button>
      </div>

      <div className="chat-area">
        {messages.map((msg, index) => (
          <ChatMessage
            key={`${msg.sender}-${index}`}
            sender={msg.sender}
            content={msg.content}
          />
        ))}
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          placeholder={`Ask ${placeholderName} a question...`}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading || currentQuestionsLeft <= 0}
        />
        <button
          className="btn-primary"
          style={{ padding: "10px 16px" }}
          onClick={handleSend}
          disabled={loading || currentQuestionsLeft <= 0}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

      {error ? <div className="error-box">{error}</div> : null}

      <div
        style={{
          fontSize: 11,
          color: "#2a2d35",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        A clue will be revealed after this interrogation
      </div>
    </div>
  );
}