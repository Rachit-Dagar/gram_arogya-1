import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Activity, 
  Users, 
  Calendar, 
  Building2, 
  Pill, 
  Droplet, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2
} from 'lucide-react';

export default function AnalyticsPage() {
  const { lang, t } = useLanguage();

  const metrics = [
    { label: "Total Clinical Consultations", value: "24,810+", change: "+18% this month", icon: Calendar, color: "text-medical-600 bg-medical-50" },
    { label: "Verified Network Doctors", value: "1,420+", change: "Pan-India verification", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" },
    { label: "Hospitals & PHCs Connected", value: "680+", change: "Urban & Rural centres", icon: Building2, color: "text-indigo-600 bg-indigo-50" },
    { label: "AI Symptom Guidance Sessions", value: "89,400+", change: "99.4% safety triage", icon: Sparkles, color: "text-violet-600 bg-violet-50" },
    { label: "Medicine Availability Searches", value: "152,000+", change: "Jan Aushadhi integrated", icon: Pill, color: "text-sky-600 bg-sky-50" },
    { label: "Emergency Blood Units Located", value: "8,920+", change: "Across 8 blood groups", icon: Droplet, color: "text-rose-600 bg-rose-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-2">
          <Activity className="w-3.5 h-3.5 text-medical-600" />
          <span>National Healthcare Impact Metrics</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Platform Healthcare Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Aggregated and anonymized clinical access statistics across rural, semi-urban, and metropolitan centers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{m.label}</span>
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${m.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight block">{m.value}</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {m.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Privacy note */}
      <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
        All analytics metrics represent aggregated system telemetry. In compliance with DISHA and national digital health data protection guidelines, individual patient health records are never accessible in analytics aggregations.
      </div>
    </div>
  );
}
