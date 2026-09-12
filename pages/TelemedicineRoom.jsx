import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Send, 
  Paperclip, 
  User, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Plus
} from 'lucide-react';

export default function TelemedicineRoom({ appointment, onEndConsultation }) {
  const { lang, t } = useLanguage();
  const [videoActive, setVideoActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const [cameraStatus, setCameraStatus] = useState('ready');
  const [cameraError, setCameraError] = useState('');
  const localVideoRef = useRef(null);
  const streamRef = useRef(null);
  const [callDuration, setCallDuration] = useState(0);
  const [messages, setMessages] = useState([
    {
      sender: "doctor",
      text: "Namaste Ram Lal ji! I am reviewing your recent blood count and ECG reports. How are you feeling today?",
      time: "10:31 AM"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'prescription'

  // Prescribed notes by doctor during call
  const [doctorNotes, setDoctorNotes] = useState([
    {
      medicine: "Tab Pan 40mg",
      dosage: "1-0-0 before breakfast x 7 days",
      instructions: "Take with lukewarm water"
    },
    {
      medicine: "Tab Montair LC",
      dosage: "0-0-1 at bedtime x 5 days",
      instructions: "For allergic bronchial cough"
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
  }, []);

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('This browser does not support secure camera access. Use a current browser over HTTPS.');
      setCameraStatus('error');
      return;
    }
    setCameraStatus('connecting');
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      setVideoActive(true);
      setMicActive(true);
      setCameraStatus('live');
    } catch (error) {
      setCameraError(error.name === 'NotAllowedError' ? 'Camera or microphone permission was not granted.' : 'We could not start your camera. Check that no other app is using it.');
      setCameraStatus('error');
    }
  };

  const toggleVideo = () => {
    if (!streamRef.current) return startCamera();
    const next = !videoActive;
    streamRef.current.getVideoTracks().forEach(track => { track.enabled = next; });
    setVideoActive(next);
  };

  const toggleMic = () => {
    if (!streamRef.current) return startCamera();
    const next = !micActive;
    streamRef.current.getAudioTracks().forEach(track => { track.enabled = next; });
    setMicActive(next);
  };

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = {
      sender: "patient",
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setChatInput('');

    // Simulated doctor reply after 1.5s
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: "doctor",
          text: "Understood. The chest tightness you described aligns with acid reflux following heavy meals. I have noted this in your prescription.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  const doctorName = appointment?.doctor_name || "Dr. Arvind Sharma (MBBS, MD - AIIMS)";
  const specialty = appointment?.specialization || "General Medicine";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Telemedicine Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-medical-600 text-white flex items-center justify-center font-bold shadow-md shadow-medical-600/20">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-slate-900 text-base sm:text-lg">{doctorName}</h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                Waiting room
              </span>
            </div>
            <p className="text-xs text-slate-500">{specialty} • Session Duration: <span className="font-mono font-bold text-slate-800">{formatTimer(callDuration)}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onEndConsultation}
            className="px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            <PhoneOff className="w-4 h-4" />
            <span>{t('end_call')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Video Stream Placeholder & Consultation Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Video Frame */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between p-4 sm:p-6 text-white">
            {/* Top Bar inside video */}
            <div className="flex items-center justify-between relative z-10">
              <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Secure consultation room
              </span>

              <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-mono font-bold">
                {formatTimer(callDuration)}
              </span>
            </div>

            {/* Main Video Simulation (Doctor representation) */}
            <div className="flex flex-col items-center justify-center my-auto space-y-3 relative z-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-medical-500/15 border border-medical-400/30 flex items-center justify-center">
                <Video className="w-9 h-9 text-medical-300" />
              </div>
              <p className="font-bold text-sm sm:text-base text-slate-100">Ready to meet {doctorName}</p>
              <p className="text-xs text-slate-400 max-w-sm text-center">Turn on your camera, then wait for your clinician to join this secure consultation room.</p>
              {cameraStatus !== 'live' && <button onClick={startCamera} className="px-4 py-2 rounded-xl bg-medical-600 hover:bg-medical-500 text-xs font-bold">Enable camera & microphone</button>}
            </div>

            {/* Self-view PiP (Patient corner) */}
            <div className="absolute bottom-6 right-6 w-28 h-20 sm:w-36 sm:h-24 bg-slate-900/90 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex items-center justify-center text-xs text-slate-300">
              {cameraStatus === 'live' && videoActive ? (
                <video ref={localVideoRef} autoPlay muted playsInline className="h-full w-full object-cover" aria-label="Your camera preview" />
              ) : (
                <div className="flex flex-col items-center gap-1"><User className="w-6 h-6 text-slate-400" /><span className="text-[10px] text-slate-400">Your preview</span></div>
              )}
            </div>

            {/* Bottom Stream Controls */}
            <div className="flex items-center justify-center gap-3 relative z-10 pt-2">
              <button
                onClick={toggleMic}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors shadow-lg ${
                  micActive ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-red-600 text-white'
                }`}
                title="Toggle Mic"
              >
                {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleVideo}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors shadow-lg ${
                  videoActive ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-red-600 text-white'
                }`}
                title="Toggle Video"
              >
                {videoActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={onEndConsultation}
                className="px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Call</span>
              </button>
            </div>
          </div>

          <div className={`p-3 rounded-2xl border text-xs flex items-center gap-2 ${cameraError ? 'bg-red-50 border-red-200 text-red-900' : 'bg-medical-50 border-medical-100 text-medical-900'}`}>
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{cameraError || (cameraStatus === 'live' ? 'Your local camera and microphone are active. A signaling service is required before a remote doctor can join.' : 'Your camera remains private until you explicitly enable it. A clinician can join after your appointment is confirmed.')}</span>
          </div>
        </div>

        {/* Right Col: Consultation Drawer (Chat & Live Prescriptions) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[520px] overflow-hidden">
          {/* Drawer tabs */}
          <div className="flex items-center border-b border-slate-200 p-2 bg-slate-50 gap-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'chat' ? 'bg-white text-medical-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Consultation Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('prescription')}
              className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'prescription' ? 'bg-white text-medical-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Prescription Notes</span>
            </button>
          </div>

          {/* Tab 1: Live Chat */}
          {activeTab === 'chat' ? (
            <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === 'patient' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                      m.sender === 'patient'
                        ? 'bg-medical-600 text-white rounded-br-xs'
                        : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                    }`}>
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Form */}
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type symptoms or questions..."
                  className="flex-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-medical-600"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-xl bg-medical-600 hover:bg-medical-700 text-white flex items-center justify-center shrink-0 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* Tab 2: Doctor Prescription & Notes */
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="font-bold text-slate-900">Live Digital Prescription</h4>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                  Verified by Doctor
                </span>
              </div>

              <div className="space-y-2.5">
                {doctorNotes.map((note, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <p className="font-bold text-slate-900 text-xs">{note.medicine}</p>
                    <p className="text-medical-700 font-semibold">{note.dosage}</p>
                    <p className="text-slate-500 text-[11px]">{note.instructions}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-medical-50 rounded-2xl border border-medical-100 text-medical-900 space-y-1 text-[11px]">
                <p className="font-bold">Advice & Follow-Up:</p>
                <p>Maintain hydration, take light home-cooked meals, and check medicine availability on Gram Aarogya.</p>
              </div>

              <button
                onClick={() => alert('Prescription added to your Digital Health Passport!')}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
              >
                Save to My Health Records
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
