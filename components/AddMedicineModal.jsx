import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { PlusCircle, Search, Check, AlertCircle, X } from 'lucide-react';

export default function AddMedicineModal({ isOpen, onClose, onAdded }) {
  const { t, lang } = useLanguage();
  const { token } = useAuth();
  const [query, setQuery] = useState('');
  const [catalog, setCatalog] = useState([]);
  const [selectedMed, setSelectedMed] = useState(null);
  const [stockQty, setStockQty] = useState(50);
  const [unitPrice, setUnitPrice] = useState(25.0);
  const [mrp, setMrp] = useState(30.0);
  const [threshold, setThreshold] = useState(15);
  const [batchNo, setBatchNo] = useState('');
  const [expiry, setExpiry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadCatalog();
    }
  }, [isOpen]);

  const loadCatalog = async () => {
    try {
      const res = await api.searchMedicines('', '');
      setCatalog(res);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  const filtered = catalog.filter(m =>
    m.brand_name.toLowerCase().includes(query.toLowerCase()) ||
    m.generic_name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMed) {
      setError(lang === 'hi' ? 'कृपया सूची से एक दवा चुनें।' : 'Please select a medicine from the list.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await api.addInventoryItem(token, {
        medicine_id: selectedMed.id,
        stock_quantity: parseInt(stockQty),
        unit_price: parseFloat(unitPrice),
        mrp: parseFloat(mrp),
        min_threshold: parseInt(threshold),
        batch_number: batchNo || undefined,
        expiry_date: expiry || undefined
      });
      if (onAdded) onAdded();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to add medicine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <PlusCircle className="w-6 h-6 text-arogya-600" />
            <span>{t('add_medicine')}</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pt-4 space-y-4 pr-1">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Select Medicine from Master */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === 'hi' ? '1. मास्टर सूची से दवा चुनें:' : '1. Select Medicine from Master Catalog:'}
            </label>
            <div className="relative mb-2">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === 'hi' ? 'दवा का नाम खोजें...' : 'Search medicine name...'}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-arogya-500 focus:outline-hidden"
              />
            </div>

            <div className="border border-slate-200 rounded-xl max-h-40 overflow-y-auto divide-y divide-slate-100">
              {filtered.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMed(m)}
                  className={`p-2.5 text-xs cursor-pointer flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    selectedMed?.id === m.id ? 'bg-arogya-50 font-bold text-arogya-900' : 'text-slate-700'
                  }`}
                >
                  <div>
                    <span className="font-bold">{m.brand_name}</span>
                    <span className="text-slate-500 ml-1.5">({m.strength}, {m.dosage_form})</span>
                    <p className="text-[11px] text-slate-400">{m.generic_name}</p>
                  </div>
                  {selectedMed?.id === m.id && (
                    <Check className="w-4 h-4 text-arogya-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 2. Stock and Pricing Details */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'hi' ? 'आरंभिक स्टॉक मात्रा:' : 'Initial Stock Quantity:'}
              </label>
              <input
                type="number"
                min="0"
                value={stockQty}
                onChange={(e) => setStockQty(e.target.value)}
                required
                className="w-full p-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-arogya-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'hi' ? 'न्यूनतम सुरक्षा सीमा (Threshold):' : 'Low Stock Threshold:'}
              </label>
              <input
                type="number"
                min="1"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                required
                className="w-full p-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-arogya-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'hi' ? 'आपका विक्रय मूल्य (₹):' : 'Selling Price (₹):'}
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                required
                className="w-full p-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-arogya-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'hi' ? 'अधिकतम खुदरा मूल्य MRP (₹):' : 'MRP (₹):'}
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                required
                className="w-full p-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-arogya-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'hi' ? 'बैच नंबर (वैकल्पिक):' : 'Batch No (Optional):'}
              </label>
              <input
                type="text"
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
                placeholder="e.g. BTH-2024"
                className="w-full p-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-arogya-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'hi' ? 'समाप्ति तिथि (MM/YY):' : 'Expiry (MM/YY):'}
              </label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="12/2026"
                className="w-full p-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-arogya-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              {t('close')}
            </button>
            <button
              type="submit"
              disabled={loading || !selectedMed}
              className="px-5 py-2 bg-arogya-700 hover:bg-arogya-800 disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              {loading && <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />}
              <span>{t('add_medicine')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
