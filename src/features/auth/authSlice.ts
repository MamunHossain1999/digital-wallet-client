import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "agent";
  accessToken?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingDone: (state) => {
      state.loading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, setLoadingDone } = authSlice.actions;
export default authSlice.reducer;
