/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { store } from "@/app/store";
import { setUser, clearUser } from "./authSlice";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const fetchMe = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/auth/me`, { withCredentials: true });
    const user = res.data.user;
    store.dispatch(setUser(user));
    return user;
  } catch {
    store.dispatch(clearUser());
    return null;
  }
};

export const handleLogout = async (dispatch: any, navigate: any) => {
  try {
    await axios.post(`${baseURL}/api/auth/logout`, {}, { withCredentials: true });
    dispatch(clearUser());
    toast.success("Logged out");
    navigate("/", { replace: true });
  } catch {
    toast.error("Logout failed");
  }
};
