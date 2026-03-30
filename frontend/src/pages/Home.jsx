import { useState } from "react";
import Hero from "../components/Hero";
import CategoryTabs from "../components/CategoryTabs";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

function Home({ search }) {
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("");

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO */}
      <Hero />

      
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <CategoryTabs setCategory={setCategory} />
      </div>

      
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* FILTER SIDEBAR */}
        <div className="md:col-span-1 bg-white p-4 rounded-xl shadow h-fit">
          <Filters setPrice={setPrice} />
        </div>

        {/* PRODUCTS */}
        <div className="md:col-span-3">
          <ProductList
            search={search}
            category={category}
            price={price}
          />
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Home;