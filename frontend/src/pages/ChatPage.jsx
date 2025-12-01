import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import {
  Send,
  Bot,
  User,
  Sparkles,
  StopCircle,
  Menu,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const ChatPage = () => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 640px)").matches;
  });
  const abortControllerRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: aiMessageId, role: "assistant", content: "" },
    ]);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error("Failed to fetch");
      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;

          setMessages((prev) => {
            const updated = [...prev];
            const lastMsg = updated[updated.length - 1];
            if (lastMsg.id === aiMessageId) {
              lastMsg.content = accumulatedText;
            }
            return updated;
          });
        }
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
          },
        ]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleSuggestionClick = (text) => {
    setInput(text);
  };

  return (
    <div className="h-screen bg-white text-black font-sans selection:bg-gray-100 flex flex-col overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Unified Navbar */}
      <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex items-center justify-between px-4 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          >
            {isSidebarOpen ? (
              <PanelLeftClose size={20} />
            ) : (
              <PanelLeftOpen size={20} />
            )}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white w-4 h-4" />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight">MyTute AI</h1>
              <p className="text-[10px] text-gray-500 hidden sm:block">
                Contextual Learning Assistant
              </p>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-600 border border-gray-200">
          <span>RAG Active</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Component */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onClearChat={() => setMessages([])}
        />

        {/* Chat Content */}
        <main className="flex-1 flex flex-col relative min-w-0 bg-white">
          {/* Background Grid */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-50"
            style={{
              backgroundImage: `
                linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
              `,
              backgroundSize: "4rem 4rem",
            }}
          />

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 pb-32 scroll-smooth z-10">
            <div className="max-w-6xl mx-auto space-y-6">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
                    <Sparkles className="w-8 h-8 text-black" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    What are we learning today?
                  </h2>
                  <p className="text-gray-500 max-w-md mb-8">
                    Ask questions about your uploaded documents. I'll provide
                    answers cited directly from your provided materials.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg place-items-center">
                    {[
                      "Summarize the key concepts",
                      "Generate me some questions",
                      "Create a quiz from this chapter",
                      "What are the importent topics",
                    ].map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-sm text-center w-3xs p-4 rounded-xl border border-gray-200 hover:border-black/30 hover:bg-gray-50 transition-all duration-200 bg-white"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-4 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  } animate-in fade-in slide-in-from-bottom-4 duration-300`}
                >
                  {m.role !== "user" && (
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0 mt-1">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}

                  <div
                    className={`relative max-w-[85%] sm:max-w-[75%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "bg-black text-white rounded-tr-sm"
                        : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"
                    }`}
                  >
                    {m.role === "user" ? (
                      <div className="whitespace-pre-wrap">{m.content}</div>
                    ) : (
                      <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:text-gray-800">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({
                              node,
                              inline,
                              className,
                              children,
                              ...props
                            }) {
                              return !inline ? (
                                <div className="bg-gray-50 w-fit rounded-md p-1 pl-2 pr-2 my-2 border border-gray-200 overflow-x-auto">
                                  <code
                                    className="text-xs font-mono text-gray-800"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                </div>
                              ) : (
                                <code
                                  className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-red-500"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-4 justify-start animate-pulse">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 px-6 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 p-4 z-20">
            <div className="max-w-3xl mx-auto">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center gap-2 bg-white border border-gray-300 rounded-2xl p-1.5 sm:p-2 shadow-lg shadow-gray-100 focus-within:border-black focus-within:ring-1 focus-within:ring-black/5 transition-all duration-300"
              >
                <div className="relative group hidden sm:block">
                  <select
                    className="appearance-none bg-gray-50 hover:bg-gray-100 text-xs font-medium text-gray-600 py-2 pl-3 pr-8 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-300 transition-colors cursor-pointer"
                    disabled={isLoading}
                  >
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-3 h-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <input
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400 min-w-0 px-2"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <div className="flex items-center gap-1 pr-1">
                  {isLoading ? (
                    <button
                      type="button"
                      onClick={stop}
                      className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <StopCircle size={18} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="p-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105active:scale-95"
                    >
                      <Send size={18} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
