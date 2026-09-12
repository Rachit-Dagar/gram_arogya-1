# Gram Arogya (ग्राम आरोग्य) — Master Phase-Wise Task Checklist

**Project:** Gram Arogya (Rural India Healthcare Access Platform)  
**Team:** Vision X  
**Current Phase:** Phase 1 (Completed & Verified)  

---

## Phase 0: Planning & Architecture
- [x] Analyze user specifications and problem statement
- [x] Create comprehensive `implementation_plan.md`
- [x] Create phase-wise structured `task.md`
- [x] Formulate data models, API contracts, security rules, and low-bandwidth rural UX strategy
- [x] User approval received (STOP condition completed)

---

## Phase 1: Medical Store Network (Flagship Innovation — Priority HIGHEST)
- [x] **Database & Models:**
  - [x] `User` model (id, full_name, email, phone, hashed_password, role: patient/pharmacy/doctor/admin, is_active, created_at, updated_at)
  - [x] `MedicalStore` model (id, user_id, store_name, license_number, phone, address, village_or_tehsil, district, state, pincode, latitude, longitude, opening_time, closing_time, is_verified, created_at, updated_at)
  - [x] `Medicine` model (id, brand_name, generic_name, dosage_form, strength, manufacturer, category, prescription_required, standard_usage_notes, created_at)
  - [x] `Inventory` model (id, medical_store_id, medicine_id, stock_quantity, unit_price, mrp, batch_number, expiry_date, min_threshold, last_updated)
  - [x] `InventoryAuditLog` model (id, medical_store_id, medicine_id, change_type, quantity_delta, new_quantity, notes, created_at)
  - [x] Pre-seed database with realistic rural Indian medical stores (Gupta Medical, Jan Aushadhi Kendra, Kisan Seva Chemist, Shanti Medical Hall), 32+ essential medicines, and live inventory
- [x] **Authentication & Security:**
  - [x] JWT authentication with bcrypt password hashing
  - [x] Role-Based Access Control (RBAC): Patient, Pharmacy, Doctor, Admin
  - [x] Secure token endpoints (`/api/auth/login`, `/api/auth/me`)
- [x] **Medicine Search & Geospatial Discovery APIs:**
  - [x] `GET /api/medicines/search` (partial search by brand, generic, or salt name)
  - [x] `GET /api/medicines/{id}/availability` (nearby stores with Haversine distance, stock status, pricing)
  - [x] Sorting support: Distance (nearest first), Price (lowest first), Stock Availability (in-stock first)
  - [x] Subsidized Jan Aushadhi generic alternative recommendation engine (up to 70% savings)
- [x] **Pharmacy Inventory Management APIs:**
  - [x] `GET /api/pharmacy/inventory` (paginated store stock with filter by low stock)
  - [x] `PUT /api/pharmacy/inventory/{id}` (single medicine stock update, +/- retail adjustments, audit log)
  - [x] `POST /api/pharmacy/inventory` (add new medicine to pharmacy inventory)
  - [x] `POST /api/pharmacy/inventory/bulk-upload` (CSV upload with row validation & batch insertion)
  - [x] `GET /api/pharmacy/low-stock-alerts` (urgent alerts for items below safety threshold with stockout forecast)
  - [x] `GET /api/pharmacy/template` (downloadable CSV sample template)
- [x] **Frontend (React + Vite + Tailwind CSS):**
  - [x] Responsive, rural-friendly mobile-first UI with high contrast and touch-friendly targets
  - [x] Bilingual Hindi (हिन्दी) & English toggle with lightweight `i18n` context
  - [x] Patient Medicine Availability Search screen (filters by radius, sort by distance/price/stock, store cards, direct call button, map links)
  - [x] Pharmacy Inventory Dashboard (counter-friendly stock increments/decrements, inline editing, low-stock warning banners)
  - [x] Bulk CSV Upload modal with downloadable CSV template and error reporting
  - [x] 1-Click quick demo role login switcher
- [x] **Testing & Verification:**
  - [x] Automated tests for search, availability sorting, and RBAC permissions (`test_phase1.py` - 10/10 passed)
  - [x] Live API verification on running server (`http://127.0.0.1:8000`)
  - [x] Production compilation test (`npm run build` - 0 errors)

---

