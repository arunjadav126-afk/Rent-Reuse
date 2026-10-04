import { Profile, Category, Item, Bundle, CampusGroup, SafePoint, WantedPost, BorrowRequest, HandoverRecord, ChatMessage, Rating, KarmaEntry, RepairRequest, ModerationReport, Notification } from './types';

export const PROFILES: Profile[] = [
  {
    user_id: 'user_aarav',
    full_name: 'Aarav Sharma',
    college_email: 'aarav.sharma@campus.edu',
    department: 'Mechanical Engineering',
    year: 3,
    hostel: 'Ganga Hostel (Room 302)',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    karma_points: 145,
    trust_score: 4.9,
    is_verified: true,
    language: 'en',
    vouches_count: 8,
    role: 'student',
  },
  {
    user_id: 'user_priya',
    full_name: 'Priya Patel',
    college_email: 'priya.patel@campus.edu',
    department: 'Computer Science & Engineering',
    year: 1,
    hostel: 'Kaveri Hostel (Room 114)',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    karma_points: 40,
    trust_score: 5.0,
    is_verified: true,
    language: 'en',
    vouches_count: 3,
    role: 'student',
  },
  {
    user_id: 'user_rohan',
    full_name: 'Rohan Verma',
    college_email: 'rohan.verma@campus.edu',
    department: 'Electrical & Electronics',
    year: 4,
    hostel: 'Narmada Hostel (Room 205)',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    karma_points: 230,
    trust_score: 4.95,
    is_verified: true,
    language: 'en',
    vouches_count: 14,
    role: 'fixer',
  },
  {
    user_id: 'user_admin',
    full_name: 'Campus Resource Cell',
    college_email: 'resources@campus.edu',
    department: 'Dean of Student Affairs',
    year: 4,
    hostel: 'Admin Block Wing B',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    karma_points: 999,
    trust_score: 5.0,
    is_verified: true,
    language: 'en',
    vouches_count: 50,
    role: 'admin',
  }
];

export const CATEGORIES: Category[] = [
  { id: 'cat_drafting', name: 'Drafting Tools', icon: 'Compass', suggested_rent_per_day: 15, avg_co2_kg: 8.5 },
  { id: 'cat_electronics', name: 'Electronics & Calculators', icon: 'Cpu', suggested_rent_per_day: 25, avg_co2_kg: 14.0 },
  { id: 'cat_books', name: 'Books & Notes', icon: 'BookOpen', suggested_rent_per_day: 5, avg_co2_kg: 4.0 },
  { id: 'cat_lab', name: 'Lab Gear & Aprons', icon: 'FlaskConical', suggested_rent_per_day: 10, avg_co2_kg: 6.2 },
  { id: 'cat_sports', name: 'Sports & Fitness', icon: 'Trophy', suggested_rent_per_day: 20, avg_co2_kg: 7.5 },
  { id: 'cat_hostel', name: 'Hostel Essentials', icon: 'Home', suggested_rent_per_day: 15, avg_co2_kg: 12.0 },
  { id: 'cat_others', name: 'Other Equipment', icon: 'Package', suggested_rent_per_day: 10, avg_co2_kg: 5.0 },
];

export const SAFE_POINTS: SafePoint[] = [
  {
    id: 'sp_library',
    name: 'Central Library Foyer',
    description: 'Under CCTV surveillance at the main reading hall entrance',
    landmark: 'Central Library Ground Floor',
    lat: 12.9915,
    lng: 80.2337,
    recommended_hours: '8:00 AM - 10:00 PM',
  },
  {
    id: 'sp_canteen',
    name: 'SAC Student Canteen Veranda',
    description: 'High footfall outdoor seating next to the Juice Corner',
    landmark: 'Students Activity Center (SAC)',
    lat: 12.9922,
    lng: 80.2351,
    recommended_hours: '9:00 AM - 9:00 PM',
  },
  {
    id: 'sp_maingate',
    name: 'Campus Main Gate Security Booth',
    description: 'Well-lit 24/7 security guard cabin with round-the-clock presence',
    landmark: 'North Campus Entrance Gate',
    lat: 12.9938,
    lng: 80.2305,
    recommended_hours: '24 Hours',
  },
  {
    id: 'sp_ganga',
    name: 'Ganga & Kaveri Hostel Common Quadrangle',
    description: 'Central benches between boys and girls residential blocks',
    landmark: 'Residential Zone Quad',
    lat: 12.9895,
    lng: 80.2372,
    recommended_hours: '7:00 AM - 10:30 PM',
  }
];

