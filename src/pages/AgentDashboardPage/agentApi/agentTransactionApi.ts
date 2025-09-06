/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface MyTransactionsResponse {
  transactions: any[];
}
const url = import.meta.env.VITE_API_BASE_URL;

export const agentTransactionApi = createApi({
  reducerPath: "agentTransactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
     credentials: "include",
  }),
  tagTypes: ["Transactions", "AgentWallet", "AgentStats"],
  endpoints: (builder) => ({
    agentTopUp: builder.mutation({
      query: (body: { amount: number }) => ({
        url: "/api/transaction/top-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AgentWallet", "Transactions"],
    }),
    agentWithdraw: builder.mutation({
      query: (body: { amount: number }) => ({
        url: "/api/wallet/withdraw",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AgentWallet", "Transactions"],
    }),
    agentSendMoney: builder.mutation({
      query: (body: { email: string; amount: number }) => ({
        url: "/api/wallet/send-money",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AgentWallet", "Transactions"],
    }),
    agentGetMyTransactions: builder.query<MyTransactionsResponse, void>({
      query: () => "/api/transaction/history",
      providesTags: ["Transactions"],
    }),
    
    // Get agent wallet balance
    getAgentWallet: builder.query<{ balance: number }, void>({
      query: () => "/api/wallet/my",
      providesTags: ["AgentWallet"],
    }),
    
    // Get agent statistics
    getAgentStats: builder.query<{
      totalCustomers: number;
      totalTransactions: number;
      walletBalance: number;
    }, void>({
      query: () => "/api/agent/stats",
      providesTags: ["AgentStats"],
    }),
  }),
});

export const {
  useAgentTopUpMutation,
  useAgentWithdrawMutation,
  useAgentSendMoneyMutation,
  useAgentGetMyTransactionsQuery,
  useGetAgentWalletQuery,
  useGetAgentStatsQuery,
} = agentTransactionApi;
