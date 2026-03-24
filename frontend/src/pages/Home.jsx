import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategoryTabs from "../components/CategoryTabs";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("");

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setSearch={setSearch} />
      <Hero />
      <CategoryTabs setCategory={setCategory} />
      <Filters setPrice={setPrice} />
      <ProductList search={search} category={category} price={price} />
      <Footer />
    </div>
  );
}

export default Home;