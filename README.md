# FinanceFlow — Personal Finance Dashboard

A premium, interactive finance dashboard built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Recharts**. Designed for clarity, speed, and visual polish.

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

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `next` 16 | App Router, SSR, routing |
| `recharts` | Chart components (Area, Bar, Donut) |
| `lucide-react` | Icon library |
| `tailwindcss` v4 | Utility classes (layout helpers) |

---

## 🔧 Available Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
```