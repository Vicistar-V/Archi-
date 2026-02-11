import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Cpu, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to VOID. I am the archival intelligence. Ask me about our philosophy or specific structures.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert internal message format to history format for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(userMsg.text, history);
      
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="group bg-white text-black p-4 rounded-none hover:bg-neutral-200 transition-colors shadow-2xl flex items-center gap-3"
            >
              <span className="font-mono text-xs uppercase tracking-widest hidden group-hover:block transition-all">Ask Architect AI</span>
              <MessageSquare size={24} strokeWidth={1.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0a0a0a] z-50 border-l border-neutral-800 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-white font-mono uppercase tracking-widest text-sm">VOID Intelligence</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0a0a]">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-neutral-800 text-white' : 'bg-transparent border border-neutral-800 text-neutral-300'} p-4 text-sm leading-relaxed`}>
                     {msg.role === 'model' && <Cpu size={16} className="mb-2 text-neutral-500" />}
                     {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                   <div className="bg-transparent border border-neutral-800 p-4 flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-neutral-500" />
                      <span className="text-xs text-neutral-500 font-mono uppercase">Processing structure...</span>
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-neutral-800 bg-[#0a0a0a]">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Inquire about the design..."
                  className="w-full bg-neutral-900/50 text-white p-4 pr-12 text-sm border-none focus:ring-1 focus:ring-white/20 resize-none h-16 placeholder:text-neutral-600 font-mono"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-4 top-4 text-neutral-400 hover:text-white disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};