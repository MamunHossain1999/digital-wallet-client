// frontend/src/types/transaction.ts
export type TransactionType = 'add' | 'withdraw' | 'transfer' | 'cash-in' | 'cash-out';
export type TransactionStatus = 'pending' | 'completed' | 'reversed';

export interface Transaction {
  id?: string;       
  type: TransactionType;
  from?: string;      
  to?: string;       
  amount: number;
  fee?: number;
  commission?: number;
  status?: TransactionStatus;
  createdAt?: string; 
  updatedAt?: string;
}