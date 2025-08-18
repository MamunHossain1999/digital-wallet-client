import { useState } from "react";

import React from "react";
import { Link } from "react-router";

interface NavbarProps {
  role: "admin" | "user" | "agent" | null;
  userName?: string;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ role, userName, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav className="bg-amber-600 text-white sticky top-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          WalletApp
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-6 font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          {role === "user" && (
            <>
              <li>
                <Link to="/wallet">Wallet</Link>
              </li>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
            </>
          )}
          {role === "agent" && (
            <>
              <li>
                <Link to="/cash-in">Cash-In</Link>
              </li>
              <li>
                <Link to="/cash-out">Cash-Out</Link>
              </li>
            </>
          )}
          {role === "admin" && (
            <>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/wallets">Wallets</Link>
              </li>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
            </>
          )}

          {/* Profile Dropdown */}
          <li className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center gap-2 px-3 py-1 bg-amber-500 rounded hover:bg-amber-400"
            >
              {userName || "Profile"}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-amber-500 px-6 py-4 space-y-2 font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          {role === "user" && (
            <>
              <li>
                <Link to="/wallet">Wallet</Link>
              </li>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
            </>
          )}
          {role === "agent" && (
            <>
              <li>
                <Link to="/cash-in">Cash-In</Link>
              </li>
              <li>
                <Link to="/cash-out">Cash-Out</Link>
              </li>
            </>
          )}
          {role === "admin" && (
            <>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/wallets">Wallets</Link>
              </li>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
