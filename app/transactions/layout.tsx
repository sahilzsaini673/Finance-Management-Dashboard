import DashboardShell from '@/components/layout/DashboardShell';

export default function TransactionsLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
