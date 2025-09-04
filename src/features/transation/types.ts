export interface TopUpRequest {
  amount: number;
}

export interface WithdrawRequest {
  amount: number;
}

export interface SendRequest {
  amount: number;
  email:string;
  recipientId: string;
}
// src/types/transaction.ts
export interface Transaction {
  _id: string;
  email:string;
  from: string;
  to?: string;
  amount: number;
  fee?: number;
  type: "add" | "withdraw" | "transfer";
  status: "pending" | "completed" | "failed";
  createdAt: string;
}
