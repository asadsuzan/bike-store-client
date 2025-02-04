import { ShoppingBag } from "lucide-react";
import ProductForm from "../components/Shared/ProductForm";
import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../redux/features/products/productsApi";
import { IProduct } from "./Shop";

const EditProduct = () => {
  const { id } = useParams();
  // Fetch product data using the id from the URL and display it in the form.
  const { isLoading, data } = useGetProductByIdQuery(id);
  if (isLoading) return <div>Loading...</div>;

  if (!data || !data?.data) {
    return <h1>bike not exits</h1>;
  }
  const product: IProduct = data?.data;
  console.log(product);
  return (
    <div className="bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-[#00283a] mb-6 flex items-center">
        <ShoppingBag className="mr-2" /> Edit your Product
      </h1>

      <ProductForm id={product._id} productData={product} />
    </div>
  );
};

export default EditProduct;
