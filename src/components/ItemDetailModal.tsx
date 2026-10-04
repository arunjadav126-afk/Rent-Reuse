'use client';

import React, { useState } from 'react';
import { Item } from '@/lib/types';
import { useApp } from '@/lib/store';
import {
  X,
  ShieldCheck,
  MapPin,
  Calendar,
  Share2,
  MessageSquare,
  AlertTriangle,
  Sparkles,
  CheckCircle,
  Clock,
  Tag,
  ArrowRight,
  Info
} from 'lucide-react';

interface ItemDetailModalProps {
  item: Item | null;
  onClose: () => void;
  onOpenChat: (requestId: string) => void;
  onOpenAuth?: () => void;
}

export function ItemDetailModal({ item, onClose, onOpenChat, onOpenAuth }: ItemDetailModalProps) {
  const { currentUser, safePoints, createRequest, requests, joinWaitlist, submitReport, isAuthenticated, t } = useApp();

  const [activePhoto, setActivePhoto] = useState(0);
  const [startDate, setStartDate] = useState(item?.available_from || new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(item?.available_until || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
  const [borrowMessage, setBorrowMessage] = useState('');
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  if (!item) return null;

  const isOwner = currentUser.user_id === item.owner_id;
  const safeP = safePoints.find(s => s.id === item.pickup_location_id) || safePoints[0];

  // Calculate rental duration and cost
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const totalCost = item.mode === 'free' || item.mode === 'donate' ? 0 : diffDays * item.price_per_day;

  // Existing request if any between current user and this item
  const existingReq = requests.find(r => r.item_id === item.id && (r.borrower_id === currentUser.user_id || r.owner_id === currentUser.user_id));

  const handleSendRequest = () => {
    setRequestError(null);
    const result = createRequest(item.id, startDate, endDate, borrowMessage);
    if (!result.success) {
      setRequestError(result.error || 'Failed to submit request');
    } else {
      setRequestSuccess(true);
    }
  };

  const handleShareWhatsApp = () => {
    const text = `Hey! Found "${item.title}" on Campus Rent & Reuse for ₹${item.price_per_day}/day (or free). Shared by senior ${item.owner_name} at ${safeP.name}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`, '_blank');
  };

  const handleReportSubmit = () => {
    if (!reportReason.trim()) return;
    submitReport('item', item.id, item.title, reportReason);
    setReportSubmitted(true);
    setTimeout(() => {
      setShowReportModal(false);
      setReportSubmitted(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
        {/* Header bar */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              {item.mode.toUpperCase()}
            </span>
            {item.is_semester_release && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Next Semester Pre-Booking
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-colors"
              title="Share on WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowReportModal(true)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
              title="Report issue"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Photos and Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                <img
                  src={item.photos[activePhoto] || item.photos[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white text-xs rounded-lg font-medium">
                  Condition: <span className="font-bold capitalize">{item.condition}</span>
                </div>
              </div>
              {item.photos.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {item.photos.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhoto(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${activePhoto === idx ? 'border-emerald-600 scale-105' : 'border-slate-200 opacity-60'}`}
                    >
                      <img src={p} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Campus Sustainability Note */}
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900">
                  <span className="font-bold">Eco & Budget Impact:</span> Borrowing this prevents ~
                  <span className="font-semibold">8.5 kg CO2</span> waste and saves you approx{' '}
                  <span className="font-bold">₹{item.estimated_new_price - totalCost}</span> vs buying new in the market!
                </div>
              </div>
            </div>

            {/* Item Details and Pricing */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{item.course_tag}</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {item.title}
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs Box */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Rental Rate</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      {item.price_per_day === 0 ? 'FREE (0₹)' : `₹${item.price_per_day} / day`}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Refundable Deposit</span>
                    <span className="font-bold text-slate-800 text-sm">
                      {item.deposit_amount === 0 ? 'No Deposit' : `₹${item.deposit_amount}`}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Department Tag</span>
                    <span className="font-semibold text-slate-800 truncate block">{item.department_tag}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Year Recommended</span>
                    <span className="font-semibold text-slate-800">Year {item.year_tag}</span>
                  </div>
                </div>
              </div>

              {/* Owner Trust Card */}
              <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.owner_avatar}
                    alt={item.owner_name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900">{item.owner_name}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs text-slate-500">{item.owner_department} • Year {item.owner_year}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs">
                      <span className="font-bold text-amber-600">★ {item.owner_trust.toFixed(1)} Trust</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-emerald-700 font-medium">8 Verified Vouches</span>
                    </div>
                  </div>
                </div>
                {existingReq && (
                  <button
                    onClick={() => onOpenChat(existingReq.id)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 shadow-xs transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Safe Pickup Point Info */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-sky-500 text-white shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-sky-950">
                  Campus Safe Pickup Point: {safeP.name}
                </h4>
                <span className="text-[11px] font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  {safeP.recommended_hours}
                </span>
              </div>
              <p className="text-xs text-sky-800 mt-1">
                {safeP.description} ({safeP.landmark}). High student visibility zone under campus security CCTV.
              </p>
            </div>
          </div>

          {/* Unauthenticated Guest Notice */}
          {!isAuthenticated && item.status === 'available' && (
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-3">
              <h4 className="text-sm font-extrabold text-emerald-950">
                Want to borrow or rent this {item.title}?
              </h4>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Sign in with your verified college email to submit requests, chat with the owner, and coordinate safe pickup.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuth?.();
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Sign In / Register with College ID to Borrow</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Date Range Selection & Request Section (Authenticated) */}
          {isAuthenticated && !isOwner && item.status === 'available' && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Select Borrowing Period
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">From Date</label>
                  <input
                    type="date"
                    value={startDate}
                    min={item.available_from}
                    max={item.available_until}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">To Date (Return)</label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    max={item.available_until}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Note for Senior / Owner (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Need this for 1st Year Engineering Drawing evaluation sheets on Wednesdays..."
                  value={borrowMessage}
                  onChange={(e) => setBorrowMessage(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-emerald-500"
                />
              </div>

              {/* Total Calculation */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-900">{diffDays} days</span> loan period
                  {item.price_per_day > 0 && ` × ₹${item.price_per_day}/day`}
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Estimated Total</span>
                  <span className="text-base font-extrabold text-emerald-700">
                    {totalCost === 0 ? 'FREE (0₹)' : `₹${totalCost}`}
                  </span>
                </div>
              </div>

              {requestError && (
                <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2 border border-rose-200">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{requestError}</span>
                </div>
              )}

              {requestSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center justify-between border border-emerald-200">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>Request submitted! {item.owner_name} will review and generate your pickup QR.</span>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSendRequest}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{item.is_semester_release ? 'Pre-Book for Next Semester' : 'Submit Borrow Request'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Waitlist button if item is currently on loan */}
          {item.status !== 'available' && !isOwner && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
              <p className="text-xs text-amber-900 font-semibold">
                This item is currently on loan. Join the chain lending waitlist to be notified first when returned!
              </p>
              <button
                onClick={() => joinWaitlist(item.id)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Join Waitlist ({item.waitlist_count || 0} in line)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Report this Item to Campus Resource Moderation
            </h3>
            <p className="text-xs text-slate-500">
              Help maintain trust. Report damaged items, prohibited goods, or inaccurate descriptions.
            </p>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Describe the issue..."
              rows={3}
              className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-emerald-500"
            />
            {reportSubmitted ? (
              <div className="p-2 bg-emerald-50 text-emerald-800 text-xs font-bold rounded text-center">
                Report logged for admin review.
              </div>
            ) : (
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReportSubmit}
                  className="px-3 py-1.5 text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg"
                >
                  Submit Report
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