export const INITIAL_ITEMS: Item[] = [
  {
    id: 'item_1',
    owner_id: 'user_aarav',
    owner_name: 'Aarav Sharma',
    owner_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    owner_trust: 4.9,
    owner_department: 'Mechanical Engineering',
    owner_year: 3,
    title: 'Omega 360° Mini Drafter with Steel Clamp',
    description: 'Essential for 1st year Engineering Graphics. Zero slack, smooth steel arms, calibrated scales. Stored in rigid protective case. Save ₹1,200 instead of buying new!',
    category_id: 'cat_drafting',
    condition: 'good',
    photos: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80'
    ],
    mode: 'rent',
    price_per_day: 15,
    deposit_amount: 150,
    department_tag: 'Engineering (All Branches)',
    course_tag: 'Engineering Graphics / Drawing (EG101)',
    year_tag: 1,
    pickup_location_id: 'sp_library',
    pickup_location_name: 'Central Library Foyer',
    status: 'available',
    available_from: '2026-10-01',
    available_until: '2026-12-15',
    estimated_new_price: 1350,
    is_semester_release: false,
    created_at: '2026-09-28T10:00:00Z',
    waitlist_count: 1
  },
  {
    id: 'item_2',
    owner_id: 'user_rohan',
    owner_name: 'Rohan Verma',
    owner_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    owner_trust: 4.95,
    owner_department: 'Electrical & Electronics',
    owner_year: 4,
    title: 'Casio fx-991EX ClassWiz Scientific Calculator',
    description: 'High-resolution display, 552 mathematical functions, matrix, vector, integration, and statistical solver. Exam approved by all departments. Solar + battery working perfectly.',
    category_id: 'cat_electronics',
    condition: 'good',
    photos: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=800&auto=format&fit=crop&q=80'
    ],
    mode: 'rent',
    price_per_day: 12,
    deposit_amount: 200,
    department_tag: 'Engineering (All Branches)',
    course_tag: 'Calculus & Linear Algebra (MA101)',
    year_tag: 1,
    pickup_location_id: 'sp_canteen',
    pickup_location_name: 'SAC Student Canteen Veranda',
    status: 'available',
    available_from: '2026-10-01',
    available_until: '2026-11-30',
    estimated_new_price: 1600,
    created_at: '2026-09-29T14:30:00Z',
    waitlist_count: 0
  },
  {
    id: 'item_3',
    owner_id: 'user_aarav',
    owner_name: 'Aarav Sharma',
    owner_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    owner_trust: 4.9,
    owner_department: 'Mechanical Engineering',
    owner_year: 3,
    title: 'Pure Cotton Lab Coat (Size L) & Protective Goggles',
    description: 'Cleaned, sanitized, heavy-duty 100% white cotton lab apron with full sleeves and deep chest pockets. Anti-fog splash resistant safety goggles included.',
    category_id: 'cat_lab',
    condition: 'good',
    photos: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80'
    ],
    mode: 'free',
    price_per_day: 0,
    deposit_amount: 0,
    department_tag: 'Chemistry & Biotech',
    course_tag: 'Chemistry & Materials Lab (CY102)',
    year_tag: 1,
    pickup_location_id: 'sp_library',
    pickup_location_name: 'Central Library Foyer',
    status: 'available',
    available_from: '2026-10-01',
    available_until: '2026-12-20',
    estimated_new_price: 650,
    created_at: '2026-09-30T09:15:00Z'
  },
  {
    id: 'item_4',
    owner_id: 'user_rohan',
    owner_name: 'Rohan Verma',
    owner_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    owner_trust: 4.95,
    owner_department: 'Electrical & Electronics',
    owner_year: 4,
    title: 'Arduino Uno Robotics Starter Kit with 30+ Sensors',
    description: 'Includes original Arduino Uno R3 board, breadboards, servo motors, ultrasonic sensor, IR receivers, OLED display, jumper wires, and carrying case. Ideal for hackathons and semester projects.',
    category_id: 'cat_electronics',
    condition: 'new',
    photos: [
      'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&auto=format&fit=crop&q=80'
    ],
    mode: 'rent',
    price_per_day: 35,
    deposit_amount: 500,
    department_tag: 'ECE & Robotics Club',
    course_tag: 'Embedded Systems & IoT (EC301)',
    year_tag: 2,
    pickup_location_id: 'sp_canteen',
    pickup_location_name: 'SAC Student Canteen Veranda',
    status: 'available',
    available_from: '2026-10-02',
    available_until: '2026-12-10',
    estimated_new_price: 3200,
    is_group_owned: true,
    group_id: 'grp_robo',
    group_name: 'Robotics & Electronics Innovation Club',
    created_at: '2026-10-01T11:00:00Z'
  },
  {
    id: 'item_5',
    owner_id: 'user_aarav',
    owner_name: 'Aarav Sharma',
    owner_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    owner_trust: 4.9,
    owner_department: 'Mechanical Engineering',
    owner_year: 3,
    title: 'Prestige 1.5L Stainless Steel Electric Kettle',
    description: 'Fast boiling (1500W), automatic shut-off, boil-dry protection. Great for late night exam tea/coffee and instant noodles in the hostel.',
    category_id: 'cat_hostel',
    condition: 'good',
    photos: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    mode: 'swap',
    price_per_day: 10,
    deposit_amount: 150,
    department_tag: 'Hostel Wardens & Residents',
    course_tag: 'Hostel Living',
    year_tag: 1,
    pickup_location_id: 'sp_ganga',
    pickup_location_name: 'Ganga & Kaveri Hostel Common Quadrangle',
    status: 'available',
    available_from: '2026-10-01',
    available_until: '2026-11-20',
    estimated_new_price: 950,
    created_at: '2026-09-27T16:00:00Z'
  },
  {
    id: 'item_6',
    owner_id: 'user_rohan',
    owner_name: 'Rohan Verma',
    owner_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    owner_trust: 4.95,
    owner_department: 'Electrical & Electronics',
    owner_year: 4,
    title: 'Introduction to Algorithms (CLRS 4th Edition)',
    description: 'The definitive textbook for DSA and competitive programming. Hardcover edition, crisp pages, no marker scribbles.',
    category_id: 'cat_books',
    condition: 'good',
    photos: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
    ],
    mode: 'rent',
    price_per_day: 8,
    deposit_amount: 150,
    department_tag: 'Computer Science & Engineering',
    course_tag: 'Data Structures & Algorithms (CS201)',
    year_tag: 2,
    pickup_location_id: 'sp_library',
    pickup_location_name: 'Central Library Foyer',
    status: 'available',
    available_from: '2026-10-01',
    available_until: '2026-12-30',
    estimated_new_price: 1800,
    created_at: '2026-09-25T12:00:00Z'
  },
  {
    id: 'item_7',
    owner_id: 'user_aarav',
    owner_name: 'Aarav Sharma',
    owner_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    owner_trust: 4.9,
    owner_department: 'Mechanical Engineering',
    owner_year: 3,
    title: 'Engineering Mechanics by S.S. Bhavikatti (Free Giveaway!)',
    description: 'Passing on my 1st year mechanics textbook to juniors. Permanent giveaway! Free ownership transfer to first requester.',
    category_id: 'cat_books',
    condition: 'good',
    photos: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80'
    ],
    mode: 'donate',
    price_per_day: 0,
    deposit_amount: 0,
    department_tag: 'Mechanical / Civil / All',
    course_tag: 'Engineering Mechanics (ME101)',
    year_tag: 1,
    pickup_location_id: 'sp_library',
    pickup_location_name: 'Central Library Foyer',
    status: 'available',
    available_from: '2026-10-01',
    available_until: '2026-12-31',
    estimated_new_price: 600,
    created_at: '2026-09-26T08:00:00Z'
  },
  {
    id: 'item_8',
    owner_id: 'user_aarav',
    owner_name: 'Aarav Sharma',
    owner_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    owner_trust: 4.9,
    owner_department: 'Mechanical Engineering',
    owner_year: 3,
    title: '[Next Semester Pre-Book] Full Drafting Board + Imperial T-Scale',
    description: 'Will be released right after December semester exams (Dec 18th). Freshers can pre-book today so you do not have to scramble during January orientation!',
    category_id: 'cat_drafting',
    condition: 'good',
    photos: [
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80'
    ],
    mode: 'rent',
    price_per_day: 10,
    deposit_amount: 200,
    department_tag: 'Engineering (All Branches)',
    course_tag: 'Semester 2 Graphics',
    year_tag: 1,
    pickup_location_id: 'sp_library',
    pickup_location_name: 'Central Library Foyer',
    status: 'available',
    available_from: '2026-12-18',
    available_until: '2027-05-15',
    estimated_new_price: 1800,
    is_semester_release: true,
    release_date: '2026-12-18',
    created_at: '2026-10-02T09:00:00Z'
  },
  {
    id: 'item_9',
    owner_id: 'user_rohan',
    owner_name: 'Rohan Verma',
    owner_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    owner_trust: 4.95,
    owner_department: 'Electrical & Electronics',
    owner_year: 4,
    title: 'Yonex Muscle Power Badminton Racket Pair with Nylon Shuttles',
    description: 'Aluminum frame, tightly strung, comes with head covers and 3 Mavis 350 shuttlecocks. Great for evening matches at the hostel courts.',
    category_id: 'cat_sports',
    condition: 'fair',
    photos: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80'
    ],
    mode: 'rent',
    price_per_day: 20,
    deposit_amount: 150,
    department_tag: 'All Campus',
    course_tag: 'Sports & Wellness',
    year_tag: 1,
    pickup_location_id: 'sp_canteen',
    pickup_location_name: 'SAC Student Canteen Veranda',
    status: 'available',
    available_from: '2026-10-01',
    available_until: '2026-11-15',
    estimated_new_price: 1400,
    created_at: '2026-09-24T18:00:00Z'
  }
];

