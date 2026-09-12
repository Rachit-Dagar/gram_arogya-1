import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  Search, MapPin, PhoneCall, Navigation, Tag, CheckCircle2,
  AlertTriangle, XCircle, ArrowUpDown, SlidersHorizontal,
  Sparkles, ShieldCheck, ChevronDown, ChevronUp, Clock, Info
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', labelHi: 'सभी', labelEn: 'All' },
  { id: 'Antipyretic', labelHi: 'बुखार / दर्द (Fever)', labelEn: 'Fever / Pain' },
  { id: 'Antibiotic', labelHi: 'एंटीबायोटिक (Infection)', labelEn: 'Antibiotics' },
  { id: 'Oral Electrolyte', labelHi: 'दस्त / ओआरएस (ORS)', labelEn: 'ORS / Diarrhea' },
  { id: 'Antidiabetic', labelHi: 'मधुमेह / शुगर (Diabetes)', labelEn: 'Diabetes' },
  { id: 'Antacid', labelHi: 'गैस / एसिडिटी (Gas/Acidity)', labelEn: 'Acidity / Gas' },
  { id: 'Antiallergic', labelHi: 'एलर्जी / जुकाम (Allergy)', labelEn: 'Allergy / Cold' }
];

const POPULAR_QUICK_SEARCHES = [
  "Dolo 650", "ORS Electral", "Augmentin 625", "Pan 40", "Cetirizine", "Metformin"
];

