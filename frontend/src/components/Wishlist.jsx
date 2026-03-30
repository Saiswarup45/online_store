import { useStore } from "../context/StoreContext";
import { ShopContext } from "../context/ShopContext";

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-2xl font-bold mb-6">❤️ Wishlist</h2>

        {wishlist.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl shadow">
            <h3 className="text-lg font-semibold">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500">
              Save items you like here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-4"
              >
                <img
                  src={
                    item.image
                      ? item.image.startsWith("http")
                        ? item.image
                        : `${(import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api").replace(/\/+$/, "").replace(/\/api$/, "")}${item.image}`
                      : "https://via.placeholder.com/300"
                  }
                  className="h-40 w-full object-contain rounded"
                />

                <h3 className="mt-2 font-semibold">
                  {item.name}
                </h3>

                <p className="text-blue-600 font-bold">
                  ₹{item.price}
                </p>

                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-black text-white py-2 rounded"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(item)}
                    className="px-3 bg-red-500 text-white rounded"
                  >
                    ✕
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Wishlist;