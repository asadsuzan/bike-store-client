import { ShoppingCart, Minus, Plus, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetProductByIdQuery } from "../redux/features/products/productsApi";
import { IProduct } from "./Shop";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToCart, ICartItem } from "../redux/features/cart/cartSlice";
import { toast } from "sonner";

const ProductDetails = () => {
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);
  const [isReturnsOpen, setReturnsOpen] = useState(false);
  const { id } = useParams();
  const { isLoading, data } = useGetProductByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [processing, setProcessing] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  const product = (data?.data as IProduct) || {};
  const isCartItem = cart.items.find(
    (item: ICartItem) => product._id === item.product
  );

  const handleQuantityChange = (event: "add" | "minus") => {
    if (event === "add" && selectedQuantity < product.quantity) {
      setSelectedQuantity((prev) => prev + 1);
    } else if (event === "minus" && selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  };
  const handleAddToCart = () => {
    setProcessing(true);
    if (!product.inStock) {
      alert("This product is out of stock.");
      return;
    }
    const id = toast.loading("processing...", { duration: 2000 });
    dispatch(
      addToCart({
        product: product._id,
        quantity: selectedQuantity,
        inStock: product.inStock,
        name: product.name,
        price: product.price,
        availableQuantity: product.quantity,
      })
    );
    toast.success("Added to cart", {
      id: id,
      duration: 2000,
    });

    setProcessing(false);
  };
  console.log(product);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Image Section */}
        <div className="w-full">
          <img
            src={product.image}
            alt="Product Image"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Right Product Details Section */}
        <div className="flex flex-col justify-between">
          {/* Product Title & Price */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {product?.name}
            </h1>
            <p className="text-2xl text-green-700 font-semibold mt-4">{`$${product?.price.toFixed(
              2
            )}`}</p>
            <p className="text-sm text-gray-500 mt-1">
              or 4 interest-free payments of $12.50 with{" "}
              <span className="underline">Afterpay</span>
            </p>
          </div>
          <div>
            <span className="text-sm text-green-600">
              In Stock: {product.quantity}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mt-6">
            <button
              disabled={
                selectedQuantity === 1 ||
                processing ||
                !product.inStock ||
                isCartItem?.product
                  ? true
                  : false
              }
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer"
              onClick={() => handleQuantityChange("minus")}
            >
              <Minus className="w-4 h-4 " />
            </button>
            <span className="mx-4 text-lg">{selectedQuantity}</span>
            <button
              disabled={
                selectedQuantity === product.quantity ||
                processing ||
                !product.inStock ||
                isCartItem?.product
                  ? true
                  : false
              }
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer"
              onClick={() => handleQuantityChange("add")}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Pickup Information */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              How to get it
            </h3>
            <div className="flex items-start mt-2">
              <MapPin className="w-5 h-5 text-gray-600 mt-1" />
              <div className="ml-2 text-sm text-gray-600">
                <p>Store pickup</p>
                <p>Silicon Valley Bicycle Exchange</p>
                <p>
                  3961 East Bayshore Road (Entrance faces parking lot, off
                  Corporation Way)
                </p>
                <p>Palo Alto, CA</p>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={
              processing || !product.inStock || isCartItem?.product
                ? true
                : false
            }
            className="mt-6 cursor-pointer   w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center text-lg font-semibold"
          >
            <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart $
            {(product?.price * selectedQuantity).toFixed(2)}
          </button>
          {isCartItem?.product && (
            <button
              onClick={() => navigate("/cart")}
              className="mt-6 cursor-pointer  w-full bg-gray-50 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center text-lg font-semibold"
            >
              <ShoppingCart className="w-5 h-5 mr-2" /> Edit Your Cart
            </button>
          )}
          {/* Description Accordion */}
          <div className="mt-8 border-t border-gray-300 pt-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setDescriptionOpen(!isDescriptionOpen)}
            >
              <h3 className="text-lg font-medium">Description</h3>
              {isDescriptionOpen ? <Minus size={20} /> : <Plus size={20} />}
            </div>
            {isDescriptionOpen && (
              <p
                className="text-sm text-gray-600 mt-2"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></p>
            )}
          </div>
          {/* Returns Accordion */}
          <div className="mt-4 border-t border-gray-300 pt-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setReturnsOpen(!isReturnsOpen)}
            >
              <h3 className="text-lg font-medium">Returns</h3>
              {isReturnsOpen ? <Minus size={20} /> : <Plus size={20} />}
            </div>
            {isReturnsOpen && (
              <p className="text-sm text-gray-600 mt-2">
                Returns are not available for donations. Please contact us for
                more details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
