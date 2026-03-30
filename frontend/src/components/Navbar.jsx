import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

function Navbar({ setSearch }) {
  const { cart, wishlist } = useStore();

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow sticky top-0 z-50">

      <Link to="/" className="text-xl font-bold">
        SaiStore
      </Link>

      <input
        type="text"
        placeholder="Search..."
        className="border px-3 py-1 rounded w-40 sm:w-60"
        onChange={(e) => setSearch && setSearch(e.target.value)}
      />

      <div className="flex gap-6 text-xl">

        {/* WISHLIST */}
        < Link to="/wishlist" className="relative">
          ❤️
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded">
            {wishlist.length}
          </span>
        </Link>

        {/* CART */}
        <Link to="/cart" className="relative">
          🛒
          <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs px-1 rounded">
            {cart.length}
          </span>
        </Link>

      </div>
    </div>
  );
}

export default Navbar;