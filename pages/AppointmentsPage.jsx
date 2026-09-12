import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  CheckCircle2, 
  Plus, 
  X, 
  User, 
  Phone, 
  FileText, 
  AlertCircle,
  QrCode,
  Download,
  Share2
} from 'lucide-react';

export default function AppointmentsPage({ initialDoctor, onStartTelemedicine }) {
  const { lang, t } = useLanguage();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState('All'); // 'All', 'Upcoming', 'Confirmed', 'Completed', 'Cancelled'

  // Booking Modal
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(initialDoctor || null);
  const [doctorsList, setDoctorsList] = useState([]);

  // Form
  const [patientName, setPatientName] = useState('Ram Lal Patel');
  const [patientPhone, setPatientPhone] = useState('9810066006');
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [consultType, setConsultType] = useState('In-Person');
  const [symptoms, setSymptoms] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const availableSlots = [
    '09:30 AM', '10:00 AM', '10:30 AM', '11:15 AM', 
    '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM'
  ];

  useEffect(() => {
    loadAppointments();
    loadDoctors();
  }, []);

  useEffect(() => {
    if (initialDoctor) {
      setSelectedDoctor(initialDoctor);
      setShowBookingModal(true);
    }
  }, [initialDoctor]);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const res = await api.getAppointments();
      setAppointments(res || []);
    } catch (e) {
      console.warn('Fallback appointments', e);
      setAppointments([
        {
          id: 1,
          token_number: "GA-APT-2041",
          patient_name: "Ram Lal Patel",
          patient_phone: "9810066006",
          doctor_name: "Dr. Arvind Sharma",
          specialization: "General Medicine",
          hospital_name: "Community Health Centre, Mohanlalganj",
          hospital_address: "Raebareli Highway, Mohanlalganj",
          appointment_date: "2026-09-15",
          slot_time: "10:30 AM",
          consultation_type: "In-Person",
          status: "Confirmed",
          symptoms: "Follow-up for seasonal cough and mild blood pressure check."
        },
        {
          id: 2,
          token_number: "GA-APT-2098",
          patient_name: "Ram Lal Patel",
          patient_phone: "9810066006",
          doctor_name: "Dr. Priya Swaminathan",
          specialization: "Cardiology",
          hospital_name: "Manipal Hospital, Whitefield",
          hospital_address: "Whitefield, Bengaluru",
          appointment_date: "2026-09-18",
          slot_time: "02:15 PM",
          consultation_type: "Online Video",
          status: "Upcoming",
          symptoms: "Preventative cardiac tele-evaluation and ECG check."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadDoctors = async () => {
    try {
      const res = await api.searchDoctors();
      setDoctorsList(res.doctors || []);
      if (!selectedDoctor && res.doctors && res.doctors.length > 0) {
        setSelectedDoctor(res.doctors[0]);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    try {
      const res = await api.bookAppointment({
        doctor_id: selectedDoctor.id,
        hospital_id: selectedDoctor.hospital_id,
        patient_name: patientName,
        patient_phone: patientPhone,
        appointment_date: selectedDate,
        slot_time: selectedSlot,
        consultation_type: consultType,
        symptoms: symptoms
      });

      setBookingSuccess(res.appointment);
      loadAppointments();
    } catch (err) {
      // Create local confirmation for demo
      const mockApt = {
        id: Date.now(),
        token_number: `GA-APT-${Math.floor(1000 + Math.random() * 9000)}`,
        doctor_name: selectedDoctor.full_name,
        specialization: selectedDoctor.specialization,
        hospital_name: selectedDoctor.hospital_name || "Healthcare Facility",
        hospital_address: selectedDoctor.city || "",
        appointment_date: selectedDate,
        slot_time: selectedSlot,
        consultation_type: consultType,
        status: "Confirmed",
        consultation_fee: selectedDoctor.consultation_fee
      };
      setBookingSuccess(mockApt);
      setAppointments([mockApt, ...appointments]);
    }
  };

  const cancelApt = async (id) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await api.cancelAppointment(id);
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
    } catch (e) {
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
    }
  };

  const filtered = appointments.filter(a => {
    if (filterTab === 'All') return true;
    return a.status.toLowerCase() === filterTab.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-medical-50 border border-medical-200 text-medical-800 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5 text-medical-600" />
            <span>{lang === 'hi' ? 'अपॉइंटमेंट शेड्यूलर' : 'Seamless Clinical Scheduling'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('appointment_title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {lang === 'hi' ? 'अपने इन-पर्सन क्लिनिक दौरे व ऑनलाइन वीडियो टेलीकंसल्टेशन प्रबंधित करें' : 'Manage your upcoming in-person hospital visits and online video tele-consultations'}
          </p>
        </div>

        <button
          onClick={() => {
            setBookingSuccess(null);
            setShowBookingModal(true);
          }}
          className="px-5 py-3 rounded-2xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs sm:text-sm shadow-apple hover:shadow-apple-hover transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'hi' ? 'नया अपॉइंटमेंट बुक करें' : 'Book New Appointment'}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-bold">
        {['All', 'Confirmed', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filterTab === tab
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Appointment Cards */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <div className="w-10 h-10 border-3 border-medical-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-semibold">Loading appointments...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No appointments in this view</h3>
          <p className="text-xs text-slate-500">You can book an appointment with verified doctors across our nationwide network.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header row with token and status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-900 font-mono font-bold text-xs">
                    {apt.token_number}
                  </span>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    apt.status === 'Upcoming' ? 'bg-medical-50 text-medical-700 border border-medical-200' :
                    apt.status === 'Cancelled' ? 'bg-red-50 text-red-700 border border-red-200' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {apt.status}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-0.5">
                  {apt.doctor_name}
                </h3>
                <p className="text-xs font-semibold text-medical-600 mb-3">
                  {apt.specialization}
                </p>

                {/* Hospital / Clinic info */}
                <p className="text-xs text-slate-500 flex items-start gap-1.5 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{apt.hospital_name} {apt.hospital_address ? `• ${apt.hospital_address}` : ''}</span>
                </p>

                {/* Date, Time & Mode */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl text-xs mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Date</p>
                      <p className="font-bold text-slate-800">{apt.appointment_date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Time Slot</p>
                      <p className="font-bold text-slate-800">{apt.slot_time}</p>
                    </div>
                  </div>
                </div>

                {/* Mode badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                    apt.consultation_type === 'Online Video'
                      ? 'bg-medical-50 text-medical-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {apt.consultation_type === 'Online Video' ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                    <span>{apt.consultation_type}</span>
                  </span>
                </div>

                {apt.symptoms && (
                  <p className="text-[11px] text-slate-500 bg-slate-50/70 p-2.5 rounded-xl">
                    <span className="font-bold text-slate-700">Notes/Symptoms:</span> {apt.symptoms}
                  </p>
                )}
              </div>

              {/* Card Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                {apt.consultation_type === 'Online Video' && apt.status !== 'Cancelled' ? (
                  <button
                    onClick={() => onStartTelemedicine && onStartTelemedicine(apt)}
                    className="flex-1 py-2.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Enter Video Room</span>
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`Appointment Token: ${apt.token_number}\nPlease show this token at the registration desk upon arrival.`)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5 text-slate-600" />
                    <span>Show Token Slip</span>
                  </button>
                )}

                {apt.status !== 'Cancelled' && (
                  <button
                    onClick={() => cancelApt(apt.id)}
                    className="px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 font-bold text-xs transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[85vh] overflow-y-auto animate-fade-in">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>

            {bookingSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Appointment Confirmed!</h3>
                <p className="text-xs text-slate-500">Your priority digital token has been registered in the Gram Aarogya clinical queue.</p>

                {/* Printable Token Slip Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 text-left space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-500">TOKEN NUMBER:</span>
                    <span className="text-base font-black text-medical-700">{bookingSuccess.token_number}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Doctor:</span> <span className="font-bold text-slate-800">{bookingSuccess.doctor_name}</span> ({bookingSuccess.specialization})
                  </div>
                  <div>
                    <span className="text-slate-400">Facility:</span> <span className="font-bold text-slate-800">{bookingSuccess.hospital_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Schedule:</span> <span className="font-bold text-slate-800">{bookingSuccess.appointment_date} at {bookingSuccess.slot_time}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Mode:</span> <span className="font-bold text-slate-800">{bookingSuccess.consultation_type}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs transition-colors"
                  >
                    View in Appointments
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">
                <div className="flex items-center gap-2 text-medical-600">
                  <Calendar className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Book Consultation</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  {selectedDoctor ? `Consult with ${selectedDoctor.full_name}` : 'Schedule an Appointment'}
                </h3>

                {/* Select Doctor if not set */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Select Doctor *</label>
                  <select
                    value={selectedDoctor?.id || ''}
                    onChange={(e) => {
                      const doc = doctorsList.find(d => d.id === parseInt(e.target.value));
                      setSelectedDoctor(doc);
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-medical-600 bg-white"
                  >
                    {doctorsList.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.full_name} ({d.specialization}) — ₹{d.consultation_fee}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mode of Consultation */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">Consultation Mode *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setConsultType('In-Person')}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                        consultType === 'In-Person'
                          ? 'border-medical-600 bg-medical-50 text-medical-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <p className="text-xs">In-Person</p>
                        <p className="text-[10px] text-slate-400">At clinic / hospital</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setConsultType('Online Video')}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                        consultType === 'Online Video'
                          ? 'border-medical-600 bg-medical-50 text-medical-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Video className="w-4 h-4 text-medical-600 shrink-0" />
                      <div>
                        <p className="text-xs">Online Video</p>
                        <p className="text-[10px] text-slate-400">Telemedicine room</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Date & Slot */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Appointment Date *</label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-medical-600"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Select Time Slot *</label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-medical-600 bg-white"
                    >
                      {availableSlots.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Patient Full Name *</label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-medical-600"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-medical-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Primary Symptoms / Reason for Visit</label>
                  <textarea
                    rows={2}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Briefly describe your symptoms..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-medical-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-medical-600 hover:bg-medical-700 text-white font-bold rounded-2xl transition-colors shadow-apple"
                >
                  Confirm Appointment & Generate Token Slip
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
