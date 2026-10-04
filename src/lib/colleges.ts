export interface IndianCollege {
  name: string;
  shortName: string;
  state: string;
  city: string;
  category: 'IIT' | 'NIT' | 'IIIT' | 'Central' | 'State' | 'Medical' | 'Management' | 'Private' | 'Degree';
}

export const ALL_INDIAN_COLLEGES: IndianCollege[] = [
  // ==============================================================================
  // HYDERABAD & TELANGANA COLLEGES (ENGINEERING, DEGREE, MEDICAL, COMMERCE, LAW)
  // ==============================================================================

  // --- Hyderabad Premier & Universities ---
  { name: 'Indian Institute of Technology Hyderabad (IIT Hyderabad)', shortName: 'IITH', city: 'Hyderabad', state: 'Telangana', category: 'IIT' },
  { name: 'International Institute of Information Technology Hyderabad (IIIT Hyderabad)', shortName: 'IIITH', city: 'Hyderabad', state: 'Telangana', category: 'IIIT' },
  { name: 'BITS Pilani Hyderabad Campus', shortName: 'BITS Hyd', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'University of Hyderabad (HCU / Central University)', shortName: 'HCU', city: 'Hyderabad', state: 'Telangana', category: 'Central' },
  { name: 'Osmania University (Main Campus)', shortName: 'OU Hyderabad', city: 'Hyderabad', state: 'Telangana', category: 'State' },
  { name: 'Jawaharlal Nehru Technological University Hyderabad (JNTUH)', shortName: 'JNTUH', city: 'Hyderabad', state: 'Telangana', category: 'State' },

  // --- Hyderabad Prominent Degree & Arts / Science / Commerce Colleges ---
  { name: 'Nizam College (Osmania University), Basheerbagh', shortName: 'Nizam College', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Loyola Academy Degree & PG College, Secunderabad', shortName: 'Loyola Academy', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'St. Francis College for Women, Begumpet', shortName: 'St. Francis', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'St. Ann\'s College for Women, Mehdipatnam', shortName: 'St. Ann\'s Degree', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Badruka College of Commerce & Arts, Kachiguda', shortName: 'Badruka College', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Bhavan\'s Vivekananda College of Science, Humanities & Commerce, Sainikpuri', shortName: 'Bhavan\'s Sainikpuri', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'St. Joseph\'s Degree & PG College, King Koti', shortName: 'St. Joseph\'s Degree', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Avinash College of Commerce, Hyderabad', shortName: 'ACC Hyderabad', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Villa Marie Degree College for Women, Somajiguda', shortName: 'Villa Marie', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'RBVRR Women\'s College, Narayanaguda', shortName: 'RBVRR College', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'A.V. College of Arts, Science & Commerce (Domalguda)', shortName: 'AV College', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Government City College Hyderabad, Nayapul', shortName: 'City College', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Kasturba Gandhi Degree & PG College for Women, Secunderabad', shortName: 'Kasturba Degree', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Pragati Mahavidyalaya Degree & PG College, Hanuman Tekdi', shortName: 'Pragati College', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Wesley Degree College, Secunderabad', shortName: 'Wesley Degree', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Anwar-ul-Uloom Degree & PG College, Mallepally', shortName: 'Anwar-ul-Uloom', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Little Flower Degree College, Uppal', shortName: 'Little Flower', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Tapasya College of Commerce & Management', shortName: 'Tapasya College', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Aurora\'s Degree & PG College, Chikkadpally', shortName: 'Aurora Degree', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Jagruti Degree & PG College, Narayanaguda', shortName: 'Jagruti Degree', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },
  { name: 'Indian Institute of Management and Commerce (IIMC), Khairatabad', shortName: 'IIMC Khairatabad', city: 'Hyderabad', state: 'Telangana', category: 'Degree' },

  // --- Hyderabad Engineering Colleges ---
  { name: 'Chaitanya Bharathi Institute of Technology (CBIT), Gandipet', shortName: 'CBIT', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Vasavi College of Engineering (VCE), Ibrahimbagh', shortName: 'Vasavi VCE', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'VNR Vignana Jyothi Institute of Engineering & Tech (VNRVJIET), Bachupally', shortName: 'VNR VJIET', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Gokaraju Rangaraju Institute of Engineering & Tech (GRIET), Bachupally', shortName: 'GRIET', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Muffakham Jah College of Engineering & Technology (MJCET), Banjara Hills', shortName: 'MJCET', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'BVRIT Hyderabad College of Engineering for Women, Bachupally', shortName: 'BVRITH', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Vardhaman College of Engineering, Shamshabad', shortName: 'Vardhaman', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Sreenidhi Institute of Science and Technology (SNIST), Ghatkesar', shortName: 'SNIST', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'CVR College of Engineering, Ibrahimpatnam', shortName: 'CVR', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Keshav Memorial Institute of Technology (KMIT), Narayanaguda', shortName: 'KMIT', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Matrusri Engineering College, Saidabad', shortName: 'Matrusri', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Stanley College of Engineering & Technology for Women, Abids', shortName: 'Stanley Women\'s', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'CMR College of Engineering & Technology (CMRCET / MRCET), Medchal', shortName: 'CMR Group', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Malla Reddy Engineering College (MREC / MRCET), Maisammaguda', shortName: 'Malla Reddy', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Anurag University (formerly CVSR College of Engineering), Venkatapur', shortName: 'Anurag Univ', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Geethanjali College of Engineering and Technology (GCET), Keesara', shortName: 'GCET Hyd', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Guru Nanak Institutions Technical Campus (GNITC), Ibrahimpatnam', shortName: 'GNITC', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'MLR Institute of Technology (MLRIT), Dundigal', shortName: 'MLRIT', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Deccan College of Engineering and Technology, Darussalam', shortName: 'Deccan Engg', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Mahindra University (Ecole Centrale), Bahadurpally', shortName: 'Mahindra Univ', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'Woxsen University, Hyderabad', shortName: 'Woxsen', city: 'Hyderabad', state: 'Telangana', category: 'Private' },
  { name: 'ICFAI Foundation for Higher Education (IBS Hyderabad), Shankarpalli', shortName: 'IBS Hyderabad', city: 'Hyderabad', state: 'Telangana', category: 'Management' },

  // --- Hyderabad Medical & Pharmacy & Law Institutions ---
  { name: 'Osmania Medical College (OMC), Koti', shortName: 'OMC Hyderabad', city: 'Hyderabad', state: 'Telangana', category: 'Medical' },
  { name: 'Gandhi Medical College (GMC), Secunderabad', shortName: 'Gandhi Med', city: 'Hyderabad', state: 'Telangana', category: 'Medical' },
  { name: 'ESIC Medical College & Hospital, Sanathnagar', shortName: 'ESIC Hyd', city: 'Hyderabad', state: 'Telangana', category: 'Medical' },
  { name: 'Deccan College of Medical Sciences (DCMS), Kanchanbagh', shortName: 'DCMS', city: 'Hyderabad', state: 'Telangana', category: 'Medical' },
  { name: 'Apollo Institute of Medical Sciences & Research (AIMSR), Jubilee Hills', shortName: 'Apollo Medical', city: 'Hyderabad', state: 'Telangana', category: 'Medical' },
  { name: 'NALSAR University of Law, Shamirpet', shortName: 'NALSAR', city: 'Hyderabad', state: 'Telangana', category: 'Central' },
  { name: 'National Institute of Pharmaceutical Education & Research (NIPER Hyderabad)', shortName: 'NIPER Hyd', city: 'Hyderabad', state: 'Telangana', category: 'Central' },

  // ==============================================================================
  // PAN-INDIA PREMIER INSTITUTES (IITs, NITs, IIITs, UNIVERSITIES & COLLEGES)
  // ==============================================================================

  // --- IITs ---
  { name: 'Indian Institute of Technology Bombay (IIT Bombay)', shortName: 'IITB', city: 'Mumbai', state: 'Maharashtra', category: 'IIT' },
  { name: 'Indian Institute of Technology Delhi (IIT Delhi)', shortName: 'IITD', city: 'New Delhi', state: 'Delhi', category: 'IIT' },
  { name: 'Indian Institute of Technology Madras (IIT Madras)', shortName: 'IITM', city: 'Chennai', state: 'Tamil Nadu', category: 'IIT' },
  { name: 'Indian Institute of Technology Kharagpur (IIT Kharagpur)', shortName: 'IITKGP', city: 'Kharagpur', state: 'West Bengal', category: 'IIT' },
  { name: 'Indian Institute of Technology Kanpur (IIT Kanpur)', shortName: 'IITK', city: 'Kanpur', state: 'Uttar Pradesh', category: 'IIT' },
  { name: 'Indian Institute of Technology Roorkee (IIT Roorkee)', shortName: 'IITR', city: 'Roorkee', state: 'Uttarakhand', category: 'IIT' },
  { name: 'Indian Institute of Technology Guwahati (IIT Guwahati)', shortName: 'IITG', city: 'Guwahati', state: 'Assam', category: 'IIT' },
  { name: 'Indian Institute of Technology (BHU) Varanasi', shortName: 'IIT BHU', city: 'Varanasi', state: 'Uttar Pradesh', category: 'IIT' },
  { name: 'Indian Institute of Technology Indore (IIT Indore)', shortName: 'IITI', city: 'Indore', state: 'Madhya Pradesh', category: 'IIT' },
  { name: 'Indian Institute of Technology Gandhinagar (IIT Gandhinagar)', shortName: 'IITGN', city: 'Gandhinagar', state: 'Gujarat', category: 'IIT' },
  { name: 'Indian Institute of Technology Ropar (IIT Ropar)', shortName: 'IITRPR', city: 'Rupnagar', state: 'Punjab', category: 'IIT' },
  { name: 'Indian Institute of Technology Patna (IIT Patna)', shortName: 'IITP', city: 'Patna', state: 'Bihar', category: 'IIT' },

  // --- NITs ---
  { name: 'National Institute of Technology Tiruchirappalli (NIT Trichy)', shortName: 'NITT', city: 'Tiruchirappalli', state: 'Tamil Nadu', category: 'NIT' },
  { name: 'National Institute of Technology Karnataka (NIT Surathkal)', shortName: 'NITK', city: 'Surathkal', state: 'Karnataka', category: 'NIT' },
  { name: 'National Institute of Technology Rourkela', shortName: 'NITR', city: 'Rourkela', state: 'Odisha', category: 'NIT' },
  { name: 'National Institute of Technology Warangal', shortName: 'NITW', city: 'Warangal', state: 'Telangana', category: 'NIT' },
  { name: 'Motilal Nehru National Institute of Technology Allahabad (MNNIT)', shortName: 'MNNIT', city: 'Prayagraj', state: 'Uttar Pradesh', category: 'NIT' },
  { name: 'Visvesvaraya National Institute of Technology Nagpur (VNIT)', shortName: 'VNIT', city: 'Nagpur', state: 'Maharashtra', category: 'NIT' },
  { name: 'Malaviya National Institute of Technology Jaipur (MNIT)', shortName: 'MNIT', city: 'Jaipur', state: 'Rajasthan', category: 'NIT' },
  { name: 'National Institute of Technology Calicut (NITC)', shortName: 'NITC', city: 'Kozhikode', state: 'Kerala', category: 'NIT' },

  // --- Other Major Indian Universities ---
  { name: 'University of Delhi (Delhi University - DU)', shortName: 'DU', city: 'New Delhi', state: 'Delhi', category: 'Central' },
  { name: 'Shri Ram College of Commerce (SRCC - DU)', shortName: 'SRCC', city: 'New Delhi', state: 'Delhi', category: 'Degree' },
  { name: 'St. Stephen\'s College Delhi', shortName: 'St. Stephen\'s', city: 'New Delhi', state: 'Delhi', category: 'Degree' },
  { name: 'Jawaharlal Nehru University (JNU)', shortName: 'JNU', city: 'New Delhi', state: 'Delhi', category: 'Central' },
  { name: 'Banaras Hindu University (BHU)', shortName: 'BHU', city: 'Varanasi', state: 'Uttar Pradesh', category: 'Central' },
  { name: 'Vellore Institute of Technology (VIT Vellore)', shortName: 'VIT', city: 'Vellore', state: 'Tamil Nadu', category: 'Private' },
  { name: 'SRM Institute of Science and Technology (SRM Kattankulathur)', shortName: 'SRM KTR', city: 'Chennai', state: 'Tamil Nadu', category: 'Private' },
  { name: 'Manipal Academy of Higher Education (MAHE Manipal)', shortName: 'Manipal', city: 'Manipal', state: 'Karnataka', category: 'Private' },
  { name: 'Amity University Noida', shortName: 'Amity Noida', city: 'Noida', state: 'Uttar Pradesh', category: 'Private' },
  { name: 'Kalinga Institute of Industrial Technology (KIIT)', shortName: 'KIIT', city: 'Bhubaneswar', state: 'Odisha', category: 'Private' },
  { name: 'Lovely Professional University (LPU)', shortName: 'LPU', city: 'Phagwara', state: 'Punjab', category: 'Private' },
];

