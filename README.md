# FinanceFlow — Personal Finance Dashboard

A premium, interactive finance dashboard built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Recharts**. Designed for clarity, speed, and visual polish.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone / open the project directory
cd zoyvn

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the dashboard automatically.

---

## 📐 Project Structure

```
app/
├── layout.tsx               — Root layout (Inter font, AppProvider)
├── page.tsx                 — Redirects → /dashboard
├── globals.css              — Design tokens, animations, CSS design system
├── dashboard/
│   ├── layout.tsx           — Dashboard route layout
│   └── page.tsx             — Overview page: summary cards + charts
├── transactions/
│   ├── layout.tsx           — Transactions route layout
│   └── page.tsx             — Transactions table + filters
└── insights/
    ├── layout.tsx           — Insights route layout
    └── page.tsx             — Analytics & insights page

components/
├── providers/
│   └── AppProvider.tsx      — React Context: transactions, role, theme, filters
├── layout/
│   ├── DashboardShell.tsx   — Shared sidebar + nav wrapper
│   ├── Sidebar.tsx          — Collapsible sidebar
│   ├── TopNav.tsx           — Top bar: role switcher, theme toggle, CSV export
│   └── MobileNav.tsx        — Bottom tab bar (mobile only)
├── dashboard/
│   ├── SummaryCard.tsx      — Summary stat card with trend badge
│   ├── BalanceTrendChart.tsx — Area chart: monthly net balance
│   └── SpendingDonutChart.tsx — Donut chart: spending by category
├── transactions/
│   ├── FilterBar.tsx        — Search, type/category/date filters, sort controls
│   ├── TransactionTable.tsx — Sortable table with inline edit (Admin)
│   └── AddTransactionModal.tsx — Admin modal for adding transactions
└── insights/
    ├── MonthlyBarChart.tsx  — Income vs expense bar chart
    └── CategoryRankList.tsx — Ranked category list with progress bars

lib/
├── mock-data.ts             — 60 mock transactions across 6 months
└── utils.ts                 — Formatters, aggregation helpers, CSV export
```

---

## ✨ Features

### 1. Dashboard Overview
- **4 summary cards** — Total Balance, Income, Expenses, Savings Rate; each shows a % trend vs previous month
- **Balance Trend** — Animated area chart of monthly net balance
- **Spending Breakdown** — Donut chart of top 5 expense categories with legend
- **Monthly Snapshot** — Last 3 months side-by-side income/expense/net

### 2. Transactions
- Full table with Date, Description, Category (colored badge + emoji), Type, Amount
- **Live search** — filters on description or category as you type
- **Filters** — by type (income/expense), category dropdown, date range pickers
- **Sorting** — by Date, Amount, or Category (toggle ascending/descending)
- **Count indicator** — shows filtered vs total count
- **Empty state** with helpful messaging

### 3. Role-Based UI
Roles are switched via the dropdown in the top navigation bar — no login required.

| Feature | 👁️ Viewer | 🛡️ Admin |
|---|---|---|
| View all data | ✅ | ✅ |
| Add transaction | ❌ | ✅ (modal) |
| Edit transaction | ❌ | ✅ (inline) |
| Delete transaction | ❌ | ✅ |
| Export CSV | ❌ | ✅ |

### 4. Insights
- **Highest spending category** KPI card with color and emoji
- **Savings rate** with health status indicator (Excellent / Good / Fair / Overspending)
- **Month-over-month expense change** with directional indicator
- **Average daily spend** for the current month
- **Smart observation banner** — warns if expenses increased >15%
- **Monthly comparison bar chart** — income vs expenses per month
- **Top 7 spending categories** ranked list with animated progress bars
- **Financial health summary** — all-time income, expenses, savings, transaction count

### 5. State Management
Single `AppProvider` (React Context) manages:
- `transactions[]` — full dataset, mutable by Admin
- `role` — 'viewer' | 'admin'
- `theme` — 'dark' | 'light'
- `filters` — search, type, category, sort, date range
- All state is persisted to **localStorage** and restored on reload

---

## 🌙 Optional Enhancements Included

| Enhancement | Status |
|---|---|
| Dark mode (default) | ✅ |
| Light mode toggle | ✅ |
| localStorage persistence | ✅ |
| Smooth animations & micro-interactions | ✅ |
| Export transactions as CSV (Admin) | ✅ |
| Responsive layout (mobile bottom tab bar) | ✅ |
| Collapsible mobile sidebar with overlay | ✅ |

---

## 🎨 Design Decisions

- **Dark-first** design using a deep navy/slate palette (`#0d1117` base) with electric blue (`#58a6ff`) accents — inspired by GitHub's dark theme
- **CSS custom properties** used throughout for seamless dark/light switching with smooth transitions
- **CSS-in-JSX** (`styled-jsx`) for component-scoped styles without class name collisions
- **Recharts** was chosen over Chart.js for its native React integration and simple animation API
- **`lucide-react`** for a consistent, lightweight icon set
- Cards use subtle `translateY(-2px)` hover lifts and glow shadows for a premium feel
- Staggered `animationDelay` on grid children for a natural cascade effect on page load

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `next` 16 | App Router, SSR, routing |
| `react` 19 | UI framework |
| `recharts` | Chart components (Area, Bar, Donut) |
| `lucide-react` | Icon library |
| `tailwindcss` v4 | Utility classes (layout helpers) |

---

## 🔧 Available Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```
