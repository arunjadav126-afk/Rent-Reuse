'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { MapPin, Navigation, Search, Check, X, Building2, Compass } from 'lucide-react';

interface LocationModalProps {
  onClose: () => void;
}

const COMMON_CAMPUSES = [
  { name: 'Central University Campus', city: 'North Enclave', state: 'Main Zone' },
  { name: 'City Engineering College', city: 'Tech Hub', state: 'East Campus' },
  { name: 'Metropolitan Institute of Technology', city: 'Metro Area', state: 'South Campus' },
  { name: 'National Science & Research Institute', city: 'Academic Zone', state: 'West Sector' },
  { name: 'Apex Institute of Engineering & Tech', city: 'Knowledge Park', state: 'Zone 4' },
];

export function LocationModal({ onClose }: LocationModalProps) {
  const { selectedCampus, setSelectedCampus, campusLocation, setCampusLocation } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
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
        const locName = `Nearby Campus (${latitude.toFixed(3)}°N, ${longitude.toFixed(3)}°E)`;
        setDetectedAddress(locName);
        setCampusLocation({
          lat: latitude,
          lng: longitude,
          name: locName
        });
        setSelectedCampus(locName);
        setTimeout(() => {
          onClose();
        }, 1200);
      },
      (err) => {
        setDetecting(false);
        // Fallback to campus approximate
        setSelectedCampus('Current Campus Location');
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

  const filtered = COMMON_CAMPUSES.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Select Your Campus / College
              </h3>
              <p className="text-xs text-slate-500">
                Browse and request items available at your institution
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

        <div className="p-6 space-y-5 overflow-y-auto">
          {/* GPS Auto-Detect Button */}
          <button
            onClick={handleDetectLocation}
            disabled={detecting}
            className="w-full p-4 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/60 hover:bg-emerald-100/60 text-emerald-900 font-bold text-xs flex items-center justify-between transition-all active:scale-98 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 text-white rounded-xl">
                <Navigation className={`w-4 h-4 ${detecting ? 'animate-spin' : ''}`} />
              </div>
              <div className="text-left">
                <span className="block text-sm font-extrabold">
                  {detecting ? 'Detecting Campus GPS...' : 'Use My Current Location / GPS'}
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">
                  {detectedAddress || 'Auto-filter items within your local campus radius'}
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] uppercase font-bold">
              Detect
            </span>
          </button>

          {/* Search or Enter College */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Enter or Search Your College Name
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Type your college or university name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Custom College Input Form if not in list */}
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Stanford University / Delhi Tech University"
              value={customCollege}
              onChange={(e) => setCustomCollege(e.target.value)}
              className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
            />
            <button
              type="submit"
              disabled={!customCollege.trim()}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold shrink-0 transition-colors"
            >
              Set Campus
            </button>
          </form>

          {/* Campuses List */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Suggested Campus Networks:
            </span>

            {filtered.map((campus, idx) => {
              const isSelected = selectedCampus === campus.name;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(campus.name)}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${isSelected ? 'border-emerald-600 bg-emerald-50/70 font-bold' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{campus.name}</h4>
                      <p className="text-[10px] text-slate-400">{campus.city} • {campus.state}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