export const INITIAL_BUNDLES: Bundle[] = [
  {
    id: 'bundle_1',
    title: 'First-Year Engineering Drawing Master Pack',
    description: 'Complete kit containing everything needed for Engineering Graphics: Mini Drafter, Imperial Drawing Board, Compass Geometry Kit, and Sheet Clips.',
    department: 'All Engineering Branches',
    year: 1,
    created_by: 'user_aarav',
    creator_name: 'Aarav Sharma (3rd Year Senior)',
    badge: 'Popular for Freshers',
    available_items_count: 3,
    items: [
      { id: 'b_item_1', title: 'Omega 360° Mini Drafter', category: 'Drafting Tools', condition: 'Good', estimated_price: 1350, owner_name: 'Aarav Sharma' },
      { id: 'b_item_2', title: 'Technical Compass & Divider Set', category: 'Drafting Tools', condition: 'New', estimated_price: 350, owner_name: 'Aarav Sharma' },
      { id: 'b_item_3', title: 'A2 Size Drafting Board with Stand', category: 'Drafting Tools', condition: 'Good', estimated_price: 900, owner_name: 'Aarav Sharma' }
    ]
  },
  {
    id: 'bundle_2',
    title: 'Hostel Room Fresher Comfort Kit',
    description: 'Everything you need to survive hostel winters and midnight study sessions without spending thousands on new appliances.',
    department: 'All Departments',
    year: 1,
    created_by: 'user_rohan',
    creator_name: 'Rohan Verma (Campus Fixer)',
    badge: 'Save ₹3,200',
    available_items_count: 3,
    items: [
      { id: 'b_item_4', title: '1.5L Stainless Steel Fast Kettle', category: 'Hostel Essentials', condition: 'Good', estimated_price: 950, owner_name: 'Rohan Verma' },
      { id: 'b_item_5', title: 'Flexible LED Study Desk Lamp (USB)', category: 'Hostel Essentials', condition: 'New', estimated_price: 600, owner_name: 'Rohan Verma' },
      { id: 'b_item_6', title: 'Heavy Spike Buster 4-Socket Strip', category: 'Hostel Essentials', condition: 'Good', estimated_price: 550, owner_name: 'Rohan Verma' }
    ]
  }
];

