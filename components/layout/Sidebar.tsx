'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp, X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { href: '/insights', label: 'Insights', icon: Lightbulb },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <TrendingUp size={20} strokeWidth={2.5} />
          <span>FinanceFlow</span>
        </div>
        {onClose && (
          <button className="btn btn-ghost sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
            <X size={18} />
          </button>
        )}
      </div>

      <hr className="divider" style={{ margin: '0 20px' }} />

      <nav className="sidebar-nav">
        <p className="sidebar-section-label">Navigation</p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-link  ${active ? 'active' : ''}`}
              onClick={onClose}
              style={{ display: 'flex', flexDirection: 'row', marginBottom: '15px', marginLeft: '7px' }}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} style={{ marginRight: '10px' }} />
              <span>{label}</span>
              {active && <span className="sidebar-active-dot" />}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-footer-text">Finance Dashboard v1.0</p>
      </div>

      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: var(--sidebar-w);
          height: 100vh;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          z-index: 50;
          transition: transform var(--transition);
        }
        @media (max-width: 768px) {
          .sidebar {
            width: 280px;
            box-shadow: var(--shadow-lg);
          }
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px 16px;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 17px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: -0.02em;
        }
        .sidebar-close-btn {
          display: none;
        }
        @media (max-width: 768px) {
          .sidebar-close-btn { display: flex; }
        }
        .sidebar-nav {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }
        .sidebar-section-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          padding: 0 8px;
          margin: 0 0 8px;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all var(--transition);
          position: relative;
        }
        .sidebar-link:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }
        .sidebar-link.active {
          background: var(--accent-dim);
          color: var(--accent);
        }
        .sidebar-active-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          margin-left: auto;
          box-shadow: 0 0 6px var(--accent-glow);
        }
        .sidebar-footer {
          padding: 16px 20px;
          border-top: 1px solid var(--border);
        }
        .sidebar-footer-text {
          font-size: 12px;
          color: var(--text-muted);
          margin: 0;
        }
      `}</style>
    </aside>
  );
}
