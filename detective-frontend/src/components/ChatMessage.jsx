export default function ChatMessage({ sender, content }) {
  return <div className={`msg ${sender}`}>{content}</div>;
}