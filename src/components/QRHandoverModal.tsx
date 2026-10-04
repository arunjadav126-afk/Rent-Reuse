'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useApp } from '@/lib/store';
import { BorrowRequest, HandoverRecord } from '@/lib/types';
import {
  X,
  QrCode,
  CheckCircle2,
  Camera,
  ShieldCheck,
  Sparkles,
  Star,
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface QRHandoverModalProps {
  request: BorrowRequest | null;
  mode: 'pickup' | 'return';
  onClose: () => void;
}

export function QRHandoverModal({ request, mode, onClose }: QRHandoverModalProps) {
  const { currentUser, processPickupHandover, processReturnHandover } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [checklist, setChecklist] = useState({
    no_scratches_or_cracks: true,
    all_parts_present: true,
    powers_on_works_normally: true,
    clean_and_maintained: true,
  });
  const [conditionNotes, setConditionNotes] = useState('Scales, joints, and screws in full working order. Clean condition.');
  const [onTime, setOnTime] = useState(true);
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingComment, setRatingComment] = useState('Item was in fantastic condition, polite and prompt handover!');
  const [scanSimulated, setScanSimulated] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!request) return null;

  const token = mode === 'pickup'
    ? (request.pickup_qr_token || `QR_PICKUP_${request.id}`)
    : (request.return_qr_token || `QR_RETURN_${request.id}`);

  useEffect(() => {
    if (canvasRef.current && token) {
      QRCode.toCanvas(canvasRef.current, token, {
        width: 200,
        margin: 2,
        color: {
          dark: '#064e3b',
          light: '#ffffff'
        }
      });
    }
  }, [token]);

  const handleSimulateScanAndVerify = () => {
    setScanSimulated(true);
  };

  const handleFinalize = () => {
    if (mode === 'pickup') {
      processPickupHandover(request.id, checklist, conditionNotes);
    } else {
      processReturnHandover(request.id, onTime, ratingStars, ratingComment, conditionNotes);
    }
    setCompleted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden my-8 relative flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 px-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50/70">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-600 text-white rounded-lg">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 capitalize">
                {mode === 'pickup' ? 'Pickup QR Handover' : 'Return QR & Ratings'}
              </h3>
              <p className="text-[11px] text-slate-500 truncate max-w-[220px]">{request.item_title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completed ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900">
              {mode === 'pickup' ? 'Handover Confirmed!' : 'Return Completed & Karma Credited!'}
            </h4>
            <p className="text-xs text-slate-600">
              {mode === 'pickup'
                ? 'Item status moved to Active Loan. Both parties have verified the condition.'
                : 'Mutual trust scores updated and Karma ledger recorded! +10 Karma awarded.'}
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto p-5 space-y-4">
            {/* Step 1: QR Code display */}
            <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center">
              <p className="text-xs font-semibold text-slate-600 mb-2">
                Present this signed QR token to {currentUser.user_id === request.owner_id ? request.borrower_name : request.owner_name}
              </p>
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200">
                <canvas ref={canvasRef} className="rounded-lg" />
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-2 truncate max-w-[250px]">{token}</p>

              {!scanSimulated && (
                <button
                  type="button"
                  onClick={handleSimulateScanAndVerify}
                  className="mt-3 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                >
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>Simulate Counterparty QR Scan</span>
                </button>
              )}
            </div>

            {/* Step 2: Digital Condition Checklist (Shows once QR is scanned) */}
            {scanSimulated && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-2">
                    <FileCheck className="w-4 h-4 text-emerald-700" />
                    <span>Digital Physical Condition Checklist</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 mb-3">
                    Both parties must inspect the item at the safe point before finalizing:
                  </p>

                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklist.no_scratches_or_cracks}
                        onChange={() => toggleCheck('no_scratches_or_cracks')}
                        className="w-4 h-4 accent-emerald-600 rounded"
                      />
                      <span className="text-slate-700">No cracks, structural dents, or deep scratches</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklist.all_parts_present}
                        onChange={() => toggleCheck('all_parts_present')}
                        className="w-4 h-4 accent-emerald-600 rounded"
                      />
                      <span className="text-slate-700">All clamps, cables, lids, and screws present</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklist.powers_on_works_normally}
                        onChange={() => toggleCheck('powers_on_works_normally')}
                        className="w-4 h-4 accent-emerald-600 rounded"
                      />
                      <span className="text-slate-700">Calibrated & operating smoothly</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklist.clean_and_maintained}
                        onChange={() => toggleCheck('clean_and_maintained')}
                        className="w-4 h-4 accent-emerald-600 rounded"
                      />
                      <span className="text-slate-700">Cleaned & sanitized condition</span>
                    </label>
                  </div>
                </div>

                {/* Return rating and on-time validation */}
                {mode === 'return' && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Returned On Time?</span>
                      <div className="flex gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setOnTime(true)}
                          className={`px-3 py-1 rounded-lg font-bold ${onTime ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}
                        >
                          Yes (+5 Karma)
                        </button>
                        <button
                          type="button"
                          onClick={() => setOnTime(false)}
                          className={`px-3 py-1 rounded-lg font-bold ${!onTime ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'}`}
                        >
                          Late (-10 Karma)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">Rate Experience</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRatingStars(star)}
                            className="p-1 text-amber-500 hover:scale-110 transition-transform"
                          >
                            <Star className={`w-5 h-5 ${star <= ratingStars ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Add review comment..."
                        value={ratingComment}
                        onChange={(e) => setRatingComment(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleFinalize}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>
                    {mode === 'pickup' ? 'Confirm Physical Handover' : 'Complete Return & Award Karma'}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
