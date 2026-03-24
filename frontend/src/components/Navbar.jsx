import { useNavigate } from "react-router-dom";

function Navbar({ setSearch }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">

      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        MyStore
      </h1>

      <input
        className="border px-3 py-1"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div
        onClick={() => navigate("/cart")}
        className="cursor-pointer font-semibold"
      >
        🛒 Cart
      </div>

    </div>
  );
}

export default Navbar;