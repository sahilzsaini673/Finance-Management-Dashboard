'use client';

import { Sun, Moon, Menu, Download, Shield, Eye } from 'lucide-react';
import { useApp } from '@/components/providers/AppProvider';
import { exportToCSV } from '@/lib/utils';
import type { Role } from '@/components/providers/AppProvider';

interface TopNavProps {
  onMenuClick: () => void;
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  const { theme, toggleTheme, role, setRole, transactions } = useApp();

  return (
    <header className="topnav">
      <button className="btn btn-ghost menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
        <Menu size={20} />
      </button>

      <div className="topnav-right">
        {/* Role Switcher */}
        <div className="role-switcher">
          <span className="role-icon">
            {role === 'admin' ? <Shield size={14} /> : <Eye size={14} />}
          </span>
          <select
            id="role-select"
            className="input select role-select"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            aria-label="Switch role"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* Export CSV (Admin only) */}
        {role === 'admin' && (
          <button
            className="btn btn-secondary export-btn"
            onClick={() => exportToCSV(transactions)}
            title="Export transactions as CSV"
          >
            <Download size={15} />
            <span className="export-label">Export</span>
          </button>
        )}

        {/* Theme Toggle */}
        <button
          id="theme-toggle"
          className="btn btn-ghost theme-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <style jsx>{`
        .topnav {
          position: fixed;
          top: 0;
          left: var(--sidebar-w);
          right: 0;
          height: var(--topnav-h);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 40;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: left var(--transition);
        }
        @media (max-width: 768px) {
          .topnav { left: 0; padding: 0 16px; }
        }
        .menu-btn {
          display: none;
        }
        @media (max-width: 768px) {
          .menu-btn { display: flex; }
        }
        .topnav-right {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }
        .role-switcher {
          display: flex;
          align-items: center;
          gap: 0;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          padding-left: 10px;
        }
        .role-icon {
          color: var(--accent);
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .role-select {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 8px 32px 8px 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          width: auto;
          min-width: 90px;
          box-shadow: none !important;
        }
        .role-select:focus { box-shadow: none; }
        .export-btn { font-size: 13px; }
        .export-label { }
        @media (max-width: 480px) {
          .export-label { display: none; }
        }
        .theme-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
        }
        .theme-btn:hover { color: var(--accent); }
      `}</style>
    </header>
  );
}
