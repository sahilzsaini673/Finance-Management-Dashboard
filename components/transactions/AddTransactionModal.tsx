'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useApp } from '@/components/providers/AppProvider';
import { CATEGORIES, type Category, type TransactionType } from '@/lib/mock-data';

interface FormState {
  date: string;
  description: string;
  amount: string;
  type: TransactionType;
  category: Category;
}

const defaultForm = (): FormState => ({
  date: new Date().toISOString().slice(0, 10),
  description: '',
  amount: '',
  type: 'expense',
  category: 'Food',
});

interface AddTransactionModalProps {
  onClose: () => void;
}

export default function AddTransactionModal({ onClose }: AddTransactionModalProps) {
  const { addTransaction } = useApp();
  const [form, setForm] = useState<FormState>(defaultForm());
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.description.trim()) e.description = 'Required';
    if (!form.amount || parseFloat(form.amount) <= 0) e.amount = 'Must be > 0';
    if (!form.date) e.date = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    addTransaction({
      date: form.date,
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
    });
    onClose();
  }

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon">
              <Plus size={18} />
            </div>
            <h2 className="modal-title">Add Transaction</h2>
          </div>
          <button className="btn btn-ghost close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Type toggle */}
          <div className="form-group">
            <label className="label">Type</label>
            <div className="type-toggle">
              {(['income', 'expense'] as TransactionType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`type-btn ${form.type === t ? `active-${t}` : ''}`}
                  onClick={() => setForm((f) => ({ ...f, type: t }))}
                >
                  {t === 'income' ? '↓ Income' : '↑ Expense'}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="label" htmlFor="add-date">Date</label>
            <input id="add-date" type="date" className={`input ${errors.date ? 'input-error' : ''}`} value={form.date} onChange={set('date')} />
            {errors.date && <p className="error-msg">{errors.date}</p>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="label" htmlFor="add-desc">Description</label>
            <input id="add-desc" type="text" className={`input ${errors.description ? 'input-error' : ''}`} placeholder="e.g. Grocery Store" value={form.description} onChange={set('description')} />
            {errors.description && <p className="error-msg">{errors.description}</p>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="label" htmlFor="add-category">Category</label>
            <select id="add-category" className="input select" value={form.category} onChange={set('category')}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="label" htmlFor="add-amount">Amount (USD)</label>
            <div className="amount-wrap">
              <span className="amount-prefix">$</span>
              <input
                id="add-amount"
                type="number"
                className={`input amount-input ${errors.amount ? 'input-error' : ''}`}
                placeholder="0.00"
                min={0}
                step={0.01}
                value={form.amount}
                onChange={set('amount')}
              />
            </div>
            {errors.amount && <p className="error-msg">{errors.amount}</p>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" id="add-transaction-submit" className="btn btn-primary">
              <Plus size={16} />
              Add Transaction
            </button>
          </div>
        </form>

        <style jsx>{`
          .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 24px 16px;
            border-bottom: 1px solid var(--border);
          }
          .modal-title-row {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .modal-icon {
            width: 36px;
            height: 36px;
            background: var(--accent-dim);
            color: var(--accent);
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .modal-title {
            font-size: 17px;
            font-weight: 700;
            margin: 0;
            color: var(--text-primary);
          }
          .close-btn { color: var(--text-muted); }
          .modal-form {
            padding: 20px 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .form-group { display: flex; flex-direction: column; gap: 6px; }
          .type-toggle {
            display: grid;
            grid-template-columns: 1fr 1fr;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 4px;
            gap: 4px;
          }
          .type-btn {
            padding: 10px;
            border-radius: 6px;
            border: none;
            background: transparent;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-muted);
            cursor: pointer;
            transition: all var(--transition);
          }
          .type-btn.active-income {
            background: var(--success-dim);
            color: var(--success);
          }
          .type-btn.active-expense {
            background: var(--danger-dim);
            color: var(--danger);
          }
          .amount-wrap { position: relative; }
          .amount-prefix {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
            font-weight: 600;
            pointer-events: none;
          }
          .amount-input { padding-left: 30px; }
          .input-error { border-color: var(--danger) !important; }
          .error-msg { font-size: 12px; color: var(--danger); margin: 0; }
          .modal-actions {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            padding-top: 4px;
            border-top: 1px solid var(--border);
            margin-top: 4px;
          }
        `}</style>
      </div>
    </div>
  );
}
