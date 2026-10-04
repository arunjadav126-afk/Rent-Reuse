'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Users, Shield, PlusCircle, CheckCircle2, ArrowRight, Share2 } from 'lucide-react';

export function GroupsView() {
  const { groups, items, currentUser } = useApp();

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative shadow-lg">
        <div className="max-w-xl">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/30 border border-blue-400/40 text-blue-200">
            Internal Lending Circles
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-3 tracking-tight">
            Hostel Floors, Clubs & Class Circles
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-2 leading-relaxed">
            Borrow high-value tools and shared equipment managed by floor representatives and club leads. Group items stay within your verified circle!
          </p>
        </div>
      </div>

      {/* Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {groups.map((group) => {
          const groupItems = items.filter(i => i.group_id === group.id);

          return (
            <div
              key={group.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 font-black flex items-center justify-center border border-blue-100">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                    {group.type.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900">
                  {group.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {group.description}
                </p>

                <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Active Members:</span>
                    <span className="font-bold text-slate-800">{group.members_count}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Circle Lead:</span>
                    <span className="font-bold text-slate-800">{group.lead_name}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Items Circulating:</span>
                    <span className="font-bold text-emerald-700">{group.items_shared_count}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Member Verified</span>
                </span>
                <button className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors">
                  View Pool
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
