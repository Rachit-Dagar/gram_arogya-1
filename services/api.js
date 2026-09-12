// API client for Gram Aarogya (ग्राम आरोग्य)
// Handles live communication with FastAPI backend with graceful fallback data.

// Leave this empty for Vite's local proxy.  In a deployed frontend set
// VITE_API_BASE=https://your-api.example.com so the assistant does not
// silently try to call a non-existent Vercel /api route.
const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');

async function aiRequest(path, body) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    if (!res.ok) {
      const detail = await res.json().catch(() => ({}));
      throw new Error(detail.detail || `Service unavailable (${res.status})`);
    }
    return res.json();
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('The AI assistant took too long to respond. Please try again.');
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export const api = {
  // --- MEDICINES & PHARMACY (Preserved Phase 1) ---
  searchMedicines: async (query = '', category = '') => {
    let url = `/api/medicines/search?`;
    if (query) url += `q=${encodeURIComponent(query)}&`;
    if (category && category !== 'all') url += `category=${encodeURIComponent(category)}&`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to search medicines');
    return res.json();
  },

  getPopularMedicines: async () => {
    const res = await fetch('/api/medicines/popular');
    if (!res.ok) throw new Error('Failed to fetch popular medicines');
    return res.json();
  },

  getMedicineAvailability: async (medicineId, { lat = 26.6800, lng = 80.9850, radius = 50, sortBy = 'distance', inStockOnly = false } = {}) => {
    const url = `/api/medicines/${medicineId}/availability?lat=${lat}&lng=${lng}&radius_km=${radius}&sort_by=${sortBy}&in_stock_only=${inStockOnly}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch store availability');
    return res.json();
  },

  getPharmacyInventory: async (token, { lowStockOnly = false, search = '' } = {}) => {
    let url = `/api/pharmacy/inventory?low_stock_only=${lowStockOnly}&`;
    if (search) url += `search=${encodeURIComponent(search)}`;
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to load inventory');
    return res.json();
  },

  updateInventoryItem: async (token, inventoryId, data) => {
    const res = await fetch(`/api/pharmacy/inventory/${inventoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update inventory item');
    return res.json();
  },

  addInventoryItem: async (token, data) => {
    const res = await fetch('/api/pharmacy/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to add item');
    }
    return res.json();
  },

  getLowStockAlerts: async (token) => {
    const res = await fetch('/api/pharmacy/low-stock-alerts', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch low stock alerts');
    return res.json();
  },

  uploadCsv: async (token, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/pharmacy/inventory/bulk-upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Upload failed');
    }
    return res.json();
  },

  // --- HOSPITALS & CLINICS ---
  searchHospitals: async ({ query = '', city = 'All', facilityType = 'All', emergencyOnly = false, userLat = 26.6850, userLon = 80.9880 } = {}) => {
    let url = `/api/hospitals/search?user_lat=${userLat}&user_lon=${userLon}&`;
    if (query) url += `query=${encodeURIComponent(query)}&`;
    if (city && city !== 'All') url += `city=${encodeURIComponent(city)}&`;
    if (facilityType && facilityType !== 'All') url += `facility_type=${encodeURIComponent(facilityType)}&`;
    if (emergencyOnly) url += `emergency_only=true&`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch hospitals');
    return res.json();
  },

  getHospitalDetails: async (id) => {
    const res = await fetch(`/api/hospitals/${id}`);
    if (!res.ok) throw new Error('Failed to fetch hospital details');
    return res.json();
  },

  // --- DOCTORS ---
  searchDoctors: async ({ specialty = 'All', city = 'All', consultationMode = 'All', language = 'All', query = '' } = {}) => {
    let url = `/api/doctors/search?`;
    if (specialty && specialty !== 'All') url += `specialty=${encodeURIComponent(specialty)}&`;
    if (city && city !== 'All') url += `city=${encodeURIComponent(city)}&`;
    if (consultationMode && consultationMode !== 'All') url += `consultation_mode=${encodeURIComponent(consultationMode)}&`;
    if (language && language !== 'All') url += `language=${encodeURIComponent(language)}&`;
    if (query) url += `query=${encodeURIComponent(query)}&`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to search doctors');
    return res.json();
  },

  getDoctorProfile: async (id) => {
    const res = await fetch(`/api/doctors/${id}`);
    if (!res.ok) throw new Error('Failed to load doctor profile');
    return res.json();
  },

  submitDoctorVerification: async (data) => {
    const res = await fetch('/api/doctors/verify-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to submit verification');
    return res.json();
  },

  getDoctorVerifications: async () => {
    const res = await fetch('/api/doctors/verifications');
    if (!res.ok) throw new Error('Failed to load verifications');
    return res.json();
  },

  updateDoctorVerificationStatus: async (id, status, notes = '') => {
    const res = await fetch(`/api/doctors/verifications/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes })
    });
    if (!res.ok) throw new Error('Failed to update verification status');
    return res.json();
  },

  // --- APPOINTMENTS ---
  bookAppointment: async (bookingData) => {
    const res = await fetch('/api/appointments/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (!res.ok) throw new Error('Failed to book appointment');
    return res.json();
  },

  getAppointments: async () => {
    const res = await fetch('/api/appointments');
    if (!res.ok) throw new Error('Failed to fetch appointments');
    return res.json();
  },

  cancelAppointment: async (id) => {
    const res = await fetch(`/api/appointments/${id}/cancel`, {
      method: 'PUT'
    });
    if (!res.ok) throw new Error('Failed to cancel appointment');
    return res.json();
  },

  // --- HEALTH RECORDS & PRESCRIPTIONS ---
  getMedicalRecords: async () => {
    const res = await fetch('/api/records');
    if (!res.ok) throw new Error('Failed to load medical records');
    return res.json();
  },

  addMedicalRecord: async (recordData) => {
    const res = await fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recordData)
    });
    if (!res.ok) throw new Error('Failed to save record');
    return res.json();
  },

  simplifyPrescription: async ({ text, doctorName = 'Doctor', hospitalName = 'Hospital' }) => {
    const res = await fetch('/api/records/prescriptions/simplify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prescription_text: text,
        doctor_name: doctorName,
        hospital_name: hospitalName
      })
    });
    if (!res.ok) throw new Error('Failed to simplify prescription');
    return res.json();
  },

  // --- VITALS & CONNECTED HEALTH ---
  getVitals: async () => {
    const res = await fetch('/api/vitals');
    if (!res.ok) throw new Error('Failed to fetch vitals');
    return res.json();
  },

  recordVital: async (vitalData) => {
    const res = await fetch('/api/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vitalData)
    });
    if (!res.ok) throw new Error('Failed to record vital');
    return res.json();
  },

  // --- BLOOD BANKS ---
  getBloodBanks: async ({ city = 'All', group = 'All' } = {}) => {
    let url = `/api/blood-banks?`;
    if (city && city !== 'All') url += `city=${encodeURIComponent(city)}&`;
    if (group && group !== 'All') url += `group=${encodeURIComponent(group)}&`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch blood banks');
    return res.json();
  },

  // --- EXPERT MEDICAL REVIEW ---
  submitExpertReview: async (reviewData) => {
    const res = await fetch('/api/expert-reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    if (!res.ok) throw new Error('Failed to submit expert review case');
    return res.json();
  },

  getExpertReviews: async () => {
    const res = await fetch('/api/expert-reviews');
    if (!res.ok) throw new Error('Failed to load expert reviews');
    return res.json();
  },

  // --- GRAM AAROGYA AI ---
  chatWithAi: async ({ message, language = 'en', conversationHistory = [] }) => {
    return aiRequest('/api/ai/chat', {
      message,
      language,
      conversation_history: conversationHistory
    });
  },

  evaluateSymptomTriage: async (triageData) => {
    return aiRequest('/api/ai/triage', triageData);
  }
};
