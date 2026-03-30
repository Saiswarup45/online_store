import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Wishlist from "./components/Wishlist";

function App() {
  return (
    <BrowserRouter>

      {/* GLOBAL NAVBAR */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;