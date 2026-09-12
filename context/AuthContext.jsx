import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USERS = [
  {
    role: 'patient',
    name: 'Ram Lal Patel',
    roleLabel: 'Patient (मरीज)',
    phone: '9810066006',
    password: 'patient123',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  {
    role: 'pharmacy',
    name: 'Gupta Medical (Ramesh Gupta)',
    roleLabel: 'Pharmacy 1 (प्राइवेट केमिस्ट)',
    phone: '9810011001',
    password: 'pharmacy123',
    badgeColor: 'bg-emerald-100 text-emerald-800'
  },
  {
    role: 'pharmacy',
    name: 'Jan Aushadhi Kendra (Pradeep)',
    roleLabel: 'Pharmacy 2 (जन औषधि केंद्र)',
    phone: '9810022002',
    password: 'pharmacy123',
    badgeColor: 'bg-sky-100 text-sky-800'
  },
  {
    role: 'doctor',
    name: 'Dr. Arvind Sharma (MBBS, MD)',
    roleLabel: 'Doctor (चिकित्सक)',
    phone: '9810055005',
    password: 'doctor123',
    badgeColor: 'bg-purple-100 text-purple-800'
  },
  {
    role: 'admin',
    name: 'District Health Officer',
    roleLabel: 'Admin (स्वास्थ्य अधिकारी)',
    phone: '9876543210',
    password: 'admin123',
    badgeColor: 'bg-amber-100 text-amber-800'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gram_arogya_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('gram_arogya_token') || null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || 'Login failed');
      }
      const data = await res.json();
      setUser(data.user);
      setToken(data.access_token);
      localStorage.setItem('gram_arogya_token', data.access_token);
      localStorage.setItem('gram_arogya_user', JSON.stringify(data.user));
      setLoading(false);
      return data.user;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gram_arogya_token');
    localStorage.removeItem('gram_arogya_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, error, DEMO_USERS }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
