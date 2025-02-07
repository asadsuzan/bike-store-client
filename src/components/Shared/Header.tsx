import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart, User, Info, CircleX, Menu } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";

const Header: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const cart = useAppSelector((state) => state.cart);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Close dropdown and mobile menu on navigation
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
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

  // Helper function to determine if the link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white fixed left-0 top-0 w-full z-50 h-[80px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="text-2xl font-bold text-gray-900">
            <Link to="/" className="hover:text-green-600 transition-colors duration-300">
              BikeBD
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link
                to="/shop"
                className={`hover:text-green-600 transition-colors duration-300 ${
                  isActive("/shop") ? "text-green-600" : "text-gray-700"
                }`}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`flex items-center space-x-2 hover:text-green-600 transition-colors duration-300 ${
                  isActive("/about") ? "text-green-600" : "text-gray-700"
                }`}
              >
                <Info size={20} />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className={`flex items-center space-x-2 hover:text-green-600 transition-colors duration-300 ${
                  isActive("/cart") ? "text-green-600" : "text-gray-700"
                }`}
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
                <sup className="text-green-600 font-bold">
                  {cart.totalQuantity}
                </sup>
              </Link>
            </li>

            {/* User Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 cursor-pointer hover:text-green-600 transition-colors duration-300"
              >
                <User size={20} />
                <span>{ "Account"}</span>
              </div>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-green-200 rounded-lg shadow-lg z-10">
                  {user ? (
                    <>
                      <li className="px-4 py-2 hover:bg-green-50 transition-colors duration-300">
                        <Link to="/dashboard" className="block text-gray-700">
                          Dashboard
                        </Link>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-green-50 cursor-pointer transition-colors duration-300"
                        onClick={() => dispatch(logout())}
                      >
                        <span className="block text-gray-700">Logout</span>
                      </li>
                    </>
                  ) : (
                    <li className="px-4 py-2 hover:bg-green-50 transition-colors duration-300">
                      <Link to="/login" className="block text-gray-700">
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-green-600 transition-colors duration-300"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold text-gray-900">
              <Link to="/" className="hover:text-green-600 transition-colors duration-300">
                BikeBD
              </Link>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-green-600 transition-colors duration-300"
            >
              <CircleX size={24} />
            </button>
          </div>
          <ul className="space-y-4">
            <li>
              <Link
                to="/shop"
                className={`block text-gray-700 hover:text-green-600 transition-colors duration-300 ${
                  isActive("/shop") ? "text-green-600" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-300 ${
                  isActive("/about") ? "text-green-600" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                <Info size={20} />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className={`flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-300 ${
                  isActive("/cart") ? "text-green-600" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
                <sup className="text-green-600 font-bold">
                  {cart.totalQuantity}
                </sup>
              </Link>
            </li>

            {/* User Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-green-600 transition-colors duration-300"
              >
                <User size={20} />
                <span>{ "Account"}</span>
              </div>
              {isDropdownOpen && (
                <ul className="mt-2 space-y-2">
                  {user ? (
                    <>
                      <li className="px-4 py-2 hover:bg-green-50 transition-colors duration-300">
                        <Link to="/dashboard" className="block text-gray-700">
                          Dashboard
                        </Link>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-green-50 cursor-pointer transition-colors duration-300"
                        onClick={() => dispatch(logout())}
                      >
                        <span className="block text-gray-700">Logout</span>
                      </li>
                    </>
                  ) : (
                    <li className="px-4 py-2 hover:bg-green-50 transition-colors duration-300">
                      <Link to="/login" className="block text-gray-700">
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;