import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { 
  Heart, 
  Calendar, 
  Activity, 
  FileText, 
  Pill, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Droplet, 
  ShieldCheck, 
  TrendingUp, 
  User, 
  AlertCircle,
  Plus
} from 'lucide-react';

export default function PatientDashboard({ onNavigate }) {
  const { lang, t } = useLanguage();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [vitals, setVitals] = useState({});
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = user?.full_name || "Ram Lal Patel";

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [aptRes, vitRes, recRes] = await Promise.allSettled([
        api.getAppointments(),
        api.getVitals(),
        api.getMedicalRecords()
      ]);

      if (aptRes.status === 'fulfilled') setAppointments(aptRes.value || []);
      if (vitRes.status === 'fulfilled') setVitals(vitRes.value?.latest || {});
      if (recRes.status === 'fulfilled') setRecords(recRes.value || []);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const nextAppointment = appointments.find(a => a.status === 'Confirmed' || a.status === 'Upcoming') || {
    doctor_name: "Dr. Arvind Sharma",
    specialization: "General Medicine",
    appointment_date: "Tomorrow",
    slot_time: "10:30 AM",
    consultation_type: "In-Person",
    hospital_name: "Community Health Centre, Mohanlalganj"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Greeting Banner */}
      <div className="bg-gradient-to-r from-medical-700 via-medical-600 to-arogya-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            {lang === 'hi' ? 'नागरिक स्वास्थ्य प्रोफाइल' : 'Personal Health Dashboard'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {lang === 'hi' ? `नमस्ते, ${userName}!` : `Good morning, ${userName}!`}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl font-medium">
            {lang === 'hi' ? 'यहाँ आपकी संपूर्ण स्वास्थ्य स्थिति, आगामी परामर्श और डिजिटल रिकॉर्ड का विवरण है।' : "Here's your comprehensive health overview, upcoming consultations, and digital records."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => onNavigate('appointments')}
            className="px-5 py-2.5 rounded-2xl bg-white text-medical-800 hover:bg-slate-50 font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-medical-600" />
            <span>{lang === 'hi' ? 'अपॉइंटमेंट देखें' : 'View Bookings'}</span>
          </button>
          <button
            onClick={() => onNavigate('vitals')}
            className="px-5 py-2.5 rounded-2xl bg-black/20 hover:bg-black/30 border border-white/30 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            <span>{lang === 'hi' ? 'वाइटल्स मापें' : 'Log Vitals'}</span>
          </button>
        </div>

        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* 4 Core Summary Cards (Next Apt, Latest Vitals, Recent Prescription, Health Passport) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Next Appointment */}
        <div 
          onClick={() => onNavigate('appointments')}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Next Appointment</span>
              <div className="w-8 h-8 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-bold text-base text-slate-900 leading-snug">
              {nextAppointment.doctor_name}
            </h3>
            <p className="text-xs text-medical-600 font-semibold mb-3">
              {nextAppointment.specialization}
            </p>
            <p className="text-xs text-slate-500 line-clamp-2">
              {nextAppointment.appointment_date} at {nextAppointment.slot_time} • {nextAppointment.consultation_type}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-medical-600">
            <span>Manage Slot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Latest Vitals */}
        <div 
          onClick={() => onNavigate('vitals')}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Latest Vitals</span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-500">Blood Pressure:</span>
                <span className="font-black text-slate-900 text-sm">122/78 mmHg</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-500">SpO2 (Oxygen):</span>
                <span className="font-black text-emerald-600 text-sm">98% (Normal)</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-500">Pulse:</span>
                <span className="font-black text-slate-900 text-sm">72 bpm</span>
              </div>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
            <span>View Charts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Recent Prescription */}
        <div 
          onClick={() => onNavigate('prescription')}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Prescriptions</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Pill className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-bold text-base text-slate-900 leading-snug">
              Augmentin 625 & Pan 40
            </h3>
            <p className="text-xs text-indigo-600 font-semibold mb-2">
              Dr. Arvind Sharma (Day 2 of 5)
            </p>
            <p className="text-xs text-slate-500">
              Timing: After meals (Antibiotic) & Before breakfast (Antacid).
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
            <span>Understand Dosage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Health Records & Reports */}
        <div 
          onClick={() => onNavigate('records')}
          className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Health Passport</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-bold text-base text-slate-900 leading-snug">
              2 Encrypted Records
            </h3>
            <p className="text-xs text-amber-700 font-semibold mb-2">
              CBC Blood Panel & ECG
            </p>
            <p className="text-xs text-slate-500">
              All diagnostic markers within normal therapeutic reference boundaries.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
            <span>Open Vault</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Quick Access Ecosystem Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Widget 1: Gram Aarogya AI Assistant Quick Prompt */}
        <div className="bg-gradient-to-br from-violet-50 to-indigo-50/50 rounded-3xl p-6 border border-violet-200/80 space-y-4">
          <div className="flex items-center gap-2.5 text-violet-700">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Gram Aarogya AI Assistant</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Have a question about symptoms, report markers, or preparing for your upcoming consultation?
          </p>
          <button
            onClick={() => onNavigate('ai-assistant')}
            className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl text-xs transition-colors shadow-xs"
          >
            Ask AI Health Assistant
          </button>
        </div>

        {/* Widget 2: Nearby Medicine Availability */}
        <div className="bg-gradient-to-br from-sky-50 to-medical-50/50 rounded-3xl p-6 border border-sky-200/80 space-y-4">
          <div className="flex items-center gap-2.5 text-sky-700">
            <Pill className="w-5 h-5" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Medicine Store Network</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Search live medicine inventory and compare prices across local pharmacies & subsidized Jan Aushadhi Kendras.
          </p>
          <button
            onClick={() => onNavigate('medicines')}
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl text-xs transition-colors shadow-xs"
          >
            Find Medicines Nearby
          </button>
        </div>

        {/* Widget 3: Emergency Quick Helpline */}
        <div className="bg-gradient-to-br from-red-50 to-rose-50/50 rounded-3xl p-6 border border-red-200/80 space-y-4">
          <div className="flex items-center gap-2.5 text-red-700">
            <Heart className="w-5 h-5" />
            <h3 className="font-bold text-sm uppercase tracking-wider">24x7 Emergency Help</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Immediate dispatch for ambulance (108/112), nearest blood bank stock, and emergency ICU trauma units.
          </p>
          <button
            onClick={() => onNavigate('emergency')}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs transition-colors shadow-xs"
          >
            Open Emergency Mode
          </button>
        </div>
      </div>
    </div>
  );
}
