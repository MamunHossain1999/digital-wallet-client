import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store";

interface LoginRequest { email: string; password: string; }
interface RegisterRequest { name: string; email: string; password: string; role?: "user"|"admin"|"agent"; }

interface LoginResponse {
  message: string;
  user: { _id: string; name: string; email: string; role: "user"|"admin"|"agent"; };
  accessToken: string;
  refreshToken: string;
}

interface RegisterResponse {
  message: string;
  user: { _id: string; name: string; email: string; role: "user"|"admin"|"agent"; };
}

const fetchApi = import.meta.env.VITE_API_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: fetchApi,
    credentials: "include", // ✅ cookie পাঠানো হবে
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: "/api/auth/login", method: "POST", body }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({ url: "/api/auth/register", method: "POST", body }),
    }),
    // logout: builder.mutation<{ message: string }, void>({
    //   query: () => ({ url: "/api/auth/logout", method: "POST" }),
    // }),
    // getMe: builder.query<{ user: LoginResponse["user"] }, void>({
    //   query: () => ({ url: "/api/auth/me", method: "GET" }),
    // }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  // useLogoutMutation,
  // useGetMeQuery,
} = authApi;
