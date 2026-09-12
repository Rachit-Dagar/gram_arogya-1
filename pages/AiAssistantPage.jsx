import React, { useState } from 'react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { Activity, AlertTriangle, Bot, ChevronRight, HeartPulse, PhoneCall, Send, ShieldCheck, Sparkles, Stethoscope, User } from 'lucide-react';

const starters = ['I am feeling sick', 'Find a doctor near me', 'Explain 1-0-1 dosage', 'Where can I find medicine?'];

const severityTone = (message) => {
  const severity = message.severity || (message.isEmergency ? 'critical' : message.suggestedAction === 'triage' ? 'caution' : 'routine');
  return {
    critical: { label: 'Urgent — seek emergency care', bubble: 'border border-red-300 bg-red-50 text-red-950 shadow-sm', bot: 'bg-red-100 text-red-700', badge: 'bg-red-100 text-red-800' },
    caution: { label: 'Needs clinical follow-up', bubble: 'border border-amber-300 bg-amber-50 text-amber-950 shadow-sm', bot: 'bg-amber-100 text-amber-700', badge: 'bg-amber-100 text-amber-800' },
    routine: { label: 'Routine guidance', bubble: 'border border-emerald-200 bg-emerald-50 text-slate-700 shadow-sm', bot: 'bg-emerald-100 text-emerald-700', badge: 'bg-emerald-100 text-emerald-800' }
  }[severity] || { label: 'Routine guidance', bubble: 'border border-slate-100 bg-white text-slate-700 shadow-sm', bot: 'bg-slate-100 text-slate-700', badge: 'bg-slate-100 text-slate-700' };
};

