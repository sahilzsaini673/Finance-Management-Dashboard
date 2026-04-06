'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';
import type { MonthlyData } from '@/lib/utils';

interface BalanceTrendChartProps {
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
      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 4px' }}>{label}</p>
      <p style={{ fontSize: 15, fontWeight: 700, color: '#58a6ff', margin: 0 }}>
        Net: {formatCurrency(payload[0]?.value ?? 0)}
      </p>
    </div>
  );
}

export default function BalanceTrendChart({ data }: BalanceTrendChartProps) {
  if (!data.length) {
    return (
      <div className="empty-state" style={{ minHeight: 220 }}>
        <span className="empty-state-icon">📊</span>
        <p>No data to display</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#58a6ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#8b949e', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#8b949e', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formatCurrency(v, true)}
            width={65}
          />
          <Tooltip content={CustomTooltip as any} cursor={{ stroke: '#58a6ff', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area
            type="monotone"
            dataKey="net"
            stroke="#58a6ff"
            strokeWidth={2.5}
            fill="url(#netGradient)"
            dot={{ fill: '#58a6ff', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#58a6ff', stroke: '#0d1117', strokeWidth: 2 }}
            animationBegin={200}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
