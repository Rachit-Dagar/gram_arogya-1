import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { LogIn, Lock, Phone, UserCheck, X, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const { t, lang } = useLanguage();
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  if (!isOpen) return null;

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await login(username, password);
      onClose();
    } catch (err) {
      setLocalError(err.message || 'Login failed');
    }
  };

  const handleDemoLogin = async (phone, pwd) => {
    setLocalError(null);
    try {
      await login(phone, pwd);
      onClose();
    } catch (err) {
      setLocalError(err.message || 'Login failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <LogIn className="w-5 h-5 text-arogya-700" />
            <span>{t('login')}</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Tap Demo Roles */}
        <div className="mt-4 p-3.5 bg-gradient-to-br from-arogya-50 to-emerald-50 border border-arogya-200 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-black text-arogya-900 mb-2">
            <Sparkles className="w-4 h-4 text-arogya-600" />
            <span>{lang === 'hi' ? '1-क्लिक डेमो लॉगिन (तुरंत परीक्षण हेतु):' : '1-Click Quick Demo Login:'}</span>
          </div>
          <div className="space-y-1.5">
            {DEMO_USERS.map((u) => (
              <button
                key={u.phone}
                onClick={() => handleDemoLogin(u.phone, u.password)}
                className="w-full text-left px-3 py-2 bg-white hover:bg-arogya-100/60 border border-slate-200 hover:border-arogya-300 rounded-lg text-xs font-semibold text-slate-800 flex items-center justify-between transition-all shadow-2xs"
              >
                <div>
                  <span className="font-bold">{u.name}</span>
                  <p className="text-[11px] text-slate-500">{u.roleLabel}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${u.badgeColor}`}>
                  {u.role}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-bold">
              {lang === 'hi' ? 'या मोबाइल नंबर से लॉगिन करें' : 'Or enter credentials'}
            </span>
          </div>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleManualLogin} className="space-y-3">
          {(error || localError) && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{localError || error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === 'hi' ? 'मोबाइल नंबर या ईमेल:' : 'Mobile Number or Email:'}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. 9810011001"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-arogya-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === 'hi' ? 'पासवर्ड:' : 'Password:'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-arogya-500 focus:outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 bg-arogya-700 hover:bg-arogya-800 disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading && <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />}
            <span>{t('login')}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
