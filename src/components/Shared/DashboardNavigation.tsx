import { useLocation } from "react-router";
import clsx from "clsx";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { Link } from "react-router";
import userRoutes from "../layout/UserRoutes";
import adminRoutes from "../layout/AdminRoutes";
import { TRoute } from "../../types/routes";

type TNavItems = TRoute[];

const DashboardNavigation = () => {
  let navItems: TNavItems = [];
  const location = useLocation(); // Hook to get current location
  const user = useAppSelector(useCurrentUser);

  if (user && user.role === "customer") {
    navItems = userRoutes;
  } else {
    navItems = adminRoutes;
  }
  console.log(location);
  return (
    <nav className="flex items-center mb-2">
      <ul className="flex gap-4">
        {navItems.map((item) => (
          <li key={item.title}>
            <Link
              to={item.href}
              className={clsx(
                "flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100",
                location.pathname === item.href && "bg-[#b5e7b5] " // Active tab styling
              )}
            >
              <span className="text-green-500"> {item.icon}</span>
              <span className="text-sm">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardNavigation;