export const INITIAL_WANTED: WantedPost[] = [
  {
    id: 'want_1',
    user_id: 'user_priya',
    user_name: 'Priya Patel',
    user_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    department: 'Computer Science & Engineering',
    year: 1,
    title: 'Need a Mini Drafter for Graphics Lab on Wednesdays',
    description: 'Looking to borrow or rent a smooth mini-drafter for weekly drawing classes from Oct 5 to Nov 25. Willing to pick up from library.',
    category_id: 'cat_drafting',
    needed_from: '2026-10-05',
    needed_until: '2026-11-25',
    status: 'open',
    matched_items_count: 2,
    created_at: '2026-10-01T15:00:00Z'
  },
  {
    id: 'want_2',
    user_id: 'user_aarav',
    user_name: 'Aarav Sharma',
    user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Mechanical Engineering',
    year: 3,
    title: 'Need Digital Vernier Caliper for Workshop Project',
    description: 'Precision 0.01mm caliper needed for manufacturing lab fabrication over the weekend.',
    category_id: 'cat_electronics',
    needed_from: '2026-10-07',
    needed_until: '2026-10-12',
    status: 'open',
    matched_items_count: 0,
    created_at: '2026-10-02T08:30:00Z'
  }
];

export const INITIAL_GROUPS: CampusGroup[] = [
  {
    id: 'grp_ganga3',
    name: 'Ganga Hostel 3rd Floor Lending Circle',
    type: 'hostel_floor',
    description: 'Shared tools, kettles, irons, and emergency equipment for residents of Ganga 3rd floor.',
    members_count: 38,
    items_shared_count: 42,
    lead_name: 'Aarav Sharma (Floor Representative)'
  },
  {
    id: 'grp_robo',
    name: 'Robotics & Electronics Innovation Club',
    type: 'club',
    description: 'Microcontrollers, solder stations, motor drivers, sensor shields, and 3D printing filaments for club members.',
    members_count: 64,
    items_shared_count: 85,
    lead_name: 'Rohan Verma (Club Secretary)'
  },
  {
    id: 'grp_btech26',
    name: 'B.Tech Class of 2026 Resource Pool',
    type: 'class',
    description: 'Textbooks, solved previous year papers, reference handbooks, and lab records for 3rd year students.',
    members_count: 140,
    items_shared_count: 94,
    lead_name: 'Ananya Deshmukh'
  }
];

