import React, { useState, useEffect } from 'react';
import { WifiOff, PhoneCall, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showDrawer, setShowDrawer] = useState(false);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Pre-cache emergency numbers and local guidelines in localStorage
    const emergencyCache = {
      ambulance: "108",
      national_emergency: "112",
      janani_seva: "102",
      blood_helpline: "104",
      nearest_trauma: "Community Health Centre & Sub-District Hospital, Mohanlalganj",
      instructions: "In offline mode, emergency helpline numbers remain directly callable via mobile dialer."
    };
    try {
      localStorage.setItem('gram_arogya_offline_cache', JSON.stringify(emergencyCache));
    } catch (e) {
      console.warn("Storage quota warning", e);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-50 max-w-md animate-fade-in">
      <div className="bg-amber-900/90 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-amber-700/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-800 flex items-center justify-center text-amber-200">
            <WifiOff className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold leading-tight">
              {lang === 'hi' ? 'आप अभी ऑफलाइन हैं' : lang === 'mr' ? 'तुम्ही ऑफलाइन आहात' : lang === 'kn' ? 'ನೀವು ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ' : 'You are currently offline'}
            </p>
            <p className="text-[11px] text-amber-200/90 leading-tight">
              {lang === 'hi' ? 'आपातकालीन सहायता व सुरक्षित जानकारी उपलब्ध है' : 'Cached emergency contacts & appointments available'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDrawer(true)}
          className="px-2.5 py-1 text-xs font-bold bg-white text-amber-950 rounded-lg hover:bg-amber-100 transition-colors shrink-0"
        >
          {lang === 'hi' ? 'देखें' : 'View'}
        </button>
      </div>

      {showDrawer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-slate-900 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4 text-amber-600">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-bold text-base">Offline Emergency Vault</h3>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Real-time server sync is paused due to poor network connectivity. You can still access these vital cached contacts:
            </p>

            <div className="space-y-2 mb-6 text-sm">
              <a href="tel:108" className="flex items-center justify-between p-3 bg-red-50 text-red-700 font-bold rounded-xl border border-red-200">
                <span className="flex items-center gap-2"><PhoneCall className="w-4 h-4" /> 108 Ambulance</span>
                <span className="text-xs">Toll-Free</span>
              </a>
              <a href="tel:112" className="flex items-center justify-between p-3 bg-slate-100 text-slate-800 font-bold rounded-xl border border-slate-200">
                <span className="flex items-center gap-2"><PhoneCall className="w-4 h-4" /> 112 National Helpline</span>
                <span className="text-xs">24x7</span>
              </a>
              <a href="tel:102" className="flex items-center justify-between p-3 bg-emerald-50 text-emerald-800 font-bold rounded-xl border border-emerald-200">
                <span className="flex items-center gap-2"><PhoneCall className="w-4 h-4" /> 102 Janani Shishu Seva</span>
                <span className="text-xs">Maternal</span>
              </a>
            </div>

            <button
              onClick={() => setShowDrawer(false)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