export default function PatientSearch() {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [radius, setRadius] = useState(25);
  const [sortBy, setSortBy] = useState('distance'); // distance, price, stock
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedMedId, setExpandedMedId] = useState(null);
  const [storeResults, setStoreResults] = useState({});
  const [storeLoading, setStoreLoading] = useState(false);

  // Patient coordinates
  const patientLocation = { lat: 26.6800, lng: 80.9850, name: "Mohanlalganj / Lucknow (Network Center)" };

  useEffect(() => {
    handleSearch();
  }, [selectedCategory]);

  const handleSearch = async (searchOverride) => {
    const q = searchOverride !== undefined ? searchOverride : query;
    setLoading(true);
    try {
      if (!q.trim() && selectedCategory === 'all') {
        const popular = await api.getPopularMedicines();
        setMedicines(popular);
      } else {
        const results = await api.searchMedicines(q.trim(), selectedCategory);
        setMedicines(results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStores = async (medId) => {
    if (expandedMedId === medId) {
      setExpandedMedId(null);
      return;
    }

    setExpandedMedId(medId);
    if (!storeResults[medId]) {
      setStoreLoading(true);
      try {
        const stores = await api.getMedicineAvailability(medId, {
          lat: patientLocation.lat,
          lng: patientLocation.lng,
          radius: radius,
          sortBy: sortBy,
          inStockOnly: inStockOnly
        });
        setStoreResults(prev => ({ ...prev, [medId]: stores }));
      } catch (err) {
        console.error(err);
      } finally {
        setStoreLoading(false);
      }
    }
  };

  const handleApplyFilter = async () => {
    if (expandedMedId) {
      setStoreLoading(true);
      try {
        const stores = await api.getMedicineAvailability(expandedMedId, {
          lat: patientLocation.lat,
          lng: patientLocation.lng,
          radius: radius,
          sortBy: sortBy,
          inStockOnly: inStockOnly
        });
        setStoreResults(prev => ({ ...prev, [expandedMedId]: stores }));
      } catch (err) {
        console.error(err);
      } finally {
        setStoreLoading(false);
      }
    }
  };

  useEffect(() => {
    if (expandedMedId) {
      handleApplyFilter();
    }
  }, [radius, sortBy, inStockOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-arogya-100 text-arogya-800 text-xs font-bold mb-3 border border-arogya-200">
          <Sparkles className="w-3.5 h-3.5 text-arogya-600" />
          {lang === 'hi' ? 'वास्तविक समय में दवा उपलब्धता नेटवर्क' : 'Real-time Medicine Availability Network'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {lang === 'hi' ? 'अपने नजदीकी मेडिकल स्टोर पर दवा खोजें' : 'Check Medicine Stock at Nearby Medical Stores'}
        </h1>
        <p className="mt-2 text-xs sm:text-base text-slate-600 font-medium">
          {lang === 'hi'
            ? 'दवा के लिए व्यर्थ भटकने से बचें। वास्तविक स्टॉक, कम दाम और जन औषधि केंद्र विकल्प तुरंत देखें।'
            : 'Avoid futile travel. Compare real-time stock, lowest prices, and Jan Aushadhi generic alternatives across verified chemists.'}
        </p>
      </div>

      {/* Main Search Box */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 max-w-4xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-arogya-500 focus:outline-hidden bg-slate-50/50 hover:bg-white transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-arogya-700 hover:bg-arogya-800 active:scale-98 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{t('search_btn')}</span>
          </button>
        </form>

        {/* Popular Quick Searches */}
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-bold">{t('popular_searches')}</span>
          {POPULAR_QUICK_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => {
                setQuery(term);
                handleSearch(term);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-arogya-50 hover:text-arogya-700 border border-slate-200 hover:border-arogya-200 rounded-lg text-slate-700 font-medium transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Category Chips */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 shrink-0">{t('filter_category')}</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-arogya-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lang === 'hi' ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Control Bar: Location & Filters */}
      <div className="max-w-4xl mx-auto mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-100/70 p-3.5 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
          <MapPin className="w-4 h-4 text-arogya-600 shrink-0" />
          <span>
            {lang === 'hi' ? 'आपकी वर्तमान लोकेशन:' : 'Your Location:'}{' '}
            <strong className="text-slate-900">{patientLocation.name}</strong>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto text-xs">
          {/* In-Stock Checkbox */}
          <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700 select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 text-arogya-600 rounded border-slate-300 focus:ring-arogya-500"
            />
            <span>{t('in_stock_only')}</span>
          </label>

          {/* Radius Selector */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">{t('radius')}</span>
            <select
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="bg-white border border-slate-300 rounded-lg px-2 py-1 font-bold text-slate-800 focus:ring-1 focus:ring-arogya-500"
            >
              <option value={5}>5 km</option>
              <option value={15}>15 km</option>
              <option value={25}>25 km</option>
              <option value={50}>50 km</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2 py-1 font-bold text-slate-800 focus:ring-1 focus:ring-arogya-500"
            >
              <option value="distance">{t('sort_distance')}</option>
              <option value="price">{t('sort_price')}</option>
              <option value="stock">{t('sort_stock')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="max-w-4xl mx-auto mt-6 mb-3 flex items-center justify-between">
        <p className="text-xs sm:text-sm font-bold text-slate-700">
          {medicines.length} {lang === 'hi' ? 'दवाएं पाई गईं' : 'medicines found'}
        </p>
      </div>

      {/* Medicine Results List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {medicines.map((med) => {
          const isExpanded = expandedMedId === med.id;
          const stores = storeResults[med.id] || [];

          return (
            <div
              key={med.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Medicine Card Summary */}
              <div className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {med.brand_name}
                      </h3>
                      <span className="px-2 py-0.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-700">
                        {med.strength} • {med.dosage_form}
                      </span>
                      {med.category && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {med.category}
                        </span>
                      )}
                      {med.prescription_required && (
                        <span className="px-2 py-0.5 text-[11px] font-bold rounded-lg bg-red-50 text-red-700 border border-red-200">
                          Rx Required (पर्ची आवश्यक)
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                      <span className="text-slate-400 font-bold">{t('generic_salt')}</span>{' '}
                      <span className="font-semibold text-slate-800">{med.generic_name}</span>
                    </p>

                    {med.standard_usage_notes && (
                      <p className="text-[11px] text-slate-500 mt-1 italic flex items-center gap-1">
                        <Info className="w-3 h-3 text-slate-400 shrink-0" />
                        {med.standard_usage_notes}
                      </p>
                    )}
                  </div>

                  {/* Stock & Price Badges */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 bg-slate-50 p-2.5 sm:p-0 rounded-xl sm:bg-transparent">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500 font-medium">{t('price_from')}</span>
                      <span className="text-base sm:text-xl font-black text-arogya-700">
                        ₹{med.min_price !== null ? med.min_price.toFixed(2) : '--'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold">
                      {med.in_stock_stores_count > 0 ? (
                        <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {med.in_stock_stores_count} {t('stores_available')}
                        </span>
                      ) : (
                        <span className="text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          {t('out_of_stock')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subsidized Jan Aushadhi Alert Banner */}
                {med.has_jan_aushadhi_generic && (
                  <div className="mt-3.5 p-2.5 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-sky-900 font-bold">
                      <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>{t('jan_aushadhi_badge')}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-sky-600 text-white rounded-md text-[11px] font-black">
                      {t('jan_aushadhi_savings')}
                    </span>
                  </div>
                )}

                {/* Expand / View Stores Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => handleToggleStores(med.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-arogya-50 hover:bg-arogya-100 border border-arogya-200 text-arogya-800 rounded-xl text-xs sm:text-sm font-bold transition-all"
                  >
                    <span>{isExpanded ? t('hide_stores') : t('view_nearby_stores')}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Stores Drawer (Proximity & Availability List) */}
              {isExpanded && (
                <div className="bg-slate-50/80 border-t border-slate-200 p-4 sm:p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-arogya-600" />
                    <span>
                      {lang === 'hi'
                        ? 'निकटतम मेडिकल स्टोर उपलब्धता सूची'
                        : 'Nearby Store Availability & Live Stock'}
                    </span>
                  </h4>

                  {storeLoading ? (
                    <div className="py-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                      <span className="animate-spin w-4 h-4 border-2 border-arogya-600 border-t-transparent rounded-full" />
                      <span>{lang === 'hi' ? 'निकटतम स्टोर खोजे जा रहे हैं...' : 'Calculating distances and checking stock...'}</span>
                    </div>
                  ) : stores.length === 0 ? (
                    <div className="p-4 bg-white rounded-xl text-center text-xs text-slate-500 border border-slate-200">
                      {lang === 'hi'
                        ? 'इस दूरी सीमा में कोई स्टोर उपलब्ध नहीं है। कृपया दूरी सीमा बढ़ाएं।'
                        : 'No medical stores found within this radius. Try increasing the search distance.'}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {stores.map((s) => {
                        const isInStock = s.stock_quantity > 0;
                        const isLow = s.stock_quantity > 0 && s.stock_quantity <= 15;

                        return (
                          <div
                            key={s.store_id}
                            className={`p-4 rounded-xl border bg-white shadow-2xs transition-all ${
                              s.is_jan_aushadhi
                                ? 'border-sky-300 ring-1 ring-sky-100'
                                : 'border-slate-200'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h5 className="text-sm sm:text-base font-bold text-slate-900">
                                    {s.store_name}
                                  </h5>
                                  {s.is_verified && (
                                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                      {t('verified_pharmacy')}
                                    </span>
                                  )}
                                  {s.is_jan_aushadhi && (
                                    <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-sky-600 text-white">
                                      जन औषधि केंद्र (Subsidized)
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span>{s.address}, {s.village_or_tehsil} ({s.district})</span>
                                </p>

                                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    {s.opening_time} - {s.closing_time}
                                  </span>
                                  <span>•</span>
                                  <span>{t('last_updated')}: {new Date(s.last_updated).toLocaleDateString()}</span>
                                </p>
                              </div>

                              {/* Price & Stock Right Block */}
                              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                                <div className="text-right">
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="text-lg sm:text-xl font-black text-slate-900">
                                      ₹{s.unit_price.toFixed(2)}
                                    </span>
                                    {s.mrp > s.unit_price && (
                                      <span className="text-xs text-slate-400 line-through">
                                        ₹{s.mrp.toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                  {s.savings_vs_mrp > 0 && (
                                    <p className="text-[11px] text-emerald-700 font-bold">
                                      {lang === 'hi' ? `₹${s.savings_vs_mrp.toFixed(2)} बचत` : `Save ₹${s.savings_vs_mrp.toFixed(2)}`}
                                    </p>
                                  )}
                                </div>

                                {/* Stock Quantity Badge */}
                                <div>
                                  {isInStock ? (
                                    <span
                                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                        isLow
                                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                          : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                      }`}
                                    >
                                      {isLow ? <AlertTriangle className="w-3 h-3 text-amber-600" /> : <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                                      <span>
                                        {isLow ? `${t('low_stock_tag')} (${s.stock_quantity})` : `${t('in_stock')} (${s.stock_quantity})`}
                                      </span>
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-900 border border-red-200">
                                      <XCircle className="w-3 h-3 text-red-600" />
                                      <span>{t('out_of_stock')}</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Distance & 1-Tap Action Buttons for Rural Patients */}
                            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2 text-xs font-bold text-arogya-800 bg-arogya-50 px-2.5 py-1 rounded-lg">
                                <Navigation className="w-3.5 h-3.5 text-arogya-600" />
                                <span>
                                  {s.distance_km !== null ? `${s.distance_km} km ${t('distance_away')}` : 'Calculating...'}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* 1-Tap Direct Phone Call */}
                                <a
                                  href={`tel:${s.phone}`}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                                >
                                  <PhoneCall className="w-3.5 h-3.5" />
                                  <span>{t('call_store')} ({s.phone})</span>
                                </a>

                                {/* 1-Tap Google Maps Navigation */}
                                <a
                                  href={`https://www.google.com/maps/dir/?api=1&destination=${s.latitude},${s.longitude}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                                >
                                  <MapPin className="w-3.5 h-3.5" />
                                  <span>{t('get_directions')}</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
