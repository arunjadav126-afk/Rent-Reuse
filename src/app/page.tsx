'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { Item, ItemMode } from '@/lib/types';
import { Header } from '@/components/Header';
import { ItemCard } from '@/components/ItemCard';
import { ItemDetailModal } from '@/components/ItemDetailModal';
import { PostItemModal } from '@/components/PostItemModal';
import { BulkListModal } from '@/components/BulkListModal';
import { ActivityModal } from '@/components/ActivityModal';
import { QRHandoverModal } from '@/components/QRHandoverModal';
import { ChatModal } from '@/components/ChatModal';
import { BundlesView } from '@/components/BundlesView';
import { WantedBoardView } from '@/components/WantedBoardView';
import { GroupsView } from '@/components/GroupsView';
import { ImpactDashboardView } from '@/components/ImpactDashboardView';
import { AdminView } from '@/components/AdminView';
import { AuthModal } from '@/components/AuthModal';
import { ProfileModal } from '@/components/ProfileModal';
import { LocationModal } from '@/components/LocationModal';
import {
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Compass,
  Cpu,
  FlaskConical,
  Trophy,
  Home,
  Package,
  Layers,
  Calendar,
  Users,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';

export default function HomeView() {
  const { items, categories, currentUser, requests, isAuthenticated, selectedCampus, t } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Navigation State
  const [activeTab, setActiveTab] = useState<'all' | 'course' | 'semester' | 'bundles' | 'wanted' | 'groups' | 'impact' | 'admin'>('all');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');

  // Modals State
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activeChatRequestId, setActiveChatRequestId] = useState<string | null>(null);
  const [qrModalData, setQrModalData] = useState<{ requestId: string; mode: 'pickup' | 'return' } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<{ open: boolean; mode: 'signin' | 'signup' }>({ open: false, mode: 'signin' });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Icon mapping helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'FlaskConical': return <FlaskConical className="w-4 h-4" />;
      case 'Trophy': return <Trophy className="w-4 h-4" />;
      case 'Home': return <Home className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Tab filters
      if (activeTab === 'course') {
        const matchesDept = item.department_tag.toLowerCase().includes(currentUser.department.toLowerCase()) || item.department_tag.includes('All');
        const matchesYear = item.year_tag === currentUser.year;
        if (!matchesDept && !matchesYear) return false;
      }
      if (activeTab === 'semester') {
        if (!item.is_semester_release) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCourse = item.course_tag.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCourse) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category_id !== selectedCategory) {
        return false;
      }

      // Mode filter
      if (selectedMode !== 'all' && item.mode !== selectedMode) {
        return false;
      }

      return true;
    });
  }, [items, activeTab, searchQuery, selectedCategory, selectedMode, currentUser]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        onOpenPostItem={() => isAuthenticated ? setShowPostModal(true) : setShowAuthModal({ open: true, mode: 'signin' })}
        onOpenBulkList={() => isAuthenticated ? setShowBulkModal(true) : setShowAuthModal({ open: true, mode: 'signin' })}
        onOpenActivity={() => isAuthenticated ? setShowActivityModal(true) : setShowAuthModal({ open: true, mode: 'signin' })}
        onOpenAuth={(mode) => setShowAuthModal({ open: true, mode: mode || 'signin' })}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenLocation={() => setShowLocationModal(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Banner: Guest Welcome vs Student Suggestion */}
        {!isAuthenticated ? (
          <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-5 sm:p-7 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-2xl shrink-0 text-amber-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-emerald-300">
                    Welcome to Rent & Reuse
                  </span>
                  <span className="text-[11px] bg-white/15 px-2.5 py-0.5 rounded-full font-bold text-white">
                    📍 {selectedCampus}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black mt-1">
                  Never buy what you only need for a semester.
                </h3>
                <p className="text-xs text-emerald-100/90 mt-0.5 max-w-xl">
                  Browse lab coats, mini drafters, scientific calculators, and books from seniors at your institution. Register with your college ID to borrow or pass on gear!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowAuthModal({ open: true, mode: 'signin' })}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowAuthModal({ open: true, mode: 'signup' })}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Register (+30 Karma)
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-4 sm:p-5 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-xs rounded-2xl shrink-0">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-emerald-200">
                    Smart Campus Suggestion
                  </span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.2 rounded-full font-semibold">
                    For {currentUser.full_name} ({currentUser.department})
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium mt-0.5 text-white/95">
                  {currentUser.year === 1
                    ? "Engineering Graphics & Chemistry labs start this week! Mini drafters and lab aprons are available from senior hostel residents."
                    : "Have unused 1st or 2nd year lab gear or drafters? Pass them on to freshers to earn Karma and climb the campus leaderboard!"}
                </p>
              </div>
            </div>

            <button
              onClick={() => currentUser.year === 1 ? setActiveTab('course') : setShowPostModal(true)}
              className="px-4 py-2 bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold rounded-xl shadow-xs shrink-0 transition-all active:scale-95 cursor-pointer"
            >
              {currentUser.year === 1 ? 'View Course Items' : 'List Gear Now'}
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2.5 px-4 rounded-xl transition-all shrink-0 cursor-pointer ${activeTab === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'}`}
          >
            {t('all_items')}
          </button>

          <button
            onClick={() => setActiveTab('course')}
            className={`py-2.5 px-4 rounded-xl transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${activeTab === 'course' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'}`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>{t('for_my_course')}</span>
          </button>

          <button
            onClick={() => setActiveTab('semester')}
            className={`py-2.5 px-4 rounded-xl transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${activeTab === 'semester' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'}`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('semester_handover')}</span>
          </button>

          <button
            onClick={() => setActiveTab('bundles')}
            className={`py-2.5 px-4 rounded-xl transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${activeTab === 'bundles' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'}`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{t('bundles')}</span>
          </button>

          <button
            onClick={() => setActiveTab('wanted')}
            className={`py-2.5 px-4 rounded-xl transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${activeTab === 'wanted' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('wanted_board')}</span>
          </button>

          <button
            onClick={() => setActiveTab('groups')}
            className={`py-2.5 px-4 rounded-xl transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${activeTab === 'groups' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'}`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t('groups')}</span>
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`py-2.5 px-4 rounded-xl transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${activeTab === 'impact' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'}`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t('impact_stats')}</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`py-2.5 px-4 rounded-xl transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${activeTab === 'admin' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'}`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{t('admin_panel')}</span>
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'bundles' ? (
          <BundlesView />
        ) : activeTab === 'wanted' ? (
          <WantedBoardView />
        ) : activeTab === 'groups' ? (
          <GroupsView />
        ) : activeTab === 'impact' ? (
          <ImpactDashboardView />
        ) : activeTab === 'admin' ? (
          <AdminView />
        ) : (
          /* Catalog Tab (All, For My Course, Next Semester) */
          <div className="space-y-6">
            {/* Search and Filters Header */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-emerald-500 transition-colors"
                />
              </div>

              {/* Category Chips and Mode Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                {/* Category horizontal scroller */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${selectedCategory === 'all' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {t('all_categories')}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${selectedCategory === cat.id ? 'bg-emerald-600 text-white shadow-xs font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {getCategoryIcon(cat.icon)}
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>

                {/* Mode Select */}
                <div className="flex items-center gap-1 text-xs font-semibold shrink-0">
                  <span className="text-slate-400 hidden sm:inline">Mode:</span>
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold focus:outline-emerald-500 cursor-pointer"
                  >
                    <option value="all">All Modes (Rent / Free / Swap / Giveaway)</option>
                    <option value="free">Free Borrow (0₹)</option>
                    <option value="rent">Rent / Day</option>
                    <option value="swap">Barter Swap</option>
                    <option value="donate">Permanent Giveaway</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results count & items grid */}
            <div>
              <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-xs font-bold text-slate-500">
                  Showing {filteredItems.length} campus listings
                </span>
                {activeTab === 'semester' && (
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    Pre-booking open for Next Term
                  </span>
                )}
              </div>

              {filteredItems.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
                  <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                    <Package className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">No items match your filter</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try clearing your search terms or post a request on the Wanted Board so seniors can see your requirement.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedMode('all'); }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onSelect={(i) => setSelectedItem(i)}
                      onRequest={(i) => setSelectedItem(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">Rent & Reuse</span>
            <span>• College Campus Resource Sharing Network</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Enforcing student verification, safe points, digital handovers, and sustainable zero-waste reuse.
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onOpenChat={(reqId) => {
            setSelectedItem(null);
            setActiveChatRequestId(reqId);
          }}
          onOpenAuth={() => setShowAuthModal({ open: true, mode: 'signin' })}
        />
      )}

      {showPostModal && (
        <PostItemModal onClose={() => setShowPostModal(false)} />
      )}

      {showBulkModal && (
        <BulkListModal onClose={() => setShowBulkModal(false)} />
      )}

      {showActivityModal && (
        <ActivityModal
          onClose={() => setShowActivityModal(false)}
          onOpenChat={(reqId) => {
            setShowActivityModal(false);
            setActiveChatRequestId(reqId);
          }}
          onOpenQR={(reqId, mode) => {
            setShowActivityModal(false);
            setQrModalData({ requestId: reqId, mode });
          }}
        />
      )}

      {activeChatRequestId && (
        <ChatModal
          requestId={activeChatRequestId}
          onClose={() => setActiveChatRequestId(null)}
          onOpenQR={(mode) => setQrModalData({ requestId: activeChatRequestId, mode })}
        />
      )}

      {qrModalData && (
        <QRHandoverModal
          request={requests.find(r => r.id === qrModalData.requestId) || null}
          mode={qrModalData.mode}
          onClose={() => setQrModalData(null)}
        />
      )}

      {showAuthModal.open && (
        <AuthModal
          initialMode={showAuthModal.mode}
          onClose={() => setShowAuthModal({ open: false, mode: 'signin' })}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          onClose={() => setShowProfileModal(false)}
          onOpenActivity={() => setShowActivityModal(true)}
        />
      )}

      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
        />
      )}
    </div>
  );
}
