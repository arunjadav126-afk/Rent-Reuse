'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { MapPin, Navigation, Search, Check, X, Building2, Globe, Sparkles, Filter } from 'lucide-react';
import { ALL_INDIAN_COLLEGES } from '@/lib/colleges';

interface LocationModalProps {
  onClose: () => void;
}

const CATEGORIES = ['All', 'Degree', 'IIT', 'NIT', 'IIIT', 'Central', 'State', 'Private', 'Medical'] as const;


export function LocationModal({ onClose }: LocationModalProps) {
  const { selectedCampus, setSelectedCampus, setCampusLocation } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customCollege, setCustomCollege] = useState('');
  const [detecting, setDetecting] = useState(false);
  const [detectedAddress, setDetectedAddress] = useState<string | null>(null);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setDetecting(false);
        const locName = `Local Campus GPS (${latitude.toFixed(3)}°N, ${longitude.toFixed(3)}°E)`;
        setDetectedAddress(locName);
        setCampusLocation({
          lat: latitude,
          lng: longitude,
          name: locName
        });
        setSelectedCampus(locName);
        setTimeout(() => {
          onClose();
        }, 1000);
      },
      () => {
        setDetecting(false);
        setSelectedCampus('All Indian Colleges Network');
        onClose();
      },
      { timeout: 8000 }
    );
  };

  const handleSelect = (name: string) => {
    setSelectedCampus(name);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCollege.trim()) return;
    setSelectedCampus(customCollege.trim());
    onClose();
  };

  const filteredColleges = ALL_INDIAN_COLLEGES.filter((college) => {
    const matchesSearch =
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = selectedCategory === 'All' || college.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 relative flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-2xl shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">
                  Select Your Indian Campus / College
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wide">
                  Pan-India Network
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Supporting all IITs, NITs, IIITs, State & Private Universities across India
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Default / All Colleges Option */}
          <div
            onClick={() => handleSelect('All Indian Colleges Network')}
            className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
              selectedCampus === 'All Indian Colleges Network'
                ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                : 'border-slate-200 hover:border-emerald-300 bg-emerald-50/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 text-white rounded-xl">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  All Indian Colleges Network (Pan-India)
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  View and share items across all Indian universities & colleges
                </p>
              </div>
            </div>
            {selectedCampus === 'All Indian Colleges Network' && (
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Check className="w-3 h-3" />
              </div>
            )}
          </div>

          {/* GPS Auto-Detect Button */}
          <button
            onClick={handleDetectLocation}
            disabled={detecting}
            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-between transition-all active:scale-98 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-emerald-600 text-white rounded-lg">
                <Navigation className={`w-3.5 h-3.5 ${detecting ? 'animate-spin' : ''}`} />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-slate-900">
                  {detecting ? 'Detecting GPS...' : 'Use My Current Location GPS'}
                </span>
                <span className="text-[10px] text-slate-500">
                  {detectedAddress || 'Auto-detect nearby campus coordinates'}
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md text-[10px] uppercase font-bold">
              GPS Detect
            </span>
          </button>

          {/* Search Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Search Indian Colleges & Universities
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by college name, city, or state (e.g. IIT Madras, Anna Univ, DU, VIT)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500 bg-white shadow-xs"
              />
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Custom College Entry Form if not listed */}
          <form onSubmit={handleCustomSubmit} className="flex gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            <input
              type="text"
              placeholder="Can't find your college? Type any college name here..."
              value={customCollege}
              onChange={(e) => setCustomCollege(e.target.value)}
              className="flex-1 text-xs p-2 rounded-xl border border-slate-300 bg-white focus:outline-emerald-500"
            />
            <button
              type="submit"
              disabled={!customCollege.trim()}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold shrink-0 transition-colors cursor-pointer"
            >
              Add & Select
            </button>
          </form>

          {/* Colleges List */}
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
              Indian Colleges ({filteredColleges.length} Found):
            </span>

            {filteredColleges.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl">
                No matching college found. Type your custom college name above!
              </div>
            ) : (
              filteredColleges.map((college, idx) => {
                const isSelected = selectedCampus === college.name;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelect(college.name)}
                    className={`p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/90 font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Building2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`} />
                      <div className="truncate">
                        <div className="flex items-center gap-1.5 truncate">
                          <h4 className="text-xs font-extrabold text-slate-900 truncate">{college.name}</h4>
                          <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[9px] font-bold shrink-0">
                            {college.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 truncate">
                          {college.city}, {college.state}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 ml-2">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