export const INITIAL_REQUESTS: BorrowRequest[] = [
  {
    id: 'req_101',
    item_id: 'item_1',
    item_title: 'Omega 360° Mini Drafter with Steel Clamp',
    item_photo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    owner_id: 'user_aarav',
    owner_name: 'Aarav Sharma',
    borrower_id: 'user_priya',
    borrower_name: 'Priya Patel',
    borrower_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    borrower_karma: 40,
    borrower_dept: 'Computer Science (1st Year)',
    start_date: '2026-10-04',
    end_date: '2026-10-18',
    message: 'Hi senior! I have my first Engineering Graphics internal drawing sheet evaluation next week. Would love to borrow your mini drafter.',
    status: 'approved',
    total_price: 210,
    created_at: '2026-10-02T12:00:00Z',
    pickup_qr_token: 'QR_PICKUP_TOKEN_REQ101_SECRET_984'
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_1',
    request_id: 'req_101',
    sender_id: 'user_priya',
    sender_name: 'Priya Patel',
    body: 'Hi Aarav senior! Thanks so much for accepting the request. Are you free to meet tomorrow at the Central Library safe point?',
    created_at: '2026-10-02T12:15:00Z'
  },
  {
    id: 'msg_2',
    request_id: 'req_101',
    sender_id: 'user_aarav',
    sender_name: 'Aarav Sharma',
    body: 'Hey Priya! Yes, I will be in the Central Library foyer around 5:15 PM after my CAD lab. We can scan the QR code and check the scales.',
    created_at: '2026-10-02T12:30:00Z'
  }
];

