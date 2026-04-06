'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ArrowLeftRight, Lightbulb } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { href: '/insights', label: 'Insights', icon: Lightbulb },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link key={href} href={href} className={`mobile-nav-item ${active ? 'active' : ''}`}>
            <Icon size={22} strokeWidth={active ? 2.5 : 2} />
            <span>{label}</span>
          </Link>
        );
      })}

      <style jsx>{`
        .mobile-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 68px;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          z-index: 50;
          padding: 0 8px;
          align-items: center;
          justify-content: space-around;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        @media (max-width: 768px) {
          .mobile-nav { display: flex; }
        }
        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px 16px;
          border-radius: var(--radius-md);
          font-size: 11px;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          transition: all var(--transition);
          flex: 1;
        }
        .mobile-nav-item:hover { color: var(--text-secondary); }
        .mobile-nav-item.active { color: var(--accent); }
      `}</style>
    </nav>
  );
}
