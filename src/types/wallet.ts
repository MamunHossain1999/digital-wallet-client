export type WalletStatus = "active" | "blocked"

// Wallet structure
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// Request type for adding money
export interface AddMoneyRequest {
  amount: number;         // Amount to add
  paymentMethod?: string; // Optional, e.g., "card", "paypal"
}

// Request type for withdrawing money
export interface WithdrawRequest {
  amount: number;         // Amount to withdraw
  bankAccount?: string;   // Optional bank account number
}

// Request type for sending money to another user
export interface SendMoneyRequest {
  amount: number;         // Amount to send
  recipientId: string;    // User ID of the recipient
  note?: string;          // Optional note
}
