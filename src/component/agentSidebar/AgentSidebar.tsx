
import { useLocation,  Link, } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaMoneyBillWave, 
  FaExchangeAlt, 
  FaPaperPlane, 
  FaHistory, 
  FaSignOutAlt, 
  FaBackspace, 
  FaUser
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { handleLogout } from "@/features/auth/authService";


// Props interface
interface AgentSidebarProps {
    role: "user" | "admin" | "agent";
}

const AgentSidebar: React.FC<AgentSidebarProps> = ({role}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      {/* Header / Logo */}
      <div className="p-6 text-2xl font-bold text-blue-600">
        {role === "agent" ? "Agent Panel" : "Panel"}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-4">
        <Link
          to="/agent"
          className={`flex items-center gap-3 ${
            location.pathname === "/agent"
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          <FaTachometerAlt /> Dashboard
        </Link>

        <Link
          to="/agent/agent-topup"
          className={`flex items-center gap-3 ${
            location.pathname === "/agent/agent-topup"
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          <FaMoneyBillWave /> Top Up
        </Link>

        <Link
          to="/agent/agent-withdrow"
          className={`flex items-center gap-3 ${
            location.pathname === "/agent/agent-withdrow"
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          <FaExchangeAlt /> Withdraw
        </Link>

        <Link
          to="/agent/agent-send-money"
          className={`flex items-center gap-3 ${
            location.pathname === "/agent/agent-send-money"
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          <FaPaperPlane /> Send Money
        </Link>

        <Link
          to="/agent/agent-transactios-history"
          className={`flex items-center gap-3 ${
            location.pathname === "/agent/agent-transactios-history"
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          <FaHistory /> Transactions
        </Link>

         <Link
          to="/agent/agent-profile"
          className={`flex items-center gap-3 ${
            location.pathname === "/agent/agent-profile"
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          <FaUser /> Profile
        </Link> 

        <Link
          to="/"
          className={`flex items-center gap-3 ${
            location.pathname === "/"
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }`}
        >
          <FaBackspace /> Go Back
        </Link>
      </nav>

      {/* Logout */}
        <div className="p-4 border-t">
        <button onClick={() => handleLogout(dispatch)} className="flex cursor-pointer items-center gap-3 text-red-500 hover:text-red-600 w-full">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AgentSidebar;
