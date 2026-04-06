'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '@/components/providers/AppProvider';
import FilterBar from '@/components/transactions/FilterBar';
import TransactionTable from '@/components/transactions/TransactionTable';
import AddTransactionModal from '@/components/transactions/AddTransactionModal';

export default function TransactionsPage() {
  const { filteredTransactions, transactions, role } = useApp();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="animate-fade-in">
      <div className="page-header tx-header">
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">
            {filteredTransactions.length} of {transactions.length} transactions
          </p>
        </div>
        {role === 'admin' && (
          <button
            id="add-transaction-btn"
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}
      </div>

      <FilterBar />
      <TransactionTable transactions={filteredTransactions} />

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}

      <style jsx>{`
        .tx-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
      `}</style>
    </div>
  );
}
