import { useState } from "react";
import { Plus, Minus, Trash, Edit } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  ICartItem,
  removeFromCart,
  updateQuantity,
} from "../redux/features/cart/cartSlice";
// import { Dialog } from "@/components/ui/dialog";

const CartPage = () => {
  const [couponCode, setCouponCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [pickupAddress, setPickupAddress] = useState(
    "3961 East Bayshore Road (Entrance faces our parking lot, off Corporation Way)"
  );
  const [isPickupDialogOpen, setPickupDialogOpen] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleCouponButtonClick = () => {
    if (couponCode) {
      alert(`Applying coupon: ${couponCode}`);
    } else {
      alert("Cancelling coupon");
      setCouponCode("");
    }
  };
  const handleUpdateQuantity = (
    id: string,
    quantity: number,
    action: "add" | "minus",
    maxQuantity: number
  ) => {
    console.log({ maxQuantity, quantity });
    if (action === "add" && maxQuantity > quantity) {
      dispatch(updateQuantity({ id, quantity: quantity + 1 }));

      return;
    }
    if (action === "minus" && quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));

      return;
    }
    console.log("nothing");
    return;
  };
  const handlePickupSave = () => {
    setPickupDialogOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Cart Items Section */}
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-extrabold mb-8">Your cart</h1>

        {/* Cart Item */}
        {cart?.items.length
          ? cart.items.map((item: ICartItem) => {
              return (
                <div className="flex items-start gap-6 border-b pb-8 mb-2">
                  <img
                    src="placeholder.webp"
                    alt={item.name}
                    className="rounded-sm w-36 h-24 object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600 mt-2 flex gap-1 font-semibold">
                      <span>{item.price.toFixed(2)}</span>
                      <span>x</span>
                      <span>{item.quantity}</span>
                    </p>
                  </div>
                  <p className="font-bold">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product,
                          item.quantity,
                          "minus",
                          item.availableQuantity
                        )
                      }
                      className="border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-lg font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product,
                          item.quantity,
                          "add",
                          item.availableQuantity
                        )
                      }
                      className="border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => dispatch(removeFromCart(item.product))}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              );
            })
          : "no item"}

        <button className="mt-6 bg-transparent border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-100 w-full font-medium">
          Add more items
        </button>
      </div>

      {/* Order Summary Section */}
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-semibold mb-4 flex items-center justify-between">
          How to get it
          <button
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            onClick={() => setPickupDialogOpen(true)}
          >
            <Edit size={16} />
          </button>
        </h2>

        <div className="bg-gray-50 p-6 rounded-md mb-6">
          <p className="text-sm font-medium mb-1">Pickup</p>
          <p className="text-sm text-gray-600">{pickupAddress}</p>
        </div>

        <div className="border-b pb-4 mb-4 relative">
          <label className="text-sm text-gray-600 block mb-2">
            Please schedule a time for your pick-up
          </label>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Add a coupon or gift card"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="border w-full py-3 px-4 rounded-md pr-[120px]"
            />
            {isFocused && (
              <button
                onClick={handleCouponButtonClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-medium"
              >
                {couponCode ? "Apply Coupon" : "Cancel Coupon"}
              </button>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">Subtotal</p>
            <p className="text-sm">${cart.totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">Items</p>
            <p className="text-sm">{cart.totalQuantity}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">Estimated taxes</p>
            <p className="text-sm">$0.00</p>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <p>Estimated order total</p>
            <p>${cart.totalPrice.toFixed(2)}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Additional taxes and fees will be calculated at checkout.
          </p>
        </div>

        <button className="mt-4 bg-green-600 text-white py-3 px-6 w-full rounded hover:bg-green-700 font-semibold">
          Continue to payment
        </button>
      </div>

      {/* Pickup Address Dialog */}
      {isPickupDialogOpen && (
        <div className="fixed inset-0 bg-blue-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Pickup Address</h2>
            <textarea
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className="w-full border rounded-md p-3 mb-4 resize-none h-32"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setPickupDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePickupSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
