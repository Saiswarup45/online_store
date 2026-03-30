import { useStore } from "../context/StoreContext";
import { useState } from "react";

function Cart() {
  const { cart } = useStore();

  const [quantities, setQuantities] = useState({});

  const handleIncrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const qty = quantities[item.id] || 1;
      return total + item.price * qty;
    }, 0);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-2xl font-bold mb-6">🛒 Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Your cart is empty</h3>
            <p className="text-gray-500">Add some products to continue</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {/* LEFT: ITEMS */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => {
                const qty = quantities[item.id] || 1;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white p-4 rounded-xl shadow"
                  >
                    <img
                      src={`${item.image}`}
                      className="w-24 h-24 object-cover rounded"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>

                      {/* QUANTITY */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => handleDecrease(item.id)}
                          className="px-3 py-1 bg-gray-200 rounded"
                        >
                          -
                        </button>

                        <span>{qty}</span>

                        <button
                          onClick={() => handleIncrease(item.id)}
                          className="px-3 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="font-bold">
                      ₹{item.price * qty}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="bg-white p-5 rounded-xl shadow h-fit">
              <h3 className="text-lg font-semibold mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between mb-2">
                <span>Total Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total Price</span>
                <span>₹{getTotal()}</span>
              </div>

              <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                Checkout
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;