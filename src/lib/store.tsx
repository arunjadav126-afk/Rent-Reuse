'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Profile,
  Item,
  Category,
  BorrowRequest,
  HandoverRecord,
  ChatMessage,
  Rating,
  KarmaEntry,
  WantedPost,
  Bundle,
  CampusGroup,
  SafePoint,
  RepairRequest,
  ModerationReport,
  Notification
} from './types';
import {
  PROFILES,
  CATEGORIES,
  SAFE_POINTS,
  INITIAL_ITEMS,
  INITIAL_BUNDLES,
  INITIAL_WANTED,
  INITIAL_GROUPS,
  INITIAL_REQUESTS,
  INITIAL_MESSAGES,
  INITIAL_REPAIRS,
  INITIAL_NOTIFICATIONS,
  INITIAL_KARMA_LEDGER,
  INITIAL_REPORTS
} from './mockData';
import { Language, TRANSLATIONS } from './i18n';

interface AppContextType {
  currentUser: Profile;
  setCurrentUser: (user: Profile) => void;
  profiles: Profile[];
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  items: Item[];
  categories: Category[];
  safePoints: SafePoint[];
  bundles: Bundle[];
  wantedPosts: WantedPost[];
  groups: CampusGroup[];
  requests: BorrowRequest[];
  handovers: HandoverRecord[];
  messages: ChatMessage[];
  ratings: Rating[];
  karmaLedger: KarmaEntry[];
  repairRequests: RepairRequest[];
  reports: ModerationReport[];
  notifications: Notification[];
  unreadNotifsCount: number;

