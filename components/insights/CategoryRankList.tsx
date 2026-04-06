'use client';

import { formatCurrency } from '@/lib/utils';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/mock-data';
import type { CategoryData } from '@/lib/utils';

interface CategoryRankListProps {
  data: CategoryData[];
  totalExpenses: number;
}

export default function CategoryRankList({ data, totalExpenses }: CategoryRankListProps) {
  if (!data.length) {
    return (
      <div className="empty-state" style={{ minHeight: 120 }}>
        <span className="empty-state-icon">📂</span>
        <p>No categories to show</p>
      </div>
    );
  }

  const maxAmount = data[0]?.amount ?? 1;

  return (
    <div className="rank-list">
      {data.slice(0, 7).map((item, i) => {
        const color = CATEGORY_COLORS[item.category as keyof typeof CATEGORY_COLORS] ?? '#8b949e';
        const icon = CATEGORY_ICONS[item.category as keyof typeof CATEGORY_ICONS] ?? '📌';
        const barWidth = (item.amount / maxAmount) * 100;

        return (
          <div key={item.category} className="rank-item animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="rank-left">
              <span className="rank-number">#{i + 1}</span>
              <span className="rank-icon">{icon}</span>
              <div className="rank-info">
                <span className="rank-name">{item.category}</span>
                <div className="rank-bar-wrap">
                  <div
                    className="rank-bar"
                    style={{ width: `${barWidth}%`, background: color }}
                  />
                </div>
              </div>
            </div>
            <div className="rank-right">
              <span className="rank-amount" style={{ color }}>{formatCurrency(item.amount)}</span>
              <span className="rank-pct">{item.percentage.toFixed(1)}%</span>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .rank-list { display: flex; flex-direction: column; gap: 12px; }
        .rank-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .rank-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }
        .rank-number {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          width: 24px;
          flex-shrink: 0;
        }
        .rank-icon { font-size: 18px; flex-shrink: 0; }
        .rank-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .rank-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          truncate: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .rank-bar-wrap {
          height: 4px;
          background: var(--bg-tertiary);
          border-radius: 99px;
          overflow: hidden;
        }
        .rank-bar {
          height: 100%;
          border-radius: 99px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .rank-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          flex-shrink: 0;
        }
        .rank-amount { font-size: 14px; font-weight: 700; }
        .rank-pct {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
