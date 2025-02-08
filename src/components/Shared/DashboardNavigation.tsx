import { useLocation } from "react-router";
import clsx from "clsx";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { Link } from "react-router";
import userRoutes from "../layout/UserRoutes";
import adminRoutes from "../layout/AdminRoutes";
// import { TRoute } from "../../types/routes";

// type TNavItems = TRoute[];

const DashboardNavigation = () => {
  const location = useLocation();
  const user = useAppSelector(useCurrentUser);
  const navItems = user?.role === "customer" ? userRoutes : adminRoutes;

  // Check if current path starts with navigation item's href
  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <nav className="mb-4 lg:mb-6">
      <ul className="flex gap-1 overflow-x-auto pb-2 md:gap-2 lg:gap-4">
        {navItems.map((item) => (
          <li key={item.title} className="flex-shrink-0">
            <Link
              to={item.href}
              className={clsx(
                "flex items-center gap-2 px-3 py-2 rounded-lg",
                "transition-colors duration-200 hover:bg-gray-100",
                "text-gray-600 hover:text-gray-900",
                isActive(item.href) && "bg-green-100 text-green-700 font-medium",
                "group" // For group-hover effects
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <span className={clsx(
                "text-lg transition-colors duration-200",
                isActive(item.href) ? "text-green-600" : "text-gray-500 group-hover:text-green-500"
              )}>
                {item.icon}
              </span>
              <span className="text-sm hidden sm:inline-block">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardNavigation;