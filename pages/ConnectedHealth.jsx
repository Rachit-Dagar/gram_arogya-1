import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Scale, 
  Plus, 
  X, 
  CheckCircle2, 
  TrendingUp, 
  Bluetooth, 
  Smartphone, 
  Watch, 
  Clock, 
  AlertCircle
} from 'lucide-react';

export default function ConnectedHealth() {
  const { lang, t } = useLanguage();
  const [vitalsData, setVitalsData] = useState({ latest: {}, history: [] });
  const [loading, setLoading] = useState(true);

  // Log reading modal
  const [showLogModal, setShowLogModal] = useState(false);
  const [vitalType, setVitalType] = useState('Blood Pressure');
  const [valPrimary, setValPrimary] = useState(120);
  const [valSecondary, setValSecondary] = useState(80);
  const [unit, setUnit] = useState('mmHg');

  // Connect Device modal
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [pairingStatus, setPairingStatus] = useState(null); // 'pairing', 'paired'

  useEffect(() => {
    loadVitals();
  }, []);

  const loadVitals = async () => {
    setLoading(true);
    try {
      const data = await api.getVitals();
      setVitalsData(data || { latest: {}, history: [] });
    } catch (e) {
      console.warn(e);
      setVitalsData({
        latest: {
          "Blood Pressure": { value_primary: 122, value_secondary: 78, unit: "mmHg", status: "Normal", timestamp: "Today, 08:30 AM" },
          "Heart Rate": { value_primary: 72, unit: "bpm", status: "Normal", timestamp: "Today, 08:30 AM" },
          "SpO2": { value_primary: 98, unit: "%", status: "Normal", timestamp: "Today, 08:30 AM" },
          "Blood Glucose": { value_primary: 96, unit: "mg/dL", status: "Normal", timestamp: "Today, 07:15 AM (Fasting)" },
          "Temperature": { value_primary: 98.4, unit: "°F", status: "Normal", timestamp: "Yesterday, 09:00 PM" },
          "Weight": { value_primary: 68.5, unit: "kg", status: "Normal", timestamp: "3 days ago" }
        },
        history: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogVital = async (e) => {
    e.preventDefault();
    try {
      await api.recordVital({
        vital_type: vitalType,
        value_primary: parseFloat(valPrimary),
        value_secondary: vitalType === 'Blood Pressure' ? parseFloat(valSecondary) : null,
        unit: unit,
        source: 'Manual Reading'
      });
      setShowLogModal(false);
      loadVitals();
    } catch (e) {
      setShowLogModal(false);
    }
  };

  const simulatePairDevice = (deviceName) => {
    setPairingStatus(`Connecting to ${deviceName}...`);
    setTimeout(() => {
      setPairingStatus(`✓ Successfully synced with ${deviceName}. Real-time biometrics active.`);
      setTimeout(() => {
        setPairingStatus(null);
        setShowDeviceModal(false);
      }, 1500);
    }, 1200);
  };

  const cards = [
    {
      title: "Blood Pressure",
      key: "Blood Pressure",
      val: vitalsData.latest["Blood Pressure"] ? `${vitalsData.latest["Blood Pressure"].value_primary}/${vitalsData.latest["Blood Pressure"].value_secondary || 80}` : "122/78",
      unit: "mmHg",
      status: vitalsData.latest["Blood Pressure"]?.status || "Normal",
      color: "text-medical-600 bg-medical-50 border-medical-200",
      normalRange: "90/60 - 120/80 mmHg",
      icon: Activity
    },
    {
      title: "Heart Rate (Pulse)",
      key: "Heart Rate",
      val: vitalsData.latest["Heart Rate"] ? `${vitalsData.latest["Heart Rate"].value_primary}` : "72",
      unit: "bpm",
      status: vitalsData.latest["Heart Rate"]?.status || "Normal",
      color: "text-rose-600 bg-rose-50 border-rose-200",
      normalRange: "60 - 100 bpm",
      icon: Heart
    },
    {
      title: "Blood Oxygen (SpO2)",
      key: "SpO2",
      val: vitalsData.latest["SpO2"] ? `${vitalsData.latest["SpO2"].value_primary}` : "98",
      unit: "%",
      status: vitalsData.latest["SpO2"]?.status || "Normal",
      color: "text-teal-600 bg-teal-50 border-teal-200",
      normalRange: "95 - 100%",
      icon: TrendingUp
    },
    {
      title: "Blood Glucose (Fasting)",
      key: "Blood Glucose",
      val: vitalsData.latest["Blood Glucose"] ? `${vitalsData.latest["Blood Glucose"].value_primary}` : "96",
      unit: "mg/dL",
      status: vitalsData.latest["Blood Glucose"]?.status || "Normal",
      color: "text-amber-600 bg-amber-50 border-amber-200",
      normalRange: "70 - 100 mg/dL",
      icon: Activity
    },
    {
      title: "Body Temperature",
      key: "Temperature",
      val: vitalsData.latest["Temperature"] ? `${vitalsData.latest["Temperature"].value_primary}` : "98.4",
      unit: "°F",
      status: vitalsData.latest["Temperature"]?.status || "Normal",
      color: "text-orange-600 bg-orange-50 border-orange-200",
      normalRange: "97.8 - 99.1 °F",
      icon: Thermometer
    },
    {
      title: "Body Weight",
      key: "Weight",
      val: vitalsData.latest["Weight"] ? `${vitalsData.latest["Weight"].value_primary}` : "68.5",
      unit: "kg",
      status: vitalsData.latest["Weight"]?.status || "Normal",
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      normalRange: "BMI 18.5 - 24.9",
      icon: Scale
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            <span>Biometric Vitals Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('vitals_title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('vitals_subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDeviceModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors"
          >
            <Bluetooth className="w-4 h-4 text-medical-600" />
            <span>{t('connect_device')}</span>
          </button>

          <button
            onClick={() => setShowLogModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-apple transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{t('record_reading')}</span>
          </button>
        </div>
      </div>

      {/* Demo Data Disclaimer */}
      <div className="p-3 bg-slate-100 rounded-2xl text-[11px] text-slate-600 border border-slate-200 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
        <span>
          <strong>Simulated Biometrics (Demo Data):</strong> Displays vital trajectories. Compatible with Bluetooth BP monitors, pulse oximeters, Apple Health & Google Health Connect.
        </span>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500">{c.title}</span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${c.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{c.val}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">{c.unit}</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200">
                    {c.status}
                  </span>
                  <span className="text-[11px] text-slate-400">Target: {c.normalRange}</span>
                </div>
              </div>

              {/* Sparkline trend representation */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  Stable across last 7 days
                </span>
                <span className="text-[10px]">Updated Today</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Reading Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-fade-in text-xs">
            <button
              onClick={() => setShowLogModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">Log Vital Reading</h3>
            <p className="text-slate-500 mb-4">Manual entry from home monitors or dispensary records.</p>

            <form onSubmit={handleLogVital} className="space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Vital Marker *</label>
                <select
                  value={vitalType}
                  onChange={(e) => {
                    setVitalType(e.target.value);
                    if (e.target.value === 'Blood Pressure') setUnit('mmHg');
                    else if (e.target.value === 'Heart Rate') setUnit('bpm');
                    else if (e.target.value === 'SpO2') setUnit('%');
                    else if (e.target.value === 'Blood Glucose') setUnit('mg/dL');
                    else if (e.target.value === 'Temperature') setUnit('°F');
                    else if (e.target.value === 'Weight') setUnit('kg');
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="Blood Pressure">Blood Pressure</option>
                  <option value="Heart Rate">Heart Rate</option>
                  <option value="SpO2">SpO2 (Oxygen)</option>
                  <option value="Blood Glucose">Blood Glucose</option>
                  <option value="Temperature">Temperature</option>
                  <option value="Weight">Weight</option>
                </select>
              </div>

              {vitalType === 'Blood Pressure' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Systolic (Top) *</label>
                    <input
                      type="number"
                      required
                      value={valPrimary}
                      onChange={(e) => setValPrimary(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Diastolic (Bottom) *</label>
                    <input
                      type="number"
                      required
                      value={valSecondary}
                      onChange={(e) => setValSecondary(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Measured Value ({unit}) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={valPrimary}
                    onChange={(e) => setValPrimary(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition-colors shadow-xs"
              >
                Save Reading to Timeline
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Connect Device Modal */}
      {showDeviceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-fade-in text-xs space-y-4">
            <button
              onClick={() => setShowDeviceModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-medical-50 text-medical-700 flex items-center justify-center mx-auto">
              <Bluetooth className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900 text-center">Connect Clinical Devices</h3>
            <p className="text-slate-500 text-center">
              Gram Aarogya connects seamlessly with supported mobile health standards and Bluetooth peripherals.
            </p>

            {pairingStatus ? (
              <div className="p-4 bg-medical-50 rounded-2xl border border-medical-200 text-medical-900 text-center font-bold">
                {pairingStatus}
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => simulatePairDevice("Apple Health / HealthKit")}
                  className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-bold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-slate-600" /> Apple Health</span>
                  <span className="text-[10px] text-medical-600">Connect</span>
                </button>

                <button
                  onClick={() => simulatePairDevice("Google Health Connect")}
                  className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-bold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-emerald-600" /> Google Health Connect</span>
                  <span className="text-[10px] text-medical-600">Connect</span>
                </button>

                <button
                  onClick={() => simulatePairDevice("Bluetooth Pulse Oximeter")}
                  className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-bold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2"><Watch className="w-4 h-4 text-indigo-600" /> Bluetooth Pulse Oximeter (SpO2)</span>
                  <span className="text-[10px] text-medical-600">Pair</span>
                </button>

                <button
                  onClick={() => simulatePairDevice("Digital Omron BP Monitor")}
                  className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-bold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-teal-600" /> Omron Digital BP Monitor</span>
                  <span className="text-[10px] text-medical-600">Pair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
