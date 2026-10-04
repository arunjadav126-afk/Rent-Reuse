'use client';

import React from 'react';
import { Item } from '@/lib/types';
import { useApp } from '@/lib/store';
import { ShieldCheck, MapPin, Sparkles, Calendar, Tag, ArrowRight, Share2 } from 'lucide-react';

interface ItemCardProps {
  item: Item;
  onSelect: (item: Item) => void;
  onRequest: (item: Item) => void;
}

export function ItemCard({ item, onSelect, onRequest }: ItemCardProps) {
  const { currentUser, t } = useApp();

  const isOwner = currentUser.user_id === item.owner_id;

  const modeBadge = () => {
    switch (item.mode) {
      case 'free':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">FREE BORROW</span>;
      case 'rent':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            ₹{item.price_per_day}/day
          </span>
        );
      case 'swap':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300">SWAP</span>;
      case 'donate':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">GIVEAWAY (0₹)</span>;
    }
  };

  const conditionColor = () => {
    switch (item.condition) {
      case 'new': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'good': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'fair': return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Check out "${item.title}" on Campus Rent & Reuse! Borrow or rent from senior ${item.owner_name}.`;
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({ title: item.title, text: shareText, url: shareUrl }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    }
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Top Image Container */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={item.photos[0]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
          {modeBadge()}
          {item.is_semester_release && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-600 text-white shadow-sm flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5" /> Next Sem Pre-Book
            </span>
          )}
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-slate-600 hover:text-emerald-600 hover:bg-white transition-all shadow-sm"
          title="Share via WhatsApp"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>

        {/* Status Pill if not available */}
        {item.status !== 'available' && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 text-center">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500 text-white shadow-md">
              {item.status === 'on_loan' ? 'Currently On Loan' : item.status === 'reserved' ? 'Reserved for Pickup' : 'Donated'}
            </span>
          </div>
        )}

        {/* Bottom Banner with Price Savings */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent p-2.5 pt-6 flex items-center justify-between text-white text-[11px]">
          <span className="font-semibold text-emerald-300">
            Save ~₹{item.estimated_new_price - (item.price_per_day * 14)} vs buying new
          </span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border ${conditionColor()} bg-white/95 text-slate-800`}>
            {item.condition}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Course Tag */}
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold mb-1">
            <Tag className="w-3 h-3" />
            <span className="truncate">{item.course_tag || item.department_tag}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {item.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
          {/* Safe Pickup Point */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate font-medium">{item.pickup_location_name}</span>
          </div>

          {/* Owner & Trust Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={item.owner_avatar}
                alt={item.owner_name}
                className="w-6 h-6 rounded-full object-cover border border-slate-200"
              />
              <div>
                <p className="text-xs font-semibold text-slate-800 leading-tight">
                  {item.owner_name}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold">
                  <span>★ {item.owner_trust.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">• Yr {item.owner_year}</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            {isOwner ? (
              <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                Your Listing
              </span>
            ) : item.status === 'available' ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRequest(item);
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
              >
                <span>{item.is_semester_release ? 'Pre-Book' : 'Borrow'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-md">
                Waitlist ({item.waitlist_count || 0})
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
