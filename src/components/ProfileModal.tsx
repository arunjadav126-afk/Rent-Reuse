'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import {
  X,
  ShieldCheck,
  Award,
  Sparkles,
  LogOut,
  Mail,
  Building,
  Home,
  CheckCircle2,
  Calendar,
  Globe
} from 'lucide-react';
import { Language } from '@/lib/i18n';

interface ProfileModalProps {
  onClose: () => void;
  onOpenActivity: () => void;
}

export function ProfileModal({ onClose, onOpenActivity }: ProfileModalProps) {
  const { currentUser, logout, setLanguage, language } = useApp();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden my-8 relative flex flex-col">
        {/* Header with Cover */}
        <div className="h-24 bg-gradient-to-r from-emerald-600 to-teal-800 relative p-4 flex justify-end">
          <button
            onClick={onClose}
            className="p-1.5 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Body */}
        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar */}
          <div className="flex justify-between items-end -mt-12 mb-4">
            <img
              src={currentUser.avatar_url}
              alt={currentUser.full_name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md bg-white"
            />
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{currentUser.karma_points} Karma</span>
            </div>
          </div>

          {/* Name & College Verification */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900">{currentUser.full_name}</h3>
              {currentUser.is_verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Student
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.college_email}</span>
            </p>
          </div>

          {/* Trust Score & Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 my-4 text-center">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Trust Score</span>
              <span className="text-sm font-black text-emerald-700">★ {currentUser.trust_score.toFixed(1)}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Senior Vouches</span>
              <span className="text-sm font-black text-slate-800">{currentUser.vouches_count}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Year</span>
              <span className="text-sm font-black text-slate-800">Year {currentUser.year}</span>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-2.5 text-xs border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400" />
                Department:
              </span>
              <span className="font-bold text-slate-900 truncate max-w-[200px]">{currentUser.department}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4 text-slate-400" />
                Hostel Residence:
              </span>
              <span className="font-bold text-slate-900 truncate max-w-[200px]">{currentUser.hostel}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                Preferred Language:
              </span>
              <div className="flex gap-1">
                {(['en', 'hi', 'ta'] as Language[]).map(l => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${language === l ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => { onClose(); onOpenActivity(); }}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <span>Manage My Loans & Incoming Requests</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out of Campus Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
