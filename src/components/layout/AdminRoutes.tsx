import { ShoppingCart, PlusCircle, Box, Database, User } from "lucide-react";
import { TRoute } from "../../types/routes";

const adminRoutes: TRoute[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Database size={20} />,
  },
  { title: "Profile", href: "/profile", icon: <User size={20} /> },
  {
    title: "Inventory",
    href: "/inventory",
    icon: <Box size={20} />,
  },

  {
    title: "Insert Product",
    href: "/insert-product",
    icon: <PlusCircle size={20} />,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: <ShoppingCart size={20} />,
  },
];

export default adminRoutes;
