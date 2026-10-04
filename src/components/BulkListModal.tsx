'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Sparkles, X, CheckCircle2, GraduationCap, PackageCheck } from 'lucide-react';

interface BulkListModalProps {
  onClose: () => void;
}

const SENIOR_PRESET_ITEMS = [
  {
    title: 'Imperial Omega Mini Drafter & Board Clips',
    category_id: 'cat_drafting',
    mode: 'rent' as const,
    price_per_day: 10,
    photo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    selected: true
  },
  {
    title: 'Casio fx-991EX Scientific Calculator',
    category_id: 'cat_electronics',
    mode: 'rent' as const,
    price_per_day: 12,
    photo: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=800&auto=format&fit=crop&q=80',
    selected: true
  },
  {
    title: 'Clean Cotton Chemistry Lab Coat (L) + Goggles',
    category_id: 'cat_lab',
    mode: 'donate' as const,
    price_per_day: 0,
    photo: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    selected: true
  },
  {
    title: 'Engineering Mechanics (Bhavikatti) + Notes',
    category_id: 'cat_books',
    mode: 'donate' as const,
    price_per_day: 0,
    photo: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    selected: true
  },
  {
    title: '1.5L Fast Boil Hostel Electric Kettle',
    category_id: 'cat_hostel',
    mode: 'rent' as const,
    price_per_day: 15,
    photo: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    selected: false
  }
];

export function BulkListModal({ onClose }: BulkListModalProps) {
  const { bulkCreateItems, currentUser, safePoints } = useApp();
  const [itemsList, setItemsList] = useState(SENIOR_PRESET_ITEMS);
  const [releaseDate, setReleaseDate] = useState('2026-12-18');
  const [completed, setCompleted] = useState(false);

  const toggleSelect = (index: number) => {
    setItemsList(prev => prev.map((item, idx) => idx === index ? { ...item, selected: !item.selected } : item));
  };

  const handleBulkSubmit = () => {
    const selected = itemsList.filter(i => i.selected);
    if (selected.length === 0) return;

    const toCreate = selected.map(item => ({
      title: item.title,
      description: `Passed on by graduating senior ${currentUser.full_name}. Released right after semester exams.`,
      category_id: item.category_id,
      condition: 'good' as const,
      mode: item.mode,
      price_per_day: item.price_per_day,
      deposit_amount: item.mode === 'donate' ? 0 : 150,
      department_tag: currentUser.department,
      course_tag: 'Senior Pass-Down',
      pickup_location_id: safePoints[0].id,
      photos: [item.photo],
      is_semester_release: true,
      release_date: releaseDate,
      available_from: releaseDate,
      available_until: '2027-05-15',
      estimated_new_price: 1200
    }));

    bulkCreateItems(toCreate);
    setCompleted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  const selectedCount = itemsList.filter(i => i.selected).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 relative flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-xs text-amber-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold flex items-center gap-2">
                Graduating? List Everything for Juniors!
              </h2>
              <p className="text-xs text-indigo-200">
                1-Click bulk handover to save freshers thousands and pass on the legacy.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-indigo-200 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completed ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
              <PackageCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {selectedCount} Items Listed for End-Semester Handover!
            </h3>
            <p className="text-xs text-slate-500">
              Karma bonus (+{selectedCount * 5} pts) has been credited to your profile. Juniors can now pre-book your items!
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between text-xs bg-indigo-50 p-3 rounded-xl border border-indigo-100">
              <span className="font-semibold text-indigo-950">Target Release Date (End of Exams):</span>
              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="text-xs p-1.5 rounded-lg border border-indigo-200 bg-white font-bold text-indigo-900"
              />
            </div>

            <p className="text-xs font-bold text-slate-700">Select items from your room to pass down:</p>

            <div className="space-y-2">
              {itemsList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleSelect(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${item.selected ? 'border-indigo-600 bg-indigo-50/50 shadow-xs' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <div className="flex items-center gap-3">
                    <img src={item.photo} alt={item.title} className="w-11 h-11 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${item.mode === 'donate' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'}`}>
                          {item.mode === 'donate' ? 'Permanent Gift' : `₹${item.price_per_day}/day`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => {}}
                    className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-indigo-700">
                {selectedCount} items selected • +{selectedCount * 5} Karma bonus
              </span>
              <button
                onClick={handleBulkSubmit}
                disabled={selectedCount === 0}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                Bulk Publish All Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
