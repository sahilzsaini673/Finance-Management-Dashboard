import type { Transaction } from './mock-data';

export function formatCurrency(amount: number, compact = false): string {
  if (compact && Math.abs(amount) >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatMonth(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function getMonthKey(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function getMonthLabel(key: string): string {
  const [year, month] = key.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleDateString('en-US', {
    month: 'short',
    year: '2-digit',
  });
}

export interface MonthlyData {
  month: string;
  label: string;
  income: number;
  expenses: number;
  net: number;
}

export function getMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const map: Record<string, { income: number; expenses: number }> = {};

  for (const tx of transactions) {
    const key = getMonthKey(tx.date);
    if (!map[key]) map[key] = { income: 0, expenses: 0 };
    if (tx.type === 'income') map[key].income += tx.amount;
    else map[key].expenses += tx.amount;
  }

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => ({
      month: key,
      label: getMonthLabel(key),
      income: val.income,
      expenses: val.expenses,
      net: val.income - val.expenses,
    }));
}

export interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

export function getSpendingByCategory(transactions: Transaction[]): CategoryData[] {
  const map: Record<string, number> = {};
  let total = 0;

  for (const tx of transactions.filter((t) => t.type === 'expense')) {
    map[tx.category] = (map[tx.category] || 0) + tx.amount;
    total += tx.amount;
  }

  return Object.entries(map)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getCurrentMonthTransactions(transactions: Transaction[]): Transaction[] {
  const now = new Date();
  const currentKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return transactions.filter((t) => getMonthKey(t.date) === currentKey);
}

export function getLastMonthTransactions(transactions: Transaction[]): Transaction[] {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const key = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
  return transactions.filter((t) => getMonthKey(t.date) === key);
}

export function computeSummary(transactions: Transaction[]) {
  // Use most recent month's data for current stats
  const monthlyData = getMonthlyData(transactions);
  const lastTwo = monthlyData.slice(-2);
  const current = lastTwo[lastTwo.length - 1] ?? { income: 0, expenses: 0, net: 0 };
  const previous = lastTwo[lastTwo.length - 2] ?? { income: 0, expenses: 0, net: 0 };

  const totalBalance = transactions.reduce((acc, tx) => {
    return acc + (tx.type === 'income' ? tx.amount : -tx.amount);
  }, 0);

  const balanceChange = previous.net !== 0
    ? ((current.net - previous.net) / Math.abs(previous.net)) * 100
    : 0;

  const incomeChange = previous.income !== 0
    ? ((current.income - previous.income) / previous.income) * 100
    : 0;

  const expenseChange = previous.expenses !== 0
    ? ((current.expenses - previous.expenses) / previous.expenses) * 100
    : 0;

  return {
    totalBalance,
    currentIncome: current.income,
    currentExpenses: current.expenses,
    balanceChange,
    incomeChange,
    expenseChange,
    savingsRate: current.income > 0 ? ((current.income - current.expenses) / current.income) * 100 : 0,
  };
}

export function exportToCSV(transactions: Transaction[]): void {
  const headers = ['ID', 'Date', 'Description', 'Amount', 'Type', 'Category'];
  const rows = transactions.map((tx) => [
    tx.id,
    tx.date,
    `"${tx.description}"`,
    tx.amount.toFixed(2),
    tx.type,
    tx.category,
  ]);

  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function generateId(): string {
  return `tx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
