'use client';

import { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { useApp } from '@/components/providers/AppProvider';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CATEGORY_COLORS, CATEGORY_ICONS, CATEGORIES, type Transaction } from '@/lib/mock-data';

interface TransactionTableProps {
  transactions: Transaction[];
}

function EditRow({
  tx,
  onSave,
  onCancel,
}: {
  tx: Transaction;
  onSave: (updates: Partial<Omit<Transaction, 'id'>>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ ...tx });
  return (
    <tr className="edit-row">
      <td><input type="date" className="input inline-input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></td>
      <td><input type="text" className="input inline-input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></td>
      <td>
        <select className="input select inline-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Transaction['category'] }))}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </td>
      <td>
        <select className="input select inline-input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as Transaction['type'] }))}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </td>
      <td><input type="number" className="input inline-input" value={form.amount} min={0} step={0.01} onChange={e => setForm(f => ({ ...f, amount: parseFloat(e.target.value) || 0 }))} /></td>
      <td>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-primary" style={{ padding: '6px 10px' }} onClick={() => onSave(form)}><Check size={14} /></button>
          <button className="btn btn-secondary" style={{ padding: '6px 10px' }} onClick={onCancel}><X size={14} /></button>
        </div>
      </td>
      <style jsx>{`
        .edit-row td { padding: 8px 12px; background: var(--accent-dim); }
        .inline-input { padding: 6px 10px; font-size: 13px; }
      `}</style>
    </tr>
  );
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const { role, deleteTransaction, editTransaction } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);

  if (!transactions.length) {
    return (
      <div className="empty-state card" style={{ padding: '48px 24px' }}>
        <span className="empty-state-icon">🔍</span>
        <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-secondary)' }}>No transactions found</p>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)' }}>Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="table-container card">
      <div className="table-scroll">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              {role === 'admin' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const color = CATEGORY_COLORS[tx.category] ?? '#8b949e';
              const icon = CATEGORY_ICONS[tx.category] ?? '📌';

              if (editingId === tx.id) {
                return (
                  <EditRow
                    key={tx.id}
                    tx={tx}
                    onSave={(updates) => {
                      editTransaction(tx.id, updates);
                      setEditingId(null);
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                );
              }

              return (
                <tr key={tx.id} className="tx-row">
                  <td className="tx-date">{formatDate(tx.date)}</td>
                  <td className="tx-desc">{tx.description}</td>
                  <td>
                    <span className="category-badge" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
                      <span>{icon}</span>
                      {tx.category}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${tx.type}`}>
                      {tx.type === 'income' ? '↓' : '↑'} {tx.type}
                    </span>
                  </td>
                  <td className={`tx-amount ${tx.type}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                  {role === 'admin' && (
                    <td>
                      <div className="action-btns">
                        <button
                          className="btn btn-ghost action-btn"
                          onClick={() => setEditingId(tx.id)}
                          title="Edit"
                          aria-label="Edit transaction"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="btn btn-ghost action-btn danger"
                          onClick={() => deleteTransaction(tx.id)}
                          title="Delete"
                          aria-label="Delete transaction"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .table-container {
          overflow: hidden;
        }
        .table-scroll {
          overflow-x: auto;
        }
        .tx-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .tx-table th {
          padding: 12px 16px;
          text-align: left;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
          background: var(--bg-tertiary);
        }
        .tx-table th:first-child { border-radius: var(--radius-lg) 0 0 0; }
        .tx-table th:last-child { border-radius: 0 var(--radius-lg) 0 0; }
        .tx-row {
          border-bottom: 1px solid var(--border);
          transition: background var(--transition);
        }
        .tx-row:last-child { border-bottom: none; }
        .tx-row:hover { background: var(--bg-hover); }
        .tx-table td { padding: 14px 16px; }
        .tx-date { color: var(--text-muted); font-size: 13px; white-space: nowrap; }
        .tx-desc { font-weight: 500; color: var(--text-primary); }
        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }
        .tx-amount {
          font-weight: 700;
          font-size: 15px;
          white-space: nowrap;
        }
        .tx-amount.income { color: var(--success); }
        .tx-amount.expense { color: var(--danger); }
        .action-btns { display: flex; gap: 4px; }
        .action-btn { width: 30px; height: 30px; padding: 0; justify-content: center; border-radius: var(--radius-sm); }
        .action-btn.danger:hover { background: var(--danger-dim); color: var(--danger); }
        .action-btn:hover { background: var(--bg-hover); color: var(--text-primary); }
      `}</style>
    </div>
  );
}
