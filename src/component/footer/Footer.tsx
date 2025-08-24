import React from "react";
import { Link } from "react-router";


const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-600 text-white ">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Brand */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold">WalletApp</h1>
          <p className="text-sm">Secure Digital Wallet System</p>
        </div>

        {/* Links */}
        <ul className="flex flex-col md:flex-row gap-4 text-sm">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/terms" className="hover:text-gray-200">
              Terms
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom Bar */}
      <div className="bg-amber-700 text-center py-2 text-sm">
        &copy; {new Date().getFullYear()} WalletApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
