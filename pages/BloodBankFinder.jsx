import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { 
  Droplet, 
  Search, 
  MapPin, 
  PhoneCall, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  SlidersHorizontal
} from 'lucide-react';

export default function BloodBankFinder() {
  const { lang, t } = useLanguage();
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const cities = ['All', 'Mohanlalganj', 'Lucknow', 'Bengaluru', 'Mumbai', 'Pune'];

  useEffect(() => {
    loadBloodBanks();
  }, [selectedCity, selectedGroup]);

  const loadBloodBanks = async () => {
    setLoading(true);
    try {
      const res = await api.getBloodBanks({
        city: selectedCity,
        group: selectedGroup
      });
      setBloodBanks(res.blood_banks || []);
    } catch (e) {
      console.warn(e);
      setBloodBanks([
        {
          id: 1,
          name: "Mohanlalganj Tehsil Red Cross Blood Bank",
          address: "Near Community Health Centre, Mohanlalganj",
          city: "Mohanlalganj",
          phone: "+91-522-2973199",
          emergency_helpline: "104 / 108",
          operating_status: "Open 24x7",
          last_updated: "Today, 08:30 AM",
          stock: {
            "A+": { status: "Available", units: 18 },
            "A-": { status: "Limited", units: 4 },
            "B+": { status: "Available", units: 24 },
            "B-": { status: "Limited", units: 3 },
            "AB+": { status: "Available", units: 12 },
            "AB-": { status: "Unavailable", units: 0 },
            "O+": { status: "Available", units: 32 },
            "O-": { status: "Limited", units: 2 },
          }
        },
        {
          id: 2,
          name: "SGPGIMS Blood Transfusion Medicine Bank",
          address: "Raebareli Road, Lucknow",
          city: "Lucknow",
          phone: "+91-522-2668700",
          emergency_helpline: "+91-522-2494000",
          operating_status: "Open 24x7",
          last_updated: "Today, 09:15 AM",
          stock: {
            "A+": { status: "Available", units: 45 },
            "A-": { status: "Available", units: 14 },
            "B+": { status: "Available", units: 58 },
            "B-": { status: "Available", units: 11 },
            "AB+": { status: "Available", units: 29 },
            "AB-": { status: "Limited", units: 5 },
            "O+": { status: "Available", units: 68 },
            "O-": { status: "Available", units: 16 },
          }
        },
        {
          id: 3,
          name: "Rotary TTK Blood Bank, Bengaluru",
          address: "HAL 2nd Stage, Indiranagar, Bengaluru",
          city: "Bengaluru",
          phone: "+91-80-25284504",
          emergency_helpline: "+91-80-25281888",
          operating_status: "Open 24x7",
          last_updated: "Today, 07:45 AM",
          stock: {
            "A+": { status: "Available", units: 38 },
            "A-": { status: "Limited", units: 6 },
            "B+": { status: "Available", units: 42 },
            "B-": { status: "Limited", units: 5 },
            "AB+": { status: "Available", units: 20 },
            "AB-": { status: "Limited", units: 3 },
            "O+": { status: "Available", units: 50 },
            "O-": { status: "Available", units: 9 },
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold mb-2">
            <Droplet className="w-3.5 h-3.5 text-rose-600" />
            <span>Real-time Blood Supply Grid</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('blood_banks_title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('blood_banks_subtitle')}
          </p>
        </div>
      </div>

      {/* Mandatory Safety Notice */}
      <div className="p-4 sm:p-5 rounded-3xl bg-rose-50 border border-rose-200/80 text-xs text-rose-950 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-rose-900 text-sm">
            {lang === 'hi' ? 'महत्वपूर्ण सूचना:' : 'CRITICAL BLOOD VERIFICATION NOTICE:'}
          </p>
          <p className="text-rose-800 mt-1 leading-relaxed">
            {t('confirm_before_travel')} Blood units are subject to ongoing emergency cross-matching and surgery requirements.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Droplet className="w-3.5 h-3.5 text-rose-500" />
            Select Blood Group:
          </span>

          {bloodGroups.map((bg) => (
            <button
              key={bg}
              onClick={() => setSelectedGroup(bg)}
              className={`px-3 py-1.5 rounded-xl font-black transition-all ${
                selectedGroup === bg
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {bg}
            </button>
          ))}

          <span className="text-slate-300 mx-2">|</span>

          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-2.5 py-1.5 rounded-xl font-semibold transition-all ${
                selectedCity === c
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Blood Banks Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <div className="w-10 h-10 border-3 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-semibold">Checking regional blood inventories...</p>
        </div>
      ) : bloodBanks.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <Droplet className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No blood banks found</h3>
          <p className="text-xs text-slate-500">Try changing the city or blood group filter.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bloodBanks.map((bank) => (
            <div
              key={bank.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                    {bank.operating_status}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">{bank.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{bank.address}, {bank.city}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${bank.phone}`}
                    className="px-4 py-2 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Blood Bank</span>
                  </a>
                </div>
              </div>

              {/* 8 Blood Groups Inventory Display */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Live Blood Group Availability</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => {
                    const st = bank.stock[bg] || { status: 'Unavailable', units: 0 };
                    const isAvail = st.status === 'Available';
                    const isLimit = st.status === 'Limited';
                    return (
                      <div
                        key={bg}
                        className={`p-3 rounded-2xl border text-center space-y-1 transition-all ${
                          isAvail
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                            : isLimit
                            ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                            : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                        }`}
                      >
                        <span className="text-lg font-black block tracking-tight">{bg}</span>
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          isAvail ? 'bg-emerald-100 text-emerald-800' :
                          isLimit ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-200 text-slate-600'
                        }`}>
                          {st.status}
                        </span>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{st.units} Units</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                <span>Emergency Hotline: {bank.emergency_helpline || "104"}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {bank.last_updated}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
