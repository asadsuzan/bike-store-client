import React from "react";

import { ShoppingCart, User, Info } from "lucide-react";
import { Link } from "react-router";

const Header: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-3  ">
      {/* Logo Section */}
      <div className="text-2xl font-bold">
        <Link to="/">
          <a className="hover:text-[#004e75]">BikeBD</a>
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-6">
        <li>
          <Link to="/shop">
            <a className="hover:text-[#004e75]">Shop</a>
          </Link>
        </li>

        <li>
          <Link to="/about">
            <a className="flex items-center space-x-1 hover:text-[#004e75]">
              <Info size={18} />
              <span>About</span>
            </a>
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <a className="flex items-center space-x-1 hover:text-[#004e75]">
              <ShoppingCart size={18} />
              <span>Cart</span>
            </a>
          </Link>
        </li>
        <li>
          <Link to="/user">
            <a className="flex items-center space-x-1 hover:text-[#004e75]">
              <User size={18} />
              <span>User</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
