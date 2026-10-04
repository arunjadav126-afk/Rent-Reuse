'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { X, ShieldCheck, Mail, Lock, User, GraduationCap, Building2, Globe, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface AuthModalProps {
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
}

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Mechanical Engineering',
  'Electrical & Electronics (EEE)',
  'Electronics & Communication (ECE)',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology & Biochemical',
  'Aerospace & Ocean Engineering',
  'Physics & Chemistry Sciences',
  'Management & Humanities'
];

const HOSTELS = [
  'Ganga Hostel (Boys)',
  'Brahmaputra Hostel (Boys)',
  'Yamuna Hostel (Boys)',
  'Kaveri Hostel (Girls)',
  'Narmada Hostel (Girls)',
  'Godavari Hostel (Girls)',
  'Day Scholar / Off-Campus'
];

export function AuthModal({ initialMode = 'signin', onClose }: AuthModalProps) {
  const { login, register } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [year, setYear] = useState<number>(1);
  const [hostel, setHostel] = useState(HOSTELS[0]);
  const [roomNumber, setRoomNumber] = useState('');
  const [language, setLanguage] = useState<Language>('en');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Validate college email domain
  const isCollegeEmail = (emailStr: string) => {
    const clean = emailStr.trim().toLowerCase();
    return clean.includes('@') && (
      clean.endsWith('.edu') ||
      clean.endsWith('.ac.in') ||
      clean.endsWith('@campus.edu') ||
      clean.includes('.campus.')
    );
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please provide your college email and password.');
      return;
    }

    const res = login(email.trim(), password);
    if (!res.success) {
      setError(res.error || 'Invalid credentials.');
    } else {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!isCollegeEmail(email)) {
      setError('Must use a verified college email (e.g. rollno@campus.edu or @*.ac.in). General emails like @gmail.com are not permitted for campus safety.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const hostelFull = roomNumber.trim() ? `${hostel} (Room ${roomNumber.trim()})` : hostel;

    const res = register({
      full_name: fullName.trim(),
      college_email: email.trim().toLowerCase(),
      department,
      year,
      hostel: hostelFull,
      language
    });

    if (!res.success) {
      setError(res.error || 'Failed to create student account.');
    } else {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden my-8 relative flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {mode === 'signin' ? 'Sign In to Campus Account' : 'Student Registration'}
            </h3>
            <p className="text-xs text-slate-500">
              {mode === 'signin' ? 'Access your borrowings, gear, and karma' : 'Institutional college verification required'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 mx-6 mt-4 rounded-xl text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => { setMode('signin'); setError(null); }}
            className={`py-2 rounded-lg transition-all ${mode === 'signin' ? 'bg-white text-emerald-800 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(null); }}
            className={`py-2 rounded-lg transition-all ${mode === 'signup' ? 'bg-white text-emerald-800 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Create Account
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900">
              {mode === 'signup' ? 'Welcome to Rent & Reuse!' : 'Signed In Successfully!'}
            </h4>
            <p className="text-xs text-slate-600">
              {mode === 'signup'
                ? '+30 Starter Karma Points credited to your account. You can now borrow items!'
                : 'Loading your campus dashboard...'}
            </p>
          </div>
        ) : mode === 'signin' ? (
          /* Sign In Form */
          <form onSubmit={handleSignIn} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">College Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="e.g. your_name@campus.edu or rollno@college.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Sign In to Campus Account
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-xs text-emerald-700 font-semibold hover:underline"
              >
                New student? Register with your college ID
              </button>
            </div>
          </form>
        ) : (
          /* Sign Up / Registration Form */
          <form onSubmit={handleSignUp} className="p-6 space-y-3.5 overflow-y-auto">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Student Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Patel"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                College Email (*.edu / *.ac.in) *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="rollno@campus.edu or student@nit.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Zero PII leak: Your email and phone are never displayed publicly.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Create Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Department *</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white focus:outline-emerald-500"
                >
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Academic Year *</label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white focus:outline-emerald-500"
                >
                  <option value={1}>1st Year (Fresher)</option>
                  <option value={2}>2nd Year (Sophomore)</option>
                  <option value={3}>3rd Year (Junior)</option>
                  <option value={4}>4th Year (Senior)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Hostel Block</label>
                <select
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white focus:outline-emerald-500"
                >
                  {HOSTELS.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Room No. (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 204"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Preferred UI Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white focus:outline-emerald-500"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Registration grants you <strong>+30 Starter Karma points</strong> and verifiable campus badge.</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Complete Registration (+30 Karma)
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
