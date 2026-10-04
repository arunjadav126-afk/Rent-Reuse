'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import {
  X,
  Clock,
  CheckCircle2,
  XCircle,
  QrCode,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface ActivityModalProps {
  onClose: () => void;
  onOpenChat: (requestId: string) => void;
  onOpenQR: (requestId: string, mode: 'pickup' | 'return') => void;
}

export function ActivityModal({ onClose, onOpenChat, onOpenQR }: ActivityModalProps) {
  const { currentUser, requests, items, karmaLedger, approveRequest, declineRequest } = useApp();
  const [activeTab, setActiveTab] = useState<'incoming' | 'borrowings' | 'listings' | 'karma'>('incoming');

  const incomingRequests = requests.filter(r => r.owner_id === currentUser.user_id);
  const myBorrowings = requests.filter(r => r.borrower_id === currentUser.user_id);
  const myListings = items.filter(i => i.owner_id === currentUser.user_id);
  const myKarmaEntries = karmaLedger.filter(k => k.user_id === currentUser.user_id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 text-white rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                My Campus Activity & Loans
              </h2>
              <p className="text-xs text-slate-500">
                Logged in as: <span className="font-semibold">{currentUser.full_name}</span> • {currentUser.karma_points} Karma Points
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 px-4 text-xs font-bold gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'incoming' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span>Incoming Requests</span>
            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full text-[10px]">
              {incomingRequests.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('borrowings')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'borrowings' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span>My Borrowings</span>
            <span className="px-1.5 py-0.2 bg-sky-100 text-sky-800 rounded-full text-[10px]">
              {myBorrowings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'listings' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span>My Listed Items</span>
            <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full text-[10px]">
              {myListings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('karma')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'karma' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Karma Ledger</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-4">
          {/* TAB 1: Incoming Requests (Owner Perspective) */}
          {activeTab === 'incoming' && (
            <div className="space-y-3">
              {incomingRequests.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No incoming requests right now. When students request your listed items, they will appear here!
                </div>
              ) : (
                incomingRequests.map(req => (
                  <div key={req.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <img src={req.item_photo} alt={req.item_title} className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{req.item_title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Requested by <span className="font-semibold text-slate-700">{req.borrower_name}</span> ({req.borrower_dept})
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[11px]">
                            <span className="text-slate-500 font-medium">Dates: {req.start_date} to {req.end_date}</span>
                            <span className="text-emerald-700 font-bold">• Total: ₹{req.total_price}</span>
                          </div>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${req.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : req.status === 'active' ? 'bg-sky-100 text-sky-800' : req.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                        {req.status}
                      </span>
                    </div>

                    {req.message && (
                      <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-600 border border-slate-100 italic">
                        "{req.message}"
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        onClick={() => onOpenChat(req.id)}
                        className="text-xs font-bold text-slate-600 hover:text-emerald-600 flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat with Borrower</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {req.status === 'pending' && (
                          <>
                            <button
                              onClick={() => declineRequest(req.id)}
                              className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
                            >
                              Decline
                            </button>
                            <button
                              onClick={() => approveRequest(req.id)}
                              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                            >
                              Approve Request
                            </button>
                          </>
                        )}
                        {req.status === 'approved' && (
                          <button
                            onClick={() => onOpenQR(req.id, 'pickup')}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>Show Pickup QR</span>
                          </button>
                        )}
                        {req.status === 'active' && (
                          <button
                            onClick={() => onOpenQR(req.id, 'return')}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>Confirm Return & Rate</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: My Borrowings (Borrower Perspective) */}
          {activeTab === 'borrowings' && (
            <div className="space-y-3">
              {myBorrowings.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  You haven't requested any items yet. Browse items and click "Borrow" to get started!
                </div>
              ) : (
                myBorrowings.map(req => (
                  <div key={req.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <img src={req.item_photo} alt={req.item_title} className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{req.item_title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Owner: <span className="font-semibold text-slate-700">{req.owner_name}</span>
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Period: <span className="font-semibold">{req.start_date} to {req.end_date}</span>
                          </p>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${req.status === 'active' ? 'bg-sky-100 text-sky-800' : req.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : req.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        onClick={() => onOpenChat(req.id)}
                        className="text-xs font-bold text-slate-600 hover:text-emerald-600 flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat with Owner</span>
                      </button>

                      {req.status === 'approved' && (
                        <button
                          onClick={() => onOpenQR(req.id, 'pickup')}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Pickup QR & Checklist</span>
                        </button>
                      )}
                      {req.status === 'active' && (
                        <button
                          onClick={() => onOpenQR(req.id, 'return')}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Return Item & Earn +5 Karma</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: My Listed Items */}
          {activeTab === 'listings' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {myListings.length === 0 ? (
                <div className="col-span-2 text-center py-12 text-slate-400 text-xs">
                  You have not listed any items yet.
                </div>
              ) : (
                myListings.map(item => (
                  <div key={item.id} className="p-3.5 rounded-2xl border border-slate-200 bg-white flex gap-3">
                    <img src={item.photos[0]} alt={item.title} className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                        {item.price_per_day === 0 ? 'FREE' : `₹${item.price_per_day}/day`}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {item.status}
                        </span>
                        {item.is_semester_release && (
                          <span className="text-[10px] text-indigo-700 font-semibold">Next Sem</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: Karma Ledger */}
          {activeTab === 'karma' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Total Verified Campus Karma
                  </h4>
                  <p className="text-xs text-amber-800">
                    Points unlock priority borrowing on high-value gear and skip security deposits!
                  </p>
                </div>
                <span className="text-2xl font-black text-amber-700">{currentUser.karma_points} pts</span>
              </div>

              <div className="space-y-2">
                {myKarmaEntries.map(entry => (
                  <div key={entry.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{entry.description}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Reason: <span className="font-semibold">{entry.reason}</span> • {new Date(entry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-sm font-extrabold px-2 py-1 rounded-lg ${entry.delta > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {entry.delta > 0 ? `+${entry.delta}` : entry.delta}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