## Phase 2: Doctor & Hospital Discovery
- [ ] **Database & Models:**
  - [ ] `Hospital` / `Clinic` model (name, facility_type, address, location coordinates, emergency_available, contact)
  - [ ] `Doctor` model (name, specialization, qualification, registration_no, hospital_id, consultation_fee, experience_years)
  - [ ] `DoctorSchedule` / `Slot` model (doctor_id, day_of_week, start_time, end_time, slot_duration, max_patients)
  - [ ] `Appointment` model (patient_id, doctor_id, slot_time, status: scheduled/completed/cancelled, token_number)
- [ ] **APIs:**
  - [ ] `GET /api/doctors/search` (filter by specialization, location, day, fee)
  - [ ] `GET /api/hospitals/nearby` (facilities with available doctors & emergency facilities)
  - [ ] `POST /api/appointments/book` (token generation, booking confirmation)
  - [ ] `GET /api/doctors/{id}/availability-status` (Live status: Available Today / On Leave / Next Slot)
- [ ] **Frontend:**
  - [ ] Doctor & Hospital Directory with real-time status badges
  - [ ] Bilingual Doctor Profile & Appointment Booking flow with printable/savable token slip

---

## Phase 3: AI Assistant (Patient Support & Front-Desk Automation)
- [ ] **Curated Dataset & Guardrails:**
  - [ ] Curate WHO/National Health Mission essential health guidelines & medicine intake instructions (strictly verified knowledge base)
  - [ ] Define strict guardrails: **No open-ended medical diagnoses or prescription guessing**
- [ ] **Backend RAG & NLP Engine:**
  - [ ] pgvector / local embedding search over curated knowledge base
  - [ ] Prescription Dosage Explainer API (translates "1-0-1 after food" into clear Hindi/English instructions)
  - [ ] Clinic Front-Desk Intake & FAQ Chat API (clinic timings, specialist availability, pre-visit checklist)
- [ ] **Frontend:**
  - [ ] Clean conversational AI assistant widget with bilingual audio/text support
  - [ ] Prominent medical disclaimer and emergency helpline shortcuts (108/102)

---

## Phase 4: Patient Medical History & Digital Prescriptions
- [ ] **Database & Models:**
  - [ ] `PatientProfile` model (ABHA ID/mobile, emergency contact, blood group)
  - [ ] `Prescription` model (doctor_id, patient_id, diagnosis, medicines_prescribed_json, advice, created_at)
  - [ ] `VisitRecord` model (consultation date, symptoms, vital signs)
  - [ ] `Allergy` model (allergen, severity, diagnosed_date)
- [ ] **Privacy & Access Control:**
  - [ ] Strict role boundaries: Pharmacies see only prescribed medicine names & dosages for dispensing; patient diagnosis is strictly hidden
  - [ ] OTP / Patient Consent-based access for new doctors
- [ ] **Frontend:**
  - [ ] Doctor digital prescription writer with auto-complete from medicine master
  - [ ] Patient "Health Passport" mobile timeline showing chronological consultations & prescriptions

---

## Phase 5: Test Reports + Multilingual Read-Aloud (TTS)
- [ ] **Database & Storage:**
  - [ ] `TestReport` model (patient_id, test_type, report_date, file_url, parsed_values_json)
  - [ ] Secure local/cloud media storage handler
- [ ] **Lab Report Parser:**
  - [ ] Extract key lab markers (Hemoglobin, Fasting Blood Sugar, Platelets, Blood Pressure, Cholesterol)
  - [ ] Comparison against standard reference ranges (Normal, Low, High, Critical)
- [ ] **Multilingual Text-to-Speech (TTS):**
  - [ ] Pluggable TTS architecture (Backend TTS audio generation with Web Speech API browser fallback)
  - [ ] Fluent, natural Hindi and English reading of report findings in simple rural terms
- [ ] **Frontend:**
  - [ ] Mobile-camera friendly report uploader
  - [ ] Diagnostic Values Card with intuitive color badges and 1-tap "Read Aloud in Hindi / English"

---

## Phase 6: Final Integration, Performance & Security Audit
- [ ] End-to-end integration tests connecting patient search -> pharmacy stock -> doctor prescription -> lab report
- [ ] Low-bandwidth optimization (payload minification, offline fallback caching, SVG asset compression)
- [ ] Security audit (RBAC enforcement, data encryption, SQL injection/XSS protection)

---

## Phase 7: Containerization & Deployment
- [ ] `docker-compose.yml` orchestrating PostgreSQL (with pgvector), FastAPI backend, and React/Vite frontend
- [ ] Deployment scripts & configurations for zero-downtime hosting on cloud platforms (Render / Railway)
- [ ] Comprehensive documentation and demo walkthrough
