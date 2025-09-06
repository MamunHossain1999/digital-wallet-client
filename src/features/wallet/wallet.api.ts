// src/features/wallet/walletApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Wallet {
  _id: string;
  user: { _id: string; name: string; email: string };
  balance: number;
  isBlocked: boolean;
}

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/wallet`,
    credentials: "include", // 👈 cookie সহ পাঠাবে
  }),
  tagTypes: ["Wallet"],
  endpoints: (builder) => ({
    // 👤 User wallet
    getMyWallet: builder.query<Wallet, void>({
      query: () => `/my`,
      providesTags: ["Wallet"],
    }),

    addMoney: builder.mutation<{ message: string }, { amount: number }>({
      query: (body) => ({
        url: `/add-money`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wallet"],
    }),

    withdrawMoney: builder.mutation<{ message: string }, { amount: number }>({
      query: (body) => ({
        url: `/withdraw`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wallet"],
    }),

    sendMoney: builder.mutation<
      { message: string },
      { email: string; amount: number }
    >({
      query: (body) => ({
        url: `/send-money`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wallet"],
    }),

    // 👑 Admin wallet management
    getAllWallets: builder.query<Wallet[], void>({
      query: () => `/all`,
      providesTags: ["Wallet"],
    }),

    blockWallet: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Wallet"],
    }),
  }),
});

export const {
  useGetMyWalletQuery,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
  useGetAllWalletsQuery,
  useBlockWalletMutation,
} = walletApi;
