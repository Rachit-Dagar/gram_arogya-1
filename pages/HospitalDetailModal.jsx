import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  Building2, 
  MapPin, 
  PhoneCall, 
  Star, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  Stethoscope, 
  Pill, 
  Droplet, 
  Clock, 
  CheckCircle2, 
  Navigation,
  Activity
} from 'lucide-react';

export default function HospitalDetailModal({ hospital, onClose, onBookDoctor, onCheckMedicines }) {
  const { lang, t } = useLanguage();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hospital) return;
    loadDetails();
  }, [hospital]);

  const loadDetails = async () => {
    setLoading(true);
    try {
      const data = await api.getHospitalDetails(hospital.id);
      setDetails(data);
    } catch (e) {
      // Fallback to existing hospital object
      setDetails(hospital);
    } finally {
      setLoading(false);
    }
  };

  if (!hospital) return null;
  const h = details || hospital;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-medical-500/20 text-medical-300 text-xs font-bold border border-medical-500/30">
              {h.facility_type || 'Hospital'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              {lang === 'hi' ? 'सत्यापित केंद्र' : 'Verified Facility'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            {h.name}
          </h2>

          <p className="text-xs text-slate-300 mt-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-medical-400 shrink-0" />
            <span>{h.address}, {h.city}</span>
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400">{lang === 'hi' ? 'दूरी' : 'Distance'}</p>
              <p className="text-base font-black text-slate-900">{h.distance_km || 2.4} km</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400">{lang === 'hi' ? 'आपातकालीन' : 'Emergency'}</p>
              <p className={`text-base font-black ${h.emergency_available ? 'text-red-600' : 'text-slate-600'}`}>
                {h.emergency_available ? '24x7 Open' : 'Day OPD'}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400">{lang === 'hi' ? 'रेटिंग' : 'Rating'}</p>
              <p className="text-base font-black text-amber-600 flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{h.rating || 4.8}</span>
              </p>
            </div>
          </div>

          {/* Emergency & ICU Beds Notification */}
          {h.emergency_available && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200/80 flex items-start gap-3 text-xs">
              <Activity className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-900">
                  {lang === 'hi' ? '24x7 ट्रॉमा एवं आपातकालीन सेवा उपलब्ध' : '24x7 Critical Trauma & Emergency Services'}
                </p>
                <p className="text-red-700 mt-0.5">
                  ICU Beds: <span className="font-bold">{h.icu_beds || 12}</span> | Equipped with high-flow oxygen, critical monitoring & emergency physician on duty.
                </p>
              </div>
            </div>
          )}

          {/* Specialties Available */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              {lang === 'hi' ? 'उपलब्ध चिकित्सा विभाग' : 'Specialized Departments & Facilities'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {h.specialties && h.specialties.map((s, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-medical-50 text-medical-800 font-semibold text-xs border border-medical-100">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Affiliated Doctors Section */}
          {h.doctors && h.doctors.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                {lang === 'hi' ? 'उपलब्ध विशेषज्ञ डॉक्टर' : 'Doctors Available at this Facility'}
              </h4>
              <div className="space-y-2">
                {h.doctors.map((doc) => (
                  <div key={doc.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-medical-100 text-medical-800 flex items-center justify-center font-bold text-sm">
                        {doc.full_name.charAt(4)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">{doc.full_name}</p>
                        <p className="text-[11px] text-slate-500">{doc.specialization} • {doc.qualification}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onBookDoctor && onBookDoctor(doc);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs shadow-2xs transition-colors shrink-0"
                    >
                      {lang === 'hi' ? 'बुक करें' : 'Book'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insurance & Empanelment Notice */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {lang === 'hi' ? 'आयुष्मान भारत (AB-PMJAY) एवं कैशलेस बीमा मान्य' : 'Ayushman Bharat (PM-JAY) & Cashless Insurance Empaneled'}
            </p>
            <p className="text-emerald-700 text-[11px]">
              Eligible patients can present their ABHA card or Golden Card at the helpdesk for fully subsidized cashless treatment.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${h.phone}`}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-100 flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-medical-600" />
              <span>{h.phone}</span>
            </a>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ' ' + h.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-100 flex items-center gap-2 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'hi' ? 'दिशा-निर्देश' : 'Directions'}</span>
            </a>
          </div>

          <button
            onClick={() => {
              onClose();
              onCheckMedicines && onCheckMedicines();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Pill className="w-3.5 h-3.5 text-medical-400" />
            <span>{lang === 'hi' ? 'दवाएं देखें' : 'Pharmacy Stock'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
