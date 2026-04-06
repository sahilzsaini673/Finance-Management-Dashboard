'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';
import MobileNav from '@/components/layout/MobileNav';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Desktop sidebar */}
      <div className="desktop-sidebar">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <TopNav onMenuClick={() => setSidebarOpen(true)} />
      <MobileNav />

      <main className="main-content">
        <div className="page-container">{children}</div>
      </main>

      <style jsx>{`
        .desktop-sidebar { display: block; }
        @media (max-width: 768px) { .desktop-sidebar { display: none; } }
        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 49;
          backdrop-filter: blur(2px);
          animation: fadeIn 0.2s ease both;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
