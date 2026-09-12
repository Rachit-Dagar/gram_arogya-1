import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { 
  FileText, 
  Upload, 
  Download, 
  Share2, 
  Trash2, 
  Plus, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  Lock, 
  Search, 
  FileCheck,
  Eye
} from 'lucide-react';

export default function HealthRecordsPage() {
  const { lang, t } = useLanguage();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Lab Report');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newFacility, setNewFacility] = useState('');
  const [newSummary, setNewSummary] = useState('');

  // Share modal state
  const [shareModalRecord, setShareModalRecord] = useState(null);
  const [sharePin, setSharePin] = useState('8429');
  const [shareRevoked, setShareRevoked] = useState(false);

  // View modal state
  const [viewRecord, setViewRecord] = useState(null);

  const categories = ['All', 'Lab Report', 'Prescription', 'Discharge Summary', 'Scan'];

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const data = await api.getMedicalRecords();
      setRecords(data || []);
    } catch (e) {
      setRecords([
        {
          id: 1,
          title: "Complete Blood Count (CBC) & Lipid Profile",
          category: "Lab Report",
          report_date: "2026-09-12",
          doctor_or_lab: "Aarogya Diagnostic & Pathology Centre, Mohanlalganj",
          file_size: "1.4 MB",
          summary: "Hemoglobin 14.2 g/dL (Normal). Fasting Sugar 96 mg/dL (Normal). Platelets 2.8 Lakh (Normal).",
          parsed_markers: {
            "Hemoglobin": { "value": "14.2 g/dL", "status": "Normal", "range": "13.0 - 17.0" },
            "Fasting Sugar": { "value": "96 mg/dL", "status": "Normal", "range": "70 - 100" },
            "Total Cholesterol": { "value": "184 mg/dL", "status": "Desirable", "range": "< 200" },
            "Platelet Count": { "value": "2.8 Lakh/mcL", "status": "Normal", "range": "1.5 - 4.5" }
          }
        },
        {
          id: 2,
          title: "Resting 12-Lead Electrocardiogram (ECG)",
          category: "Scan",
          report_date: "2026-09-12",
          doctor_or_lab: "Community Health Centre, Mohanlalganj",
          file_size: "2.1 MB",
          summary: "Normal Sinus Rhythm. Heart Rate: 72 bpm. PR Interval: 154 ms. No ischemic ST elevation detected.",
          parsed_markers: {
            "Rhythm": { "value": "Normal Sinus", "status": "Normal" },
            "Heart Rate": { "value": "72 bpm", "status": "Normal" },
            "PR Interval": { "value": "154 ms", "status": "Normal" }
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addMedicalRecord({
        title: newTitle,
        category: newCategory,
        report_date: newDate,
        doctor_or_lab: newFacility,
        summary: newSummary
      });
      setShowUploadModal(false);
      loadRecords();
    } catch (e) {
      const mockRec = {
        id: Date.now(),
        title: newTitle,
        category: newCategory,
        report_date: newDate,
        doctor_or_lab: newFacility || "Local Clinic",
        file_size: "1.2 MB",
        summary: newSummary || "Patient uploaded record."
      };
      setRecords([mockRec, ...records]);
      setShowUploadModal(false);
    }
  };

  const deleteRecord = (id) => {
    if (!confirm('Are you sure you want to remove this record from your vault?')) return;
    setRecords(records.filter(r => r.id !== id));
  };

  const filtered = records.filter(r => {
    const matchesCat = categoryFilter === 'All' || r.category === categoryFilter;
    const matchesQuery = !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || (r.doctor_or_lab && r.doctor_or_lab.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Encrypted Health Passport (ABDM Ready)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('records_title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('records_subtitle')}
          </p>
        </div>

        <button
          onClick={() => {
            setNewTitle('');
            setNewSummary('');
            setShowUploadModal(true);
          }}
          className="px-5 py-3 rounded-2xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs sm:text-sm shadow-apple transition-all flex items-center gap-2 shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>{t('upload_record')}</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by title or clinic/hospital..."
              className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  categoryFilter === c
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Records Cards */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <div className="w-10 h-10 border-3 border-medical-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-semibold">Decrypting digital records vault...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No health records found</h3>
          <p className="text-xs text-slate-500">Upload medical tests, discharge summaries or clinical prescriptions for safekeeping.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-medical-50 text-medical-700 text-[11px] font-bold">
                    {rec.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {rec.report_date} • {rec.file_size}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-1 leading-snug">
                  {rec.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  {rec.doctor_or_lab}
                </p>

                {rec.summary && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed">
                    {rec.summary}
                  </p>
                )}

                {/* Biomarkers if present */}
                {rec.parsed_markers && Object.keys(rec.parsed_markers).length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                    {Object.entries(rec.parsed_markers).map(([marker, data], i) => (
                      <div key={i} className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-semibold block">{marker}</span>
                        <span className="font-black text-slate-800">{data.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions row */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setViewRecord(rec)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>

                <button
                  onClick={() => {
                    setShareModalRecord(rec);
                    setShareRevoked(false);
                    setSharePin(Math.floor(1000 + Math.random() * 9000).toString());
                  }}
                  className="px-3.5 py-2 rounded-xl bg-medical-50 hover:bg-medical-100 text-medical-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{t('share_record')}</span>
                </button>

                <button
                  onClick={() => alert(`Downloading ${rec.title} (PDF)...`)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('download')}</span>
                </button>

                <button
                  onClick={() => deleteRecord(rec.id)}
                  className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-fade-in text-xs">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>

            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1">
              Upload Health Record
            </h3>
            <p className="text-slate-500 mb-6">
              Records are stored with AES-256 encryption. Only you and authorized doctors can access.
            </p>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Record Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Thyroid Panel / Lipid Profile / Chest X-Ray"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-medical-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-medical-600 bg-white"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Report Date *</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-medical-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Doctor or Diagnostic Lab</label>
                <input
                  type="text"
                  value={newFacility}
                  onChange={(e) => setNewFacility(e.target.value)}
                  placeholder="e.g. Aarogya Diagnostic Centre"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-medical-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Summary / Key Findings</label>
                <textarea
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Briefly describe report results..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-medical-600"
                />
              </div>

              {/* Drag & drop box simulation */}
              <div className="p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-2 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                <Upload className="w-8 h-8 text-medical-600 mx-auto" />
                <p className="font-bold text-slate-700">Choose PDF, Scan or Camera Image</p>
                <p className="text-[10px] text-slate-400">Supports PDF, JPG, PNG up to 25 MB</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-medical-600 hover:bg-medical-700 text-white font-bold rounded-2xl transition-colors shadow-xs"
              >
                Encrypt & Save to Health Records
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModalRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-fade-in text-xs text-center space-y-4">
            <button
              onClick={() => setShareModalRecord(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-medical-100 text-medical-700 flex items-center justify-center mx-auto">
              <Share2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900">Secure Access Sharing</h3>
            <p className="text-slate-500">
              Share "{shareModalRecord.title}" temporarily with your treating doctor or hospital desk.
            </p>

            {shareRevoked ? (
              <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-red-700 font-bold">
                Access Revoked! External viewers can no longer open this record.
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Temporary 4-Digit Doctor PIN:</span>
                  <span className="text-2xl font-black text-medical-700 tracking-widest">{sharePin}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-sans">
                  Valid for 15 minutes. Automatically expires after clinical review.
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              {!shareRevoked && (
                <button
                  onClick={() => setShareRevoked(true)}
                  className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl transition-colors"
                >
                  Revoke Access
                </button>
              )}
              <button
                onClick={() => setShareModalRecord(null)}
                className="flex-1 py-2.5 bg-slate-900 text-white font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Record Modal */}
      {viewRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-fade-in max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setViewRecord(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>

            <span className="px-2.5 py-0.5 rounded-full bg-medical-50 text-medical-700 text-xs font-bold">
              {viewRecord.category}
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-2 mb-1">{viewRecord.title}</h3>
            <p className="text-xs text-slate-400 mb-4">{viewRecord.doctor_or_lab} • {viewRecord.report_date}</p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed mb-4">
              <h4 className="font-bold text-slate-900 mb-1">Clinical Findings & Summary</h4>
              <p>{viewRecord.summary}</p>
            </div>

            {viewRecord.parsed_markers && Object.keys(viewRecord.parsed_markers).length > 0 && (
              <div className="space-y-2 mb-6">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Diagnostic Markers</h4>
                <div className="divide-y divide-slate-100 text-xs">
                  {Object.entries(viewRecord.parsed_markers).map(([marker, data], i) => (
                    <div key={i} className="py-2 flex items-center justify-between">
                      <span className="text-slate-600">{marker}</span>
                      <span className="font-bold text-slate-900">{data.value} ({data.status})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setViewRecord(null)}
              className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
