import { ShoppingCart, User, Database } from "lucide-react";
import { TRoute } from "../../types/routes";

const userRoutes: TRoute[] = [
  { title: "Dashboard", href: "/user/dashboard", icon: <Database size={20} /> },
  { title: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },

  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: <ShoppingCart size={20} />,
  },
];

export default userRoutes;
