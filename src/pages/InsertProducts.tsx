import { ShoppingBag } from "lucide-react";
import ProductForm from "../components/Shared/ProductForm";

const InsertProducts = () => {
  return (
    <div className="bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-[#00283a] mb-6 flex items-center">
        <ShoppingBag className="mr-2" /> Add New Product
      </h1>

      <ProductForm />
    </div>
  );
};

export default InsertProducts;
