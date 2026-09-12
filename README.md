# GRAM AAROGYA (ग्राम आरोग्य)

> **"Healthcare, connected to you."**  
> *Connected healthcare for every community — serving rural, semi-urban, and urban India.*

Gram Aarogya is a universal Indian healthcare access and connected care platform. Inspired by calm, minimal, high-trust healthcare technology design, it bridges patients, families, verified doctors, clinics, tertiary hospitals, diagnostic centers, and local pharmacies into a single unified health ecosystem.

Whether in major metropolitan hubs (Bengaluru, Mumbai, Delhi, Pune), tier-2/3 cities, or rural tehsils and primary health centres (Mohanlalganj), Gram Aarogya connects every citizen to trusted clinical care, emergency support, and essential medicines.

---

## 🌟 Core Platform Features

### 1. Healthcare Discovery ("Find Care")
- **Multi-Facility Geospatial Search**: Discover hospitals, community health centres (CHCs/PHCs), private clinics, diagnostic pathology labs, pharmacies, and blood banks.
- **Radar Distance Map & List View**: Interactive distance circles and geolocation sorting based on Haversine proximity.
- **Critical Facility Filters**: Filter by 24x7 Emergency Trauma availability, ICU bed count, specialties, and open-now status.

### 2. Verified Doctor Directory & Credential Registry
- **Specialist Discovery**: Find verified doctors across Cardiology, General Medicine, Pediatrics, Orthopedics, Gynecology, Dermatology, Neurology, and Psychiatry.
- **✓ Verified Doctor Badge**: Doctor profiles show verified registration numbers under the National Medical Commission (NMC) and State Medical Councils.
- **"Join as a Doctor" & Admin Queue**: Self-onboarding credential review flow with status tracking (Pending, Under Review, Verified).

### 3. Smart Appointment Scheduling
- **Step-by-Step Clinical Booking**: Doctor selection -> Clinic/Hospital -> Date & Available Time Slots -> Consultation Mode.
- **In-Person & Online Video Consultations**: Choose between visiting the local clinic or attending from home.
- **Digital Token Slip**: Instant printable and savable appointment tokens with QR representation.

### 4. Telemedicine Consultation Room
- **Simulated High-Fidelity Video Consultation**: Encrypted WebRTC-style stream simulation with camera/microphone controls, call timer, and active audio visualizer.
- **Integrated Clinical Drawer**: Real-time consultation chat, shared diagnostic reports, and live doctor prescription notes.

### 5. Digital Health Records ("Health Passport")
- **Encrypted Clinical Vault**: Store complete blood counts (CBC), lipid profiles, ECG scans, and discharge summaries.
- **Time-Limited Doctor Sharing**: Generate a temporary 4-digit security PIN and QR code for external physician access, with 1-tap revocation.
- **Parsed Biomarker Tracking**: Visual reference ranges for Hemoglobin, Fasting Blood Sugar, Platelets, and Cholesterol.

### 6. Prescription Simplifier ("Understand Your Prescription")
- **Side-by-Side Clarity**: Displays original clinical handwriting/text alongside a clear, structured educational explanation.
- **Clinical Notation Breakdown**: Translates patterns like `1-0-1 after meals` or `1-0-0 before breakfast` into plain language with food instructions.
- **Strict Safety Disclaimers**: Never alters dosages, never overrides the treating physician, and explicitly highlights illegible sections with the mandatory warning: *"This part of the prescription is unclear. Please confirm with your doctor or pharmacist."* Includes an *"Ask a Doctor"* escalation button.

### 7. Gram Aarogya AI & Symptom Guidance (Triage)
- **Universal Healthcare Assistant**: Conversational guidance covering healthcare navigation, medical term explanation, and pre-consultation question preparation.
- **AI Symptom Guidance (Triage Engine)**:
  - 🔴 **RED**: Immediate emergency hospital / 108 ambulance dispatch required.
  - 🟡 **YELLOW**: Timely physician evaluation recommended within 24 to 48 hours.
  - 🟢 **GREEN**: Mild self-limiting symptoms; supportive home care and monitoring advised.
- **Four Language Prompting**: Fluent bilingual communication in English, हिन्दी (Hindi), मराठी (Marathi), and ಕನ್ನಡ (Kannada).

### 8. Connected Health & Vitals
- **Biometric Hub**: Track Blood Pressure, Heart Rate (Pulse), Blood Oxygen (SpO2), Blood Glucose, Body Temperature, and Weight.
- **Sparkline Trends & Normal Ranges**: Visual indication of therapeutic stability over 7-day windows.
- **Simulated Device Pairing**: Clean abstraction ready for Apple Health, Google Health Connect, and Bluetooth monitors.

### 9. Flagship Medical Store Network & Pharmacy Portal (Phase 1 Preserved)
- **Live Chemist Inventory**: Search medicine brand names (*Dolo 650*, *Augmentin 625*, *Pan 40*) or generic salts (*Paracetamol*, *Amoxicillin + Clavulanate*).
- **Jan Aushadhi Subsidized Alternatives**: Recommends government generic alternatives offering up to 70% cost savings.
- **Pharmacy Inventory Desk**: Counter-friendly `+` and `-` retail dispensing adjustments, critical low-stock alert center with days-to-stockout forecasts, and bulk CSV upload.

