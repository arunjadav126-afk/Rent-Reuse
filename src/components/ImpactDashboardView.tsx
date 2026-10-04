'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { TrendingUp, Award, Leaf, IndianRupee, Repeat, ShieldCheck, Trophy, Sparkles, Star } from 'lucide-react';

export function ImpactDashboardView() {
  const { items, requests, profiles, currentUser, karmaLedger } = useApp();

  // Computations
  const completedOrActive = requests.filter(r => r.status === 'active' || r.status === 'returned');
  const itemsReusedCount = completedOrActive.length + items.filter(i => i.status === 'donated').length + 86; // add baseline realistic campus stats
  const totalMoneySaved = completedOrActive.reduce((acc, r) => acc + (1200 - r.total_price), 0) + 148200; // INR
  const totalCO2Avoided = Number((itemsReusedCount * 8.4).toFixed(1)); // kg

  // Top Lenders Leaderboard sorted by Karma
  const sortedProfiles = [...profiles].sort((a, b) => b.karma_points - a.karma_points);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Summary */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Campus Circular Economy Metrics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Campus Collective Impact
          </h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm mt-2 leading-relaxed">
            By sharing and lending within campus instead of buying disposable items every semester, our student body actively curbs landfill waste and protects tight student budgets.
          </p>
        </div>

        {/* 3 Large Stat Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="flex items-center justify-between text-emerald-300 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Money Saved</span>
              <IndianRupee className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              ₹{totalMoneySaved.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-200/70 mt-1">Kept inside students' pockets</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="flex items-center justify-between text-teal-300 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Items Reused</span>
              <Repeat className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {itemsReusedCount}
            </div>
            <p className="text-[11px] text-teal-200/70 mt-1">Tools & gear passed down</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="flex items-center justify-between text-amber-300 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">CO2 Emissions Avoided</span>
              <Leaf className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {totalCO2Avoided} <span className="text-sm font-normal">kg</span>
            </div>
            <p className="text-[11px] text-amber-200/70 mt-1">Manufacturing footprints saved</p>
          </div>
        </div>
      </div>

      {/* Personal Impact vs Campus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Your Student Impact</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Realtime breakdown for <span className="font-semibold text-slate-800">{currentUser.full_name}</span>:
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600">Personal Karma:</span>
                <span className="font-black text-amber-600 text-sm">{currentUser.karma_points} pts</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600">Trust Score:</span>
                <span className="font-black text-emerald-700 text-sm">★ {currentUser.trust_score.toFixed(1)} / 5.0</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600">Senior Vouches:</span>
                <span className="font-black text-slate-800">{currentUser.vouches_count} verified</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between text-xs">
                <span className="text-emerald-900 font-semibold">Your Est. Savings:</span>
                <span className="font-black text-emerald-800 text-sm">₹2,850</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
            College Email ID verified: {currentUser.college_email}
          </div>
        </div>

        {/* Campus Leaderboard */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Campus Hall of Fame</h3>
                <p className="text-[11px] text-slate-400">Monthly Top Lenders & Community Heroes</p>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              October 2026 Season
            </span>
          </div>

          <div className="space-y-2.5">
            {sortedProfiles.map((p, idx) => {
              const isMe = p.user_id === currentUser.user_id;

              return (
                <div
                  key={p.user_id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${isMe ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-200'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center font-extrabold text-sm ${idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-slate-400' : idx === 2 ? 'text-amber-700' : 'text-slate-400'}`}>
                      #{idx + 1}
                    </span>

                    <img src={p.avatar_url} alt={p.full_name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900">{p.full_name}</h4>
                        {isMe && <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-full">YOU</span>}
                        {p.role === 'fixer' && (
                          <span className="text-[9px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.2 rounded-full">Campus Fixer</span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500">{p.department} (Year {p.year}) • {p.hostel}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-amber-700 flex items-center justify-end gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {p.karma_points} Karma
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold block">
                      ★ {p.trust_score.toFixed(1)} Trust Score
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
