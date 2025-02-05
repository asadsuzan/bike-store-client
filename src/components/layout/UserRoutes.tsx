import { ShoppingCart, User } from "lucide-react";
import { TRoute } from "../../types/routes";

const userRoutes: TRoute[] = [
  { title: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },

  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: <ShoppingCart size={20} />,
  },
];

export default userRoutes;