export const INITIAL_REPAIRS: RepairRequest[] = [
  {
    id: 'rep_1',
    item_id: 'item_9',
    item_title: 'Yonex Muscle Power Badminton Racket',
    reported_by: 'user_aarav',
    reporter_name: 'Aarav Sharma',
    issue: 'Grip tape is worn and one upper cross string is loose. Needs re-gripping and tension adjustment.',
    status: 'in_progress',
    assigned_to: 'user_rohan',
    fixer_name: 'Rohan Verma (Campus Fixer)',
    karma_bounty: 25,
    created_at: '2026-09-30T14:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    user_id: 'user_aarav',
    type: 'request_received',
    title: 'New Borrow Request',
    message: 'Priya Patel requested your Omega 360° Mini Drafter for 14 days.',
    read: false,
    link_tab: 'activity',
    created_at: '2026-10-02T12:00:00Z'
  },
  {
    id: 'notif_2',
    user_id: 'user_priya',
    type: 'request_approved',
    title: 'Request Approved! 🎉',
    message: 'Aarav Sharma approved your request for the Mini Drafter. Pickup QR is ready!',
    read: false,
    link_tab: 'activity',
    created_at: '2026-10-02T12:10:00Z'
  }
];

export const INITIAL_KARMA_LEDGER: KarmaEntry[] = [
  {
    id: 'k_1',
    user_id: 'user_aarav',
    delta: 10,
    reason: 'lent_item',
    description: 'Successfully lent Engineering Mechanics book to 1st year student',
    created_at: '2026-09-15T10:00:00Z'
  },
  {
    id: 'k_2',
    user_id: 'user_aarav',
    delta: 5,
    reason: 'returned_on_time',
    description: 'Returned TI-84 calculator on time with zero defects',
    created_at: '2026-09-20T17:00:00Z'
  },
  {
    id: 'k_3',
    user_id: 'user_rohan',
    delta: 25,
    reason: 'vouched',
    description: 'Campus Fixer badge: Repaired 3 items for students',
    created_at: '2026-09-22T11:00:00Z'
  }
];

export const INITIAL_REPORTS: ModerationReport[] = [
  {
    id: 'rep_m1',
    reporter_id: 'user_priya',
    reporter_name: 'Priya Patel',
    target_type: 'item',
    target_id: 'item_sample_flag',
    target_name: 'Defective Power Extension Cord',
    reason: 'Exposed wire joint near the plug. Poses electrical safety hazard in hostel rooms.',
    status: 'pending',
    created_at: '2026-10-01T16:00:00Z'
  }
];
