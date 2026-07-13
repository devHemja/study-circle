import React, { useState, useRef, useEffect } from 'react';

export default function ChatBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', parts: [{ text: "Hey there, StudyCircle peer! 🎓 Ask me anything about your MCA subjects, programming concepts, or placement prep." }] }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scrolls chat window to the bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
          history: messages // Sends the current history so Gemini remembers context
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
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-80 sm:w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm">StudyCircle AI</h3>
              <p className="text-xs text-blue-200">Your 24/7 MCA Companion</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs shadow-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-600'
                }`}>
                  {msg.parts[0].text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none px-3 py-2 text-xs text-gray-400 border border-gray-100 dark:border-gray-600 animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about DBMS, OS, DSA..."
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500 bg-transparent dark:text-white"
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white rounded-xl px-3 py-1.5 text-xs font-semibold hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}