'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { INITIAL_TRANSACTIONS, type Transaction, type Category, type TransactionType } from '@/lib/mock-data';
import { generateId } from '@/lib/utils';

export type Role = 'viewer' | 'admin';
export type Theme = 'dark' | 'light';

export interface FilterState {
  search: string;
  type: TransactionType | 'all';
  category: Category | 'all';
  sortBy: 'date' | 'amount' | 'category';
  sortDir: 'asc' | 'desc';
  dateFrom: string;
  dateTo: string;
}

interface AppContextValue {
  // Transactions
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, updates: Partial<Omit<Transaction, 'id'>>) => void;
  deleteTransaction: (id: string) => void;

  // Role
  role: Role;
  setRole: (role: Role) => void;

  // Theme
  theme: Theme;
  toggleTheme: () => void;

  // Filters
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;

  // Derived
  filteredTransactions: Transaction[];
}

const DEFAULT_FILTERS: FilterState = {
  search: '',
  type: 'all',
  category: 'all',
  sortBy: 'date',
  sortDir: 'desc',
  dateFrom: '',
  dateTo: '',
};

const AppContext = createContext<AppContextValue | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadFromStorage('fd_transactions', INITIAL_TRANSACTIONS)
  );
  const [role, setRoleState] = useState<Role>(() =>
    loadFromStorage<Role>('fd_role', 'admin')
  );
  const [theme, setThemeState] = useState<Theme>(() =>
    loadFromStorage<Theme>('fd_theme', 'dark')
  );
  const [filters, setFiltersState] = useState<FilterState>(DEFAULT_FILTERS);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Persist to localStorage
  useEffect(() => { saveToStorage('fd_transactions', transactions); }, [transactions]);
  useEffect(() => { saveToStorage('fd_role', role); }, [role]);
  useEffect(() => { saveToStorage('fd_theme', theme); }, [theme]);

  const addTransaction = useCallback((tx: Omit<Transaction, 'id'>) => {
    setTransactions((prev) => [{ ...tx, id: generateId() }, ...prev]);
  }, []);

  const editTransaction = useCallback((id: string, updates: Partial<Omit<Transaction, 'id'>>) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updates } : tx))
    );
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, []);

  const setRole = useCallback((r: Role) => setRoleState(r), []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setFilters = useCallback((partial: Partial<FilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.description.toLowerCase().includes(q) ||
          tx.category.toLowerCase().includes(q)
      );
    }
    if (filters.type !== 'all') {
      result = result.filter((tx) => tx.type === filters.type);
    }
    if (filters.category !== 'all') {
      result = result.filter((tx) => tx.category === filters.category);
    }
    if (filters.dateFrom) {
      result = result.filter((tx) => tx.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      result = result.filter((tx) => tx.date <= filters.dateTo);
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (filters.sortBy === 'date') cmp = a.date.localeCompare(b.date);
      else if (filters.sortBy === 'amount') cmp = a.amount - b.amount;
      else if (filters.sortBy === 'category') cmp = a.category.localeCompare(b.category);
      return filters.sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [transactions, filters]);

  const value: AppContextValue = {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    role,
    setRole,
    theme,
    toggleTheme,
    filters,
    setFilters,
    resetFilters,
    filteredTransactions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
