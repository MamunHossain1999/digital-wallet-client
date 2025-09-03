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
  endpoints: (builder) => ({
    agentTopUp: builder.mutation({
      query: (body: { amount: number }) => ({
        url: "/api/transaction/top-up",
        method: "POST",
        body,
      }),
    }),
    agentWithdraw: builder.mutation({
      query: (body: { amount: number }) => ({
        url: "/api/transaction/withdraw",
        method: "POST",
        body,
      }),
    }),
    agentSendMoney: builder.mutation({
      query: (body: { email: string; amount: number }) => ({
        url: "/api/transaction/send",
        method: "POST",
        body,
      }),
    }),
   agentGetMyTransactions: builder.query<MyTransactionsResponse, void>({
  query: () => "/api/transaction/history",
}),
  }),
});

export const {
  useAgentTopUpMutation,
  useAgentWithdrawMutation,
  useAgentSendMoneyMutation,
  useAgentGetMyTransactionsQuery,
} = agentTransactionApi;
