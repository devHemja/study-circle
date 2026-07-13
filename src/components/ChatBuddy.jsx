import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/nitrr_mca_logo.jpg';

export default function ChatBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', parts: [{ text: "Hey there, StudyCircle peer! 🎓 Ask me anything about your MCA subjects, programming concepts, or placement prep." }] }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scrolls chat window to the bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus the input as soon as the panel opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');

    // 1. Update UI with user message immediately
    const updatedMessages = [
      ...messages,
      { role: 'user', parts: [{ text: userMessage }] }
    ];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // 2. Call the Netlify Serverless Function we made in Step 1
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          // Gemini's chat history must start with a 'user' turn, so drop the
          // bot's initial greeting before sending history along
          history: messages[0]?.role === 'model' ? messages.slice(1) : messages
        }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages([
          ...updatedMessages,
          { role: 'model', parts: [{ text: data.reply }] }
        ]);
      } else {
        throw new Error();
      }
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: 'model', parts: [{ text: "Oops, something went wrong on my circuits. Try asking again!" }] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open StudyCircle AI chat"
          className="group relative bg-black text-yellow-400 rounded-full p-4 shadow-lg hover:bg-yellow-400 hover:text-black hover:shadow-xl transition duration-300 flex items-center justify-center hover:scale-105"
        >
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-yellow-400 group-hover:bg-black ring-2 ring-white animate-pulse" />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white border border-black/10 w-80 sm:w-96 h-[480px] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt=""
                className="h-9 w-9 rounded-full object-cover ring-2 ring-yellow-400"
              />
              <div>
                <h3 className="font-bold text-sm leading-tight">StudyCircle AI</h3>
                <p className="text-[11px] text-yellow-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 inline-block" />
                  Your 24/7 MCA Companion
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-yellow-400 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <img src={logo} alt="" className="h-6 w-6 rounded-full object-cover ring-1 ring-black/10 shrink-0" />
                )}
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-black text-yellow-400 rounded-br-none shadow-md'
                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-200 shadow-sm'
                }`}>
                  {msg.parts[0].text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-end gap-2 justify-start">
                <img src={logo} alt="" className="h-6 w-6 rounded-full object-cover ring-1 ring-black/10 shrink-0" />
                <div className="bg-white rounded-2xl rounded-bl-none px-3 py-2.5 border border-gray-200 shadow-sm flex gap-1 items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40 animate-bounce" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about DBMS, OS, DSA..."
              className="flex-1 border border-gray-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-black focus:ring-2 focus:ring-yellow-400 bg-transparent text-black placeholder:text-gray-400 transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-black text-yellow-400 rounded-xl px-4 py-1.5 text-xs font-semibold hover:bg-yellow-400 hover:text-black transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-yellow-400"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}