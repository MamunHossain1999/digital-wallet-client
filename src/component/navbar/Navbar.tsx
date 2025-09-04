// src/component/navbar/Navbar.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link} from "react-router";
import type { RootState } from "@/app/store";
import { FaHome, FaWallet, FaMoneyBillWave, FaTachometerAlt } from "react-icons/fa";
import { handleLogout } from "@/features/auth/authService";


interface NavItem {
  name: string;
  path: string;
  roles?: ("admin" | "user" | "agent")[]; // optional for public links
  icon?: React.ReactNode;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role;
  const dispatch = useDispatch();
 

  const logout = () => handleLogout(dispatch);

  // Menu items
  const navItems: NavItem[] = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "AdminDashboard", path: "/admin", roles: ["admin"], icon: <FaTachometerAlt /> },
    { name: "Wallet", path: "/user-wallet", roles: ["user"], icon: <FaWallet /> },
    { name: "AgentDashboard", path: "/agent", roles: ["agent"], icon: <FaMoneyBillWave /> },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Filter items based on role
  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true; // public links
    return role ? item.roles.includes(role) : false;
  });

  return (
    <nav className="bg-amber-600 text-white sticky top-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold">WalletApp</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium">
          {filteredNavItems.map(item => (
            <li key={item.path} className="flex items-center gap-2 hover:text-black">
              {item.icon}
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}

          {/* Profile Dropdown */}
          <li className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-3 py-1 bg-amber-500 rounded hover:bg-amber-400"
            >
              {user ? user.name : "Profile"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isProfileOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </button>
            {isProfileOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded border border-gray-200">
                {user ? (
                  <>
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>Profile</Link>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={logout}>Logout</button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                  </li>
                )}
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-amber-500 px-6 py-4 space-y-2 font-medium">
          {filteredNavItems.map(item => (
            <li key={item.path}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
          {user ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
