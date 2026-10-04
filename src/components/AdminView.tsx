'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { ShieldAlert, MapPin, Wrench, CheckCircle2, AlertTriangle, Check } from 'lucide-react';

export function AdminView() {
  const { reports, resolveReport, repairRequests, resolveRepair, safePoints, currentUser } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Campus Resource Cell Administration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-2">
            Safety, Moderation & Safe Points Registry
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Oversee item condition reports, student repairs, and designated handover zones.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports Queue */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Safety & Content Reports ({reports.filter(r => r.status === 'pending').length} Open)
            </h3>
          </div>

          <div className="space-y-3">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 capitalize">{rep.target_type}: {rep.target_name}</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${rep.status === 'pending' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {rep.status}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-0.5">"{rep.reason}"</p>
                  <p className="text-[10px] text-slate-400 mt-1">Reported by {rep.reporter_name} • {new Date(rep.created_at).toLocaleDateString()}</p>
                </div>

                {rep.status === 'pending' && (
                  <button
                    onClick={() => resolveReport(rep.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Resolve</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Repair & Fixer Requests */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-indigo-600" />
              Campus Fixer Repair Hub
            </h3>
            <span className="text-xs text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full">
              +25 Karma Bounty
            </span>
          </div>

          <div className="space-y-3">
            {repairRequests.map((rep) => (
              <div
                key={rep.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900">{rep.item_title}</h4>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${rep.status === 'fixed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {rep.status}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-0.5">Issue: {rep.issue}</p>
                  <p className="text-[10px] text-slate-400 mt-1">Reported by {rep.reporter_name} • Assignee: {rep.fixer_name || 'Unassigned'}</p>
                </div>

                {rep.status !== 'fixed' && (
                  <button
                    onClick={() => resolveRepair(rep.id)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Repaired</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campus Safe Points Registry */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          Campus Safe Pickup Points (CCTV & Security Monitored)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {safePoints.map((sp) => (
            <div key={sp.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5 text-xs">
              <h4 className="font-bold text-slate-900">{sp.name}</h4>
              <p className="text-slate-500 text-[11px]">{sp.landmark}</p>
              <p className="text-emerald-700 text-[10px] font-bold">{sp.recommended_hours}</p>
              <p className="text-slate-400 text-[10px]">{sp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
