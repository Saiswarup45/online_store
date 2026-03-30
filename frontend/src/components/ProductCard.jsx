import { useStore } from "../context/StoreContext";

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const API_BASE = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api").replace(/\/+$/, "");

  const isWishlisted = wishlist.find((item) => item.id === product.id);

  // Debug: Log image URL
  if (product.image) {
    console.log(`Product "${product.name}" image:`, product.image);
  }

  const imageSrc = product.image
    ? product.image.startsWith("http")
      ? product.image  // Use Cloudinary or full URLs directly
      : product.image.startsWith("/")
      ? `${API_BASE.replace(/\/api$/, "")}${product.image}`  // Prepend domain if relative path
      : `https://res.cloudinary.com/${product.image}`  // Fallback for Cloudinary public URLs
    : "https://via.placeholder.com/300";

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

      {/* IMAGE SECTION */}
      <div className="relative">

        {/* Wishlist Button */}
         <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 z-20 bg-white rounded-full p-2 shadow"
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>

        {/* IMAGE FIX */}
        <img
          src={imageSrc}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">
          {product.name}
        </h3>

        <p className="text-blue-600 font-bold mt-1">
          ₹{product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;