import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TransactionType = "top-up" | "withdraw" | "send";

export interface Transaction {
  _id: string;
  type: TransactionType;
  amount: number;
  from?: string | { _id: string; name: string } | null;
  to?: string | { _id: string; name: string } | null;
  createdAt: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const transactionAdminApi = createApi({
  reducerPath: "transactionAdminApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    // Admin only
    getAllTransactions: builder.query<Transaction[], void>({
      query: () => "/api/transaction/admin",
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionAdminApi;
