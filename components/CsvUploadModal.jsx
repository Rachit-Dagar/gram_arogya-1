import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { UploadCloud, FileText, Download, CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function CsvUploadModal({ isOpen, onClose, onUploadSuccess }) {
  const { t, lang } = useLanguage();
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError(lang === 'hi' ? 'कृपया पहले एक CSV फ़ाइल चुनें।' : 'Please select a CSV file first.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await api.uploadCsv(token, file);
      setResult(data);
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <UploadCloud className="w-6 h-6 text-arogya-600" />
            <span>{t('csv_modal_title')}</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mt-3">
          {t('csv_modal_desc')}
        </p>

        {/* Download sample CSV template */}
        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <FileText className="w-4 h-4 text-slate-500" />
            <span>{lang === 'hi' ? 'मानक CSV एक्सेल फॉर्मेट' : 'Standard Inventory CSV Format'}</span>
          </div>
          <a
            href="/api/pharmacy/template"
            download
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-bold text-arogya-700 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('download_template')}</span>
          </a>
        </div>

        {/* File Drop Area */}
        <div className="mt-4">
          <label className="border-2 border-dashed border-slate-300 hover:border-arogya-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-arogya-50/50 transition-colors">
            <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
            <span className="text-xs sm:text-sm font-semibold text-slate-700 text-center">
              {file ? file.name : t('drag_drop_csv')}
            </span>
            <span className="text-[11px] text-slate-400 mt-1">.csv (Comma Separated Values)</span>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Errors */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900">
            <div className="flex items-center gap-2 font-bold mb-2 text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{t('upload_success')} {result.total_processed}</span>
            </div>
            <ul className="space-y-1 ml-7 text-xs font-medium text-emerald-800">
              <li>• {t('records_updated')} <strong>{result.updated_count}</strong></li>
              <li>• {t('records_created')} <strong>{result.inserted_count}</strong></li>
            </ul>
            {result.errors.length > 0 && (
              <div className="mt-2 text-xs text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                <p className="font-bold">Warnings:</p>
                {result.errors.map((err, i) => (
                  <p key={i}>• {err}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            {t('close')}
          </button>
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="px-5 py-2 bg-arogya-700 hover:bg-arogya-800 disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md flex items-center gap-2 transition-all"
          >
            {loading && <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />}
            <span>{loading ? t('uploading') : t('upload_btn')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
