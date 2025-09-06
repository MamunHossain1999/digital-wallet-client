// src/features/transaction/transactionApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Transaction, TopUpRequest, WithdrawRequest, SendRequest } from "../types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include", // cookie automatically পাঠাবে
  }),
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    topUp: builder.mutation<Transaction, TopUpRequest>({
      query: (body) => ({
        url: "/api/transaction/top-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transactions"],
    }),
    withdraw: builder.mutation<Transaction, WithdrawRequest>({
      query: (body) => ({
        url: "/api/transaction/withdraw",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transactions"],
    }),
    sendMoney: builder.mutation<Transaction, SendRequest>({
      query: (body) => ({
        url: "/api/wallet/send-money",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transactions"],
    }),
    getMyTransactions: builder.query<Transaction[], void>({
      query: () => "/api/transaction/history",
      providesTags: ["Transactions"],
    }),
    getAllTransactions: builder.query<Transaction[], void>({
      query: () => "/api/transaction/admin",
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useTopUpMutation,
  useWithdrawMutation,
  useSendMoneyMutation,
  useGetMyTransactionsQuery,
  useGetAllTransactionsQuery,
} = transactionApi;
