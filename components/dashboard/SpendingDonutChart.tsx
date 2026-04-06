'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { CATEGORY_COLORS } from '@/lib/mock-data';
import type { CategoryData } from '@/lib/utils';

interface SpendingDonutChartProps {
  data: CategoryData[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  const color = CATEGORY_COLORS[d.name as keyof typeof CATEGORY_COLORS] ?? '#8b949e';
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 14px',
      boxShadow: 'var(--shadow-md)',
    }}>
      <p style={{ fontSize: 12, fontWeight: 700, color, margin: '0 0 2px' }}>{d.name}</p>
      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px' }}>
        {formatCurrency(d.value ?? 0)}
      </p>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>
        {(d.payload.percentage as number).toFixed(1)}% of spending
      </p>
    </div>
  );
}

export default function SpendingDonutChart({ data }: SpendingDonutChartProps) {
  if (!data.length) {
    return (
      <div className="empty-state" style={{ minHeight: 220 }}>
        <span className="empty-state-icon">🍩</span>
        <p>No spending data</p>
      </div>
    );
  }

  const top5 = data.slice(0, 5);

  return (
    <div className="donut-wrapper">
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={top5}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              dataKey="amount"
              nameKey="category"
              paddingAngle={3}
              animationBegin={200}
              animationDuration={800}
            >
              {top5.map((entry) => (
                <Cell
                  key={entry.category}
                  fill={CATEGORY_COLORS[entry.category as keyof typeof CATEGORY_COLORS] ?? '#8b949e'}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip as any} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="legend">
        {top5.map((entry) => {
          const color = CATEGORY_COLORS[entry.category as keyof typeof CATEGORY_COLORS] ?? '#8b949e';
          return (
            <div key={entry.category} className="legend-item">
              <span className="legend-dot" style={{ background: color }} />
              <span className="legend-label">{entry.category}</span>
              <span className="legend-pct">{entry.percentage.toFixed(0)}%</span>
            </div>
          );
        })}
      </div>


    </div>
  );
}
