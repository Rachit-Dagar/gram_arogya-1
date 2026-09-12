import React, { useState } from 'react';
import { Sparkles, X, Bot, Send, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

const severityTone = (severity) => ({
  critical: { label: 'Urgent', bubble: 'border border-red-300 bg-red-50 text-red-950' },
  caution: { label: 'Follow-up', bubble: 'border border-amber-300 bg-amber-50 text-amber-950' },
  routine: { label: 'Guidance', bubble: 'border border-emerald-200 bg-emerald-50 text-slate-800' }
}[severity] || { label: 'Guidance', bubble: 'border border-slate-200 bg-slate-100 text-slate-800' });

export default function FloatingAiWidget({ onOpenFullAi }) {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', severity: 'routine', text: lang === 'hi' ? "नमस्ते! मैं ग्राम आरोग्य एआई हूँ। मैं आपकी क्या सहायता कर सकता हूँ?" : "Hi! I am Gram Aarogya AI. Ask me about doctors, medicines, or health symptoms." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const text = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setIsTyping(true);

    try {
      const res = await api.chatWithAi({ message: text, language: lang });
      setMessages(prev => [...prev, { role: 'assistant', text: res.reply, severity: res.severity || (res.is_emergency ? 'critical' : res.suggested_action === 'triage' ? 'caution' : 'routine') }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', severity: 'caution', text: "I am available to assist you. For emergency trauma care, please dial 108 immediately." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
      {isOpen ? (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-80 sm:w-96 h-[480px] flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-700 to-indigo-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-xs">Gram Aarogya AI</h4>
                <p className="text-[10px] text-white/80">Universal Health Companion</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenFullAi && onOpenFullAi();
                }}
                className="text-[10px] bg-white/20 hover:bg-white/30 px-2 py-1 rounded-lg text-white font-bold transition-colors"
              >
                Expand
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.role === 'user' ? 'bg-slate-900 text-white' : severityTone(m.severity).bubble
                }`}>
                  {m.role === 'assistant' && <span className="mb-1 block text-[9px] font-black uppercase tracking-wide opacity-70">{severityTone(m.severity).label}</span>}
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pl-2">
                <Bot className="w-3.5 h-3.5 text-violet-500 animate-spin" />
                <span>AI is preparing answer...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 p-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-violet-600"
            />
            <button
              type="submit"
              disabled={isTyping}
              className="w-8 h-8 rounded-xl bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center shrink-0 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-float flex items-center justify-center hover:scale-110 transition-all border-2 border-white/50 group"
          title="Talk to Gram Aarogya AI"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
}
