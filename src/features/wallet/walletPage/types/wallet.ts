// src/types/wallet.ts


export type WalletStatus = 'active' | 'blocked';

export interface IWallet {
  _id?: string;
  user: string;// frontend এ ObjectId ব্যবহার করা হয় না, শুধু userId বা populated IUser
  balance: number;
  isBlocked?: boolean;
  status?: WalletStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mutation request types
export type AddMoneyRequest = {
  amount: number;
};

export type WithdrawRequest = {
  amount: number;
};

export type SendMoneyRequest = {
  amount: number;
  receiverEmail: string;
};

export type BlockWalletRequest = {
  id: string; // wallet id
};
