'use client';

import { useApp } from '@/components/providers/AppProvider';
import SummaryCard from '@/components/dashboard/SummaryCard';
import BalanceTrendChart from '@/components/dashboard/BalanceTrendChart';
import SpendingDonutChart from '@/components/dashboard/SpendingDonutChart';
import { Wallet, ArrowDownLeft, ArrowUpRight, TrendingUp } from 'lucide-react';
import { computeSummary, getMonthlyData, getSpendingByCategory } from '@/lib/utils';
import { useMemo } from 'react';

export default function DashboardPage() {
  const { transactions } = useApp();

  const summary = useMemo(() => computeSummary(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryData = useMemo(
    () => getSpendingByCategory(transactions),
    [transactions]
  );

  const mostRecentMonth = monthlyData[monthlyData.length - 1];
  const prevMonth = monthlyData[monthlyData.length - 2];

  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div className="page-header">
        <h1 className="page-title">Financial Overview</h1>
        <p className="page-subtitle">
          {mostRecentMonth
            ? `Showing data through ${mostRecentMonth.label}`
            : 'Your personal finance at a glance'}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid stagger-children">
        <SummaryCard
          id="card-balance"
          title="Total Balance"
          value={summary.totalBalance}
          change={summary.balanceChange}
          changeLabel="net vs last month"
          accent="blue"
          delay={0}
          icon={<Wallet size={18} />}
        />
        <SummaryCard
          id="card-income"
          title="Income"
          value={summary.currentIncome}
          change={summary.incomeChange}
          changeLabel="vs last month"
          accent="green"
          delay={60}
          icon={<ArrowDownLeft size={18} />}
        />
        <SummaryCard
          id="card-expenses"
          title="Expenses"
          value={summary.currentExpenses}
          change={summary.expenseChange}
          changeLabel="vs last month"
          accent="red"
          delay={120}
          icon={<ArrowUpRight size={18} />}
        />
        <SummaryCard
          id="card-savings"
          title="Savings Rate"
          value={summary.savingsRate}
          format="percent"
          accent="purple"
          delay={180}
          icon={<TrendingUp size={18} />}
        />
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Balance Trend */}
        <div className="card chart-card animate-slide-up" style={{ animationDelay: '240ms' }}>
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Balance Trend</h2>
              <p className="chart-subtitle">Monthly net balance over time</p>
            </div>
          </div>
          <BalanceTrendChart data={monthlyData} />
        </div>

        {/* Spending Breakdown */}
        <div className="card chart-card chart-card--small animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Spending Breakdown</h2>
              <p className="chart-subtitle">Top 5 expense categories</p>
            </div>
          </div>
          <SpendingDonutChart data={categoryData} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card animate-slide-up" style={{ animationDelay: '360ms', padding: '24px', marginTop: '0' }}>
        <h2 className="chart-title" style={{ marginBottom: 16 }}>Monthly Snapshot</h2>
        <div className="snapshot-grid">
          {monthlyData.slice(-3).reverse().map((m) => (
            <div key={m.month} className="snapshot-item">
              <p className="snapshot-month">{m.label}</p>
              <div className="snapshot-row">
                <span className="snapshot-label income-label">Income</span>
                <span className="snapshot-val income-val">${m.income.toLocaleString()}</span>
              </div>
              <div className="snapshot-row">
                <span className="snapshot-label expense-label">Expenses</span>
                <span className="snapshot-val expense-val">${m.expenses.toLocaleString()}</span>
              </div>
              <div className="snapshot-divider" />
              <div className="snapshot-row">
                <span className="snapshot-label">Net</span>
                <span className={`snapshot-val snapshot-net ${m.net >= 0 ? 'positive' : 'negative'}`}>
                  {m.net >= 0 ? '+' : ''}{m.net.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (max-width: 1100px) {
          .summary-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .summary-grid { grid-template-columns: 1fr; }
        }

        .charts-row {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 20px;
          margin-bottom: 24px;
        }
        @media (max-width: 1024px) {
          .charts-row { grid-template-columns: 1fr; }
        }

        .chart-card { padding: 24px; }
        .chart-header { margin-bottom: 20px; }
        .chart-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0 0 4px; }
        .chart-subtitle { font-size: 13px; color: var(--text-secondary); margin: 0; }

        .snapshot-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 640px) {
          .snapshot-grid { grid-template-columns: 1fr; }
        }

        .snapshot-item {
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .snapshot-month {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px;
        }
        .snapshot-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .snapshot-label {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .income-label { color: var(--success); }
        .expense-label { color: var(--danger); }
        .snapshot-val { font-size: 13px; font-weight: 600; color: var(--text-primary); }
        .income-val { color: var(--success); }
        .expense-val { color: var(--danger); }
        .snapshot-divider {
          height: 1px;
          background: var(--border);
          margin: 2px 0;
        }
        .snapshot-net.positive { color: var(--success); }
        .snapshot-net.negative { color: var(--danger); }
      `}</style>
    </div>
  );
}
