import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import Loader from "@/component/loder/Loader";
import { setLoading, setLoadingDone, setUser } from "@/features/auth/authSlice";
import type { RootState } from "@/app/store";
import { fetchMe } from "@/features/auth/authService";

const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    const loadUser = async () => {
      if (!user) {
        dispatch(setLoading());
        try {
          const fetchedUser = await fetchMe();
          if (fetchedUser) {
            dispatch(setUser(fetchedUser));
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
        } finally {
       // ✅ সর্বশেষে loading false
          dispatch(setLoadingDone());
        }
      }
    };

    loadUser();
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-[86vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
