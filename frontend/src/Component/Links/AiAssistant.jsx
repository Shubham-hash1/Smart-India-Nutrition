import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../Context/LanguageContext';

const AiAssistant = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('ai_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('ai_messages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = { sender: 'user', text: query, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://nutrismart-backend-cm7b.onrender.com/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          history: messages.slice(-10) // Send last 10 messages for context
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { sender: 'model', text: data.reply, timestamp: new Date().toISOString() }]);
      } else {
        setMessages(prev => [...prev, { sender: 'model', text: `Error: ${data.message || "Failed to generate response."}`, timestamp: new Date().toISOString() }]);
      }
    } catch (error) {
      console.error("AI error:", error);
      setMessages(prev => [...prev, { sender: 'model', text: "Error: Failed to connect to server.", timestamp: new Date().toISOString() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the conversation?")) {
      setMessages([]);
      localStorage.removeItem('ai_messages');
    }
  };

  // Helper to parse basic Markdown formatting (headings, lists, bold text)
  const renderMessageContent = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      // Bold tags
      const parts = line.split('**');
      const processBold = (item) => parts.map((part, pidx) => pidx % 2 === 1 ? <strong key={pidx} className="font-bold text-[var(--text-primary)]">{part}</strong> : part);

      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-base font-bold mt-3 mb-1 text-[var(--text-primary)]">{processBold(line.replace('### ', ''))}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-lg font-bold mt-4 mb-2 text-[var(--text-primary)]">{processBold(line.replace('## ', ''))}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-xl font-bold mt-4 mb-2 text-[var(--text-primary)]">{processBold(line.replace('# ', ''))}</h1>;
      }
      
      // Bullet list items
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const itemContent = line.replace(/^\s*[\*\-]\s+/, '');
        return (
          <li key={idx} className="ml-4 list-disc text-sm text-[var(--text-secondary)] leading-relaxed my-0.5">
            {processBold(itemContent)}
          </li>
        );
      }
      
      // Numbered list items
      const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        const itemContent = numMatch[2];
        return (
          <div key={idx} className="ml-2 pl-2 text-sm text-[var(--text-secondary)] leading-relaxed mt-1 flex gap-2">
            <span className="font-bold text-[var(--accent-text)]">{numMatch[1]}.</span>
            <span>{processBold(itemContent)}</span>
          </div>
        );
      }

      // Default line
      return (
        <p key={idx} className="text-sm text-[var(--text-secondary)] leading-relaxed min-h-[1em] my-1">
          {processBold(line)}
        </p>
      );
    });
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 65px)",
      background: "var(--bg-primary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "800px",
        height: "80vh",
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        borderRadius: "24px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 10px 40px var(--shadow-color)"
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg-primary)"
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
              🤖 {t("aiTitle")}
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--text-secondary)" }}>
              {t("aiDesc")}
            </p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              style={{
                background: "transparent",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              🗑️ {t("aiClear")}
            </button>
          )}
        </div>

        {/* Chat area */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {messages.length === 0 ? (
            <div style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              opacity: 0.8
            }}>
              <span style={{ fontSize: "48px" }}>🥗</span>
              <h3 style={{ margin: "16px 0 8px", fontSize: "18px", color: "var(--text-primary)" }}>
                Ask NutriSmart AI
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)", maxWidth: "320px", marginBottom: "24px" }}>
                Discover recipes, formulate meal prep logs, or inquire about vitamins and health advice.
              </p>
              
              {/* Suggestion Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", maxWidth: "500px" }}>
                {[t("aiSuggestRecipe"), t("aiSuggestDiet"), t("aiSuggestThyroid")].map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sug)}
                    style={{
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--accent-text)",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--accent-light)"}
                    onMouseLeave={e => e.currentTarget.style.background = "var(--bg-primary)"}
                  >
                    ✨ {sug}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    width: "100%"
                  }}
                >
                  <div style={{
                    maxWidth: "75%",
                    background: msg.sender === 'user' ? "var(--accent-color)" : "var(--bg-primary)",
                    color: msg.sender === 'user' ? "#ffffff" : "var(--text-primary)",
                    padding: "14px 18px",
                    borderRadius: msg.sender === 'user' ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                    border: msg.sender === 'user' ? "none" : "1px solid var(--border-color)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
                  }}>
                    {msg.sender === 'user' ? (
                      <p style={{ margin: 0, fontSize: "14px", whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
                        {msg.text}
                      </p>
                    ) : (
                      <div className="space-y-1">
                        {renderMessageContent(msg.text)}
                      </div>
                    )}
                    <span style={{
                      display: "block",
                      fontSize: "10px",
                      marginTop: "6px",
                      textAlign: "right",
                      opacity: 0.6,
                      color: msg.sender === 'user' ? "#ffffff" : "var(--text-secondary)"
                    }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                  <div style={{
                    background: "var(--bg-primary)",
                    padding: "14px 20px",
                    borderRadius: "20px 20px 20px 4px",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>AI is thinking</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input box */}
        <div style={{
          padding: "16px 24px",
          borderTop: "1px solid var(--border-color)",
          background: "var(--bg-primary)"
        }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ display: "flex", gap: "12px" }}
          >
            <input
              type="text"
              placeholder={t("aiInputPlaceholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              style={{
                flex: 1,
                padding: "14px 20px",
                borderRadius: "100px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                fontFamily: "inherit",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.2s"
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: input.trim() && !loading ? "var(--accent-color)" : "var(--border-color)",
                border: "none",
                color: "#ffffff",
                cursor: input.trim() && !loading ? "pointer" : "default",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s"
              }}
            >
              ✈️
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
