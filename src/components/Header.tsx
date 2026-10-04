'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Sparkles, Bell, Globe, ChevronDown, PlusCircle, Layers, ShieldCheck, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface HeaderProps {
  onOpenPostItem: () => void;
  onOpenBulkList: () => void;
  onOpenActivity: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  onOpenProfile: () => void;
  onOpenLocation: () => void;
}

export function Header({ onOpenPostItem, onOpenBulkList, onOpenActivity, onOpenAuth, onOpenProfile, onOpenLocation }: HeaderProps) {
  const {
    currentUser,
    setCurrentUser,
    profiles,
    language,
    setLanguage,
    t,
    notifications,
    unreadNotifsCount,
    markNotificationRead,
    isAuthenticated,
    selectedCampus
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const userNotifs = notifications.filter(n => n.user_id === currentUser.user_id);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-emerald-600 text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
        <span>Campus Resource Network: Borrow from seniors, reduce waste, earn verifiable campus karma!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Rent<span className="text-emerald-600">&</span>Reuse
              </span>
              <button
                onClick={onOpenLocation}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200 transition-colors cursor-pointer max-w-[200px]"
                title="Change College / Campus Location"
              >
                <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">{selectedCampus}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block">
              {t('tagline')}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Post Item CTA Buttons */}
          <button
            onClick={onOpenPostItem}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden xs:inline">{t('post_item')}</span>
          </button>

          <button
            onClick={onOpenBulkList}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Graduating Senior?</span>
          </button>

          {/* Activity / Loans quick button */}
          <button
            onClick={onOpenActivity}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            title="My Borrowings & Requests"
          >
            <span className="hidden sm:inline">{t('my_activity')}</span>
            <span className="sm:hidden">Loans</span>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1 text-xs font-semibold cursor-pointer"
              title="Select Language"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50">
                <button
                  onClick={() => { setLanguage('en'); setShowLangDropdown(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-100 ${language === 'en' ? 'text-emerald-600 font-bold bg-emerald-50' : 'text-slate-700'}`}
                >
                  English
                </button>
                <button
                  onClick={() => { setLanguage('hi'); setShowLangDropdown(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-100 ${language === 'hi' ? 'text-emerald-600 font-bold bg-emerald-50' : 'text-slate-700'}`}
                >
                  हिंदी (Hindi)
                </button>
                <button
                  onClick={() => { setLanguage('ta'); setShowLangDropdown(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-100 ${language === 'ta' ? 'text-emerald-600 font-bold bg-emerald-50' : 'text-slate-700'}`}
                >
                  தமிழ் (Tamil)
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 relative cursor-pointer"
              title="Campus Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-sm">Notifications ({userNotifs.length})</h4>
                  <span className="text-[11px] text-slate-400">Campus Realtime</span>
                </div>
                {userNotifs.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No new notifications
                  </div>
                ) : (
                  userNotifs.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${n.read ? 'opacity-70' : 'bg-emerald-50/40'}`}
                    >
                      <div className="flex items-start gap-2">
                        {!n.read ? (
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-1 shrink-0" />
                        )}
                        <div>
                          <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                          <p className="text-[11px] text-slate-600 mt-0.5">{n.message}</p>
                          <p className="text-[10px] text-slate-400 mt-1" suppressHydrationWarning>{new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* User Profile or Sign In / Register Buttons */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-emerald-300 transition-all cursor-pointer shadow-xs"
                title="My Student Account & Settings"
              >
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.full_name}
                  className="w-7 h-7 rounded-full object-cover border border-emerald-500"
                />
                <div className="text-left hidden sm:block">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {currentUser.full_name.split(' ')[0]}
                    </span>
                    {currentUser.is_verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{currentUser.karma_points} Karma</span>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
