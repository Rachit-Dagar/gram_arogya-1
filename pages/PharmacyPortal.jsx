import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import LowStockBanner from '../components/LowStockBanner';
import AddMedicineModal from '../components/AddMedicineModal';
import CsvUploadModal from '../components/CsvUploadModal';
import {
  Store, Plus, Upload, Download, Search, AlertTriangle, CheckCircle2,
  Minus, RefreshCw, Lock, Sparkles, Phone, MapPin, ShieldCheck
} from 'lucide-react';

export default function PharmacyPortal({ onOpenLogin }) {
  const { t, lang } = useLanguage();
  const { user, token, login } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isCsvOpen, setIsCsvOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const isPharmacyUser = user && (user.role === 'pharmacy' || user.role === 'admin');

  useEffect(() => {
    if (isPharmacyUser && token) {
      loadInventory();
      loadAlerts();
    }
  }, [isPharmacyUser, token, lowStockOnly]);

  const loadInventory = async () => {
    setLoading(true);
    try {
      const items = await api.getPharmacyInventory(token, {
        lowStockOnly,
        search
      });
      setInventory(items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadAlerts = async () => {
    try {
      const data = await api.getLowStockAlerts(token);
      setAlerts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStockAdjustment = async (item, delta) => {
    const newQty = Math.max(0, item.stock_quantity + delta);
    setUpdatingId(item.id);
    try {
      const updated = await api.updateInventoryItem(token, item.id, {
        stock_quantity: newQty,
        notes: delta < 0 ? 'Retail dispensing counter adjustment (-1)' : 'Restock adjustment (+1)'
      });
      setInventory(prev => prev.map(inv => inv.id === item.id ? updated : inv));
      loadAlerts();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePriceUpdate = async (item, newPrice) => {
    const p = parseFloat(newPrice);
    if (isNaN(p) || p <= 0) return;
    setUpdatingId(item.id);
    try {
      const updated = await api.updateInventoryItem(token, item.id, {
        unit_price: p
      });
      setInventory(prev => prev.map(inv => inv.id === item.id ? updated : inv));
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // If user is not logged in as pharmacy, display pharmacy login screen
  if (!isPharmacyUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          {lang === 'hi' ? 'मेडिकल स्टोर प्रबंधन पोर्टल' : 'Medical Store Management Portal'}
        </h2>
        <p className="mt-2 text-xs sm:text-base text-slate-600 max-w-xl mx-auto">
          {lang === 'hi'
            ? 'इस पोर्टल का उपयोग करने के लिए कृपया अपने मेडिकल स्टोर खाते से लॉगिन करें। परीक्षण के लिए नीचे 1-क्लिक डेमो खाता चुनें।'
            : 'Log in with your registered pharmacy account to manage your live medicine inventory, edit stock counters, and sync spreadsheets.'}
        </p>

        {/* Quick 1-Click Login buttons for demo pharmacies */}
        <div className="mt-8 max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => login('9810011001', 'pharmacy123')}
            className="p-4 bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl shadow-xs hover:shadow-md transition-all text-left group"
          >
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 text-emerald-800 mb-1">
              Pharmacy 1 (Private)
            </span>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700">
              Gupta Medical & General
            </h4>
            <p className="text-xs text-slate-500">Ramesh Gupta (Mohanlalganj)</p>
          </button>

          <button
            onClick={() => login('9810022002', 'pharmacy123')}
            className="p-4 bg-white border border-slate-200 hover:border-sky-500 rounded-2xl shadow-xs hover:shadow-md transition-all text-left group"
          >
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-md bg-sky-100 text-sky-800 mb-1">
              Pharmacy 2 (Generic)
            </span>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-sky-700">
              Jan Aushadhi Kendra
            </h4>
            <p className="text-xs text-slate-500">Pradeep Kumar (Tehsil HQ)</p>
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={onOpenLogin}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md inline-flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>{t('login')}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Store Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-arogya-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-white/20 text-white text-xs font-bold rounded-full">
                {user.store_name ? 'Registered Medical Store' : 'Pharmacy Admin'}
              </span>
              <span className="flex items-center gap-1 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> License Verified
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
              {user.store_name || user.full_name}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 flex items-center gap-2">
              <span>{user.full_name}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> {user.phone}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAddOpen(true)}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{t('add_medicine')}</span>
            </button>

            <button
              onClick={() => setIsCsvOpen(true)}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold rounded-xl border border-white/30 flex items-center gap-1.5 transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>{t('bulk_csv_upload')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Proactive Low Stock Warning Banner */}
      <LowStockBanner
        alerts={alerts}
        onFilterLowStock={() => setLowStockOnly(prev => !prev)}
      />

      {/* Inventory Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {t('current_inventory')}
            </h3>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
              {inventory.length} {lang === 'hi' ? 'दवाएं' : 'items'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Search in Inventory */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadInventory()}
                placeholder={t('search_inventory')}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:ring-1 focus:ring-arogya-500 focus:outline-hidden"
              />
            </div>

            {/* Low Stock Toggle */}
            <button
              onClick={() => setLowStockOnly(!lowStockOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                lowStockOnly
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'hi' ? 'केवल कम स्टॉक' : 'Low Stock Only'}</span>
            </button>

            {/* Refresh */}
            <button
              onClick={loadInventory}
              title="Refresh inventory"
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">{t('col_medicine')}</th>
                <th className="py-3 px-3">{t('col_category')}</th>
                <th className="py-3 px-4">{t('col_stock')}</th>
                <th className="py-3 px-4">{t('col_price')}</th>
                <th className="py-3 px-3">{t('col_status')}</th>
                <th className="py-3 px-4 text-right">{t('col_actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {inventory.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    {loading
                      ? 'Loading inventory...'
                      : (lang === 'hi' ? 'कोई दवा नहीं मिली।' : 'No medicines found.')}
                  </td>
                </tr>
              ) : (
                inventory.map((item) => {
                  const isLow = item.stock_quantity <= item.min_threshold;
                  const isOut = item.stock_quantity === 0;

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isLow ? 'bg-amber-50/30' : ''
                      }`}
                    >
                      {/* Medicine Details */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{item.brand_name}</span>
                          <span className="text-xs font-semibold text-slate-500">
                            ({item.strength})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{item.generic_name}</p>
                        {item.batch_number && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            B: {item.batch_number} • Exp: {item.expiry_date || 'N/A'}
                          </span>
                        )}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-slate-100 text-slate-700">
                          {item.category || 'General'}
                        </span>
                      </td>

                      {/* Stock Quantity */}
                      <td className="py-3 px-4">
                        <span className={`text-base font-black ${
                          isOut ? 'text-red-600' : isLow ? 'text-amber-700' : 'text-slate-900'
                        }`}>
                          {item.stock_quantity}
                        </span>
                        <span className="text-xs text-slate-400 ml-1">units</span>
                        <p className="text-[10px] text-slate-400">
                          Min safety: {item.min_threshold}
                        </p>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-400">₹</span>
                          <input
                            type="number"
                            step="0.5"
                            defaultValue={item.unit_price}
                            onBlur={(e) => handlePriceUpdate(item, e.target.value)}
                            className="w-16 p-1 text-xs font-bold border border-slate-300 rounded-md focus:ring-1 focus:ring-arogya-500"
                          />
                        </div>
                        <span className="text-[10px] text-slate-400">
                          MRP: ₹{item.mrp.toFixed(2)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        {isOut ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-red-100 text-red-800">
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-amber-100 text-amber-800">
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                            Ample Stock
                          </span>
                        )}
                      </td>

                      {/* Instant Retail Dispensing Counter Controls (+ / -) */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                          {/* Dispense 1 (-1) */}
                          <button
                            onClick={() => handleStockAdjustment(item, -1)}
                            disabled={item.stock_quantity <= 0 || updatingId === item.id}
                            title={t('dispense_one')}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 disabled:opacity-30 font-black flex items-center justify-center shadow-2xs active:scale-95 transition-all"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <span className="w-10 text-center font-black text-xs text-slate-800">
                            {item.stock_quantity}
                          </span>

                          {/* Restock 1 (+1) */}
                          <button
                            onClick={() => handleStockAdjustment(item, 1)}
                            disabled={updatingId === item.id}
                            title={t('restock_one')}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-black flex items-center justify-center shadow-2xs active:scale-95 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddMedicineModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={() => {
          loadInventory();
          loadAlerts();
        }}
      />

      <CsvUploadModal
        isOpen={isCsvOpen}
        onClose={() => setIsCsvOpen(false)}
        onUploadSuccess={() => {
          loadInventory();
          loadAlerts();
        }}
      />
    </div>
  );
}
