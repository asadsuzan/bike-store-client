import { ShoppingCart, User, Database } from "lucide-react";
import { TRoute } from "../../types/routes";

const userRoutes: TRoute[] = [
  { title: "Dashboard", href: "/dashboard", icon: <Database size={20} /> },
  { title: "Profile", href: "/profile", icon: <User size={20} /> },

  {
    title: "Orders",
    href: "/orders",
    icon: <ShoppingCart size={20} />,
  },
];

export default userRoutes;
