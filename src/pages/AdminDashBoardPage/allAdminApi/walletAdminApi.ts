import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface WalletUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "agent";
}

export interface Wallet {
  _id: string;
  user: string | WalletUser | null; // populated হলে object/না হলে string/null
  balance: number;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const walletAdminApi = createApi({
  reducerPath: "walletAdminApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  tagTypes: ["Wallets"], // ✅ plural
  endpoints: (builder) => ({
    // Admin only: get all wallets
    getAllWallets: builder.query<Wallet[], void>({
      query: () => "/api/wallet/all",
      providesTags: ["Wallets"], 
    }),

    // Admin only: block/unblock
    toggleBlock: builder.mutation<
      Wallet,
      { id: string; block: boolean }
    >({
      query: ({ id, block }) => ({
        url: `/api/wallet/block/${id}`,
        method: "PATCH",
        body: { block },
      }),
      invalidatesTags: ["Wallets"],
    }),
  }),
});

export const {
  useGetAllWalletsQuery,
  useToggleBlockMutation,
} = walletAdminApi;
