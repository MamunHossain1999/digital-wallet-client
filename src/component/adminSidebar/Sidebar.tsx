import { handleLogout } from "@/features/auth/authService";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaUser, FaWallet, FaExchangeAlt, FaSignOutAlt, FaBackspace } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation} from "react-router-dom";

interface SidebarProps {
  role: "user" | "admin" | "agent";
}



const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  const dispatch = useDispatch();




  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 text-2xl font-bold text-blue-600">Admin Panel</div>
      <nav className="flex-1 px-4 space-y-4">
        <Link
          to="/admin"
          className={`flex items-center gap-3 ${
            location.pathname === "/admin" ? "text-blue-600 font-semibold" : "text-gray-700"
          }`}
        >
          <FaHome /> Dashboard
        </Link>

        {role === "admin" && (
          <>
            <Link
              to="/admin/user-profile"
              className={`flex items-center gap-3 ${
                location.pathname === "/admin/user-profile" ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              <CgProfile />Profile
            </Link>
            <Link
              to="/admin/userTable"
              className={`flex items-center gap-3 ${
                location.pathname === "/admin/userTable" ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              <FaUser /> Users
            </Link>
            <Link
              to="/admin/wallets"
              className={`flex items-center gap-3 ${
                location.pathname === "/admin/wallets" ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              <FaWallet /> Wallets
            </Link>
            <Link
              to="/admin/transactions"
              className={`flex items-center gap-3 ${
                location.pathname === "/admin/transactions" ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              <FaExchangeAlt /> Transactions
            </Link>
            <Link
              to="/"
              className={`flex items-center gap-3 ${
                location.pathname === "/" ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              <FaBackspace /> Go back
            </Link>
          </>
        )}
      </nav>
        <div className="p-4 border-t">
        <button onClick={() => handleLogout(dispatch)} className="flex cursor-pointer items-center gap-3 text-red-500 hover:text-red-600 w-full">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