  // Actions
  createItem: (itemData: Partial<Item>) => Item;
  bulkCreateItems: (itemsData: Partial<Item>[]) => void;
  createRequest: (itemId: string, startDate: string, endDate: string, message?: string) => { success: boolean; error?: string };
  approveRequest: (requestId: string) => void;
  declineRequest: (requestId: string) => void;
  processPickupHandover: (requestId: string, checklist: HandoverRecord['condition_checklist'], notes: string) => void;
  processReturnHandover: (requestId: string, onTime: boolean, stars: number, ratingComment: string, returnNotes: string) => void;
  sendMessage: (requestId: string, body: string) => void;
  createWantedPost: (post: Partial<WantedPost>) => void;
  joinWaitlist: (itemId: string) => void;
  requestBundle: (bundleId: string) => void;
  submitRepairRequest: (itemId: string, issue: string) => void;
  resolveRepair: (repairId: string) => void;
  submitReport: (targetType: 'user' | 'item' | 'request', targetId: string, targetName: string, reason: string) => void;
  resolveReport: (reportId: string) => void;
  markNotificationRead: (notifId: string) => void;
  triggerCelebration: () => void;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => { success: boolean; error?: string };
  register: (data: Partial<Profile>) => { success: boolean; error?: string };
  logout: () => void;
  selectedCampus: string;
  setSelectedCampus: (campus: string) => void;
  campusLocation: { lat: number; lng: number; name: string } | null;
  setCampusLocation: (loc: { lat: number; lng: number; name: string } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const GUEST_PROFILE: Profile = {
  user_id: 'guest',
  full_name: 'Guest Student',
  college_email: '',
  department: 'All Departments',
  year: 1,
  hostel: 'Campus Residence',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  karma_points: 0,
  trust_score: 5.0,
  is_verified: false,
  language: 'en',
  vouches_count: 0,
  role: 'student'
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Profiles
  const [profiles, setProfiles] = useState<Profile[]>(PROFILES);
  const [currentUser, setCurrentUserState] = useState<Profile>(GUEST_PROFILE);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [language, setLanguageState] = useState<Language>('en');
  const [selectedCampus, setSelectedCampus] = useState<string>('Central University Campus');
  const [campusLocation, setCampusLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);

  // Rehydrate session from localStorage on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rent_reuse_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.user_id) {
          setCurrentUserState(parsed);
          setIsAuthenticated(true);
          if (parsed.language) setLanguageState(parsed.language);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Core Data
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [categories] = useState<Category[]>(CATEGORIES);
  const [safePoints, setSafePoints] = useState<SafePoint[]>(SAFE_POINTS);
  const [bundles, setBundles] = useState<Bundle[]>(INITIAL_BUNDLES);
  const [wantedPosts, setWantedPosts] = useState<WantedPost[]>(INITIAL_WANTED);
  const [groups, setGroups] = useState<CampusGroup[]>(INITIAL_GROUPS);
  const [requests, setRequests] = useState<BorrowRequest[]>(INITIAL_REQUESTS);
  const [handovers, setHandovers] = useState<HandoverRecord[]>([
    {
      id: 'ho_101',
      request_id: 'req_101',
      item_title: 'Omega 360° Mini Drafter with Steel Clamp',
      type: 'pickup',
      qr_token: 'QR_PICKUP_TOKEN_REQ101_SECRET_984',
      condition_notes: 'Original box present, scales intact, no crack on circular protractor.',
      condition_checklist: {
        no_scratches_or_cracks: true,
        all_parts_present: true,
        powers_on_works_normally: true,
        clean_and_maintained: true,
      },
      condition_photos: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'],
      verified: false
    }
  ]);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [karmaLedger, setKarmaLedger] = useState<KarmaEntry[]>(INITIAL_KARMA_LEDGER);
  const [repairRequests, setRepairRequests] = useState<RepairRequest[]>(INITIAL_REPAIRS);
  const [reports, setReports] = useState<ModerationReport[]>(INITIAL_REPORTS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  // Sync current user language
  const setCurrentUser = (user: Profile) => {
    setCurrentUserState(user);
    if (user.language) {
      setLanguageState(user.language);
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setProfiles(prev => prev.map(p => p.user_id === currentUser.user_id ? { ...p, language: lang } : p));
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  const login = (email: string, password?: string) => {
    const clean = email.trim().toLowerCase();
    const existing = profiles.find(p => p.college_email.toLowerCase() === clean);
    if (existing) {
      setCurrentUser(existing);
      setIsAuthenticated(true);
      try { localStorage.setItem('rent_reuse_user', JSON.stringify(existing)); } catch {}
      return { success: true };
    }
    const namePart = clean.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = namePart.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const newProfile: Profile = {
      user_id: 'user_' + Date.now(),
      full_name: formattedName || 'Campus Student',
      college_email: clean,
      department: 'Computer Science & Engineering',
      year: 1,
      hostel: 'Kaveri Hostel',
      avatar_url: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      karma_points: 30,
      trust_score: 5.0,
      is_verified: true,
      language: 'en',
      vouches_count: 1,
      role: 'student'
    };
    setProfiles(prev => [newProfile, ...prev]);
    setCurrentUser(newProfile);
    setIsAuthenticated(true);
    try { localStorage.setItem('rent_reuse_user', JSON.stringify(newProfile)); } catch {}
    return { success: true };
  };

  const register = (data: Partial<Profile>) => {
    const clean = (data.college_email || '').trim().toLowerCase();
    if (profiles.some(p => p.college_email.toLowerCase() === clean)) {
      return { success: false, error: 'A student account with this college email already exists. Please sign in.' };
    }
    const newProfile: Profile = {
      user_id: 'user_' + Date.now(),
      full_name: data.full_name || 'New Student',
      college_email: clean,
      department: data.department || 'Computer Science & Engineering',
      year: data.year || 1,
      hostel: data.hostel || 'Kaveri Hostel',
      avatar_url: data.avatar_url || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      karma_points: 30, // Starter Karma!
      trust_score: 5.0,
      is_verified: true,
      language: data.language || 'en',
      vouches_count: 0,
      role: 'student',
      college_name: selectedCampus
    };
    setProfiles(prev => [newProfile, ...prev]);
    setCurrentUser(newProfile);
    setIsAuthenticated(true);
    try { localStorage.setItem('rent_reuse_user', JSON.stringify(newProfile)); } catch {}
    awardKarma(newProfile.user_id, 30, 'vouched', 'Starter Campus Karma credited upon verified college email registration!');
    triggerCelebration();
    return { success: true };
  };

  const logout = () => {
    try { localStorage.removeItem('rent_reuse_user'); } catch {}
    setCurrentUserState(GUEST_PROFILE);
    setIsAuthenticated(false);
  };

  // Celebration helper
  const triggerCelebration = async () => {
    if (typeof window !== 'undefined') {
      try {
        const confetti = (await import('canvas-confetti')).default;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully if not loaded
      }
    }
  };

  // Award Karma function (Server-logic simulation)
  const awardKarma = (userId: string, delta: number, reason: KarmaEntry['reason'], description: string, relatedRequestId?: string) => {
    const newEntry: KarmaEntry = {
      id: 'k_' + Date.now() + Math.random().toString(36).substring(2, 6),
      user_id: userId,
      delta,
      reason,
      description,
      related_request_id: relatedRequestId,
      created_at: new Date().toISOString()
    };
    setKarmaLedger(prev => [newEntry, ...prev]);
    setProfiles(prev => prev.map(p => {
      if (p.user_id === userId) {
        return { ...p, karma_points: Math.max(0, p.karma_points + delta) };
      }
      return p;
    }));
    if (currentUser.user_id === userId) {
      setCurrentUserState(prev => ({ ...prev, karma_points: Math.max(0, prev.karma_points + delta) }));
    }
  };

  // Add Notification
  const addNotification = (userId: string, type: Notification['type'], title: string, message: string, linkTab: string = 'activity') => {
    const newNotif: Notification = {
      id: 'notif_' + Date.now() + Math.random().toString(36).substring(2, 5),
      user_id: userId,
      type,
      title,
      message,
      read: false,
      link_tab: linkTab,
      created_at: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Create an Item
  const createItem = (itemData: Partial<Item>): Item => {
    const safeP = safePoints.find(s => s.id === itemData.pickup_location_id) || safePoints[0];
    const newItem: Item = {
      id: 'item_' + Date.now(),
      owner_id: currentUser.user_id,
      owner_name: currentUser.full_name,
      owner_avatar: currentUser.avatar_url,
      owner_trust: currentUser.trust_score,
      owner_department: currentUser.department,
      owner_year: currentUser.year,
      title: itemData.title || 'Untitled Item',
      description: itemData.description || '',
      category_id: itemData.category_id || 'cat_others',
      condition: itemData.condition || 'good',
      photos: itemData.photos && itemData.photos.length > 0 ? itemData.photos : ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'],
      mode: itemData.mode || 'rent',
      price_per_day: itemData.mode === 'free' || itemData.mode === 'donate' ? 0 : (itemData.price_per_day || 10),
      deposit_amount: itemData.deposit_amount || 0,
      department_tag: itemData.department_tag || currentUser.department,
      course_tag: itemData.course_tag || 'Campus General',
      year_tag: itemData.year_tag || 1,
      pickup_location_id: safeP.id,
      pickup_location_name: safeP.name,
      status: 'available',
      available_from: itemData.available_from || new Date().toISOString().split('T')[0],
      available_until: itemData.available_until || '2026-12-31',
      estimated_new_price: itemData.estimated_new_price || 1000,
      is_semester_release: !!itemData.is_semester_release,
      release_date: itemData.release_date,
      created_at: new Date().toISOString(),
      waitlist_count: 0
    };

    setItems(prev => [newItem, ...prev]);

    // Check matching open wanted posts!
    wantedPosts.filter(w => w.status === 'open' && w.category_id === newItem.category_id).forEach(wp => {
      addNotification(
        wp.user_id,
        'wanted_match',
        'Match Found for Your Request! 🎯',
        `${currentUser.full_name} just listed "${newItem.title}" matching what you need!`,
        'all'
      );
    });

    triggerCelebration();
    return newItem;
  };

  // Bulk create items (e.g. Graduating senior)
  const bulkCreateItems = (itemsData: Partial<Item>[]) => {
    itemsData.forEach(item => {
      createItem(item);
    });
    awardKarma(currentUser.user_id, itemsData.length * 5, 'lent_item', `Bulk listed ${itemsData.length} items for junior pass-on!`);
  };

  // Request to borrow
  const createRequest = (itemId: string, startDate: string, endDate: string, message?: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return { success: false, error: 'Item not found' };

    // Prevent date overlap check:
    const hasOverlap = requests.some(r =>
      r.item_id === itemId &&
      (r.status === 'approved' || r.status === 'active') &&
      !(new Date(endDate) < new Date(r.start_date) || new Date(startDate) > new Date(r.end_date))
    );

    if (hasOverlap) {
      return { success: false, error: 'The requested dates overlap with an already approved loan on this item.' };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const total = item.mode === 'free' || item.mode === 'donate' ? 0 : days * item.price_per_day;

    const newRequest: BorrowRequest = {
      id: 'req_' + Date.now(),
      item_id: item.id,
      item_title: item.title,
      item_photo: item.photos[0],
      owner_id: item.owner_id,
      owner_name: item.owner_name,
      borrower_id: currentUser.user_id,
      borrower_name: currentUser.full_name,
      borrower_avatar: currentUser.avatar_url,
      borrower_karma: currentUser.karma_points,
      borrower_dept: `${currentUser.department} (Year ${currentUser.year})`,
      start_date: startDate,
      end_date: endDate,
      message: message || '',
      status: 'pending',
      total_price: total,
      created_at: new Date().toISOString()
    };

    setRequests(prev => [newRequest, ...prev]);

    // Notify owner
    addNotification(
      item.owner_id,
      'request_received',
      'New Borrow Request 📬',
      `${currentUser.full_name} requested your "${item.title}" for ${days} days.`,
      'activity'
    );

    return { success: true };
  };

  // Approve Request
  const approveRequest = (requestId: string) => {
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    const qrToken = `QR_PICKUP_${req.id}_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'approved', pickup_qr_token: qrToken } : r));

    // Create Handover record
    const ho: HandoverRecord = {
      id: 'ho_' + Date.now(),
      request_id: req.id,
      item_title: req.item_title,
      type: 'pickup',
      qr_token: qrToken,
      condition_notes: 'Initial condition verified on handover.',
      condition_checklist: {
        no_scratches_or_cracks: true,
        all_parts_present: true,
        powers_on_works_normally: true,
        clean_and_maintained: true,
      },
      condition_photos: [req.item_photo],
      verified: false
    };
    setHandovers(prev => [ho, ...prev]);

    // Update item status to reserved
    setItems(prev => prev.map(i => i.id === req.item_id ? { ...i, status: 'reserved' } : i));

    // Notify Borrower
    addNotification(
      req.borrower_id,
      'request_approved',
      'Request Approved! 🚀',
      `${req.owner_name} approved your request for "${req.item_title}". Meet at safe point with pickup QR code!`,
      'activity'
    );
  };

  // Decline Request
  const declineRequest = (requestId: string) => {
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'declined' } : r));
  };

  // Pickup Handover Complete
  const processPickupHandover = (requestId: string, checklist: HandoverRecord['condition_checklist'], notes: string) => {
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    const returnQrToken = `QR_RETURN_${req.id}_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    setRequests(prev => prev.map(r => r.id === requestId ? {
      ...r,
      status: 'active',
      return_qr_token: returnQrToken
    } : r));

    setHandovers(prev => prev.map(h => h.request_id === requestId && h.type === 'pickup' ? {
      ...h,
      verified: true,
      scanned_by_borrower_at: new Date().toISOString(),
      scanned_by_owner_at: new Date().toISOString(),
      condition_checklist: checklist,
      condition_notes: notes
    } : h));

    setItems(prev => prev.map(i => i.id === req.item_id ? { ...i, status: 'on_loan' } : i));

    // Notify both
    addNotification(req.borrower_id, 'qr_ready', 'Item Handed Over! 📦', `You have successfully picked up "${req.item_title}". Remember to return on time to earn +5 Karma!`);
    addNotification(req.owner_id, 'qr_ready', 'Handover Recorded! 🤝', `"${req.item_title}" has been handed over to ${req.borrower_name}.`);

    triggerCelebration();
  };

  // Return Handover Complete & Karma Allocation
  const processReturnHandover = (requestId: string, onTime: boolean, stars: number, ratingComment: string, returnNotes: string) => {
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    const item = items.find(i => i.id === req.item_id);

    // Update Request status
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'returned' } : r));

    // Handle donation transfer vs standard return
    if (item && item.mode === 'donate') {
      setItems(prev => prev.map(i => i.id === req.item_id ? {
        ...i,
        owner_id: req.borrower_id,
        owner_name: req.borrower_name,
        status: 'donated'
      } : i));
      // Award owner big donation karma!
      awardKarma(req.owner_id, 15, 'donated', `Donated "${req.item_title}" permanently to junior student!`, req.id);
    } else {
      setItems(prev => prev.map(i => i.id === req.item_id ? { ...i, status: 'available' } : i));
      // Award owner lending karma
      awardKarma(req.owner_id, 10, 'lent_item', `Successfully lent "${req.item_title}" and received back safely.`, req.id);
    }

    // Borrower Karma: on-time vs late
    if (onTime) {
      awardKarma(req.borrower_id, 5, 'returned_on_time', `Returned "${req.item_title}" on time with zero delay.`, req.id);
    } else {
      awardKarma(req.borrower_id, -10, 'late_return', `Late return recorded for "${req.item_title}".`, req.id);
    }

    // Record Rating
    const newRating: Rating = {
      id: 'rate_' + Date.now(),
      request_id: requestId,
      rater_id: currentUser.user_id,
      ratee_id: currentUser.user_id === req.owner_id ? req.borrower_id : req.owner_id,
      stars,
      on_time: onTime,
      comment: ratingComment,
      created_at: new Date().toISOString()
    };
    setRatings(prev => [newRating, ...prev]);

    // Recalculate trust score for ratee
    setProfiles(prev => prev.map(p => {
      if (p.user_id === newRating.ratee_id) {
        const newScore = Number(((p.trust_score * 4 + stars) / 5).toFixed(1));
        return { ...p, trust_score: newScore };
      }
      return p;
    }));

    // Record Return Handover
    const returnHo: HandoverRecord = {
      id: 'ho_ret_' + Date.now(),
      request_id: requestId,
      item_title: req.item_title,
      type: 'return',
      qr_token: req.return_qr_token || 'RET_TOKEN',
      verified: true,
      scanned_by_borrower_at: new Date().toISOString(),
      scanned_by_owner_at: new Date().toISOString(),
      condition_notes: returnNotes,
      condition_checklist: {
        no_scratches_or_cracks: true,
        all_parts_present: true,
        powers_on_works_normally: true,
        clean_and_maintained: true,
      },
      condition_photos: [req.item_photo],
    };
    setHandovers(prev => [returnHo, ...prev]);

    // Check waitlist for this item
    if (item && (item.waitlist_count || 0) > 0) {
      addNotification(
        'user_priya',
        'due_reminder',
        'Waitlist Alert: Item is Available! 🔔',
        `"${item.title}" was just returned and is now available for booking! You have 24 hours to claim it.`
      );
    }

    triggerCelebration();
  };

  // Send Message
  const sendMessage = (requestId: string, body: string) => {
    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      request_id: requestId,
      sender_id: currentUser.user_id,
      sender_name: currentUser.full_name,
      body,
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMsg]);

    // Simulate smart auto-reply if needed or notify counterparty
    const req = requests.find(r => r.id === requestId);
    if (req) {
      const counterId = currentUser.user_id === req.owner_id ? req.borrower_id : req.owner_id;
      addNotification(counterId, 'request_received', `New message from ${currentUser.full_name}`, body.substring(0, 60));
    }
  };

  // Wanted Posts
  const createWantedPost = (post: Partial<WantedPost>) => {
    const newW: WantedPost = {
      id: 'want_' + Date.now(),
      user_id: currentUser.user_id,
      user_name: currentUser.full_name,
      user_avatar: currentUser.avatar_url,
      department: currentUser.department,
      year: currentUser.year,
      title: post.title || 'Needed Item',
      description: post.description || '',
      category_id: post.category_id || 'cat_drafting',
      needed_from: post.needed_from || new Date().toISOString().split('T')[0],
      needed_until: post.needed_until || '2026-12-01',
      status: 'open',
      matched_items_count: items.filter(i => i.category_id === post.category_id && i.status === 'available').length,
      created_at: new Date().toISOString()
    };
    setWantedPosts(prev => [newW, ...prev]);
    triggerCelebration();
  };

  // Join waitlist
  const joinWaitlist = (itemId: string) => {
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, waitlist_count: (i.waitlist_count || 0) + 1 } : i));
    addNotification(currentUser.user_id, 'due_reminder', 'Joined Waitlist 📋', 'You will be notified immediately once this item is returned.');
  };

