import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AlertTriangle, Clock, ArrowRight } from 'lucide-react';

export default function LowStockBanner({ alerts, onFilterLowStock }) {
  const { t, lang } = useLanguage();

  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-4 rounded-xl shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-700 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-amber-900 flex items-center gap-2">
              <span>{t('low_stock_banner_title')}</span>
              <span className="px-2 py-0.5 text-xs font-black bg-amber-200 text-amber-900 rounded-full">
                {alerts.length} {lang === 'hi' ? 'दवाएं' : 'items'}
              </span>
            </h4>
            <p className="text-xs sm:text-sm text-amber-800 mt-0.5">
              {alerts.length} {t('low_stock_banner_desc')}
            </p>
            
            {/* Quick badges of lowest medicines */}
            <div className="flex flex-wrap gap-2 mt-2">
              {alerts.slice(0, 3).map((a) => (
                <span
                  key={a.inventory_id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs"
                >
                  <span className="font-bold text-red-600">{a.brand_name}</span>
                  <span className="text-slate-500">({a.current_stock} left)</span>
                  <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-1 rounded flex items-center gap-0.5">
                    <Clock className="w-3 h-3" /> ~{a.estimated_days_to_stockout}d
                  </span>
                </span>
              ))}
              {alerts.length > 3 && (
                <span className="text-xs font-bold text-amber-800 self-center">
                  +{alerts.length - 3} {lang === 'hi' ? 'और' : 'more'}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onFilterLowStock}
          className="self-start sm:self-center shrink-0 flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all"
        >
          <span>{lang === 'hi' ? 'कम स्टॉक वाली सूची देखें' : 'View Low Stock Items'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
