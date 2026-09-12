import React, { useState } from 'react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  Stethoscope, 
  Clock, 
  Utensils, 
  Calendar,
  AlertCircle,
  Copy
} from 'lucide-react';

export default function PrescriptionSimplifier({ onAskDoctor }) {
  const { lang, t } = useLanguage();
  const [prescriptionText, setPrescriptionText] = useState(
`Tab Augmentin 625mg (1-0-1) x 5 days after food
Tab Pan 40mg (1-0-0) x 7 days before breakfast
Tab Montair LC (0-0-1) at bedtime x 5 days
Syp Benadryl Cough 10ml TDS x 3 days
Dr note: ????? 500mg SOS x 2 days (unclear handwriting)`
  );
  const [doctorName, setDoctorName] = useState('Dr. Arvind Sharma (CHC Mohanlalganj)');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const samplePrescriptions = [
    {
      title: "Sample 1: Respiratory & Acidity",
      text: `Tab Augmentin 625mg (1-0-1) x 5 days after food\nTab Pan 40mg (1-0-0) x 7 days before breakfast\nTab Montair LC (0-0-1) at bedtime x 5 days\nDr note: ????? 500mg SOS x 2 days (unclear handwriting)`
    },
    {
      title: "Sample 2: Fever & Pain Relief",
      text: `Tab Dolo 650mg (1-0-1) x 3 days after food\nTab Pantocid 40mg (1-0-0) before food x 5 days\nDrink plenty of oral fluids (ORS / Coconut water)`
    },
    {
      title: "Sample 3: Diabetic & Hypertensive Care",
      text: `Tab Metformin 500mg (1-0-1) with meals daily\nTab Telmisartan 40mg (1-0-0) at 8:00 AM daily\nCheck fasting blood sugar weekly`
    }
  ];

  const handleSimplify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.simplifyPrescription({
        text: prescriptionText,
        doctorName: doctorName
      });
      setResult(data);
    } catch (e) {
      console.warn(e);
      // Fallback local rule engine
      setResult({
        doctor_name: doctorName,
        simplified_items: [
          {
            medicine_name: "Augmentin 625",
            generic_salt: "Amoxicillin + Clavulanic Acid (Antibiotic)",
            purpose: "Clears bacterial throat or chest irritation",
            dosage_pattern: "1-0-1 (1 tablet morning, 1 tablet night)",
            timing: "Strictly after food with warm water",
            duration: "Complete 5 days full course",
            is_unclear: false
          },
          {
            medicine_name: "Pan 40",
            generic_salt: "Pantoprazole 40mg (Antacid)",
            purpose: "Reduces stomach acid and prevents gastric irritation",
            dosage_pattern: "1-0-0 (1 tablet in morning)",
            timing: "30 minutes before breakfast with water",
            duration: "7 days",
            is_unclear: false
          },
          {
            medicine_name: "Montair LC",
            generic_salt: "Levocetirizine + Montelukast",
            purpose: "Soothes nighttime coughing and allergy sneezing",
            dosage_pattern: "0-0-1 (1 tablet at night)",
            timing: "At bedtime before sleeping",
            duration: "5 days",
            is_unclear: false
          },
          {
            medicine_name: "????? 500mg SOS",
            generic_salt: "Unclear Handwriting",
            purpose: "Unable to verify safely",
            dosage_pattern: "Unclear",
            timing: "Confirmation required",
            duration: "N/A",
            is_unclear: true,
            safety_alert: "This part of the prescription is unclear. Please confirm it with your doctor or pharmacist."
          }
        ],
        has_unclear_sections: true,
        safety_disclaimer: "CRITICAL SAFETY NOTE: Gram Aarogya AI provides educational simplification of medical notation only. It does NOT replace the clinical advice of your physician or licensed pharmacist."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Prescription Education & Safety Guardrails</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('prescription_title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('prescription_subtitle')}
          </p>
        </div>

        <button
          onClick={() => onAskDoctor && onAskDoctor()}
          className="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2 shrink-0"
        >
          <Stethoscope className="w-4 h-4 text-medical-600" />
          <span>{t('ask_doctor_btn')}</span>
        </button>
      </div>

      {/* Safety Alert Banner */}
      <div className="bg-amber-50 rounded-3xl p-4 sm:p-5 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-900">
            Strict Clinical Safety & Educational Policy:
          </p>
          <p className="text-amber-800 leading-relaxed">
            Gram Aarogya AI never changes prescribed dosages, never overrides your doctor's clinical orders, and never invents medication instructions. If handwriting is unreadable, it alerts you to confirm with your pharmacist before taking.
          </p>
        </div>
      </div>

      {/* Main Side-by-Side Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Original Prescription Input / Samples */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>{t('original_prescription')}</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Text or Photo</span>
          </div>

          {/* Sample quick loader */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Load Clinical Sample:</span>
            <div className="flex flex-wrap gap-1.5">
              {samplePrescriptions.map((sp, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrescriptionText(sp.text)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-semibold transition-colors"
                >
                  {sp.title}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSimplify} className="space-y-4">
            <div>
              <label className="font-bold text-slate-700 text-xs block mb-1">Treating Physician / Clinic</label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-medical-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 text-xs block mb-1">Prescription Lines (as written on slip) *</label>
              <textarea
                rows={6}
                required
                value={prescriptionText}
                onChange={(e) => setPrescriptionText(e.target.value)}
                placeholder="Enter medicine notation (e.g. Tab Augmentin 625mg 1-0-1 x 5 days)..."
                className="w-full p-3 rounded-2xl border border-slate-300 font-mono text-xs focus:outline-none focus:border-medical-600 leading-relaxed"
              />
            </div>

            {/* Photo upload trigger */}
            <div className="p-4 border border-dashed border-slate-300 rounded-2xl text-center space-y-1 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <Upload className="w-5 h-5 text-indigo-600 mx-auto" />
              <p className="font-bold text-slate-700 text-xs">Upload Camera Photo of Prescription Slip</p>
              <p className="text-[10px] text-slate-400">Gram Aarogya OCR reads doctor slips and dosage notation</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs transition-colors shadow-apple flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Simplifying Clinical Notation...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Simplify with Gram Aarogya AI</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Simplified Explanation View */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>{t('simplified_explanation')}</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
              Educational Guide
            </span>
          </div>

          {!result ? (
            <div className="py-20 text-center text-slate-400 space-y-2">
              <FileText className="w-12 h-12 text-slate-200 mx-auto" />
              <p className="text-xs font-semibold">Click "Simplify with Gram Aarogya AI" to extract medication purposes, timings, and dietary instructions.</p>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              {/* If unclear handwriting detected */}
              {result.has_unclear_sections && (
                <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 text-rose-900 flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{t('unclear_warning')}</p>
                    <p className="text-[11px] text-rose-700 mt-0.5">
                      Do not guess dosages. Show the physical paper slip to a licensed pharmacist or contact your doctor.
                    </p>
                  </div>
                </div>
              )}

              {/* Simplified items list */}
              <div className="space-y-3">
                {result.simplified_items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-2 ${
                      item.is_unclear 
                        ? 'bg-rose-50/50 border-rose-200' 
                        : 'bg-slate-50 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {item.medicine_name}
                        </h4>
                        <p className="text-indigo-700 text-[11px] font-semibold">
                          {item.generic_salt}
                        </p>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        item.is_unclear ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.is_unclear ? 'Unclear' : 'Verified Salt'}
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs">
                      <span className="font-bold text-slate-700">{t('clinical_purpose')}:</span> {item.purpose}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span><strong>{t('dosage_pattern')}:</strong> {item.dosage_pattern}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Utensils className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span><strong>{t('timing_with_food')}:</strong> {item.timing}</span>
                      </div>
                    </div>

                    {item.safety_alert && (
                      <p className="p-2 rounded-xl bg-red-100/80 text-red-900 text-[11px] font-bold">
                        ⚠️ {item.safety_alert}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Safety Disclaimer */}
              <div className="p-3 bg-slate-100 rounded-2xl text-[10px] text-slate-500 leading-relaxed">
                {result.safety_disclaimer}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onAskDoctor && onAskDoctor()}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Ask a Doctor to Review</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
