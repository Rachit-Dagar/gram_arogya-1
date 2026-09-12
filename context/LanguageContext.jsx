import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    app_name: "Gram Aarogya",
    app_name_regional: "ग्राम आरोग्य",
    tagline: "Healthcare, connected to you.",
    subtitle: "Find trusted doctors, hospitals, medicines, health services and expert care — wherever you are.",
    
    // Navigation
    nav_home: "Home",
    nav_find_care: "Find Care",
    nav_doctors: "Doctors",
    nav_hospitals: "Hospitals & Clinics",
    nav_appointments: "Appointments",
    nav_records: "Health Records",
    nav_medicines: "Medicines",
    nav_blood_banks: "Blood Banks",
    nav_ai: "AI Assistant",
    nav_nutrition: "Nutrition",
    nav_govt: "Government Services",
    nav_emergency: "Emergency 108 / 112",
    search_tab: "Find Medicine Availability",
    pharmacy_tab: "Pharmacy Portal",
    
    // Primary CTAs
    cta_find_care: "Find Healthcare Near Me",
    cta_talk_ai: "Talk to Gram Aarogya AI",
    cta_emergency: "Emergency Help",
    
    // Auth & Profile
    login: "Login",
    logout: "Logout",
    guest_patient: "Citizen (Patient)",
    profile: "Profile",
    role: "Role",
    notifications: "Notifications",
    
    // Hero & Discovery
    hero_title: "Healthcare, connected to you.",
    hero_desc: "Find trusted healthcare near you, book appointments, manage health records, understand prescriptions, and connect with doctors — all in one place.",
    search_how_help: "How can we help you today?",
    search_examples_label: "Try searching:",
    
    // Discovery options
    filter_all: "All",
    filter_hospitals: "Hospitals",
    filter_clinics: "Clinics",
    filter_phc: "Primary Health Centres",
    filter_diagnostic: "Diagnostic Centres",
    filter_emergency_only: "Emergency 24x7 Only",
    open_now: "Open Now",
    distance: "Distance",
    icu_beds: "ICU Beds",
    
    // Doctors
    doctor_title: "Find Verified Doctors",
    doctor_subtitle: "Book in-person appointments at trusted clinics or consult online via video",
    filter_specialty: "Specialty",
    join_as_doctor: "Join as a Doctor",
    verified_badge: "Verified Doctor",
    consultation_fee: "Consultation Fee",
    book_appointment: "Book Appointment",
    experience: "Experience",
    years: "years",
    
    // Appointments
    appointment_title: "Your Appointments",
    appointment_step1: "1. Select Doctor",
    appointment_step2: "2. Choose Date & Time",
    appointment_step3: "3. Mode of Consultation",
    in_person: "In-Person Consultation",
    online_video: "Online Video Consultation",
    token_slip: "Appointment Token Slip",
    confirm_booking: "Confirm Booking",
    
    // Telemedicine
    telemedicine_room: "Gram Aarogya Telemedicine Consultation",
    start_call: "Join Consultation",
    end_call: "End Consultation",
    camera_on: "Camera On",
    mic_on: "Mic Active",
    chat_with_doc: "Consultation Notes & Chat",
    
    // Health Records
    records_title: "Digital Health Records",
    records_subtitle: "Safe, encrypted repository for your lab tests, prescriptions, and scans",
    upload_record: "Upload Record",
    share_record: "Share Securely",
    download: "Download",
    
    // Prescription Simplifier
    prescription_title: "Understand Your Prescription",
    prescription_subtitle: "Educational simplification of clinical notation, timing, and medicine instructions",
    original_prescription: "Original Prescription",
    simplified_explanation: "Simplified Explanation",
    ask_doctor_btn: "Ask a Doctor",
    timing_with_food: "Timing & Food",
    dosage_pattern: "Dosage Pattern",
    clinical_purpose: "Purpose",
    unclear_warning: "This part of the prescription is unclear. Please confirm it with your doctor or pharmacist.",
    
    // Gram Aarogya AI
    ai_title: "Gram Aarogya AI Assistant",
    ai_desc: "AI-powered healthcare access and guidance for everyone",
    ask_ai_placeholder: "Ask about symptoms, medical terms, appointments, or prescriptions...",
    ai_disclaimer: "Gram Aarogya AI provides educational information and is NOT a substitute for professional medical diagnosis or treatment.",
    symptom_triage_btn: "Check Symptoms (Triage)",
    
    // Connected Health
    vitals_title: "Connected Health & Vitals",
    vitals_subtitle: "Track vital markers from home monitors and wearable devices",
    connect_device: "Connect Device",
    record_reading: "Log Reading",
    heart_rate: "Heart Rate",
    blood_pressure: "Blood Pressure",
    spo2: "SpO2 (Oxygen)",
    blood_sugar: "Blood Glucose",
    temperature: "Temperature",
    
    // Blood Banks
    blood_banks_title: "Blood Bank Availability",
    blood_banks_subtitle: "Real-time stock across all 8 blood groups in your area",
    confirm_before_travel: "Please call the blood bank to confirm availability before traveling.",
    
    // Nutrition
    nutrition_title: "Healthy Nutrition Guide",
    nutrition_subtitle: "Educational guide for balanced Indian nutrition — vegetarian and non-vegetarian",
    log_food: "Log Food Item",
    daily_nutrients: "Key Nutrient Goals",
    
    // Government Services
    govt_title: "Government Health Services",
    govt_subtitle: "Access official public health initiatives, schemes, and registries safely",
    official_portal: "Official Government Portal",
    
    // Emergency Mode
    emergency_title: "Emergency Care Mode",
    emergency_subtitle: "Immediate access to life-saving emergency services, nearest ICUs, and medical ID",
    call_108: "Call 108 (Ambulance)",
    call_112: "Call 112 (National Emergency)",
    call_102: "Call 102 (Janani/Child)",
    my_medical_id: "Personal Medical ID (Emergency)",
    
    // Offline
    offline_notice: "You are currently offline. Viewing cached emergency information and appointments.",
    
    // Pharmacy / Medicines
    search_placeholder: "Search medicine brand, salt, or generic name (e.g. Dolo, Paracetamol, Augmentin)...",
    search_btn: "Search Medicine",
    popular_searches: "Frequently Searched Essential Medicines:",
    filter_category: "Category:",
    in_stock_only: "In-Stock Only",
    radius: "Radius:",
    sort_by: "Sort By:",
    sort_distance: "Nearest Distance",
    sort_price: "Lowest Price",
    sort_stock: "Highest Stock",
    stores_available: "Stores with stock",
    price_from: "Price from:",
    view_nearby_stores: "View Nearby Pharmacies",
    hide_stores: "Hide Pharmacy List",
    jan_aushadhi_badge: "Jan Aushadhi Generic Available (Subsidized)",
    jan_aushadhi_savings: "Save up to 70% with Jan Aushadhi!",
    generic_salt: "Generic Salt:",
    store_name: "Medical Store",
    verified_pharmacy: "Verified Chemist",
    in_stock: "In Stock",
    low_stock_tag: "Low Stock",
    out_of_stock: "Out of Stock",
    unit_price: "Selling Price",
    mrp: "MRP",
    savings: "Savings",
    distance_away: "away",
    call_store: "Call Store",
    get_directions: "Directions (Maps)",
    last_updated: "Last Updated",
    operating_hours: "Hours"
  },
  hi: {
    app_name: "ग्राम आरोग्य",
    app_name_regional: "ग्राम आरोग्य",
    tagline: "स्वास्थ्य सेवा, आपके पास।",
    subtitle: "भरोसेमंद डॉक्टर, अस्पताल, दवाएं, स्वास्थ्य सेवाएं और विशेषज्ञ परामर्श खोजें — आप जहां भी हों।",
    
    nav_home: "होम",
    nav_find_care: "सेवाएं खोजें",
    nav_doctors: "डॉक्टर",
    nav_hospitals: "अस्पताल व क्लिनिक",
    nav_appointments: "अपॉइंटमेंट्स",
    nav_records: "स्वास्थ्य रिकॉर्ड",
    nav_medicines: "दवाएं",
    nav_blood_banks: "ब्लड बैंक",
    nav_ai: "एआई सहायक",
    nav_nutrition: "पोषण",
    nav_govt: "सरकारी योजनाएं",
    nav_emergency: "आपातकालीन 108 / 112",
    search_tab: "दवा उपलब्धता खोजें",
    pharmacy_tab: "मेडिकल स्टोर पोर्टल",
    
    cta_find_care: "नजदीकी स्वास्थ्य सेवा खोजें",
    cta_talk_ai: "ग्राम आरोग्य एआई से बात करें",
    cta_emergency: "आपातकालीन सहायता",
    
    login: "लॉगिन करें",
    logout: "लॉगआउट",
    guest_patient: "नागरिक (मरीज)",
    profile: "प्रोफ़ाइल",
    role: "भूमिका",
    notifications: "सूचनाएं",
    
    hero_title: "स्वास्थ्य सेवा, आपके पास।",
    hero_desc: "नजदीकी विश्वसनीय स्वास्थ्य केंद्र खोजें, डॉक्टर अपॉइंटमेंट लें, स्वास्थ्य रिकॉर्ड सुरक्षित रखें, और परचा समझें — सब एक ही मंच पर।",
    search_how_help: "आज हम आपकी क्या मदद कर सकते हैं?",
    search_examples_label: "खोजने के लिए उदाहरण:",
    
    filter_all: "सभी",
    filter_hospitals: "अस्पताल",
    filter_clinics: "क्लिनिक",
    filter_phc: "प्राथमिक स्वास्थ्य केंद्र (PHC)",
    filter_diagnostic: "जांच केंद्र (पैथोलॉजी)",
    filter_emergency_only: "केवल 24x7 आपातकालीन",
    open_now: "खुला है",
    distance: "दूरी",
    icu_beds: "आईसीयू बेड",
    
    doctor_title: "सत्यापित डॉक्टर खोजें",
    doctor_subtitle: "क्लिनिक में प्रत्यक्ष परामर्श या घर बैठे वीडियो परामर्श बुक करें",
    filter_specialty: "विशेषज्ञता",
    join_as_doctor: "डॉक्टर के रूप में जुड़ें",
    verified_badge: "सत्यापित डॉक्टर",
    consultation_fee: "परामर्श शुल्क",
    book_appointment: "अपॉइंटमेंट बुक करें",
    experience: "अनुभव",
    years: "वर्ष",
    
    appointment_title: "आपकी अपॉइंटमेंट्स",
    appointment_step1: "1. डॉक्टर चुनें",
    appointment_step2: "2. दिन व समय चुनें",
    appointment_step3: "3. परामर्श का प्रकार",
    in_person: "क्लिनिक में प्रत्यक्ष परामर्श",
    online_video: "ऑनलाइन वीडियो परामर्श",
    token_slip: "अपॉइंटमेंट टोकन पर्ची",
    confirm_booking: "बुकिंग सुरक्षित करें",
    
    telemedicine_room: "ग्राम आरोग्य टेलीमेडिसिन कक्ष",
    start_call: "परामर्श शुरू करें",
    end_call: "परामर्श समाप्त करें",
    camera_on: "कैमरा चालू",
    mic_on: "माइक चालू",
    chat_with_doc: "डॉक्टर नोट्स एवं चैट",
    
    records_title: "डिजिटल स्वास्थ्य रिकॉर्ड",
    records_subtitle: "अपनी जांच रिपोर्ट, पर्चे और एक्स-रे सुरक्षित डिजिटल रूप में रखें",
    upload_record: "नया रिकॉर्ड जोड़ें",
    share_record: "सुरक्षित शेयर करें",
    download: "डाउनलोड",
    
    prescription_title: "अपना परचा समझें",
    prescription_subtitle: "डॉक्टर के पर्चे की दवाएं, खुराक और समय को सरल भाषा में समझें",
    original_prescription: "मूल परचा",
    simplified_explanation: "सरल व्याख्या",
    ask_doctor_btn: "डॉक्टर से पूछें",
    timing_with_food: "दवा का समय व भोजन",
    dosage_pattern: "खुराक का नियम",
    clinical_purpose: "उपयोग",
    unclear_warning: "पर्चे का यह भाग स्पष्ट नहीं है। कृपया अपने डॉक्टर या फार्मासिस्ट से पुष्टि करें।",
    
    ai_title: "ग्राम आरोग्य एआई सहायक",
    ai_desc: "सभी नागरिकों के लिए स्वास्थ्य मार्गदर्शन",
    ask_ai_placeholder: "लक्षणों, दवाओं, डॉक्टरों या सरकारी योजनाओं के बारे में पूछें...",
    ai_disclaimer: "ग्राम आरोग्य एआई केवल शैक्षणिक जानकारी प्रदान करता है, यह पेशेवर चिकित्सकीय निदान का विकल्प नहीं है।",
    symptom_triage_btn: "लक्षण जांचें (Triage)",
    
    vitals_title: "स्वास्थ्य निगरानी (Vitals)",
    vitals_subtitle: "ब्लड प्रेशर, पल्स, शुगर व ऑक्सीजन स्तर को रिकॉर्ड करें",
    connect_device: "डिवाइस कनेक्ट करें",
    record_reading: "रीडिंग दर्ज करें",
    heart_rate: "हृदय गति (Heart Rate)",
    blood_pressure: "रक्तचाप (Blood Pressure)",
    spo2: "ऑक्सीजन (SpO2)",
    blood_sugar: "ब्लड शुगर",
    temperature: "तापमान",
    
    blood_banks_title: "ब्लड बैंक उपलब्धता",
    blood_banks_subtitle: "अपने क्षेत्र में सभी 8 रक्त समूहों का लाइव स्टॉक देखें",
    confirm_before_travel: "कृपया जाने से पहले ब्लड बैंक को कॉल करके उपलब्धता अवश्य सुनिश्चित करें।",
    
    nutrition_title: "स्वस्थ पोषण मार्गदर्शिका",
    nutrition_subtitle: "संतुलित भारतीय भोजन (शाकाहारी व मांसाहारी) की सरल समझ",
    log_food: "भोजन दर्ज करें",
    daily_nutrients: "दैनिक आवश्यक पोषक तत्व",
    
    govt_title: "सरकारी स्वास्थ्य सेवाएं",
    govt_subtitle: "आभा (ABHA), आयुष्मान भारत (PM-JAY) व जन औषधि केंद्र",
    official_portal: "आधिकारिक सरकारी पोर्टल",
    
    emergency_title: "आपातकालीन सेवा मोड",
    emergency_subtitle: "24x7 एम्बुलेंस (108), निकटतम आईसीयू और आपातकालीन मेडिकल आईडी",
    call_108: "कॉल 108 (एम्बुलेंस)",
    call_112: "कॉल 112 (राष्ट्रीय आपातकाल)",
    call_102: "कॉल 102 (जननी सेवा)",
    my_medical_id: "मेरी मेडिकल आईडी (आपातकालीन)",
    
    offline_notice: "आप अभी ऑफलाइन हैं। पहले से सहेजी गई जानकारी व अपॉइंटमेंट प्रदर्शित हो रहे हैं।",
    
    search_placeholder: "दवा का नाम, साल्ट या जेनेरिक नाम लिखें (उदा. Dolo, Paracetamol, Augmentin)...",
    search_btn: "दवा खोजें",
    popular_searches: "अक्सर खोजी जाने वाली आवश्यक दवाएं:",
    filter_category: "श्रेणी:",
    in_stock_only: "केवल उपलब्ध स्टॉक",
    radius: "दूरी सीमा:",
    sort_by: "क्रमबद्ध करें:",
    sort_distance: "निकटतम दूरी",
    sort_price: "न्यूनतम मूल्य",
    sort_stock: "सर्वाधिक स्टॉक",
    stores_available: "दुकानों में उपलब्ध",
    price_from: "शुरुआती मूल्य:",
    view_nearby_stores: "नजदीकी मेडिकल स्टोर देखें",
    hide_stores: "स्टोर सूची छुपाएं",
    jan_aushadhi_badge: "जन औषधि केंद्र विकल्प उपलब्ध (कम दाम)",
    jan_aushadhi_savings: "जन औषधि पर 70% तक की बचत!",
    generic_salt: "साल्ट / जेनेरिक:",
    store_name: "मेडिकल स्टोर",
    verified_pharmacy: "सत्यापित केमिस्ट",
    in_stock: "स्टॉक में उपलब्ध",
    low_stock_tag: "कम स्टॉक",
    out_of_stock: "स्टॉक समाप्त",
    unit_price: "विक्रय मूल्य",
    mrp: "MRP",
    savings: "बचत",
    distance_away: "की दूरी",
    call_store: "कॉल करें",
    get_directions: "रास्ता देखें",
    last_updated: "अंतिम अपडेट",
    operating_hours: "समय"
  },
  mr: {
    app_name: "ग्राम आरोग्य",
    app_name_regional: "ग्राम आरोग्य",
    tagline: "आरोग्य सेवा, तुमच्या जवळ.",
    subtitle: "विश्वासू डॉक्टर्स, रुग्णालये, औषधे आणि तज्ज्ञ सल्ला मिळवा — तुम्ही कुठेही असला तरी.",
    
    nav_home: "मुख्यपृष्ठ",
    nav_find_care: "आरोग्य सेवा",
    nav_doctors: "डॉक्टर",
    nav_hospitals: "रुग्णालये व दवाखाने",
    nav_appointments: "अपॉइंटमेंट्स",
    nav_records: "आरोग्य नोंदी",
    nav_medicines: "औषधे",
    nav_blood_banks: "रक्तपेढ्या",
    nav_ai: "एआय सहाय्यक",
    nav_nutrition: "पोषण",
    nav_govt: "शासकीय योजना",
    nav_emergency: "आपत्कालीन 108 / 112",
    search_tab: "औषध उपलब्धता",
    pharmacy_tab: "फार्मसी पोर्टल",
    
    cta_find_care: "जवळची आरोग्य सेवा शोधा",
    cta_talk_ai: "ग्राम आरोग्य एआय शी बोला",
    cta_emergency: "आपत्कालीन मदत",
    
    login: "लॉगिन",
    logout: "लॉगआउट",
    guest_patient: "नागरिक (रुग्ण)",
    profile: "प्रोफाइल",
    role: "भूमिका",
    notifications: "सूचना",
    
    hero_title: "आरोग्य सेवा, तुमच्या जवळ.",
    hero_desc: "जवळची खात्रीशीर रुग्णालये शोधा, डॉक्टरांशी भेटीचे नियोजन करा, डिजिटल नोंदी ठेवा आणि डॉक्टरांचे प्रिस्क्रिप्शन सोप्या भाषेत समजून घ्या.",
    search_how_help: "आज आम्ही तुम्हाला कशी मदत करू शकतो?",
    search_examples_label: "शोधण्यासाठी उदाहरणे:",
    
    filter_all: "सर्व",
    filter_hospitals: "रुग्णालये",
    filter_clinics: "दवाखाने",
    filter_phc: "प्राथमिक आरोग्य केंद्र (PHC)",
    filter_diagnostic: "निदान केंद्र (पॅथॉलॉजी)",
    filter_emergency_only: "फक्त 24x7 आपत्कालीन",
    open_now: "सध्या सुरू",
    distance: "अंतर",
    icu_beds: "आयसीयू बेड्स",
    
    doctor_title: "तज्ज्ञ डॉक्टर शोधा",
    doctor_subtitle: "क्लिनिक भेटीसाठी किंवा ऑनलाइन व्हिडिओद्वारे सल्लामसलत बुक करा",
    filter_specialty: "विशेषज्ञता",
    join_as_doctor: "डॉक्टर म्हणून नोंदणी करा",
    verified_badge: "प्रमाणित डॉक्टर",
    consultation_fee: "तपासणी फी",
    book_appointment: "अपॉइंटमेंट बुक करा",
    experience: "अनुभव",
    years: "वर्षे",
    
    appointment_title: "तुमच्या अपॉइंटमेंट्स",
    appointment_step1: "1. डॉक्टर निवडा",
    appointment_step2: "2. दिवस व वेळ निवडा",
    appointment_step3: "3. सल्लामसलतीचा प्रकार",
    in_person: "क्लिनिकमध्ये थेट तपासणी",
    online_video: "ऑनलाइन व्हिडिओ सल्ला",
    token_slip: "टोकन पावती",
    confirm_booking: "बुकिंग निश्चित करा",
    
    telemedicine_room: "ग्राम आरोग्य टेलिमेडिसिन कक्ष",
    start_call: "सल्ला सुरू करा",
    end_call: "कॉल समाप्त करा",
    camera_on: "कॅमेरा सुरू",
    mic_on: "माइक सुरू",
    chat_with_doc: "डॉक्टर नोट्स व चॅट",
    
    records_title: "डिजिटल आरोग्य नोंदी",
    records_subtitle: "तुमचे सर्व वैद्यकीय अहवाल आणि चाचण्या सुरक्षितपणे साठवा",
    upload_record: "नोंद अपलोड करा",
    share_record: "सुरक्षित शेअर करा",
    download: "डाउनलोड",
    
    prescription_title: "तुमचे प्रिस्क्रिप्शन समजून घ्या",
    prescription_subtitle: "औषधांची नावे, घेण्याची वेळ आणि प्रमाण समजून घेण्यास मदत",
    original_prescription: "मूळ प्रिस्क्रिप्शन",
    simplified_explanation: "सोपे स्पष्टीकरण",
    ask_doctor_btn: "डॉक्टरांना विचारा",
    timing_with_food: "वेळ व अन्न",
    dosage_pattern: "डोसचे प्रमाण",
    clinical_purpose: "उपयोग",
    unclear_warning: "प्रिस्क्रिप्शनमधील हा भाग अस्पष्ट आहे. कृपया डॉक्टरांशी किंवा फार्मासिस्टशी संपर्क साधा.",
    
    ai_title: "ग्राम आरोग्य एआय",
    ai_desc: "सर्वांसाठी आरोग्य मार्गदर्शन",
    ask_ai_placeholder: "लक्षणे, औषधे किंवा योजनांबद्दल विचारा...",
    ai_disclaimer: "ग्राम आरोग्य एआय केवळ शैक्षणिक माहिती प्रदान करते.",
    symptom_triage_btn: "लक्षणे तपासा (Triage)",
    
    vitals_title: "आरोग्य निरीक्षण (Vitals)",
    vitals_subtitle: "रक्तदाब, नाडी आणि साखर पातळी नोंदवा",
    connect_device: "डिव्हाइस जोडा",
    record_reading: "नोंद करा",
    heart_rate: "हृदयाचे ठोके",
    blood_pressure: "रक्तदाब",
    spo2: "ऑक्सिजन",
    blood_sugar: "रक्तातील साखर",
    temperature: "तापमान",
    
    blood_banks_title: "रक्तपेढी उपलब्धता",
    blood_banks_subtitle: "सर्व 8 रक्तगटांचा थेट साठा तपासा",
    confirm_before_travel: "कृपया प्रवास करण्यापूर्वी फोन करून खात्री करा.",
    
    nutrition_title: "आरोग्यदायी पोषण मार्गदर्शक",
    nutrition_subtitle: "संतुलित भारतीय आहार (शाकाहारी व मांसाहारी)",
    log_food: "अन्न नोंदवा",
    daily_nutrients: "दैनिक पोषण उद्दिष्टे",
    
    govt_title: "शासकीय आरोग्य सेवा",
    govt_subtitle: "आभा (ABHA), आयुष्यमान भारत आणि जन औषधी केंद्र",
    official_portal: "शासकीय अधिकृत पोर्टल",
    
    emergency_title: "आपत्कालीन सेवा",
    emergency_subtitle: "24x7 रुग्णवाहिका (108), आपत्कालीन आयसीयू",
    call_108: "कॉल 108 (रुग्णवाहिका)",
    call_112: "कॉल 112 (राष्ट्रीय आपत्कालीन)",
    call_102: "कॉल 102 (जननी सेवा)",
    my_medical_id: "माझे मेडिकल आयडी",
    
    offline_notice: "तुम्ही सध्या ऑफलाइन आहात. सेव्ह केलेली माहिती दिसत आहे.",
    
    search_placeholder: "औषधाचे नाव किंवा घटक शोधा...",
    search_btn: "औषध शोधा",
    popular_searches: "नेहमी लागणारी औषधे:",
    filter_category: "वर्ग:",
    in_stock_only: "उपलब्ध साठा",
    radius: "अंतर मर्यादा:",
    sort_by: "क्रमवारी:",
    sort_distance: "जवळचे अंतर",
    sort_price: "कमी किंमत",
    sort_stock: "जास्त साठा",
    stores_available: "उपलब्ध दुकाने",
    price_from: "किंमत सुरू:",
    view_nearby_stores: "जवळची दुकाने पहा",
    hide_stores: "यादी लपवा",
    jan_aushadhi_badge: "जन औषधी केंद्र पर्याय उपलब्ध",
    jan_aushadhi_savings: "70% पर्यंत बचत करा!",
    generic_salt: "घटक / जेनेरिक:",
    store_name: "मेडिकल स्टोअर",
    verified_pharmacy: "प्रमाणित केमिस्ट",
    in_stock: "उपलब्ध",
    low_stock_tag: "कमी साठा",
    out_of_stock: "संपले",
    unit_price: "विक्री किंमत",
    mrp: "MRP",
    savings: "बचत",
    distance_away: "अंतरावर",
    call_store: "कॉल करा",
    get_directions: "नकाशा पहा",
    last_updated: "शेवटचे अपडेट",
    operating_hours: "वेळ"
  },
  kn: {
    app_name: "ಗ್ರಾಮ್ ಆರೋಗ್ಯ",
    app_name_regional: "ಗ್ರಾಮ್ ಆರೋಗ್ಯ",
    tagline: "ಆರೋಗ್ಯ ಸೇವೆ, ನಿಮ್ಮ ಸಮೀಪದಲ್ಲಿ.",
    subtitle: "ವಿಶ್ವಾಸಾರ್ಹ ವೈದ್ಯರು, ಆಸ್ಪತ್ರೆಗಳು, ಔಷಧಗಳು ಮತ್ತು ತಜ್ಞರ ಸಲಹೆಯನ್ನು ಸುಲಭವಾಗಿ ಪಡೆಯಿರಿ.",
    
    nav_home: "ಮುಖಪುಟ",
    nav_find_care: "ಆರೋಗ್ಯ ಸೇವೆಗಳು",
    nav_doctors: "ವೈದ್ಯರು",
    nav_hospitals: "ಆಸ್ಪತ್ರೆಗಳು",
    nav_appointments: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ಸ್",
    nav_records: "ಆರೋಗ್ಯ ದಾಖಲೆಗಳು",
    nav_medicines: "ಔಷಧಗಳು",
    nav_blood_banks: "ರಕ್ತ ನಿಧಿಗಳು",
    nav_ai: "AI ಸಹಾಯಕ",
    nav_nutrition: "ಪೌಷ್ಟಿಕಾಂಶ",
    nav_govt: "ಸರ್ಕಾರಿ ಸೇವೆಗಳು",
    nav_emergency: "ತುರ್ತು 108 / 112",
    search_tab: "ಔಷಧ ಲಭ್ಯತೆ",
    pharmacy_tab: "ಫಾರ್ಮಸಿ ಪೋರ್ಟಲ್",
    
    cta_find_care: "ಹತ್ತಿರದ ಆರೋಗ್ಯ ಸೇವೆ ಹುಡುಕಿ",
    cta_talk_ai: "ಗ್ರಾಮ್ ಆರೋಗ್ಯ AI ಜೊತೆ ಮಾತನಾಡಿ",
    cta_emergency: "ತುರ್ತು ನೆರವು",
    
    login: "ಲಾಗಿನ್",
    logout: "ಲಾಗೌಟ್",
    guest_patient: "ನಾಗರಿಕ (ರೋಗಿ)",
    profile: "ಪ್ರೊಫೈಲ್",
    role: "ಪಾತ್ರ",
    notifications: "ಸೂಚನೆಗಳು",
    
    hero_title: "ಆರೋಗ್ಯ ಸೇವೆ, ನಿಮ್ಮ ಸಮೀಪದಲ್ಲಿ.",
    hero_desc: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ, ವೈದ್ಯರ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಕಾಯ್ದಿರಿಸಿ, ಡಿಜಿಟಲ್ ದಾಖಲೆಗಳನ್ನು ಇರಿಸಿ ಮತ್ತು ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    search_how_help: "ಇಂದು ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    search_examples_label: "ಹುಡುಕಾಟದ ಉದಾಹರಣೆಗಳು:",
    
    filter_all: "ಎಲ್ಲವೂ",
    filter_hospitals: "ಆಸ್ಪತ್ರೆಗಳು",
    filter_clinics: "ಕ್ಲಿನಿಕ್‌ಗಳು",
    filter_phc: "ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಗಳು (PHC)",
    filter_diagnostic: "ರಕ್ತ ತಪಾಸಣಾ ಕೇಂದ್ರಗಳು",
    filter_emergency_only: "24x7 ತುರ್ತು ಮಾತ್ರ",
    open_now: "ಈಗ ತೆರೆದಿದೆ",
    distance: "ದೂರ",
    icu_beds: "ICU ಬೆಡ್‌ಗಳು",
    
    doctor_title: "ಪರಿಶೀಲಿತ ವೈದ್ಯರನ್ನು ಹುಡುಕಿ",
    doctor_subtitle: "ಕ್ಲಿನಿಕ್ ಭೇಟಿ ಅಥವಾ ಆನ್‌ಲೈನ್ ವಿಡಿಯೋ ಸಮಾಲೋಚನೆಗಾಗಿ ಬುಕ್ ಮಾಡಿ",
    filter_specialty: "ವಿಶೇಷತೆ",
    join_as_doctor: "ವೈದ್ಯರಾಗಿ ನೋಂದಾಯಿಸಿ",
    verified_badge: "ಪರಿಶೀಲಿತ ವೈದ್ಯರು",
    consultation_fee: "ಸಮಾಲೋಚನೆ ಶುಲ್ಕ",
    book_appointment: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
    experience: "ಅನುಭವ",
    years: "ವರ್ಷಗಳು",
    
    appointment_title: "ನಿಮ್ಮ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು",
    appointment_step1: "1. ವೈದ್ಯರನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    appointment_step2: "2. ದಿನಾಂಕ ಮತ್ತು ಸಮಯ",
    appointment_step3: "3. ಭೇಟಿಯ ವಿಧಾನ",
    in_person: "ಕ್ಲಿನಿಕ್ ಭೇಟಿ",
    online_video: "ಆನ್‌ಲೈನ್ ವಿಡಿಯೋ ಕರೆ",
    token_slip: "ಟೋಕನ್ ರಶೀದಿ",
    confirm_booking: "ಖಚಿತಪಡಿಸಿ",
    
    telemedicine_room: "ಗ್ರಾಮ್ ಆರೋಗ್ಯ ಟೆಲಿಮೆಡಿಸಿನ್ ಕೋಣೆ",
    start_call: "ಸಮಾಲೋಚನೆ ಆರಂಭಿಸಿ",
    end_call: "ಕರೆ ಮುಕ್ತಾಯಗೊಳಿಸಿ",
    camera_on: "ಕ್ಯಾಮೆರಾ ಆನ್",
    mic_on: "ಮೈಕ್ ಆನ್",
    chat_with_doc: "ವೈದ್ಯರ ಟಿಪ್ಪಣಿಗಳು ಮತ್ತು ಚಾಟ್",
    
    records_title: "ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ ದಾಖಲೆಗಳು",
    records_subtitle: "ನಿಮ್ಮ ಲ್ಯಾಬ್ ವರದಿಗಳು ಮತ್ತು ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಇರಿಸಿ",
    upload_record: "ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    share_record: "ಸುರಕ್ಷಿತವಾಗಿ ಹಂಚಿಕೊಳ್ಳಿ",
    download: "ಡೌನ್‌ಲೋಡ್",
    
    prescription_title: "ನಿಮ್ಮ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    prescription_subtitle: "ಔಷಧಗಳ ಹೆಸರು, ತೆಗೆದುಕೊಳ್ಳುವ ಸಮಯ ಮತ್ತು ಪ್ರಮಾಣದ ಸರಳ ವಿವರಣೆ",
    original_prescription: "ಮೂಲ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್",
    simplified_explanation: "ಸರಳ ವಿವರಣೆ",
    ask_doctor_btn: "ವೈದ್ಯರನ್ನು ಕೇಳಿ",
    timing_with_food: "ಸಮಯ ಮತ್ತು ಆಹಾರ",
    dosage_pattern: "ಪ್ರಮಾಣ",
    clinical_purpose: "ಉದ್ದೇಶ",
    unclear_warning: "ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ನ ಈ ಭಾಗ ಅಸ್ಪಷ್ಟವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    
    ai_title: "ಗ್ರಾಮ್ ಆರೋಗ್ಯ AI",
    ai_desc: "ಎಲ್ಲರಿಗೂ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ",
    ask_ai_placeholder: "ರೋಗಲಕ್ಷಣಗಳು ಅಥವಾ ಔಷಧಿಗಳ ಬಗ್ಗೆ ಕೇಳಿ...",
    ai_disclaimer: "ಗ್ರಾಮ್ ಆರೋಗ್ಯ AI ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿಯನ್ನು ಮಾತ್ರ ನೀಡುತ್ತದೆ.",
    symptom_triage_btn: "ರೋಗಲಕ್ಷಣ ಪರೀಕ್ಷೆ (Triage)",
    
    vitals_title: "ಆರೋಗ್ಯ ತಪಾಸಣೆ (Vitals)",
    vitals_subtitle: "ರಕ್ತದೊತ್ತಡ, ನಾಡಿಬಡಿತ ಮತ್ತು ಸಕ್ಕರೆ ಮಟ್ಟವನ್ನು ದಾಖಲಿಸಿ",
    connect_device: "ಸಾಧನವನ್ನು ಸಂಪರ್ಕಿಸಿ",
    record_reading: "ದಾಖಲಿಸಿ",
    heart_rate: "ಹೃದಯ ಬಡಿತ",
    blood_pressure: "ರಕ್ತದೊತ್ತಡ",
    spo2: "ಆಮ್ಲಜನಕ",
    blood_sugar: "ರಕ್ತದ ಸಕ್ಕರೆ",
    temperature: "ತಾಪಮಾನ",
    
    blood_banks_title: "ರಕ್ತ ನಿಧಿ ಲಭ್ಯತೆ",
    blood_banks_subtitle: "ಎಲ್ಲಾ 8 ರಕ್ತ ಗುಂಪುಗಳ ಲೈವ್ ಸ್ಟಾಕ್ ಪರಿಶೀಲಿಸಿ",
    confirm_before_travel: "ದಯವಿಟ್ಟು ಭೇಟಿ ನೀಡುವ ಮುನ್ನ ರಕ್ತ ನಿಧಿಗೆ ಕರೆ ಮಾಡಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    
    nutrition_title: "ಆರೋಗ್ಯಕರ ಪೌಷ್ಟಿಕಾಂಶ ಮಾರ್ಗದರ್ಶಿ",
    nutrition_subtitle: "ಸಮತೋಲಿತ ಭಾರತೀಯ ಆಹಾರ (ಸಸ್ಯಾಹಾರಿ ಮತ್ತು ಮಾಂಸಾಹಾರಿ)",
    log_food: "ಆಹಾರ ನಮೂದಿಸಿ",
    daily_nutrients: "ದೈನಂದಿನ ಪೋಷಕಾಂಶ ಗುರಿಗಳು",
    
    govt_title: "ಸರ್ಕಾರಿ ಆರೋಗ್ಯ ಸೇವೆಗಳು",
    govt_subtitle: "ಆಭಾ (ABHA), ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಮತ್ತು ಜನೌಷಧಿ ಕೇಂದ್ರ",
    official_portal: "ಸರ್ಕಾರಿ ಅಧಿಕೃತ ಪೋರ್ಟಲ್",
    
    emergency_title: "ತುರ್ತು ಸೇವೆ",
    emergency_subtitle: "24x7 ಆಂಬ್ಯುಲೆನ್ಸ್ (108), ತುರ್ತು ICU",
    call_108: "ಕರೆ 108 (ಆಂಬ್ಯುಲೆನ್ಸ್)",
    call_112: "ಕರೆ 112 (ತುರ್ತು ನೆರವು)",
    call_102: "ಕರೆ 102 (ಜನನಿ ಸೇವೆ)",
    my_medical_id: "ನನ್ನ ವೈದ್ಯಕೀಯ ID",
    
    offline_notice: "ನೀವು ಪ್ರಸ್ತುತ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ. ಸಂಗ್ರಹಿಸಿದ ಮಾಹಿತಿಯನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ.",
    
    search_placeholder: "ಔಷಧದ ಹೆಸರು ಅಥವಾ ಸಾಲ್ಟ್ ಹುಡುಕಿ...",
    search_btn: "ಔಷಧ ಹುಡುಕಿ",
    popular_searches: "ಅಗತ್ಯ ಔಷಧಗಳು:",
    filter_category: "ವರ್ಗ:",
    in_stock_only: "ಲಭ್ಯವಿರುವ ಸ್ಟಾಕ್ ಮಾತ್ರ",
    radius: "ದೂರ:",
    sort_by: "ವಿಂಗಡಿಸಿ:",
    sort_distance: "ಹತ್ತಿರದ ದೂರ",
    sort_price: "ಕಡಿಮೆ ಬೆಲೆ",
    sort_stock: "ಹೆಚ್ಚು ಸ್ಟಾಕ್",
    stores_available: "ಲಭ್ಯವಿರುವ ಅಂಗಡಿಗಳು",
    price_from: "ಆರಂಭಿಕ ಬೆಲೆ:",
    view_nearby_stores: "ಹತ್ತಿರದ ಅಂಗಡಿಗಳನ್ನು ನೋಡಿ",
    hide_stores: "ಪಟ್ಟಿ ಮರೆಮಾಡಿ",
    jan_aushadhi_badge: "ಜನೌಷಧಿ ಕೇಂದ್ರದ ಆಯ್ಕೆ ಲಭ್ಯವಿದೆ",
    jan_aushadhi_savings: "70% ವರೆಗೆ ಉಳಿತಾಯ!",
    generic_salt: "ಸಾಲ್ಟ್ / ಜೆನೆರಿಕ್:",
    store_name: "ಮೆಡಿಕಲ್ ಸ್ಟೋರ್",
    verified_pharmacy: "ಪರಿಶೀಲಿತ ಕೆಮಿಸ್ಟ್",
    in_stock: "ಲಭ್ಯವಿದೆ",
    low_stock_tag: "ಕಡಿಮೆ ಸ್ಟಾಕ್",
    out_of_stock: "ಸ್ಟಾಕ್ ಮುಗಿದಿದೆ",
    unit_price: "ಮಾರಾಟದ ಬೆಲೆ",
    mrp: "MRP",
    savings: "ಉಳಿತಾಯ",
    distance_away: "ದೂರದಲ್ಲಿದೆ",
    call_store: "ಕರೆ ಮಾಡಿ",
    get_directions: "ನಕ್ಷೆ ನೋಡಿ",
    last_updated: "ಕೊನೆಯ ನವೀಕರಣ",
    operating_hours: "ಸಮಯ"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('gram_arogya_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('gram_arogya_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    const cycle = ['en', 'hi', 'mr', 'kn'];
    const nextIdx = (cycle.indexOf(lang) + 1) % cycle.length;
    setLang(cycle[nextIdx]);
  };

  const setSpecificLanguage = (l) => {
    if (translations[l]) {
      setLang(l);
    }
  };

  const t = (key) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    // Fallback to English
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: setSpecificLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
