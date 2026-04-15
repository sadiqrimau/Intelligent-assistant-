import { useState, useRef, useEffect } from "react";
import { X, Send, GraduationCap, Sparkles, AlertCircle } from "lucide-react";

const N8N_WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL as string;

interface Message {
  id: number;
  role: "ai" | "user";
  text: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    text: "Assalamu Alaikum! 👋 I'm your Al-Hikmah University assistant. I can help with fees, admissions, deadlines, writing official letters, and more.",
  },
];

const suggestions = [
  "Check my fees",
  "Write a letter",
  "Exam schedule",
  "Registration deadline",
  "Hostel info",
];

// Stable session ID for the browser tab
const SESSION_ID = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isTyping) return;

    const userText = message.trim();
    setMessage("");
    setError(null);

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", text: userText },
    ]);
    setIsTyping(true);

    try {
      const res = await fetch(N8N_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: SESSION_ID, message: userText }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      const aiText =
        data.response ||
        "I'm sorry, I couldn't process your question right now. Please try again.";

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: "ai", text: aiText },
      ]);
    } catch {
      setError("Couldn't reach the assistant. Check your connection and try again.");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "ai",
          text: "I'm having trouble connecting right now. Please try again in a moment, or contact the university directly.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestion = (chip: string) => {
    setMessage(chip);
  };

  const showChips = messages.length <= 1 && !isTyping;

  return (
    <>
      {/* ── Floating trigger button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 widget-btn"
        style={
          isOpen
            ? {
                background: "rgba(12,26,18,0.96)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
              }
            : {
                background:
                  "linear-gradient(135deg, hsl(153 45% 18%), hsl(153 45% 13%))",
                border: "1px solid hsl(45 93% 47% / 0.45)",
                boxShadow:
                  "0 8px 30px rgba(0,0,0,0.45), 0 0 0 1px hsl(45 93% 47% / 0.12), 0 0 22px hsl(45 93% 47% / 0.14)",
              }
        }
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-5 h-5" style={{ color: "rgba(255,255,255,0.65)" }} />
        ) : (
          <>
            <Sparkles
              className="w-5 h-5"
              style={{ color: "hsl(45 93% 56%)" }}
            />
            {/* Pulsing ring */}
            <span
              className="absolute inset-0 rounded-full widget-ring"
              style={{ border: "1.5px solid hsl(45 93% 47% / 0.5)" }}
            />
          </>
        )}
      </button>

      {/* ── Chat panel ── */}
      {isOpen && (
        <div
          className="fixed bottom-[88px] right-6 z-50 rounded-2xl overflow-hidden chat-panel-in"
          style={{
            width: "min(380px, calc(100vw - 24px))",
            maxHeight: "min(560px, calc(100vh - 120px))",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(155deg, #122219 0%, #0c1a12 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, hsl(153 45% 23%), hsl(153 45% 16%))",
                border: "1px solid hsl(45 93% 47% / 0.35)",
              }}
            >
              <GraduationCap
                className="w-4 h-4"
                style={{ color: "hsl(45 93% 58%)" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white">
                Al-Hikmah Assistant
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="online-dot" />
                <span className="text-[10px] text-emerald-400">
                  Available · Powered by AI
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              style={{ color: "rgba(255,255,255,0.38)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-5 space-y-4"
            style={{ minHeight: 0 }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "ai" && (
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: "hsl(153 45% 20%)",
                      border: "1px solid hsl(153 45% 33%)",
                      color: "hsl(45 93% 58%)",
                    }}
                  >
                    A
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] text-sm leading-relaxed ${
                    msg.role === "ai" ? "rounded-tl-sm" : "rounded-tr-sm"
                  }`}
                  style={
                    msg.role === "ai"
                      ? {
                          background: "rgba(255,255,255,0.052)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.85)",
                        }
                      : {
                          background:
                            "linear-gradient(135deg, hsl(153 45% 22%), hsl(153 45% 16%))",
                          border: "1px solid hsl(153 45% 32% / 0.55)",
                          color: "rgba(255,255,255,0.92)",
                        }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div
                  className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: "hsl(153 45% 20%)",
                    border: "1px solid hsl(153 45% 33%)",
                    color: "hsl(45 93% 58%)",
                  }}
                >
                  A
                </div>
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.052)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex gap-1 items-center" style={{ height: "16px" }}>
                    <span className="typing-dot" style={{ animationDelay: "0ms" }} />
                    <span className="typing-dot" style={{ animationDelay: "180ms" }} />
                    <span className="typing-dot" style={{ animationDelay: "360ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips */}
          {showChips && (
            <div
              className="px-5 pb-3 flex-shrink-0 flex flex-wrap gap-2"
            >
              {suggestions.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSuggestion(chip)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-opacity duration-150 hover:opacity-75"
                  style={{
                    border: "1px solid hsl(45 93% 47% / 0.25)",
                    color: "hsl(45 93% 62%)",
                    background: "hsl(45 93% 47% / 0.07)",
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div
              className="mx-4 mb-2 flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
              style={{ background: "rgba(239,68,68,0.12)", color: "rgb(252,165,165)" }}
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Input */}
          <div
            className="px-4 py-4 flex-shrink-0"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex gap-3 items-center rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.042)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-white/20"
                style={{ color: "rgba(255,255,255,0.88)" }}
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-35"
                style={{
                  background: message.trim()
                    ? "hsl(45 93% 47%)"
                    : "rgba(255,255,255,0.08)",
                }}
              >
                <Send
                  className="w-3.5 h-3.5"
                  style={{
                    color: message.trim() ? "#0b1a10" : "rgba(255,255,255,0.45)",
                  }}
                />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
