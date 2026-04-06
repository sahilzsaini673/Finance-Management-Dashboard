'use client';

import { useMemo } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import MonthlyBarChart from '@/components/insights/MonthlyBarChart';
import CategoryRankList from '@/components/insights/CategoryRankList';
import {
  getMonthlyData,
  getSpendingByCategory,
  formatCurrency,
} from '@/lib/utils';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/mock-data';
import { TrendingDown, TrendingUp, PiggyBank, Calendar, AlertCircle } from 'lucide-react';

export default function InsightsPage() {
  const { transactions } = useApp();

  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryData = useMemo(() => getSpendingByCategory(transactions), [transactions]);

  const topCategory = categoryData[0];
  const totalExpenses = useMemo(
    () => transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  // Last 2 months comparison
  const lastTwo = monthlyData.slice(-2);
  const currentM = lastTwo[lastTwo.length - 1];
  const prevM = lastTwo[lastTwo.length - 2];

  const expenseChange = prevM && prevM.expenses > 0
    ? ((currentM.expenses - prevM.expenses) / prevM.expenses) * 100
    : null;

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const avgDailySpend = useMemo(() => {
    if (!currentM) return 0;
    const daysInMonth = new Date(
      parseInt(currentM.month.split('-')[0]),
      parseInt(currentM.month.split('-')[1]),
      0
    ).getDate();
    return currentM.expenses / daysInMonth;
  }, [currentM]);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Insights</h1>
        <p className="page-subtitle">Understand your spending patterns and financial health</p>
      </div>

      {/* KPI Cards */}
      <div className="insight-kpis stagger-children">
        {/* Top Spending Category */}
        {topCategory && (() => {
          const color = CATEGORY_COLORS[topCategory.category as keyof typeof CATEGORY_COLORS] ?? '#8b949e';
          const icon = CATEGORY_ICONS[topCategory.category as keyof typeof CATEGORY_ICONS] ?? '📌';
          return (
            <div className="kpi-card animate-slide-up" id="kpi-top-category">
              <div className="kpi-icon-wrap" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
              </div>
              <p className="kpi-label">Highest Spending Category</p>
              <p className="kpi-value" style={{ color }}>{topCategory.category}</p>
              <p className="kpi-sub">{formatCurrency(topCategory.amount)} · {topCategory.percentage.toFixed(1)}% of spending</p>
            </div>
          );
        })()}

        {/* Savings Rate */}
        <div className="kpi-card animate-slide-up" id="kpi-savings-rate">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(88,166,255,0.1)', border: '1px solid rgba(88,166,255,0.2)' }}>
            <PiggyBank size={22} color="#58a6ff" />
          </div>
          <p className="kpi-label">Overall Savings Rate</p>
          <p className="kpi-value" style={{ color: savingsRate >= 20 ? 'var(--success)' : savingsRate >= 0 ? 'var(--warning)' : 'var(--danger)' }}>
            {savingsRate.toFixed(1)}%
          </p>
          <p className="kpi-sub">
            {savingsRate >= 20 ? '🟢 Excellent' : savingsRate >= 10 ? '🟡 Good' : savingsRate >= 0 ? '🟠 Fair' : '🔴 Overspending'}
          </p>
        </div>

        {/* Monthly Expense Change */}
        <div className="kpi-card animate-slide-up" id="kpi-expense-change">
          <div className="kpi-icon-wrap" style={{
            background: expenseChange === null ? 'var(--bg-tertiary)' : expenseChange > 0 ? 'var(--danger-dim)' : 'var(--success-dim)',
            border: expenseChange === null ? '1px solid var(--border)' : expenseChange > 0 ? '1px solid rgba(248,81,73,0.2)' : '1px solid rgba(63,185,80,0.2)',
          }}>
            {expenseChange !== null && expenseChange > 0
              ? <TrendingUp size={22} color="var(--danger)" />
              : <TrendingDown size={22} color={expenseChange === null ? 'var(--text-muted)' : 'var(--success)'} />
            }
          </div>
          <p className="kpi-label">Month-over-Month Expenses</p>
          <p className="kpi-value" style={{ color: expenseChange === null ? 'var(--text-muted)' : expenseChange > 0 ? 'var(--danger)' : 'var(--success)' }}>
            {expenseChange === null ? '—' : `${expenseChange > 0 ? '+' : ''}${expenseChange.toFixed(1)}%`}
          </p>
          <p className="kpi-sub">
            {currentM ? `${currentM.label}: ${formatCurrency(currentM.expenses)}` : 'No data'}
          </p>
        </div>

        {/* Avg Daily Spend */}
        <div className="kpi-card animate-slide-up" id="kpi-daily-spend">
          <div className="kpi-icon-wrap" style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}>
            <Calendar size={22} color="#a78bfa" />
          </div>
          <p className="kpi-label">Avg Daily Spend</p>
          <p className="kpi-value" style={{ color: '#a78bfa' }}>{formatCurrency(avgDailySpend)}</p>
          <p className="kpi-sub">This month ({currentM?.label ?? '—'})</p>
        </div>
      </div>

      {/* Observation banner */}
      {expenseChange !== null && expenseChange > 15 && (
        <div className="observation-banner animate-slide-down">
          <AlertCircle size={16} />
          <span>
            <strong>Heads up!</strong> Your expenses increased by {expenseChange.toFixed(1)}% compared to last month. Consider reviewing your spending habits.
          </span>
        </div>
      )}

      {/* Charts row */}
      <div className="insights-charts-row">
        {/* Monthly comparison bar chart */}
        <div className="card insight-chart-card animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h2 className="chart-title">Monthly Comparison</h2>
          <p className="chart-subtitle" style={{ marginBottom: 20, color: 'var(--text-secondary)', fontSize: 13 }}>Income vs Expenses per month</p>
          <MonthlyBarChart data={monthlyData} />
        </div>

        {/* Category rank */}
        <div className="card insight-chart-card animate-slide-up" style={{ animationDelay: '360ms' }}>
          <h2 className="chart-title">Top Spending Categories</h2>
          <p className="chart-subtitle" style={{ marginBottom: 20, color: 'var(--text-secondary)', fontSize: 13 }}>All-time breakdown by category</p>
          <CategoryRankList data={categoryData} totalExpenses={totalExpenses} />
        </div>
      </div>

      {/* Financial Health Summary */}
      <div className="card health-card animate-slide-up" style={{ animationDelay: '420ms', padding: 24, marginTop: 0 }}>
        <h2 className="chart-title" style={{ marginBottom: 16 }}>Financial Health Summary</h2>
        <div className="health-grid">
          <div className="health-item">
            <span className="health-label">Total Income (all time)</span>
            <span className="health-val income">{formatCurrency(totalIncome)}</span>
          </div>
          <div className="health-item">
            <span className="health-label">Total Expenses (all time)</span>
            <span className="health-val expense">{formatCurrency(totalExpenses)}</span>
          </div>
          <div className="health-item">
            <span className="health-label">Net Savings (all time)</span>
            <span className={`health-val ${totalIncome - totalExpenses >= 0 ? 'income' : 'expense'}`}>{formatCurrency(totalIncome - totalExpenses)}</span>
          </div>
          <div className="health-item">
            <span className="health-label">Total Transactions</span>
            <span className="health-val neutral">{transactions.length}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .insight-kpis {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (max-width: 1100px) { .insight-kpis { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px) { .insight-kpis { grid-template-columns: 1fr; } }

        .kpi-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: all var(--transition);
        }
        .kpi-card:hover { border-color: var(--border-strong); box-shadow: var(--shadow-md); transform: translateY(-2px); }
        .kpi-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .kpi-label { font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin: 0; }
        .kpi-value { font-size: 26px; font-weight: 800; letter-spacing: -0.03em; margin: 0; color: var(--text-primary); }
        .kpi-sub { font-size: 12px; color: var(--text-muted); margin: 0; }

        .observation-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--warning-dim);
          border: 1px solid rgba(210,153,34,0.3);
          color: var(--warning);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          font-size: 13px;
          margin-bottom: 24px;
        }

        .insights-charts-row {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        @media (max-width: 960px) { .insights-charts-row { grid-template-columns: 1fr; } }

        .insight-chart-card { padding: 24px; }
        .chart-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0 0 4px; }
        .chart-subtitle { color: var(--text-secondary); }

        .health-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) { .health-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .health-grid { grid-template-columns: 1fr; } }

        .health-item {
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .health-label { font-size: 12px; color: var(--text-secondary); font-weight: 600; }
        .health-val { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
        .health-val.income { color: var(--success); }
        .health-val.expense { color: var(--danger); }
        .health-val.neutral { color: var(--accent); }
      `}</style>
    </div>
  );
}
