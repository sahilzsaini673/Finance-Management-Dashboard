'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '@/components/providers/AppProvider';
import { CATEGORIES } from '@/lib/mock-data';

export default function FilterBar() {
  const { filters, setFilters, resetFilters } = useApp();

  const hasActive =
    filters.search ||
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="filter-bar">
      <div className="filter-row">
        {/* Search */}
        <div className="search-wrap">
          {/* <Search size={15} className="search-icon" /> */}
          <input
            id="transaction-search"
            type="text"
            className="input search-input"
            placeholder="Search transactions…"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
          {filters.search && (
            <button className="search-clear" onClick={() => setFilters({ search: '' })}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Type filter */}
        <select
          id="filter-type"
          className="input select filter-select"
          value={filters.type}
          onChange={(e) => setFilters({ type: e.target.value as typeof filters.type })}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category filter */}
        <select
          id="filter-category"
          className="input select filter-select"
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value as typeof filters.category })}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Date range */}
        <input
          id="filter-date-from"
          type="date"
          className="input filter-date"
          value={filters.dateFrom}
          onChange={(e) => setFilters({ dateFrom: e.target.value })}
          title="From date"
        />
        <input
          id="filter-date-to"
          type="date"
          className="input filter-date"
          value={filters.dateTo}
          onChange={(e) => setFilters({ dateTo: e.target.value })}
          title="To date"
        />

        {hasActive && (
          <button className="btn btn-ghost reset-btn" onClick={resetFilters} title="Clear all filters">
            <X size={15} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Sort controls */}
      <div className="sort-row">
        <SlidersHorizontal size={14} style={{ color: 'var(--text-muted)' }} />
        <span className="sort-label">Sort by:</span>
        {(['date', 'amount', 'category'] as const).map((key) => (
          <button
            key={key}
            className={`sort-btn ${filters.sortBy === key ? 'active' : ''}`}
            onClick={() => {
              if (filters.sortBy === key) {
                setFilters({ sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' });
              } else {
                setFilters({ sortBy: key, sortDir: 'desc' });
              }
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
            {filters.sortBy === key && (
              <span className="sort-dir">{filters.sortDir === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        .filter-bar {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }
        .filter-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }
        .search-wrap {
          position: relative;
          flex: 1;
          min-width: 180px;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }
        .search-input { padding-left: 36px; padding-right: 32px; }
        .search-clear {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 2px;
          border-radius: 4px;
        }
        .search-clear:hover { color: var(--text-primary); }
        .filter-select { width: auto; min-width: 130px; }
        .filter-date { width: auto; min-width: 130px; }
        .reset-btn { gap: 4px; color: var(--danger); }
        .reset-btn:hover { background: var(--danger-dim); color: var(--danger); }

        .sort-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .sort-label {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 600;
        }
        .sort-btn {
          padding: 4px 12px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .sort-btn:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }
        .sort-btn.active {
          background: var(--accent-dim);
          color: var(--accent);
          border-color: rgba(88,166,255,0.3);
        }
        .sort-dir { font-size: 11px; }
      `}</style>
    </div>
  );
}