### 10. Real-time Blood Bank Finder
- **8 Blood Groups**: Immediate stock availability across A+, A-, B+, B-, AB+, AB-, O+, and O-.
- **Direct Hospital Dialing**: One-tap phone connection to verify cross-matching before traveling.

### 11. Wholesome Indian Nutrition Guide
- **Nourishment-First Philosophy**: Educational tracking of Protein, Iron, Calcium, Vitamin B12, and Dietary Fiber without promoting restrictive diets or extreme calorie restriction.
- **Affordable Indian Staples**: Traditional vegetarian and non-vegetarian food sources (Moong Dal, Sprouted Chana, Ragi, Paneer, Curd, Fish, Eggs).

### 12. Government Health Services
- **Official Government Portals Only**: Direct, verified links to ABHA (Ayushman Bharat Health Account), ABDM, eSanjeevani Teleconsultation, PM-JAY (₹5 Lakh Cashless Cover), and PMBJP (Jan Aushadhi).
- **Toll-Free Helplines**: 1800-180-8080 (Jan Aushadhi), 14555 (PM-JAY), 1075 (NHM).

### 13. 24x7 Emergency Care Mode
- **High-Contrast SOS Screen**: Large one-touch direct dial buttons for 108 (Ambulance), 112 (National Emergency), and 102 (Janani Seva).
- **Nearest ICU & Blood Units**: Fast spatial routing to the closest facility with intensive care beds.
- **Personal Medical ID**: Offline-cached blood group, known allergies, chronic medications, and emergency family contacts.

### 14. 4-Language Internationalization (i18n)
- Seamless real-time switching between **English**, **हिन्दी (Hindi)**, **मराठी (Marathi)**, and **ಕನ್ನಡ (Kannada)** across all screens, navigation, and dialogs.
- Typographic support with Google Noto Sans Devanagari and Noto Sans Kannada.

### 15. Offline Resilience & Low-Connectivity PWA
- Automatic background caching of emergency helplines, nearby trauma centers, personal medical ID, and recent appointments.
- Floating *"You're offline"* indicator providing immediate access to the offline emergency vault.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS with custom Apple-inspired light healthcare tokens, Lucide React icons.
- **Backend**: Python 3.10+, FastAPI, SQLAlchemy ORM, Pydantic v2.
- **Database**: SQLite (built-in zero-config local engine) / PostgreSQL.
- **Security**: JWT Authentication with bcrypt hashing, Role-Based Access Control (Patient, Pharmacy, Doctor, Admin), encrypted health record abstractions.
- **Testing**: Pytest automated test suite covering authentication, proximity algorithms, pharmacy inventory deltas, bulk CSV sync, hospital search, appointment scheduling, and AI triage logic.

---

## 👥 Demo Personas & Testing Credentials

| Role | Name | Mobile | Password | Key Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Patient** | Ram Lal Patel | `9810066006` | `patient123` | Search care, book appointments, view vitals & prescriptions |
| **Doctor** | Dr. Arvind Sharma (MBBS, MD) | `9810055005` | `doctor123` | Telemedicine consultation, verification status |
| **Pharmacy 1** | Ramesh Gupta (Gupta Medical) | `9810011001` | `pharmacy123` | Live stock adjustments, low stock alerts, CSV sync |
| **Pharmacy 2** | Pradeep (Jan Aushadhi Kendra) | `9810022002` | `pharmacy123` | Subsidized generic chemist store |
| **Admin** | District Health Officer | `9876543210` | `admin123` | Doctor verification queue & network oversight |

---

## 🚀 Quick Start Guide

### 1. Launch Servers Together
Run the included batch launcher:
```powershell
.\start_all.bat
```
This automatically launches both the FastAPI backend server (`http://127.0.0.1:8000`) and the Vite development server (`http://localhost:5173`).

### 2. Start Servers Individually

#### Backend (Port 8000)
```powershell
.\start_backend.bat
# or directly:
.venv\Scripts\python.exe backend\run.py
```
- Interactive API Swagger UI: `http://127.0.0.1:8000/docs`
- Health Endpoint: `http://127.0.0.1:8000/health`

#### Frontend (Port 5173)
```powershell
.\start_frontend.bat
# or directly:
cd frontend
npm run dev
```
- Web Application: `http://localhost:5173`

### 3. Run Automated Tests
```powershell
.venv\Scripts\python.exe -m pytest backend/tests/ -v
```
All 19 test cases verify:
- Health check and system metadata
- Patient and pharmacy authentication & RBAC
- Medicine search and Haversine distance proximity
- Pharmacy inventory deltas and bulk CSV upload
- Hospital and doctor geospatial search
- Appointment booking and token slip generation
- Prescription Simplifier clinical notation parsing
- Vitals recording and trend history
- Blood bank stock across 8 blood groups
- Gram Aarogya AI chat and symptom triage logic (RED / YELLOW / GREEN)

---

## 📄 License & Safety Notice
*Gram Aarogya is an educational and connected health navigation platform. Medical simplifications, triage indicators, and AI responses are purely informative and do not constitute clinical diagnosis or replacement for a licensed healthcare practitioner. In acute emergencies, always dial 108 / 112 immediately.*
