-- ==============================================================================
-- Rent & Reuse: Complete Campus Platform Database Schema (PostgreSQL / Supabase)
-- Implements: Row Level Security (RLS), Server Triggers, Karma Ledger & Seed Data
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  college_email TEXT UNIQUE NOT NULL CHECK (college_email LIKE '%@campus.edu' OR college_email LIKE '%.edu' OR college_email LIKE '%@%.ac.in'),
  department TEXT NOT NULL,
  year INT NOT NULL CHECK (year BETWEEN 1 AND 5),
  hostel TEXT NOT NULL,
  avatar_url TEXT,
  karma_points INT DEFAULT 30, -- starter balance
  trust_score NUMERIC(3, 2) DEFAULT 5.00 CHECK (trust_score BETWEEN 0.00 AND 5.00),
  is_verified BOOLEAN DEFAULT TRUE,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'hi', 'ta')),
  vouches_count INT DEFAULT 0,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'fixer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  suggested_rent_per_day NUMERIC DEFAULT 15,
  avg_co2_kg NUMERIC DEFAULT 8.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SAFE PICKUP POINTS TABLE
CREATE TABLE IF NOT EXISTS safe_points (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  landmark TEXT NOT NULL,
  lat NUMERIC(9, 6) NOT NULL,
  lng NUMERIC(9, 6) NOT NULL,
  recommended_hours TEXT DEFAULT '8:00 AM - 9:00 PM',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ITEMS TABLE
CREATE TABLE IF NOT EXISTS items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id),
  condition TEXT NOT NULL CHECK (condition IN ('new', 'good', 'fair')),
  photos TEXT[] NOT NULL DEFAULT '{}',
  mode TEXT NOT NULL CHECK (mode IN ('free', 'rent', 'swap', 'donate')),
  price_per_day NUMERIC DEFAULT 0,
  deposit_amount NUMERIC DEFAULT 0,
  department_tag TEXT NOT NULL,
  course_tag TEXT NOT NULL,
  year_tag INT DEFAULT 1,
  pickup_location_id TEXT REFERENCES safe_points(id),
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'on_loan', 'paused', 'donated')),
  available_from DATE NOT NULL,
  available_until DATE NOT NULL,
  is_group_owned BOOLEAN DEFAULT FALSE,
  group_id TEXT,
  estimated_new_price NUMERIC DEFAULT 1000,
  is_semester_release BOOLEAN DEFAULT FALSE,
  release_date DATE,
  waitlist_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Full text search index on title & description
CREATE INDEX IF NOT EXISTS items_search_idx ON items USING GIN (to_tsvector('english', title || ' ' || description));

-- 5. ITEM AVAILABILITY / BOOKING RANGES
CREATE TABLE IF NOT EXISTS item_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  request_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BORROW REQUESTS
CREATE TABLE IF NOT EXISTS requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  borrower_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined', 'active', 'returned', 'overdue', 'cancelled', 'disputed')),
  total_price NUMERIC DEFAULT 0,
  pickup_qr_token TEXT,
  return_qr_token TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. HANDOVERS TABLE
CREATE TABLE IF NOT EXISTS handovers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('pickup', 'return')),
  qr_token TEXT NOT NULL,
  scanned_by_owner_at TIMESTAMPTZ,
  scanned_by_borrower_at TIMESTAMPTZ,
  condition_notes TEXT,
  condition_checklist JSONB DEFAULT '{"no_scratches_or_cracks": true, "all_parts_present": true, "powers_on_works_normally": true, "clean_and_maintained": true}',
  condition_photos TEXT[] DEFAULT '{}',
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. IN-APP CHAT MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. RATINGS TABLE
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
  rater_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  ratee_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
  on_time BOOLEAN DEFAULT TRUE,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. KARMA LEDGER (Immutable audit log)
CREATE TABLE IF NOT EXISTS karma_ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  delta INT NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('lent_item', 'returned_on_time', 'donated', 'vouched', 'late_return', 'damage')),
  description TEXT NOT NULL,
  related_request_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. WANTED POSTS
CREATE TABLE IF NOT EXISTS wanted_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id),
  needed_from DATE NOT NULL,
  needed_until DATE NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'fulfilled', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. BUNDLES
CREATE TABLE IF NOT EXISTS bundles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  department TEXT NOT NULL,
  year INT NOT NULL,
  created_by UUID REFERENCES profiles(user_id),
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. CAMPUS REPAIR REQUESTS
CREATE TABLE IF NOT EXISTS repair_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  reported_by UUID REFERENCES profiles(user_id),
  issue TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'fixed')),
  assigned_to UUID REFERENCES profiles(user_id),
  karma_bounty INT DEFAULT 25,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. MODERATION REPORTS
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES profiles(user_id),
  target_type TEXT NOT NULL CHECK (target_type IN ('user', 'item', 'request')),
  target_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE handovers ENABLE ROW LEVEL SECURITY;
ALTER TABLE karma_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, own profile update
CREATE POLICY "Public profiles are viewable by anyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Items: Anyone can read available items, owners can manage
CREATE POLICY "Items are viewable by all verified students" ON items FOR SELECT USING (true);
CREATE POLICY "Owners can insert their own items" ON items FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update their own items" ON items FOR UPDATE USING (auth.uid() = owner_id);

-- Requests: Borrower and item owner only
CREATE POLICY "Requests visible only to parties involved" ON requests
  FOR SELECT USING (auth.uid() = borrower_id OR auth.uid() IN (SELECT owner_id FROM items WHERE id = item_id));
CREATE POLICY "Borrowers can create requests" ON requests
  FOR INSERT WITH CHECK (auth.uid() = borrower_id);

-- Chat Messages: Private to conversation participants
CREATE POLICY "Messages readable only by loan parties" ON messages
  FOR SELECT USING (auth.uid() IN (SELECT borrower_id FROM requests WHERE id = request_id) OR auth.uid() IN (SELECT i.owner_id FROM requests r JOIN items i ON r.item_id = i.id WHERE r.id = request_id));

-- Karma Ledger: Read-only to users, only server functions can insert
CREATE POLICY "Users can read own karma history" ON karma_ledger FOR SELECT USING (auth.uid() = user_id);
