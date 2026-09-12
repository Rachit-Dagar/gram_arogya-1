import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Landmark, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  HeartHandshake, 
  FileText, 
  Pill, 
  Video,
  PhoneCall
} from 'lucide-react';

export default function GovernmentServices() {
  const { lang, t } = useLanguage();

  // Centralized official Indian Government Health Resources
  const officialServices = [
    {
      id: "abha",
      name: "ABHA (Ayushman Bharat Health Account)",
      ministry: "National Health Authority (NHA) / MoHFW",
      description: "Create your unique 14-digit digital health account number to digitally store and share lab reports, prescriptions, and health records securely across all empanelled hospitals.",
      officialUrl: "https://abha.abdm.gov.in/",
      badge: "National Digital Health ID",
      icon: ShieldCheck,
      color: "bg-medical-50 text-medical-700 border-medical-200"
    },
    {
      id: "abdm",
      name: "Ayushman Bharat Digital Mission (ABDM)",
      ministry: "National Health Authority, Govt. of India",
      description: "Interoperable digital health infrastructure connecting digital patient registries, verified healthcare professionals (HPR), and healthcare facility registries (HFR).",
      officialUrl: "https://abdm.gov.in/",
      badge: "Unified Health Interface",
      icon: Landmark,
      color: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    {
      id: "pmjay",
      name: "Ayushman Bharat PM-JAY",
      ministry: "National Health Authority (NHA)",
      description: "World's largest government-funded healthcare assurance scheme offering up to ₹5 Lakh cashless health cover per family per year for secondary and tertiary care hospitalization.",
      officialUrl: "https://pmjay.gov.in/",
      badge: "₹5 Lakh Cashless Cover",
      icon: HeartHandshake,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      id: "esanjeevani",
      name: "eSanjeevani (National Teleconsultation Service)",
      ministry: "Ministry of Health and Family Welfare (MoHFW)",
      description: "Official doctor-to-doctor and patient-to-doctor telemedicine portal enabling citizens across rural and urban locations to consult government doctors for free.",
      officialUrl: "https://esanjeevani.mohfw.gov.in/",
      badge: "Free Teleconsultation",
      icon: Video,
      color: "bg-sky-50 text-sky-700 border-sky-200"
    },
    {
      id: "pmbjp",
      name: "Pradhan Mantri Bhartiya Jan Aushadhi Pariyojana (PMBJP)",
      ministry: "Department of Pharmaceuticals, Govt. of India",
      description: "Provides high quality generic medicines and surgical consumables at 50% to 90% lesser cost than branded equivalents through dedicated Jan Aushadhi Kendras.",
      officialUrl: "http://janaushadhi.gov.in/",
      badge: "Subsidized Generic Medicines",
      icon: Pill,
      color: "bg-teal-50 text-teal-700 border-teal-200"
    },
    {
      id: "nikshay",
      name: "Ni-kshay (National TB Elimination Program)",
      ministry: "Central TB Division, MoHFW",
      description: "Web-enabled patient management system for tuberculosis care, providing diagnostic assistance and monthly nutritional financial incentives under Ni-kshay Poshan Yojana.",
      officialUrl: "https://www.nikshay.in/",
      badge: "TB Care & Nutrition Support",
      icon: FileText,
      color: "bg-amber-50 text-amber-700 border-amber-200"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
          <Landmark className="w-3.5 h-3.5 text-amber-600" />
          <span>Official Public Health Initiatives</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t('govt_title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t('govt_subtitle')}
        </p>
      </div>

      {/* Official Government Disclaimer */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Official Verified Portals:</strong> Gram Aarogya links exclusively to authentic Government of India portals (.gov.in / .nic.in). External services will open securely in a new browser tab.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {officialServices.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${service.color}`}>
                    {service.badge}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-1 leading-snug">
                  {service.name}
                </h3>
                <p className="text-[11px] font-semibold text-slate-400 mb-3">
                  {service.ministry}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={service.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toll-free Helplines Box */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-lg sm:text-xl font-black mb-1">Official National Health Helplines</h3>
        <p className="text-xs text-slate-300 mb-6">Toll-free 24x7 government citizen hotlines</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-white font-bold">1800-180-8080</p>
              <p className="text-slate-300 text-[11px]">PMBJP Jan Aushadhi Helpline</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-medical-400 shrink-0" />
            <div>
              <p className="text-white font-bold">14555 / 1800-111-565</p>
              <p className="text-slate-300 text-[11px]">Ayushman Bharat PM-JAY</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <p className="text-white font-bold">1075</p>
              <p className="text-slate-300 text-[11px]">National Health Mission (MoHFW)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
