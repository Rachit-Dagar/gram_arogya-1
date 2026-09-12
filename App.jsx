import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FindCare from './pages/FindCare';
import DoctorDirectory from './pages/DoctorDirectory';
import HospitalDetailModal from './pages/HospitalDetailModal';
import AppointmentsPage from './pages/AppointmentsPage';
import TelemedicineRoom from './pages/TelemedicineRoom';
import PatientDashboard from './pages/PatientDashboard';
import HealthRecordsPage from './pages/HealthRecordsPage';
import PrescriptionSimplifier from './pages/PrescriptionSimplifier';
import PatientSearch from './pages/PatientSearch';
import PharmacyPortal from './pages/PharmacyPortal';
import BloodBankFinder from './pages/BloodBankFinder';
import ConnectedHealth from './pages/ConnectedHealth';
import ExpertReviewPage from './pages/ExpertReviewPage';
import NutritionTracker from './pages/NutritionTracker';
import GovernmentServices from './pages/GovernmentServices';
import AiAssistantPage from './pages/AiAssistantPage';
import EmergencyMode from './pages/EmergencyMode';
import AnalyticsPage from './pages/AnalyticsPage';
import LoginModal from './pages/LoginModal';
import OfflineIndicator from './components/OfflineIndicator';
import FloatingAiWidget from './components/FloatingAiWidget';
import { useLanguage } from './context/LanguageContext';
import { 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Pill, 
  ExternalLink,
  Lock,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [activeTelemedicineApt, setActiveTelemedicineApt] = useState(null);
  const [preselectedDoctor, setPreselectedDoctor] = useState(null);
  const { lang, t } = useLanguage();

  // Seamless navigation helper
  const navigateTo = (tab, params = {}) => {
    if (params.doctor) {
      setPreselectedDoctor(params.doctor);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookDoctor = (doc) => {
    setPreselectedDoctor(doc);
    setActiveTab('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTelemedicine = (apt) => {
    setActiveTelemedicineApt(apt);
    setActiveTab('telemedicine');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-medical-100 selection:text-medical-900">
      {/* Universal Floating Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1 pb-12">
        {activeTab === 'home' && (
          <Home onNavigate={navigateTo} />
        )}

        {activeTab === 'find-care' && (
          <FindCare
            onSelectHospital={(h) => setSelectedHospital(h)}
            onBookAppointment={() => setActiveTab('appointments')}
            onCheckMedicines={() => setActiveTab('medicines')}
          />
        )}

        {activeTab === 'doctors' && (
          <DoctorDirectory
            onBookDoctor={handleBookDoctor}
          />
        )}

        {activeTab === 'hospitals' && (
          <FindCare
            onSelectHospital={(h) => setSelectedHospital(h)}
            onBookAppointment={() => setActiveTab('appointments')}
            onCheckMedicines={() => setActiveTab('medicines')}
          />
        )}

        {activeTab === 'appointments' && (
          <AppointmentsPage
            initialDoctor={preselectedDoctor}
            onStartTelemedicine={handleStartTelemedicine}
          />
        )}

        {activeTab === 'telemedicine' && (
          <TelemedicineRoom
            appointment={activeTelemedicineApt}
            onEndConsultation={() => setActiveTab('appointments')}
          />
        )}

        {activeTab === 'dashboard' && (
          <PatientDashboard onNavigate={navigateTo} />
        )}

        {activeTab === 'records' && (
          <HealthRecordsPage />
        )}

        {activeTab === 'prescription' && (
          <PrescriptionSimplifier
            onAskDoctor={() => setActiveTab('doctors')}
          />
        )}

        {activeTab === 'medicines' && (
          <PatientSearch />
        )}

        {activeTab === 'pharmacy' && (
          <PharmacyPortal onOpenLogin={() => setIsLoginOpen(true)} />
        )}

        {activeTab === 'blood-banks' && (
          <BloodBankFinder />
        )}

        {activeTab === 'vitals' && (
          <ConnectedHealth />
        )}

        {activeTab === 'expert-review' && (
          <ExpertReviewPage />
        )}

        {activeTab === 'nutrition' && (
          <NutritionTracker />
        )}

        {activeTab === 'government' && (
          <GovernmentServices />
        )}

        {activeTab === 'ai-assistant' && (
          <AiAssistantPage onNavigate={navigateTo} />
        )}

        {activeTab === 'emergency' && (
          <EmergencyMode onNavigate={navigateTo} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsPage />
        )}
      </main>

      {/* Hospital / Clinic Profile Modal */}
      {selectedHospital && (
        <HospitalDetailModal
          hospital={selectedHospital}
          onClose={() => setSelectedHospital(null)}
          onBookDoctor={handleBookDoctor}
          onCheckMedicines={() => {
            setSelectedHospital(null);
            setActiveTab('medicines');
          }}
        />
      )}

      {/* Login & Persona Switcher Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {/* PWA Resilient Offline Indicator */}
      <OfflineIndicator />

      {/* Global Accessible Floating AI Widget */}
      <FloatingAiWidget
        onOpenFullAi={() => setActiveTab('ai-assistant')}
      />

      {/* Apple-inspired Light Healthcare Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-medical-600 to-arogya-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Heart className="w-4 h-4 fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="font-black text-slate-900 text-sm">
                  {lang === 'en' ? 'Gram Aarogya' : 'ग्राम आरोग्य'}
                </span>
                <span className="text-slate-400">•</span>
                <span className="font-semibold text-slate-600">
                  {t('tagline')}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Connected healthcare access across rural, semi-urban, and urban India.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 font-semibold text-xs">
            <button onClick={() => setActiveTab('analytics')} className="hover:text-medical-600 transition-colors">
              Platform Analytics
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('government')} className="hover:text-medical-600 transition-colors">
              Government Schemes (ABHA)
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('pharmacy')} className="hover:text-medical-600 transition-colors">
              Pharmacy Desk
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('emergency')} className="hover:text-red-600 text-red-600 font-bold transition-colors">
              24x7 Helpline: 108
            </button>
          </div>

          <p className="text-slate-400 text-center md:text-right text-[11px]">
            © 2026 Gram Aarogya. Designed with privacy, accessibility and clinical safety at the core.
          </p>
        </div>
      </footer>
    </div>
  );
}
