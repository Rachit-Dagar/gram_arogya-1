import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, 
  Stethoscope, 
  Building2, 
  Pill, 
  Droplet, 
  FileText, 
  Sparkles, 
  Activity, 
  Landmark, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Heart, 
  MapPin, 
  PhoneCall, 
  Clock, 
  Users, 
  ShieldAlert,
  Zap,
  Sparkle
} from 'lucide-react';

export default function Home({ onNavigate }) {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const searchExamples = [
    { label: lang === 'hi' ? 'कार्डियोलॉजिस्ट खोजें' : 'Find a cardiologist near me', action: () => onNavigate('doctors', { specialty: 'Cardiology' }) },
    { label: lang === 'hi' ? '24x7 आपातकालीन अस्पताल' : 'Hospitals with emergency services', action: () => onNavigate('hospitals', { emergencyOnly: true }) },
    { label: lang === 'hi' ? 'दवा उपलब्धता चेक करें' : 'Check medicine availability', action: () => onNavigate('medicines') },
    { label: lang === 'hi' ? 'ब्लड बैंक खोजें' : 'Find blood banks', action: () => onNavigate('blood-banks') },
    { label: lang === 'hi' ? 'परचा समझें' : 'Understand prescription', action: () => onNavigate('prescription') },
    { label: lang === 'hi' ? 'लक्षण जांचें' : 'Check symptoms with AI', action: () => onNavigate('ai-assistant') },
  ];

  const handleNaturalSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('doctor') || q.includes('cardiologist') || q.includes('specialist') || q.includes('डॉक्टर')) {
      onNavigate('doctors', { query: searchQuery });
    } else if (q.includes('hospital') || q.includes('emergency') || q.includes('clinic') || q.includes('अस्पताल')) {
      onNavigate('hospitals', { query: searchQuery });
    } else if (q.includes('medicine') || q.includes('dolo') || q.includes('paracetamol') || q.includes('दवा')) {
      onNavigate('medicines', { query: searchQuery });
    } else if (q.includes('blood') || q.includes('रक्त') || q.includes('खून')) {
      onNavigate('blood-banks');
    } else if (q.includes('prescription') || q.includes('परचा')) {
      onNavigate('prescription');
    } else {
      onNavigate('find-care', { query: searchQuery });
    }
  };

  const featurePillars = [
    {
      id: 'find-care',
      title: lang === 'hi' ? 'स्वास्थ्य सेवा खोज' : 'Find Care Near You',
      desc: lang === 'hi' ? 'अस्पताल, क्लिनिक, पीएचसी व पैथोलॉजी लैब' : 'Verified hospitals, clinics, PHCs & diagnostic labs',
      icon: Search,
      color: 'bg-medical-50 text-medical-600 border-medical-200',
      action: () => onNavigate('find-care')
    },
    {
      id: 'doctors',
      title: lang === 'hi' ? 'विशेषज्ञ डॉक्टर' : 'Verified Doctors',
      desc: lang === 'hi' ? 'क्लिनिक में प्रत्यक्ष या ऑनलाइन वीडियो परामर्श' : 'In-person visits & online video tele-consultations',
      icon: Stethoscope,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      action: () => onNavigate('doctors')
    },
    {
      id: 'medicines',
      title: lang === 'hi' ? 'दवा उपलब्धता नेटवर्क' : 'Medicine Store Network',
      desc: lang === 'hi' ? 'स्थानीय मेडिकल स्टोर व जन औषधि केंद्र लाइव स्टॉक' : 'Live stock across local chemists & Jan Aushadhi Kendras',
      icon: Pill,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      action: () => onNavigate('medicines')
    },
    {
      id: 'prescription',
      title: lang === 'hi' ? 'परचा समझें' : 'Prescription Simplifier',
      desc: lang === 'hi' ? 'दवा का समय, खुराक व भोजन का सही नियम' : 'Understand dosages (1-0-1), timings, and safe usage',
      icon: FileText,
      color: 'bg-sky-50 text-sky-600 border-sky-200',
      action: () => onNavigate('prescription')
    },
    {
      id: 'ai-assistant',
      title: lang === 'hi' ? 'ग्राम आरोग्य एआई' : 'Gram Aarogya AI & Triage',
      desc: lang === 'hi' ? 'लक्षण जांच व प्राथमिक स्वास्थ्य मार्गदर्शन' : 'Conversational health guidance & clinical symptom triage',
      icon: Sparkles,
      color: 'bg-violet-50 text-violet-600 border-violet-200',
      action: () => onNavigate('ai-assistant')
    },
    {
      id: 'blood-banks',
      title: lang === 'hi' ? 'ब्लड बैंक उपलब्धता' : 'Blood Bank Finder',
      desc: lang === 'hi' ? 'सभी 8 रक्त समूहों का तत्काल लाइव स्टॉक' : 'Real-time blood group availability (A+, B+, O+, AB+)',
      icon: Droplet,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
      action: () => onNavigate('blood-banks')
    },
    {
      id: 'vitals',
      title: lang === 'hi' ? 'स्वास्थ्य निगरानी' : 'Connected Health Vitals',
      desc: lang === 'hi' ? 'रक्तचाप, पल्स, ऑक्सीजन व शुगर ट्रैकिंग' : 'Track blood pressure, heart rate, SpO2 & glucose trends',
      icon: Activity,
      color: 'bg-teal-50 text-teal-600 border-teal-200',
      action: () => onNavigate('vitals')
    },
    {
      id: 'government',
      title: lang === 'hi' ? 'सरकारी स्वास्थ्य सेवाएं' : 'Government Health Services',
      desc: lang === 'hi' ? 'आभा (ABHA), आयुष्मान भारत व ई-संजीवनी' : 'Access ABHA ID, ABDM, eSanjeevani & PM-JAY portals',
      icon: Landmark,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      action: () => onNavigate('government')
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section — Apple Inspired Aesthetic */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Subtitle Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-medical-50 border border-medical-200 text-medical-800 text-xs sm:text-sm font-bold mb-8 shadow-xs">
            <Sparkle className="w-4 h-4 text-medical-600" />
            <span>{lang === 'hi' ? 'प्रत्येक समुदाय के लिए स्वास्थ्य सेवा' : 'Universal Connected Healthcare for Every Community'}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
            {t('hero_title')}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            {t('hero_desc')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-14">
            <button
              onClick={() => onNavigate('find-care')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm sm:text-base shadow-apple hover:shadow-apple-hover transition-all flex items-center justify-center gap-2"
            >
              <span>{t('cta_find_care')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('ai-assistant')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-medical-600" />
              <span>{t('cta_talk_ai')}</span>
            </button>
          </div>

          {/* Healthcare Discovery Search Module */}
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-3 sm:p-4 shadow-apple border border-slate-200/80">
            <form onSubmit={handleNaturalSearch} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center gap-3 w-full px-4 py-2">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'hi' ? 'आप क्या खोज रहे हैं? (उदा. कार्डियोलॉजिस्ट, अस्पताल, Dolo 650, ब्लड बैंक)...' : 'How can we help you today? (e.g. Cardiologist near me, ICU hospital, Dolo 650)...'}
                  className="w-full text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors shrink-0"
              >
                {lang === 'hi' ? 'खोजें' : 'Search'}
              </button>
            </form>

            {/* Quick search chips */}
            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-600">
              <span className="font-semibold text-slate-400 mr-1">{t('search_examples_label')}</span>
              {searchExamples.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={ex.action}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-medical-50 hover:text-medical-700 transition-colors"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-medical-100/40 rounded-full blur-3xl pointer-events-none -z-0"></div>
      </section>

      {/* Universal India Coverage Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <span className="px-3 py-1 rounded-full bg-medical-500/20 text-medical-300 text-xs font-bold uppercase tracking-wider border border-medical-500/30 inline-block mb-3">
              {lang === 'hi' ? 'राष्ट्रीय स्वास्थ्य नेटवर्क' : 'National Health Platform'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
              {lang === 'hi' ? 'महानगरों से लेकर ग्रामीण तहसीलों तक।' : 'From Metro Hubs to Rural Tehsils.'}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-6">
              {lang === 'hi' 
                ? 'बेंगलुरु, मुंबई, दिल्ली और पुणे के शीर्ष सुपर-स्पेशियलिटी अस्पतालों से लेकर मोहनलालगंज के सामुदायिक स्वास्थ्य केंद्रों (CHC/PHC) और जन औषधि मेडिकल स्टोर्स तक — सब एक जुड़े हुए प्लेटफॉर्म पर।'
                : 'Equally empowering super-speciality medical centers in Bengaluru, Mumbai, Delhi, and Pune, as well as Community Health Centres (CHCs/PHCs) and subsidized Jan Aushadhi chemist stores in Mohanlalganj and beyond.'
              }
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs sm:text-sm font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>AIIMS / SGPGIMS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Manipal & Fortis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Jan Aushadhi Kendras</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Tehsil Red Cross</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 bg-medical-500/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>
      </section>

      {/* Feature Navigation Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            {lang === 'hi' ? 'पूर्ण स्वास्थ्य सेवा समाधान' : 'Connected Healthcare Modules'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {lang === 'hi' ? 'आपकी हर स्वास्थ्य आवश्यकता के लिए एकीकृत डिजिटल सेवाएं' : 'Everything you need to navigate, track, and receive trusted clinical care'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featurePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={pillar.action}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${pillar.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1 group-hover:text-medical-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-medical-600">
                  <span>{lang === 'hi' ? 'खोलें' : 'Explore'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 24x7 Emergency Shortcut Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-50 via-rose-50 to-amber-50 rounded-3xl p-6 sm:p-8 border border-red-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-600/20">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {lang === 'hi' ? 'आपातकालीन सहायता की आवश्यकता है?' : 'Need Immediate Emergency Help?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {lang === 'hi' ? '24x7 निःशुल्क एम्बुलेंस (108), निकटतम आईसीयू अस्पताल और ब्लड बैंक खोजें।' : 'Instant 24x7 ambulance dispatch (108/112), nearest ICU trauma centers, and blood locator.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="tel:108"
              className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 108</span>
            </a>
            <button
              onClick={() => onNavigate('emergency')}
              className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-xs sm:text-sm transition-colors"
            >
              {lang === 'hi' ? 'इमरजेंसी मोड' : 'Emergency Mode'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
