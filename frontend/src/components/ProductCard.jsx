import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      cart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    navigate("/cart");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-3">

      <img
        src={
          product.image
            ? `http://127.0.0.1:8000${product.image}`
            : "https://via.placeholder.com/300"
        }
        className="h-40 w-full object-cover rounded"
      />

      <h2 className="mt-2 font-semibold">{product.name}</h2>
      <p className="text-blue-600 font-bold">₹{product.price}</p>

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;