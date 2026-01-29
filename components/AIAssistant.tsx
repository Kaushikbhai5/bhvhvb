
import React, { useState, useRef, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { askGemini } from '../services/geminiService';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: "Hi! I'm Samad's AI Assistant. Ask me anything about his Web3 experience!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    const response = await askGemini(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsTyping(false);
  };

  return (
    <>
      <m.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/50 hover:bg-indigo-500 transition-colors border border-white/20"
      >
        <MessageSquare className="text-white" />
      </m.button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50, x: 50 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-96 h-[500px] bg-[#16181D] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
          >
            <div className="p-4 bg-indigo-600 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-bold text-sm tracking-wide">Samad's AI Buddy</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-black/20 p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-500 text-white rounded-tr-none' 
                      : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-slate-200 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about my experience..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 disabled:opacity-50 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
