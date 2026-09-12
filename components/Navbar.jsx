import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { 
  Heart, 
  Globe, 
  PhoneCall, 
  UserCheck, 
  LogOut, 
  Search, 
  Stethoscope, 
  Building2, 
  Calendar, 
  FileText, 
  Pill, 
  Droplet, 
  Sparkles, 
  Apple, 
  Landmark, 
  ShieldAlert,
  Bell,
  Menu,
  X,
  Activity,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenLogin }) {
  const { lang, setLang, t } = useLanguage();
  const { user, logout, login } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  const navLinks = [
    { id: 'home', label: t('nav_home'), icon: Heart },
    { id: 'find-care', label: t('nav_find_care'), icon: Search },
    { id: 'doctors', label: t('nav_doctors'), icon: Stethoscope },
    { id: 'hospitals', label: t('nav_hospitals'), icon: Building2 },
    { id: 'appointments', label: t('nav_appointments'), icon: Calendar },
    { id: 'records', label: t('nav_records'), icon: FileText },
    { id: 'medicines', label: t('nav_medicines'), icon: Pill },
    { id: 'blood-banks', label: t('nav_blood_banks'), icon: Droplet },
    { id: 'ai-assistant', label: t('nav_ai'), icon: Sparkles },
    { id: 'nutrition', label: t('nav_nutrition'), icon: Apple },
    { id: 'government', label: t('nav_govt'), icon: Landmark },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* 24x7 Universal Emergency Helpline Top Bar */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-xs font-semibold py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="tracking-wide">
              {lang === 'hi' ? '24x7 राष्ट्रीय आपातकालीन स्वास्थ्य सेवा:' : '24x7 National Emergency Health Line:'}
            </span>
            <a href="tel:108" className="underline font-black hover:text-red-100 flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> 108 (Ambulance)
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="tel:112" className="underline font-black hover:text-red-100 hidden sm:inline">
              112 (Police & Emergency)
            </a>
            <span className="hidden md:inline">|</span>
            <a href="tel:102" className="underline font-black hover:text-red-100 hidden md:inline">
              102 (Janani Seva)
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('emergency')}
              className="px-2.5 py-0.5 rounded-full bg-white text-red-700 hover:bg-red-50 text-[11px] font-black uppercase tracking-wider transition-all shadow-xs flex items-center gap-1"
            >
              <ShieldAlert className="w-3 h-3 text-red-600" />
              {t('cta_emergency')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-medical-600 to-arogya-600 flex items-center justify-center text-white shadow-md shadow-medical-600/20 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  {lang === 'en' ? 'Gram Aarogya' : 'ग्राम आरोग्य'}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-medical-50 text-medical-700 border border-medical-200">
                  {lang === 'hi' ? 'स्वास्थ्य मंच' : 'India Care'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/80">
            {navLinks.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-medical-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-medical-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* More dropdown for remaining links */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-white/50 flex items-center gap-1">
                <span>{lang === 'hi' ? 'अधिक...' : 'More'}</span>
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 hidden group-hover:block z-50">
                {navLinks.slice(7).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 ${
                        activeTab === item.id ? 'bg-medical-50 text-medical-800 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-medical-600" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Right Controls: Language, Notifications & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Patient Dashboard Button */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-medical-600 text-white border-medical-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}</span>
            </button>

            {/* 4-Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-medical-600" />
                <span>{currentLangObj.native}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase px-3 py-1.5">
                    Select Language / भाषा
                  </p>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-xl flex items-center justify-between transition-colors ${
                        lang === l.code ? 'bg-medical-50 text-medical-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] text-slate-400 uppercase">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-medical-500"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">{t('notifications')}</span>
                    <span className="text-[10px] font-semibold text-medical-600">2 New</span>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="py-2.5">
                      <p className="font-semibold text-slate-800">Appointment Confirmed</p>
                      <p className="text-slate-500 text-[11px]">Dr. Arvind Sharma (Tomorrow, 10:30 AM)</p>
                    </div>
                    <div className="py-2.5">
                      <p className="font-semibold text-slate-800">Medicine In-Stock Alert</p>
                      <p className="text-slate-500 text-[11px]">Augmentin 625 available at Jan Aushadhi Kendra</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Role Switcher */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-200/70 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-medical-600" />
                  <span className="max-w-[90px] sm:max-w-[120px] truncate">{user.full_name}</span>
                </button>

                {showRoleMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Current Session</p>
                      <p className="text-xs font-bold text-slate-800">{user.full_name}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-medical-50 text-medical-800">
                        {user.role.toUpperCase()}
                      </span>
                    </div>

                    <div className="py-2">
                      <p className="text-[10px] text-slate-400 px-3 pb-1 font-bold uppercase">Quick Demo Persona</p>
                      {DEMO_USERS.map((u) => (
                        <button
                          key={u.phone}
                          onClick={async () => {
                            await login(u.phone, u.password);
                            setShowRoleMenu(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs rounded-xl hover:bg-slate-50 flex items-center justify-between ${
                            user.phone === u.phone ? 'bg-slate-100 font-bold' : ''
                          }`}
                        >
                          <span className="truncate">{u.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${u.badgeColor}`}>
                            {u.role}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout();
                          setShowRoleMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
              >
                {t('login')}
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-1 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold ${
                    activeTab === item.id ? 'bg-medical-50 text-medical-800' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-medical-600 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile Bottom Quick Navigation (Apple-style thumb bar) */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around text-[10px] font-bold text-slate-600 shadow-lg">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'home' ? 'text-medical-600' : ''}`}
        >
          <Heart className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button 
          onClick={() => setActiveTab('find-care')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'find-care' ? 'text-medical-600' : ''}`}
        >
          <Search className="w-5 h-5" />
          <span>Find Care</span>
        </button>

        <button 
          onClick={() => setActiveTab('appointments')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'appointments' ? 'text-medical-600' : ''}`}
        >
          <Calendar className="w-5 h-5" />
          <span>Bookings</span>
        </button>

        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'dashboard' ? 'text-medical-600' : ''}`}
        >
          <Activity className="w-5 h-5" />
          <span>Health</span>
        </button>

        <button 
          onClick={() => setActiveTab('emergency')}
          className={`flex flex-col items-center gap-0.5 text-red-600 ${activeTab === 'emergency' ? 'font-black' : ''}`}
        >
          <ShieldAlert className="w-5 h-5" />
          <span>108 SOS</span>
        </button>
      </div>
    </header>
  );
}