  // Request all bundle items
  const requestBundle = (bundleId: string) => {
    const bundle = bundles.find(b => b.id === bundleId);
    if (!bundle) return;

    // Create request for each item in the bundle
    bundle.items.forEach(bi => {
      // Find matching item in catalog
      const match = items.find(i => i.title.includes(bi.title) || bi.title.includes(i.title)) || items[0];
      createRequest(match.id, '2026-10-10', '2026-12-10', `Part of "${bundle.title}" requested by ${currentUser.full_name}`);
    });

    triggerCelebration();
  };

  // Repair Requests
  const submitRepairRequest = (itemId: string, issue: string) => {
    const item = items.find(i => i.id === itemId);
    const newRep: RepairRequest = {
      id: 'rep_' + Date.now(),
      item_id: itemId,
      item_title: item?.title || 'Campus Item',
      reported_by: currentUser.user_id,
      reporter_name: currentUser.full_name,
      issue,
      status: 'open',
      karma_bounty: 25,
      created_at: new Date().toISOString()
    };
    setRepairRequests(prev => [newRep, ...prev]);
    // Pause item
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, status: 'paused' } : i));
  };

  const resolveRepair = (repairId: string) => {
    setRepairRequests(prev => prev.map(r => r.id === repairId ? { ...r, status: 'fixed', assigned_to: currentUser.user_id, fixer_name: currentUser.full_name } : r));
    const rep = repairRequests.find(r => r.id === repairId);
    if (rep) {
      setItems(prev => prev.map(i => i.id === rep.item_id ? { ...i, status: 'available' } : i));
      awardKarma(currentUser.user_id, rep.karma_bounty, 'vouched', `Campus Fixer: Repaired item "${rep.item_title}"!`);
      triggerCelebration();
    }
  };

  // Reports
  const submitReport = (targetType: 'user' | 'item' | 'request', targetId: string, targetName: string, reason: string) => {
    const newRep: ModerationReport = {
      id: 'rep_m_' + Date.now(),
      reporter_id: currentUser.user_id,
      reporter_name: currentUser.full_name,
      target_type: targetType,
      target_id: targetId,
      target_name: targetName,
      reason,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setReports(prev => [newRep, ...prev]);
  };

  const resolveReport = (reportId: string) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const unreadNotifsCount = notifications.filter(n => n.user_id === currentUser.user_id && !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        profiles,
        language,
        setLanguage,
        t,
        items,
        categories,
        safePoints,
        bundles,
        wantedPosts,
        groups,
        requests,
        handovers,
        messages,
        ratings,
        karmaLedger,
        repairRequests,
        reports,
        notifications,
        unreadNotifsCount,
        createItem,
        bulkCreateItems,
        createRequest,
        approveRequest,
        declineRequest,
        processPickupHandover,
        processReturnHandover,
        sendMessage,
        createWantedPost,
        joinWaitlist,
        requestBundle,
        submitRepairRequest,
        resolveRepair,
        submitReport,
        resolveReport,
        markNotificationRead,
        triggerCelebration,
        isAuthenticated,
        login,
        register,
        logout,
        selectedCampus,
        setSelectedCampus,
        campusLocation,
        setCampusLocation
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
