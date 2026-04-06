'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface SummaryCardProps {
  id: string;
  title: string;
  value: number;
  change?: number;
  changeLabel?: string;
  accent?: 'blue' | 'green' | 'red' | 'purple';
  icon: React.ReactNode;
  format?: 'currency' | 'percent';
  delay?: number;
}

export default function SummaryCard({
  id,
  title,
  value,
  change,
  changeLabel,
  accent = 'blue',
  icon,
  format = 'currency',
  delay = 0,
}: SummaryCardProps) {
  const displayValue = format === 'currency' ? formatCurrency(value) : `${value.toFixed(1)}%`;

  const isPositive = (change ?? 0) > 0;
  const isNegative = (change ?? 0) < 0;
  const ChangeIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  const accentColors = {
    blue:   { bg: 'rgba(88,166,255,0.1)',   color: '#58a6ff', border: 'rgba(88,166,255,0.2)' },
    green:  { bg: 'rgba(63,185,80,0.1)',    color: '#3fb950', border: 'rgba(63,185,80,0.2)' },
    red:    { bg: 'rgba(248,81,73,0.1)',    color: '#f85149', border: 'rgba(248,81,73,0.2)' },
    purple: { bg: 'rgba(167,139,250,0.1)',  color: '#a78bfa', border: 'rgba(167,139,250,0.2)' },
  };
  const colors = accentColors[accent];

  return (
    <div
      id={id}
      className="summary-card animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="card-top">
        <p className="card-title">{title}</p>
        <div className="card-icon" style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}>
          {icon}
        </div>
      </div>

      <div className="card-value animate-count-up" style={{ animationDelay: `${delay + 80}ms`, color: colors.color }}>
        {displayValue}
      </div>

      {change !== undefined && (
        <div className={`card-change ${isPositive ? 'positive' : isNegative ? 'negative' : 'neutral'}`}>
          <ChangeIcon size={13} strokeWidth={2.5} />
          <span>
            {Math.abs(change).toFixed(1)}% {changeLabel ?? 'vs last month'}
          </span>
        </div>
      )}

      <style jsx>{`
        .summary-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
          cursor: default;
        }
        .summary-card:hover {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .card-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }
        .card-icon {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .card-value {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          margin: 0;
        }
        .card-change {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 99px;
        }
        .card-change.positive { background: var(--success-dim); color: var(--success); }
        .card-change.negative { background: var(--danger-dim);  color: var(--danger); }
        .card-change.neutral  { background: var(--bg-tertiary); color: var(--text-muted); }
      `}</style>
    </div>
  );
}
