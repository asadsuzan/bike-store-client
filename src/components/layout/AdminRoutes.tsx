import { ShoppingCart, PlusCircle, Box } from "lucide-react";
import { TRoute } from "../../types/routes";

const adminRoutes: TRoute[] = [
  { title: "Inventory", href: "dashboard/inventory", icon: <Box size={20} /> },

  {
    title: "Insert Product",
    href: "dashboard/insert-product",
    icon: <PlusCircle size={20} />,
  },
  {
    title: "Orders",
    href: "dashboard/orders",
    icon: <ShoppingCart size={20} />,
  },
];

export default adminRoutes;
