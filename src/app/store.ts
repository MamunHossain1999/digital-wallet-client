import authReducer from '@/features/auth/authSlice';

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/features/auth/authApi";
import { walletApi } from "@/features/wallet/wallet.api";
import { transactionApi } from '@/features/transation/transactionApi/transactionApi';
import { walletAdminApi } from '@/pages/AdminDashBoardPage/allAdminApi/walletAdminApi';
import { transactionAdminApi } from '@/pages/AdminDashBoardPage/allAdminApi/transactionAdminApi';
import { agentTransactionApi } from '@/pages/AgentDashboardPage/agentApi/agentTransactionApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [agentTransactionApi.reducerPath]: agentTransactionApi.reducer,
    [walletAdminApi.reducerPath]: walletAdminApi.reducer,
    [transactionAdminApi.reducerPath]: transactionAdminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(walletApi.middleware)
    .concat(transactionApi.middleware)
    .concat(walletAdminApi.middleware)
    .concat(transactionAdminApi.middleware)
    .concat(agentTransactionApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
