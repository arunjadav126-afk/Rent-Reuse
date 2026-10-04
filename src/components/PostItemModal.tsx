'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { ItemMode, ItemCondition } from '@/lib/types';
import { X, Sparkles, Image as ImageIcon, MapPin, Calendar, Tag, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PostItemModalProps {
  onClose: () => void;
}

const PRESET_PHOTOS = [
  { label: 'Mini Drafter', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80' },
  { label: 'Scientific Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=800&auto=format&fit=crop&q=80' },
  { label: 'Lab Coat & Goggles', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80' },
  { label: 'Textbook / Notes', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80' },
  { label: 'Electronics / Kit', url: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&auto=format&fit=crop&q=80' },
  { label: 'Hostel Kettle / Appliance', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80' },
  { label: 'Sports Racket / Kit', url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80' }
];

export function PostItemModal({ onClose }: PostItemModalProps) {
  const { categories, safePoints, currentUser, createItem } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [condition, setCondition] = useState<ItemCondition>('good');
  const [mode, setMode] = useState<ItemMode>('rent');
  const [pricePerDay, setPricePerDay] = useState(15);
  const [depositAmount, setDepositAmount] = useState(100);
  const [departmentTag, setDepartmentTag] = useState(currentUser.department);
  const [courseTag, setCourseTag] = useState('Engineering Graphics (EG101)');
  const [pickupLocationId, setPickupLocationId] = useState(safePoints[0].id);
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_PHOTOS[0].url);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [isSemesterRelease, setIsSemesterRelease] = useState(false);
  const [releaseDate, setReleaseDate] = useState('2026-12-18');
  const [submitted, setSubmitted] = useState(false);

  // Suggested price based on category
  const activeCategory = categories.find(c => c.id === categoryId) || categories[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createItem({
      title,
      description,
      category_id: categoryId,
      condition,
      mode,
      price_per_day: mode === 'free' || mode === 'donate' ? 0 : pricePerDay,
      deposit_amount: mode === 'free' || mode === 'donate' ? 0 : depositAmount,
      department_tag: departmentTag,
      course_tag: courseTag,
      year_tag: currentUser.year,
      pickup_location_id: pickupLocationId,
      photos: [customPhotoUrl.trim() || selectedPhoto],
      is_semester_release: isSemesterRelease,
      release_date: isSemesterRelease ? releaseDate : undefined,
      available_from: isSemesterRelease ? releaseDate : new Date().toISOString().split('T')[0],
      available_until: '2026-12-31',
      estimated_new_price: (pricePerDay * 20) + 500
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 relative flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              List an Item for Fellow Students
            </h2>
            <p className="text-xs text-slate-500">Posting from: <span className="font-semibold">{currentUser.full_name} ({currentUser.college_email})</span></p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Item Successfully Listed!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your item is now visible on the campus board. Matched wanted post seekers have been automatically notified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Item Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Omega Mini Drafter with Sheet Stand"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                    const cat = categories.find(c => c.id === e.target.value);
                    if (cat) setPricePerDay(cat.suggested_rent_per_day);
                  }}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500 bg-white"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Description & Details</label>
              <textarea
                rows={2}
                placeholder="Describe condition, missing parts if any, tips on handling, and why you are listing..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
              />
            </div>

            {/* Mode & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Listing Mode</label>
                <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-xl text-center text-xs font-semibold">
                  {(['rent', 'free', 'swap', 'donate'] as ItemMode[]).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={`py-1.5 rounded-lg capitalize transition-all ${mode === m ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Condition</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl text-center text-xs font-semibold">
                  {(['new', 'good', 'fair'] as ItemCondition[]).map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCondition(c)}
                      className={`py-1.5 rounded-lg capitalize transition-all ${condition === c ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      {c === 'new' ? 'Like New' : c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Suggested Price box (if rent) */}
            {mode === 'rent' && (
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-800">Rent Rate (₹/day)</label>
                    <span className="text-[10px] text-amber-700 font-semibold">
                      Suggested: ₹{activeCategory.suggested_rent_per_day}/day
                    </span>
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Refundable Deposit (₹)</label>
                  <input
                    type="number"
                    min={0}
                    max={2000}
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>
            )}

            {/* Course & Department Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Course / Subject Tag</label>
                <input
                  type="text"
                  placeholder="e.g. Engineering Drawing (EG101)"
                  value={courseTag}
                  onChange={(e) => setCourseTag(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Department</label>
                <input
                  type="text"
                  value={departmentTag}
                  onChange={(e) => setDepartmentTag(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>
            </div>

            {/* Safe Pickup Location */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Safe Pickup Point</label>
              <select
                value={pickupLocationId}
                onChange={(e) => setPickupLocationId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-emerald-500"
              >
                {safePoints.map(sp => (
                  <option key={sp.id} value={sp.id}>{sp.name} — {sp.landmark}</option>
                ))}
              </select>
            </div>

            {/* Preset Photo Select */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Select Item Photo (or custom URL)</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
                {PRESET_PHOTOS.map((ph, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setSelectedPhoto(ph.url); setCustomPhotoUrl(''); }}
                    className={`p-1 rounded-xl border text-left transition-all ${selectedPhoto === ph.url && !customPhotoUrl ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20' : 'border-slate-200'}`}
                  >
                    <img src={ph.url} alt={ph.label} className="w-full h-14 object-cover rounded-lg" />
                    <span className="text-[10px] text-slate-700 font-medium block truncate mt-1">{ph.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Signature Feature: Semester Handover Toggle */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    Release at End of Semester (Pre-Booking)
                  </h4>
                  <p className="text-[11px] text-indigo-800">
                    Still using it now? Pre-list it so incoming juniors can pre-book before term ends!
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={isSemesterRelease}
                  onChange={(e) => setIsSemesterRelease(e.target.checked)}
                  className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                />
              </div>

              {isSemesterRelease && (
                <div className="pt-2 border-t border-indigo-200/60 flex items-center justify-between">
                  <label className="text-xs font-semibold text-indigo-900">Handover Release Date:</label>
                  <input
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="text-xs p-1.5 rounded-lg border border-indigo-300 bg-white"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Publish Listing (+5 Karma)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
