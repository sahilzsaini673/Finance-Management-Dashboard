export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Salary'
  | 'Investment'
  | 'Food'
  | 'Transport'
  | 'Entertainment'
  | 'Shopping'
  | 'Health'
  | 'Utilities'
  | 'Freelance'
  | 'Other';

export interface Transaction {
  id: string;
  date: string; // ISO date string
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}

export const CATEGORIES: Category[] = [
  'Salary',
  'Investment',
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Health',
  'Utilities',
  'Freelance',
  'Other',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Salary: '#6366f1',
  Investment: '#22d3ee',
  Food: '#f97316',
  Transport: '#a78bfa',
  Entertainment: '#ec4899',
  Shopping: '#fb923c',
  Health: '#34d399',
  Utilities: '#60a5fa',
  Freelance: '#fbbf24',
  Other: '#94a3b8',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Salary: '💼',
  Investment: '📈',
  Food: '🍔',
  Transport: '🚗',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Health: '❤️',
  Utilities: '⚡',
  Freelance: '💻',
  Other: '📌',
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  // --- November 2024 ---
  { id: 'tx-001', date: '2024-11-01', description: 'Monthly Salary', amount: 5500, type: 'income', category: 'Salary' },
  { id: 'tx-002', date: '2024-11-03', description: 'Grocery Store', amount: 120, type: 'expense', category: 'Food' },
  { id: 'tx-003', date: '2024-11-05', description: 'Netflix Subscription', amount: 18, type: 'expense', category: 'Entertainment' },
  { id: 'tx-004', date: '2024-11-07', description: 'Uber Ride', amount: 22, type: 'expense', category: 'Transport' },
  { id: 'tx-005', date: '2024-11-10', description: 'Freelance Project A', amount: 800, type: 'income', category: 'Freelance' },
  { id: 'tx-006', date: '2024-11-12', description: 'Electric Bill', amount: 90, type: 'expense', category: 'Utilities' },
  { id: 'tx-007', date: '2024-11-14', description: 'Pharmacy', amount: 45, type: 'expense', category: 'Health' },
  { id: 'tx-008', date: '2024-11-15', description: 'Amazon Shopping', amount: 230, type: 'expense', category: 'Shopping' },
  { id: 'tx-009', date: '2024-11-18', description: 'Restaurant Dinner', amount: 75, type: 'expense', category: 'Food' },
  { id: 'tx-010', date: '2024-11-20', description: 'Stock Dividend', amount: 320, type: 'income', category: 'Investment' },
  { id: 'tx-011', date: '2024-11-22', description: 'Gym Membership', amount: 50, type: 'expense', category: 'Health' },
  { id: 'tx-012', date: '2024-11-25', description: 'Cinema Tickets', amount: 35, type: 'expense', category: 'Entertainment' },
  { id: 'tx-013', date: '2024-11-28', description: 'Fuel', amount: 60, type: 'expense', category: 'Transport' },

  // --- December 2024 ---
  { id: 'tx-014', date: '2024-12-01', description: 'Monthly Salary', amount: 5500, type: 'income', category: 'Salary' },
  { id: 'tx-015', date: '2024-12-02', description: 'Grocery Store', amount: 150, type: 'expense', category: 'Food' },
  { id: 'tx-016', date: '2024-12-05', description: 'Spotify Premium', amount: 10, type: 'expense', category: 'Entertainment' },
  { id: 'tx-017', date: '2024-12-08', description: 'Christmas Shopping', amount: 450, type: 'expense', category: 'Shopping' },
  { id: 'tx-018', date: '2024-12-10', description: 'Freelance Project B', amount: 1200, type: 'income', category: 'Freelance' },
  { id: 'tx-019', date: '2024-12-12', description: 'Electric Bill', amount: 110, type: 'expense', category: 'Utilities' },
  { id: 'tx-020', date: '2024-12-15', description: 'Doctor Visit', amount: 80, type: 'expense', category: 'Health' },
  { id: 'tx-021', date: '2024-12-18', description: 'Holiday Dinner', amount: 200, type: 'expense', category: 'Food' },
  { id: 'tx-022', date: '2024-12-20', description: 'Year-End Bonus', amount: 2000, type: 'income', category: 'Salary' },
  { id: 'tx-023', date: '2024-12-22', description: 'ETF Purchase', amount: 500, type: 'expense', category: 'Investment' },
  { id: 'tx-024', date: '2024-12-28', description: 'New Year Party', amount: 120, type: 'expense', category: 'Entertainment' },

  // --- January 2025 ---
  { id: 'tx-025', date: '2025-01-01', description: 'Monthly Salary', amount: 5500, type: 'income', category: 'Salary' },
  { id: 'tx-026', date: '2025-01-04', description: 'Grocery Store', amount: 98, type: 'expense', category: 'Food' },
  { id: 'tx-027', date: '2025-01-06', description: 'Uber Rides', amount: 40, type: 'expense', category: 'Transport' },
  { id: 'tx-028', date: '2025-01-09', description: 'Netflix Subscription', amount: 18, type: 'expense', category: 'Entertainment' },
  { id: 'tx-029', date: '2025-01-12', description: 'Pharmacy', amount: 30, type: 'expense', category: 'Health' },
  { id: 'tx-030', date: '2025-01-15', description: 'Electric Bill', amount: 95, type: 'expense', category: 'Utilities' },
  { id: 'tx-031', date: '2025-01-18', description: 'Freelance Project C', amount: 950, type: 'income', category: 'Freelance' },
  { id: 'tx-032', date: '2025-01-20', description: 'Clothing Store', amount: 175, type: 'expense', category: 'Shopping' },
  { id: 'tx-033', date: '2025-01-22', description: 'Stock Dividend', amount: 280, type: 'income', category: 'Investment' },
  { id: 'tx-034', date: '2025-01-25', description: 'Restaurant Lunch', amount: 45, type: 'expense', category: 'Food' },
  { id: 'tx-035', date: '2025-01-28', description: 'Concert Tickets', amount: 90, type: 'expense', category: 'Entertainment' },

  // --- February 2025 ---
  { id: 'tx-036', date: '2025-02-01', description: 'Monthly Salary', amount: 5500, type: 'income', category: 'Salary' },
  { id: 'tx-037', date: '2025-02-03', description: 'Grocery Store', amount: 110, type: 'expense', category: 'Food' },
  { id: 'tx-038', date: '2025-02-05', description: "Valentine's Dinner", amount: 140, type: 'expense', category: 'Food' },
  { id: 'tx-039', date: '2025-02-08', description: 'Metro Pass', amount: 35, type: 'expense', category: 'Transport' },
  { id: 'tx-040', date: '2025-02-10', description: 'Freelance Project D', amount: 1100, type: 'income', category: 'Freelance' },
  { id: 'tx-041', date: '2025-02-12', description: 'Electric Bill', amount: 85, type: 'expense', category: 'Utilities' },
  { id: 'tx-042', date: '2025-02-15', description: 'Gym Membership', amount: 50, type: 'expense', category: 'Health' },
  { id: 'tx-043', date: '2025-02-18', description: 'Amazon Purchase', amount: 210, type: 'expense', category: 'Shopping' },
  { id: 'tx-044', date: '2025-02-22', description: 'ETF Purchase', amount: 400, type: 'expense', category: 'Investment' },
  { id: 'tx-045', date: '2025-02-25', description: 'Streaming Bundle', amount: 25, type: 'expense', category: 'Entertainment' },

  // --- March 2025 ---
  { id: 'tx-046', date: '2025-03-01', description: 'Monthly Salary', amount: 5500, type: 'income', category: 'Salary' },
  { id: 'tx-047', date: '2025-03-03', description: 'Grocery Store', amount: 130, type: 'expense', category: 'Food' },
  { id: 'tx-048', date: '2025-03-06', description: 'Taxi & Rideshare', amount: 55, type: 'expense', category: 'Transport' },
  { id: 'tx-049', date: '2025-03-08', description: 'Freelance Project E', amount: 1400, type: 'income', category: 'Freelance' },
  { id: 'tx-050', date: '2025-03-10', description: 'Electric Bill', amount: 88, type: 'expense', category: 'Utilities' },
  { id: 'tx-051', date: '2025-03-12', description: 'Dentist', amount: 150, type: 'expense', category: 'Health' },
  { id: 'tx-052', date: '2025-03-15', description: 'Netflix & Disney+', amount: 28, type: 'expense', category: 'Entertainment' },
  { id: 'tx-053', date: '2025-03-18', description: 'Spring Wardrobe', amount: 320, type: 'expense', category: 'Shopping' },
  { id: 'tx-054', date: '2025-03-20', description: 'Stock Dividend', amount: 310, type: 'income', category: 'Investment' },
  { id: 'tx-055', date: '2025-03-22', description: 'Restaurant Dinner', amount: 95, type: 'expense', category: 'Food' },
  { id: 'tx-056', date: '2025-03-26', description: 'Music Festival', amount: 180, type: 'expense', category: 'Entertainment' },

  // --- April 2025 ---
  { id: 'tx-057', date: '2025-04-01', description: 'Monthly Salary', amount: 5500, type: 'income', category: 'Salary' },
  { id: 'tx-058', date: '2025-04-02', description: 'Grocery Store', amount: 115, type: 'expense', category: 'Food' },
  { id: 'tx-059', date: '2025-04-04', description: 'Fuel', amount: 65, type: 'expense', category: 'Transport' },
  { id: 'tx-060', date: '2025-04-05', description: 'Freelance Project F', amount: 750, type: 'income', category: 'Freelance' },
];
