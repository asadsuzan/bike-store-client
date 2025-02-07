import { useNavigate } from "react-router";
import { IProduct } from "../../pages/Shop";
import clsx from "clsx";

interface ProductCardProps {
  product: IProduct;
  isLoading: boolean;
}

const ProductCard = ({ product, isLoading }: ProductCardProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="cursor-pointer bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow animate-pulse">
        <div className="h-40 bg-gray-300 rounded mb-2"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-1"></div>
        <div className="w-1/2 h-3 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/4 h-3 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="cursor-pointer bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow"
    >
      <img
        src={product?.image}
        alt={product?.name}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h2 className="text-lg font-semibold text-green-600 mb-1">
        {product?.name}
      </h2>
      <p
        className="text-sm text-gray-600 mb-2"
        dangerouslySetInnerHTML={{
          __html: product?.description?.slice(0, 100) || "",
        }}
      />
      <p className="text-sm font-medium">Price: ${product?.price}</p>
      <p
        className={clsx("text-sm", {
          "text-gray-600": product?.inStock,
          "text-red-600": !product?.inStock,
        })}
      >
        In Stock: {product?.inStock ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default ProductCard;
