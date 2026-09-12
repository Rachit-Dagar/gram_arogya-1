import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { 
  Stethoscope, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Plus, 
  X, 
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function ExpertReviewPage() {
  const { lang, t } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [specialty, setSpecialty] = useState('Cardiology');
  const [question, setQuestion] = useState('');
  const [recordsSummary, setRecordsSummary] = useState('');
  const [patientAge, setPatientAge] = useState(48);
  const [patientGender, setPatientGender] = useState('Male');
  const [submitting, setSubmitting] = useState(false);

  const specialties = [
    'Cardiology',
    'General Medicine',
    'Pediatrics',
    'Orthopedics',
    'Gynecology',
    'Neurology',
    'Dermatology',
    'Psychiatry'
  ];

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await api.getExpertReviews();
      setReviews(data || []);
    } catch (e) {
      console.warn(e);
      setReviews([
        {
          id: 1,
          patient_name: "Ram Lal Patel",
          specialty: "Cardiology",
          question: "Experiencing intermittent palpitations in the evening and mild tightness after walking uphill.",
          status: "Doctor Responded",
          submitted_at: "11 Sep 2026, 04:30 PM",
          response: {
            doctor_name: "Dr. Priya Swaminathan (Cardiology, CMC Vellore)",
            observation: "Vitals and resting ECG demonstrate normal sinus rhythm without acute ischemic patterns. The reported symptoms appear exertional or related to mild dehydration/acid reflux.",
            recommendations: [
              "Perform a 24-hour ambulatory Holter monitor if flutter recurs during rest.",
              "Ensure adequate hydration and electrolyte balance (Coconut water / ORS).",
              "Schedule a formal echocardiogram within 3-4 weeks."
            ],
            suggested_tests: ["Serum Potassium & Magnesium", "2D Echo with Doppler"],
            urgency: "Non-Urgent Routine Follow-Up"
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCase = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.submitExpertReview({
        patient_name: "Ram Lal Patel",
        patient_age: patientAge,
        patient_gender: patientGender,
        specialty: specialty,
        question: question,
        records_summary: recordsSummary
      });
      setShowSubmitModal(false);
      setQuestion('');
      setRecordsSummary('');
      loadReviews();
    } catch (e) {
      setShowSubmitModal(false);
      loadReviews();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-medical-50 border border-medical-200 text-medical-800 text-xs font-bold mb-2">
            <Stethoscope className="w-3.5 h-3.5 text-medical-600" />
            <span>Specialist Second Opinion Panel</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Get an Expert Review
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Submit complex reports and medical questions for clinical evaluation by verified senior specialists.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-5 py-3 rounded-2xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs sm:text-sm shadow-apple transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Case for Review</span>
        </button>
      </div>

      {/* Educational Notice */}
      <div className="p-4 rounded-3xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Review Guidance Notice:</strong> Expert second opinions provide educational insights based on submitted documentation. They do not constitute an emergency triage service or replace in-person physical clinical examination.
        </p>
      </div>

      {/* Case Timeline / List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <div className="w-10 h-10 border-3 border-medical-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-semibold">Loading specialist reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <Stethoscope className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No cases submitted yet</h3>
          <p className="text-xs text-slate-500">Submit medical reports or clinical questions to receive second opinions from top specialists.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all space-y-6"
            >
              {/* Case Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-medical-50 text-medical-700 font-bold text-xs">
                      {c.specialty}
                    </span>
                    <span className="text-xs text-slate-400">Submitted on {c.submitted_at}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Clinical Question: {c.question}
                  </h3>
                </div>

                {/* Status Indicator */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 self-start sm:self-center ${
                  c.status === 'Doctor Responded'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {c.status}
                </span>
              </div>

              {/* Doctor Response Section if available */}
              {c.response ? (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 space-y-4 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Specialist Opinion: {c.response.doctor_name}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">General Observations:</h4>
                    <p className="text-slate-700 leading-relaxed">{c.response.observation}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Suggested Follow-Up Considerations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {c.response.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  {c.response.suggested_tests && (
                    <div className="pt-2 border-t border-slate-200">
                      <span className="font-bold text-slate-700">Recommended Diagnostics to Discuss with Local Doctor: </span>
                      <span className="text-medical-700 font-semibold">{c.response.suggested_tests.join(', ')}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Your case is currently under clinical review with the senior specialist board. Turnaround typically within 4-6 hours.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Submit Case Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-fade-in text-xs space-y-4">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>

            <h3 className="text-xl font-black text-slate-900">Submit Case for Specialist Review</h3>
            <p className="text-slate-500">Provide medical question and diagnostic details for evaluation.</p>

            <form onSubmit={handleSubmitCase} className="space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Specialty *</label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  {specialties.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Patient Age</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(parseInt(e.target.value) || 30)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Question / Clinical Concern *</label>
                <textarea
                  rows={3}
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Describe what you would like the specialist to examine..."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Relevant Lab Values or Prescriptions</label>
                <textarea
                  rows={2}
                  value={recordsSummary}
                  onChange={(e) => setRecordsSummary(e.target.value)}
                  placeholder="e.g. CBC Hemoglobin 14.2, normal ECG, blood pressure 130/85..."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-medical-600 hover:bg-medical-700 text-white font-bold rounded-2xl transition-colors shadow-xs"
              >
                {submitting ? 'Submitting...' : 'Submit to Specialist Panel'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
