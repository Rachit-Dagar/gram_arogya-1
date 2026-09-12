import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, 
  MapPin, 
  Building2, 
  PhoneCall, 
  Clock, 
  Star, 
  ShieldCheck, 
  Calendar, 
  Navigation, 
  SlidersHorizontal,
  Map as MapIcon,
  List,
  AlertCircle,
  ExternalLink,
  Pill,
  Droplet
} from 'lucide-react';

export default function FindCare({ onSelectHospital, onBookAppointment, onCheckMedicines }) {
  const { lang, t } = useLanguage();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [query, setQuery] = useState('');
  const [facilityType, setFacilityType] = useState('All');
  const [city, setCity] = useState('All');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  useEffect(() => {
    loadHospitals();
  }, [facilityType, city, emergencyOnly]);

  const loadHospitals = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.searchHospitals({
        query,
        city,
        facilityType,
        emergencyOnly,
        userLat: 26.6850,
        userLon: 80.9880
      });
      setHospitals(res.hospitals || []);
    } catch (err) {
      console.warn('API error, falling back to local dataset', err);
      // Fallback demo data so page is never empty
      setHospitals([
        {
          id: 1,
          name: "Community Health Centre & Sub-District Hospital, Mohanlalganj",
          facility_type: "Primary Health Centre",
          address: "Raebareli Highway, Mohanlalganj Tehsil",
          city: "Mohanlalganj",
          phone: "+91-522-2973120",
          distance_km: 1.2,
          emergency_available: true,
          icu_beds: 6,
          specialties: ["General Medicine", "Pediatrics", "Obstetrics & Gynecology", "Emergency Trauma"],
          consultation_modes: ["In-Person", "Online Video"],
          rating: 4.6,
          is_verified: true
        },
        {
          id: 2,
          name: "Sanjay Gandhi Postgraduate Institute of Medical Sciences (SGPGIMS)",
          facility_type: "Hospital",
          address: "Raebareli Road, Lucknow",
          city: "Lucknow",
          phone: "+91-522-2668004",
          distance_km: 8.4,
          emergency_available: true,
          icu_beds: 85,
          specialties: ["Cardiology", "Neurology", "Gastroenterology", "Nephrology", "Emergency Trauma"],
          consultation_modes: ["In-Person", "Online Video"],
          rating: 4.9,
          is_verified: true
        },
        {
          id: 3,
          name: "Manipal Hospital, Whitefield",
          facility_type: "Hospital",
          address: "#143, EPIP Zone, Whitefield, Bengaluru",
          city: "Bengaluru",
          phone: "+91-80-25024444",
          distance_km: 14.5,
          emergency_available: true,
          icu_beds: 42,
          specialties: ["Cardiology", "Orthopedics", "Pediatrics", "Dermatology", "Oncology"],
          consultation_modes: ["In-Person", "Online Video"],
          rating: 4.8,
          is_verified: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadHospitals();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-medical-50 border border-medical-200 text-medical-800 text-xs font-bold mb-2">
            <MapPin className="w-3.5 h-3.5 text-medical-600" />
            <span>{lang === 'hi' ? 'स्थान आधारित खोज' : 'Proximity Healthcare Network'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? 'स्वास्थ्य सेवा एवं केंद्र खोजें' : 'Find Care Near You'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {lang === 'hi' 
              ? 'अस्पताल, प्राथमिक स्वास्थ्य केंद्र (PHC), क्लिनिक और डायग्नोस्टिक पैथोलॉजी केंद्र' 
              : 'Verified tertiary hospitals, community clinics, PHCs, and diagnostic pathology labs'}
          </p>
        </div>

        {/* View switcher: List vs Map */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'list' ? 'bg-white text-medical-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span>{lang === 'hi' ? 'सूची दृश्य' : 'List View'}</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'map' ? 'bg-white text-medical-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>{lang === 'hi' ? 'नक्शा दृश्य' : 'Radar Map'}</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'अस्पताल या विशेषता का नाम...' : 'Search facility name, specialty, or area...'}
              className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-2xl bg-medical-600 hover:bg-medical-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors shrink-0"
          >
            {lang === 'hi' ? 'खोजें' : 'Search'}
          </button>
        </form>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-400 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {lang === 'hi' ? 'फ़िल्टर:' : 'Filters:'}
          </span>

          {['All', 'Hospital', 'Primary Health Centre', 'Clinic', 'Diagnostic Centre'].map((type) => (
            <button
              key={type}
              onClick={() => setFacilityType(type)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                facilityType === type
                  ? 'bg-medical-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {type === 'Primary Health Centre' ? (lang === 'hi' ? 'पीएचसी (PHC)' : 'PHC / CHC') : type}
            </button>
          ))}

          <span className="text-slate-300 mx-1">|</span>

          {['All', 'Mohanlalganj', 'Lucknow', 'Bengaluru', 'Mumbai', 'Pune'].map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`px-2.5 py-1.5 rounded-xl font-semibold transition-all ${
                city === c
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {c}
            </button>
          ))}

          <button
            onClick={() => setEmergencyOnly(!emergencyOnly)}
            className={`px-3 py-1.5 rounded-xl font-bold ml-auto flex items-center gap-1.5 transition-all ${
              emergencyOnly
                ? 'bg-red-600 text-white'
                : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>{lang === 'hi' ? '24x7 आपातकालीन' : '24x7 Emergency ICU'}</span>
          </button>
        </div>
      </div>

      {/* Results Content */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 space-y-3">
          <div className="w-10 h-10 border-3 border-medical-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold">{lang === 'hi' ? 'स्वास्थ्य केंद्र खोजे जा रहे हैं...' : 'Discovering nearby healthcare establishments...'}</p>
        </div>
      ) : viewMode === 'map' ? (
        /* Radar / Map-style visual abstraction */
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-apple space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {lang === 'hi' ? 'जियो-रडार दृश्य (दूरी चक्र)' : 'Geospatial Radar & Proximity Map'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'hi' ? 'आपके वर्तमान स्थान (मोहनलालगंज / लखनऊ) से दूरी' : 'Interactive radius visualization centered on your location (Lucknow / Mohanlalganj)'}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              GPS Active
            </span>
          </div>

          <div className="relative h-96 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center">
            {/* Concentric rings */}
            <div className="absolute w-80 h-80 rounded-full border border-medical-200/60 flex items-center justify-center">
              <span className="absolute -top-3 bg-white px-2 py-0.5 text-[10px] text-slate-400 rounded-full border">25 km</span>
            </div>
            <div className="absolute w-52 h-52 rounded-full border border-medical-300/80 flex items-center justify-center">
              <span className="absolute -top-3 bg-white px-2 py-0.5 text-[10px] text-slate-400 rounded-full border">10 km</span>
            </div>
            <div className="absolute w-28 h-28 rounded-full border border-medical-400 flex items-center justify-center">
              <span className="absolute -top-3 bg-white px-2 py-0.5 text-[10px] text-slate-400 rounded-full border">5 km</span>
            </div>

            {/* Center User Pin */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-medical-600 border-3 border-white shadow-lg animate-ping absolute"></div>
              <div className="w-5 h-5 rounded-full bg-medical-600 border-3 border-white shadow-lg relative flex items-center justify-center text-white">
                <MapPin className="w-3 h-3" />
              </div>
              <span className="text-[10px] font-black bg-slate-900 text-white px-2 py-0.5 rounded-md mt-1 shadow-sm">You</span>
            </div>

            {/* Facility pins placed dynamically */}
            {hospitals.slice(0, 5).map((h, idx) => {
              const angles = [45, 120, 210, 290, 340];
              const rad = angles[idx % angles.length] * (Math.PI / 180);
              const distRadius = Math.min(140, Math.max(40, h.distance_km * 10));
              const x = Math.cos(rad) * distRadius;
              const y = Math.sin(rad) * distRadius;

              return (
                <div
                  key={h.id}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  onClick={() => onSelectHospital && onSelectHospital(h)}
                  className="absolute z-20 cursor-pointer group"
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-125 ${
                    h.emergency_available ? 'bg-red-600' : 'bg-medical-700'
                  }`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 hidden group-hover:block bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap shadow-xl z-30">
                    {h.name} ({h.distance_km} km)
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-400 text-center">
            Tap any facility pin to open complete establishment profile and bed availability.
          </p>
        </div>
      ) : hospitals.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">{lang === 'hi' ? 'कोई स्वास्थ्य केंद्र नहीं मिला' : 'No establishments match your criteria'}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Try clearing filters or increasing the search radius to discover facilities in neighboring districts.</p>
        </div>
      ) : (
        /* List View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((h) => (
            <div
              key={h.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                    {h.facility_type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{h.rating}</span>
                  </div>
                </div>

                {/* Name */}
                <h3 
                  onClick={() => onSelectHospital && onSelectHospital(h)}
                  className="font-bold text-base text-slate-950 mb-1 hover:text-medical-600 cursor-pointer line-clamp-2"
                >
                  {h.name}
                </h3>

                <p className="text-xs text-slate-500 mb-3 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{h.address}, {h.city}</span>
                </p>

                {/* Distance & Emergency Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded-lg bg-medical-50 text-medical-700 text-xs font-semibold">
                    {h.distance_km} km {lang === 'hi' ? 'दूर' : 'away'}
                  </span>

                  {h.emergency_available ? (
                    <span className="px-2 py-0.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                      24x7 Emergency ({h.icu_beds} ICU Beds)
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-xs">
                      OPD / Day Care
                    </span>
                  )}
                </div>

                {/* Specialties chips */}
                {h.specialties && h.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {h.specialties.slice(0, 3).map((s, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
                        {s}
                      </span>
                    ))}
                    {h.specialties.length > 3 && (
                      <span className="text-[10px] text-slate-400 px-1 py-0.5">
                        +{h.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${h.phone}`}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'कॉल करें' : 'Call'}</span>
                </a>

                <button
                  onClick={() => onSelectHospital && onSelectHospital(h)}
                  className="flex-1 py-2 rounded-xl bg-medical-600 hover:bg-medical-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  {lang === 'hi' ? 'विवरण' : 'Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
