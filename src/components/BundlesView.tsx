'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Bundle } from '@/lib/types';
import { Package, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export function BundlesView() {
  const { bundles, requestBundle, currentUser } = useApp();
  const [requestedId, setRequestedId] = useState<string | null>(null);

  const handleRequestAll = (bundleId: string) => {
    requestBundle(bundleId);
    setRequestedId(bundleId);
    setTimeout(() => {
      setRequestedId(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-xl">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/30 border border-emerald-400/40 text-emerald-200">
            Student Starter Packs
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-3 tracking-tight">
            Curated Course & Semester Bundles
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-2 leading-relaxed">
            Why spend hours hunting down each tool separately? Verified seniors have grouped together complete lab sets and hostel kits with 1-click bundle requests.
          </p>
        </div>
      </div>

      {/* Bundles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bundles.map((bundle) => {
          const totalEstimatedNew = bundle.items.reduce((acc, i) => acc + i.estimated_price, 0);

          return (
            <div
              key={bundle.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    {bundle.badge}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {bundle.available_items_count} items ready
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                  {bundle.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {bundle.description}
                </p>

                {/* Items in Bundle */}
                <div className="mt-5 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Equipment:</h4>
                  {bundle.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <div>
                          <p className="font-bold text-slate-800">{item.title}</p>
                          <p className="text-[10px] text-slate-400">{item.category} • Condition: {item.condition}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 line-through">
                        ₹{item.estimated_price} new
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer info & CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Market Cost</span>
                  <span className="text-sm font-bold text-slate-400 line-through">₹{totalEstimatedNew}</span>
                  <span className="text-xs font-extrabold text-emerald-700 block">Borrow all ~ ₹180 total</span>
                </div>

                {requestedId === bundle.id ? (
                  <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Requests Sent to Owners!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRequestAll(bundle.id)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request All Equipment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
