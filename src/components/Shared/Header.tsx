import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart, User, Info } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";

const Header: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown on navigation
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between p-3">
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

        {/* User Dropdown */}
        <li className="relative" ref={dropdownRef}>
          <div
            onClick={toggleDropdown}
            className="flex items-center space-x-1 cursor-pointer hover:text-[#004e75]"
          >
            <User size={18} />
            <span>User</span>
          </div>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
              {user ? (
                <>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/dashboard" className="block">
                      Dashboard
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <span onClick={() => dispatch(logout())} className="block">
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/login" className="block">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
