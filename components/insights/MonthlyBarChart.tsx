'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';
import type { MonthlyData } from '@/lib/utils';

interface MonthlyBarChartProps {
  data: MonthlyData[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 14px',
      boxShadow: 'var(--shadow-md)',
    }}>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 6px' }}>{label}</p>
      {payload.map((p: { name: string; value?: number; color?: string }) => (
        <p key={p.name} style={{ fontSize: 13, fontWeight: 700, color: p.color, margin: '2px 0' }}>
          {p.name}: {formatCurrency(p.value ?? 0)}
        </p>
      ))}
    </div>
  );
}

export default function MonthlyBarChart({ data }: MonthlyBarChartProps) {
  if (!data.length) {
    return (
      <div className="empty-state" style={{ minHeight: 200 }}>
        <span className="empty-state-icon">📊</span>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: '#8b949e', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formatCurrency(v, true)}
            width={65}
          />
          <Tooltip content={CustomTooltip as any} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)', paddingTop: 12 }}
            iconType="circle"
            iconSize={8}
          />
          <Bar dataKey="income" name="Income" fill="#3fb950" radius={[4, 4, 0, 0]} maxBarSize={32} animationDuration={800} />
          <Bar dataKey="expenses" name="Expenses" fill="#f85149" radius={[4, 4, 0, 0]} maxBarSize={32} animationDuration={800} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
