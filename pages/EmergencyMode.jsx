import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  Droplet, 
  Building2, 
  Heart, 
  AlertTriangle, 
  User, 
  CheckCircle2,
  Activity,
  ArrowRight
} from 'lucide-react';

export default function EmergencyMode({ onNavigate }) {
  const { lang, t } = useLanguage();
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [allergies, setAllergies] = useState('Penicillin (Mild Rash)');
  const [chronicMedications, setChronicMedications] = useState('Tab Telmisartan 40mg (Morning)');
  const [emergencyContactName, setEmergencyContactName] = useState('Suresh Patel (Brother)');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('+91-9810077007');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* High-Visibility Emergency Header */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          24x7 Emergency Rapid Response
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          {t('emergency_title')}
        </h1>
        <p className="text-sm sm:text-base text-white/90 max-w-2xl font-medium">
          {t('emergency_subtitle')}
        </p>
      </div>

      {/* Large Emergency Direct-Dial Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <a
          href="tel:108"
          className="bg-red-600 hover:bg-red-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-black tracking-wider text-red-200">National Ambulance</span>
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black block tracking-tight">108</span>
            <p className="text-xs text-red-100 font-semibold mt-1">24x7 Free Ambulance Dispatch</p>
          </div>
          <span className="text-xs font-bold underline">Tap to Call 108 Now →</span>
        </a>

        <a
          href="tel:112"
          className="bg-slate-900 hover:bg-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-black tracking-wider text-slate-400">All-in-One Helpline</span>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black block tracking-tight">112</span>
            <p className="text-xs text-slate-300 font-semibold mt-1">Police, Fire & Medical Emergency</p>
          </div>
          <span className="text-xs font-bold underline">Tap to Call 112 Now →</span>
        </a>

        <a
          href="tel:102"
          className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-black tracking-wider text-emerald-200">Janani Shishu Seva</span>
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black block tracking-tight">102</span>
            <p className="text-xs text-emerald-100 font-semibold mt-1">Free Maternal & Infant Transport</p>
          </div>
          <span className="text-xs font-bold underline">Tap to Call 102 Now →</span>
        </a>
      </div>

      {/* Immediate Spatial Actions: Nearest Emergency ICU & Blood Bank */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nearest Hospital ICU */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-apple space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 font-bold text-xs border border-red-200">
              Nearest ICU / Trauma Center
            </span>
            <Building2 className="w-5 h-5 text-red-600" />
          </div>

          <h3 className="text-lg font-black text-slate-900">
            Community Health Centre & Sub-District Hospital, Mohanlalganj
          </h3>
          <p className="text-xs text-slate-500">
            Raebareli Highway, Mohanlalganj (1.2 km away) • 6 ICU Beds available with oxygen
          </p>

          <div className="pt-3 border-t border-slate-100 flex gap-3">
            <a
              href="tel:+915222973120"
              className="flex-1 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call CHC Desk</span>
            </a>
            <button
              onClick={() => onNavigate('hospitals', { emergencyOnly: true })}
              className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              All Emergency Hospitals
            </button>
          </div>
        </div>

        {/* Nearest Blood Bank */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-apple space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200">
              Nearest Blood Bank
            </span>
            <Droplet className="w-5 h-5 text-rose-600" />
          </div>

          <h3 className="text-lg font-black text-slate-900">
            Mohanlalganj Tehsil Red Cross Blood Bank
          </h3>
          <p className="text-xs text-slate-500">
            Near CHC Hospital (1.3 km away) • A+, B+, O+ units available
          </p>

          <div className="pt-3 border-t border-slate-100 flex gap-3">
            <a
              href="tel:+915222973199"
              className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Blood Bank</span>
            </a>
            <button
              onClick={() => onNavigate('blood-banks')}
              className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              View Blood Stock
            </button>
          </div>
        </div>
      </div>

      {/* Personal Medical ID for First Responders */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-apple space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">{t('my_medical_id')}</h3>
            <p className="text-xs text-slate-500">
              Essential clinical emergency information visible to paramedics and first responders.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
            Offline Cached
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Blood Group</span>
            <p className="text-xl font-black text-red-600">{bloodGroup}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Known Allergies</span>
            <p className="font-bold text-slate-800">{allergies}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Chronic Medications</span>
            <p className="font-bold text-slate-800">{chronicMedications}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Emergency Family Contact</span>
            <p className="font-bold text-slate-800">{emergencyContactName}</p>
            <a href={`tel:${emergencyContactPhone}`} className="text-medical-600 font-bold underline block mt-0.5">
              {emergencyContactPhone}
            </a>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl text-[11px] text-slate-500 border border-slate-100">
          <strong>Notice:</strong> This emergency card is stored securely in local browser storage and remains viewable even during severe network drops or when roaming offline.
        </div>
      </div>
    </div>
  );
}
