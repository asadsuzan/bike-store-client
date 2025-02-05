import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart, User, Info, CircleX } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";

const Header: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // state for mobile menu
  const dropdownRef = useRef<HTMLLIElement>(null);
  const cart = useAppSelector((state) => state.cart);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen); // toggle mobile menu

  // Close dropdown on navigation
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false); // Close the mobile menu when route changes
    }
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
    <nav className="flex items-center justify-between p-4 relative">
      {/* Logo Section */}
      <div className="text-3xl font-bold">
        <Link to="/">
          <a className="hover:text-[#00ff00]">BikeBD</a>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex items-center space-x-8">
        <li>
          <Link to="/shop">
            <a
              className={`hover:text-[#00ff00] transition-colors duration-300 ${
                isActive("/shop") ? "text-[#00ff00]" : ""
              }`}
            >
              Shop
            </a>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <a
              className={`flex items-center space-x-2 hover:text-[#00ff00] transition-colors duration-300 ${
                isActive("/about") ? "text-[#00ff00]" : ""
              }`}
            >
              <Info size={20} />
              <span>About</span>
            </a>
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <a
              className={`flex items-center space-x-2 hover:text-[#00ff00] transition-colors duration-300 ${
                isActive("/cart") ? "text-[#00ff00]" : ""
              }`}
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              <sup className="text-green-600 font-bold">
                {cart.totalQuantity}
              </sup>
            </a>
          </Link>
        </li>

        {/* User Dropdown */}
        <li className="relative" ref={dropdownRef}>
          <div
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer hover:text-[#00ff00] transition-colors duration-300"
          >
            <User size={20} />
            <span>User</span>
          </div>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border border-[#00ff00] rounded-md shadow-lg z-10">
              {user ? (
                <>
                  <li className="px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
                    <Link to="/dashboard/orders" className="block">
                      Dashboard
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300">
                    <span onClick={() => dispatch(logout())} className="block">
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <li className="px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
                  <Link to="/login" className="block">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          )}
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center space-x-4">
        <button
          onClick={toggleMobileMenu}
          className="hover:text-[#00ff00] text-green-500 transition-colors duration-300"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation Links */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-[100vh] bg-[#effaff] text-red z-20 p-4 flex flex-col space-y-4 md:hidden">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold">
              <Link to="/">
                <a className="hover:text-[#00ff00]">BikeBD</a>
              </Link>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-3xl text-green-500 hover:text-[#00ff00]"
            >
              <CircleX />
            </button>
          </div>
          <ul className="space-y-4">
            <li>
              <Link to="/shop">
                <a
                  className={`hover:text-[#00ff00] transition-colors duration-300 ${
                    isActive("/shop") ? "text-[#00ff00]" : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Shop
                </a>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <a
                  className={`flex items-center space-x-2 hover:text-[#00ff00] transition-colors duration-300 ${
                    isActive("/about") ? "text-[#00ff00]" : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <Info size={20} />
                  <span>About</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <a
                  className={`flex items-center space-x-2 hover:text-[#00ff00] transition-colors duration-300 ${
                    isActive("/cart") ? "text-[#00ff00]" : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                  <sup className="text-green-600 font-bold">
                    {cart.totalQuantity}
                  </sup>
                </a>
              </Link>
            </li>

            {/* User Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 cursor-pointer hover:text-[#00ff00] transition-colors duration-300"
              >
                <User size={20} />
                <span>User</span>
              </div>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-[#00ff00] rounded-md shadow-lg z-10">
                  {user ? (
                    <>
                      <li className="px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
                        <Link to="/dashboard/orders" className="block">
                          Dashboard
                        </Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300">
                        <span
                          onClick={() => dispatch(logout())}
                          className="block"
                        >
                          Logout
                        </span>
                      </li>
                    </>
                  ) : (
                    <li className="px-4 py-2 hover:bg-gray-100 transition-colors duration-300">
                      <Link to="/login" className="block">
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
