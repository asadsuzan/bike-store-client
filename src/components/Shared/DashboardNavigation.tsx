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

  const user = useAppSelector(useCurrentUser);
  if (user && user.role === "customer") {
    navItems = userRoutes;
  } else {
    navItems = adminRoutes;
  }
  console.log(navItems);
  return (
    <nav className="flex items-center ">
      <ul className="flex gap-4">
        {navItems.map((item) => (
          <li key={item.title}>
            <Link
              to={item.href}
              className={clsx(
                "flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100"
              )}
            >
              {item.icon}
              <span className="text-sm">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardNavigation;
