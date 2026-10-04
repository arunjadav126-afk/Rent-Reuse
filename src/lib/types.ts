export type ItemMode = 'free' | 'rent' | 'swap' | 'donate';
export type ItemCondition = 'new' | 'good' | 'fair';
export type ItemStatus = 'available' | 'reserved' | 'on_loan' | 'paused' | 'donated';
export type RequestStatus = 'pending' | 'approved' | 'declined' | 'active' | 'returned' | 'overdue' | 'cancelled' | 'disputed';
export type HandoverType = 'pickup' | 'return';
export type KarmaReason = 'lent_item' | 'returned_on_time' | 'donated' | 'vouched' | 'late_return' | 'damage';

export interface Profile {
  user_id: string;
  full_name: string;
  college_email: string;
  department: string;
  year: number; // 1 to 4
  hostel: string;
  avatar_url: string;
  karma_points: number;
  trust_score: number; // 0 to 5.0
  is_verified: boolean;
  language: 'en' | 'hi' | 'ta' | 'te';
  vouches_count: number;
  role?: 'student' | 'fixer' | 'admin';
  college_name?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  suggested_rent_per_day: number;
  avg_co2_kg: number;
}

export interface Item {
  id: string;
  owner_id: string;
  owner_name: string;
  owner_avatar: string;
  owner_trust: number;
  owner_department: string;
  owner_year: number;
  title: string;
  description: string;
  category_id: string;
  condition: ItemCondition;
  photos: string[];
  mode: ItemMode;
  price_per_day: number;
  deposit_amount: number;
  department_tag: string;
  course_tag: string;
  year_tag: number;
  pickup_location_id: string;
  pickup_location_name: string;
  status: ItemStatus;
  available_from: string; // YYYY-MM-DD
  available_until: string; // YYYY-MM-DD
  is_group_owned?: boolean;
  group_id?: string;
  group_name?: string;
  estimated_new_price: number;
  is_semester_release?: boolean;
  release_date?: string; // YYYY-MM-DD
  created_at: string;
  waitlist_count?: number;
  college_name?: string;
}

export interface ItemAvailability {
  id: string;
  item_id: string;
  start_date: string;
  end_date: string;
  request_id: string;
}

export interface BorrowRequest {
  id: string;
  item_id: string;
  item_title: string;
  item_photo: string;
  owner_id: string;
  owner_name: string;
  borrower_id: string;
  borrower_name: string;
  borrower_avatar: string;
  borrower_karma: number;
  borrower_dept: string;
  start_date: string;
  end_date: string;
  message?: string;
  status: RequestStatus;
  total_price: number;
  created_at: string;
  pickup_qr_token?: string;
  return_qr_token?: string;
}

export interface HandoverRecord {
  id: string;
  request_id: string;
  item_title: string;
  type: HandoverType;
  qr_token: string;
  scanned_by_owner_at?: string;
  scanned_by_borrower_at?: string;
  condition_notes: string;
  condition_checklist: {
    no_scratches_or_cracks: boolean;
    all_parts_present: boolean;
    powers_on_works_normally: boolean;
    clean_and_maintained: boolean;
  };
  condition_photos: string[];
  verified: boolean;
}

export interface ChatMessage {
  id: string;
  request_id: string;
  sender_id: string;
  sender_name: string;
  body: string;
  created_at: string;
  read_at?: string;
}

export interface Rating {
  id: string;
  request_id: string;
  rater_id: string;
  ratee_id: string;
  stars: number;
  on_time: boolean;
  comment: string;
  created_at: string;
}

export interface KarmaEntry {
  id: string;
  user_id: string;
  delta: number;
  reason: KarmaReason;
  description: string;
  related_request_id?: string;
  created_at: string;
}

export interface WantedPost {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  department: string;
  year: number;
  title: string;
  description: string;
  category_id: string;
  needed_from: string;
  needed_until: string;
  status: 'open' | 'fulfilled';
  matched_items_count?: number;
  created_at: string;
}

export interface BundleItem {
  id: string;
  title: string;
  category: string;
  condition: string;
  estimated_price: number;
  owner_name: string;
}

export interface Bundle {
  id: string;
  title: string;
  description: string;
  department: string;
  year: number;
  created_by: string;
  creator_name: string;
  badge: string;
  items: BundleItem[];
  available_items_count: number;
}

export interface CampusGroup {
  id: string;
  name: string;
  type: 'hostel_floor' | 'club' | 'class';
  description: string;
  members_count: number;
  items_shared_count: number;
  lead_name: string;
}

export interface SafePoint {
  id: string;
  name: string;
  description: string;
  landmark: string;
  lat: number;
  lng: number;
  recommended_hours: string;
}

export interface RepairRequest {
  id: string;
  item_id: string;
  item_title: string;
  reported_by: string;
  reporter_name: string;
  issue: string;
  status: 'open' | 'in_progress' | 'fixed';
  assigned_to?: string;
  fixer_name?: string;
  karma_bounty: number;
  created_at: string;
}

export interface ModerationReport {
  id: string;
  reporter_id: string;
  reporter_name: string;
  target_type: 'user' | 'item' | 'request';
  target_id: string;
  target_name: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'request_received' | 'request_approved' | 'qr_ready' | 'due_reminder' | 'karma_earned' | 'wanted_match';
  title: string;
  message: string;
  read: boolean;
  link_tab?: string;
  created_at: string;
}
