import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/component/adminSidebar/Sidebar";
import { setLoadingDone, setUser } from "@/features/auth/authSlice";
import Loader from "@/component/loder/Loader";
import { HiMenu } from "react-icons/hi";
import type { RootState } from "@/app/store";
import { fetchMe } from "@/features/auth/authService";

const AdminDashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    const getUser = async () => {
      if (!user) {
        
        try {
          const fetchedUser = await fetchMe();
          if (fetchedUser) dispatch(setUser(fetchedUser));
        } catch (err) {
          console.error("Failed to fetch user:", err);
        } finally {
          dispatch(setLoadingDone());
        }
      }
    };
    getUser();
  }, [dispatch, user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) return <Loader />;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar role={user?.role || "admin"} />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/50"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-64 bg-white shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar role={user?.role || "admin"} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between bg-white p-4 shadow">
          <HiMenu
            className="text-2xl cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
          <span className="font-semibold text-lg">{user?.name || "Admin"}</span>
        </div>

        <main className="flex-1 bg-gray-100 min-h-[80vh] p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