export default function AiAssistantPage({ onNavigate }) {
  const { lang } = useLanguage();
  const [mode, setMode] = useState('chat');
  const [messages, setMessages] = useState([{ role: 'assistant', severity: 'routine', content: 'Namaste — I’m Aarogya Mitra, your health navigation companion. Tell me how you are feeling, or ask me to find care, medicines, or an appointment.' }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [chestPain, setChestPain] = useState(false);
  const [breathless, setBreathless] = useState(false);
  const [triage, setTriage] = useState(null);
  const [triageLoading, setTriageLoading] = useState(false);

  const send = async (event, prompt = input) => {
    event?.preventDefault();
    if (!prompt.trim() || typing) return;
    const text = prompt.trim();
    const history = messages.slice(-6).map(({ role, content }) => ({ role, content }));
    setInput(''); setError(''); setTyping(true);
    setMessages(current => [...current, { role: 'user', content: text }]);
    try {
      const response = await api.chatWithAi({ message: text, language: lang, conversationHistory: history });
      setMessages(current => [...current, { role: 'assistant', content: response.reply, isEmergency: response.is_emergency, suggestedAction: response.suggested_action, severity: response.severity }]);
    } catch (requestError) { setError(requestError.message || 'Unable to reach the assistant.'); }
    finally { setTyping(false); }
  };

  const submitTriage = async (event) => {
    event.preventDefault();
    if (!symptoms.trim()) return;
    setTriageLoading(true);
    try { setTriage(await api.evaluateSymptomTriage({ symptoms, chest_pain: chestPain, breathlessness: breathless, language: lang })); }
    catch { setTriage({ tier: chestPain || breathless ? 'RED' : 'YELLOW', level_title: 'Please seek clinician guidance', rationale: 'The triage service is unavailable, so a conservative care recommendation is shown.', recommended_actions: ['Book a verified doctor consultation.', 'Call 108 or 112 if symptoms are severe or worsening.'] }); }
    finally { setTriageLoading(false); }
  };

  return <div className="min-h-[calc(100vh-8rem)] bg-slate-100 py-6 sm:py-10"><div className="mx-auto max-w-6xl px-4 sm:px-6">
    <section className="overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-8 text-white shadow-2xl sm:px-10 sm:py-10"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-2xl"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-emerald-100"><Sparkles className="h-3.5 w-3.5" /> HEALTH GUIDANCE, MADE HUMAN</div><h1 className="text-3xl font-black tracking-tight sm:text-5xl">Meet Aarogya Mitra.</h1><p className="mt-3 max-w-xl text-sm leading-relaxed text-emerald-100 sm:text-base">A calm place to understand symptoms, prepare for a doctor visit, and find trusted care. It gives guidance — never a diagnosis.</p></div><div className="grid grid-cols-3 divide-x divide-white/20 rounded-2xl border border-white/20 bg-white/10 text-center text-xs"><div className="px-4 py-3"><ShieldCheck className="mx-auto mb-1 h-4 w-4 text-emerald-300" /><b>Safety-first</b></div><div className="px-4 py-3"><Stethoscope className="mx-auto mb-1 h-4 w-4 text-emerald-300" /><b>Find care</b></div><div className="px-4 py-3"><HeartPulse className="mx-auto mb-1 h-4 w-4 text-emerald-300" /><b>4 languages</b></div></div></div></section>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]"><section className="overflow-hidden rounded-[2rem] border border-[#d9e3da] bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6"><div className="flex gap-1 rounded-xl bg-slate-100 p-1"><button onClick={() => setMode('chat')} className={`rounded-lg px-3 py-2 text-xs font-bold ${mode === 'chat' ? 'bg-white text-[#063b37] shadow-sm' : 'text-slate-500'}`}>Ask Aarogya Mitra</button><button onClick={() => setMode('triage')} className={`rounded-lg px-3 py-2 text-xs font-bold ${mode === 'triage' ? 'bg-white text-[#063b37] shadow-sm' : 'text-slate-500'}`}>Symptom check</button></div><span className="hidden text-xs font-semibold text-slate-400 sm:block">Educational support only</span></div>
      {mode === 'chat' ? <><div className="flex flex-wrap gap-2 border-b border-slate-100 px-5 py-3 sm:px-6">{starters.map(prompt => <button key={prompt} onClick={(event) => send(event, prompt)} className="rounded-full border border-[#cfe1d6] bg-[#f5faf6] px-3 py-1.5 text-xs font-semibold text-[#176451] transition hover:bg-[#e4f2e8]">{prompt}</button>)}</div><div className="h-[410px] space-y-5 overflow-y-auto bg-[#fbfcfa] px-5 py-6 sm:px-7">{messages.map((message, index) => <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>{message.role === 'assistant' && <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${severityTone(message).bot}`}><Bot className="h-4 w-4" /></div>}<div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'bg-[#063b37] text-white' : severityTone(message).bubble}`}>{message.role === 'assistant' && <span className={`mb-2 inline-flex rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wide ${severityTone(message).badge}`}>{severityTone(message).label}</span>}{message.content}{message.isEmergency && <a href="tel:108" className="mt-3 flex w-fit items-center gap-1 rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white"><PhoneCall className="h-3.5 w-3.5" /> Call 108 now</a>}{message.suggestedAction === 'triage' && <button onClick={() => setMode('triage')} className="mt-3 flex items-center gap-1 text-xs font-bold text-[#176451]">Use symptom check <ChevronRight className="h-3.5 w-3.5" /></button>}</div>{message.role === 'user' && <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white"><User className="h-4 w-4" /></div>}</div>)}{typing && <div className="flex items-center gap-2 text-xs font-semibold text-slate-400"><Bot className="h-4 w-4 animate-pulse" /> Aarogya Mitra is preparing a response…</div>}</div><form onSubmit={send} className="border-t border-slate-100 p-4 sm:p-5">{error && <p className="mb-2 text-xs font-medium text-red-600">{error}</p>}<div className="flex items-center gap-2 rounded-2xl border border-[#bdd8c5] bg-[#f9fcf9] p-2 focus-within:ring-2 focus-within:ring-emerald-200"><input value={input} onChange={event => setInput(event.target.value)} placeholder="Tell me what you need help with…" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none" /><button disabled={typing} className="rounded-xl bg-[#0b6b59] p-3 text-white transition hover:bg-[#063b37] disabled:opacity-50"><Send className="h-4 w-4" /></button></div></form></> : <form onSubmit={submitTriage} className="space-y-5 p-5 sm:p-7"><div><h2 className="text-xl font-black text-slate-900">Quick symptom check</h2><p className="mt-1 text-sm text-slate-500">This helps decide urgency. It does not diagnose illness or prescribe treatment.</p></div><textarea value={symptoms} onChange={event => setSymptoms(event.target.value)} required rows="5" placeholder="Example: fever and cough for two days…" className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-[#0b6b59]" /><div className="grid gap-3 sm:grid-cols-2"><label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-900"><input type="checkbox" checked={chestPain} onChange={event => setChestPain(event.target.checked)} /> Severe chest pain</label><label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-900"><input type="checkbox" checked={breathless} onChange={event => setBreathless(event.target.checked)} /> Trouble breathing</label></div><button disabled={triageLoading} className="rounded-xl bg-[#063b37] px-5 py-3 text-sm font-bold text-white">{triageLoading ? 'Checking…' : 'Check urgency'}</button>{triage && <div className={`rounded-2xl border p-5 ${triage.tier === 'RED' ? 'border-red-200 bg-red-50' : triage.tier === 'YELLOW' ? 'border-amber-200 bg-amber-50' : 'border-emerald-200 bg-emerald-50'}`}><p className="text-xs font-black tracking-widest">{triage.tier}</p><h3 className="mt-1 text-lg font-black">{triage.level_title}</h3><p className="mt-2 text-sm leading-relaxed">{triage.rationale}</p><ul className="mt-3 list-inside list-disc text-sm">{triage.recommended_actions?.map(action => <li key={action}>{action}</li>)}</ul></div>}</form>}</section>
      <aside className="space-y-4"><div className="rounded-[2rem] bg-[#dff1e6] p-6 text-[#063b37]"><Activity className="h-6 w-6" /><h2 className="mt-4 text-lg font-black">Not sure where to start?</h2><p className="mt-2 text-sm leading-relaxed">Use symptom check for urgency, then book a verified clinician when advised.</p><button onClick={() => setMode('triage')} className="mt-5 flex items-center gap-1 text-sm font-black">Check symptoms <ChevronRight className="h-4 w-4" /></button></div><button onClick={() => onNavigate('doctors')} className="w-full rounded-[2rem] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5"><Stethoscope className="h-5 w-5 text-[#0b6b59]" /><h2 className="mt-3 font-black text-slate-900">Book a doctor</h2><p className="mt-1 text-sm text-slate-500">Verified doctors, in person or by video.</p></button><a href="tel:108" className="block rounded-[2rem] bg-[#b91c1c] p-5 text-white"><AlertTriangle className="h-5 w-5" /><h2 className="mt-3 font-black">Emergency?</h2><p className="mt-1 text-sm text-red-100">Call ambulance support at 108.</p></a></aside>
    </div></div></div>;
}
