import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import ProductCard from "./ProductCard";

function ProductList({ search, category, price }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4; 

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  
  const filtered = products.filter((p) => {
    return (
      (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
      (category === "All" ||
        p.category?.toLowerCase() === category.toLowerCase()) &&
      (!price || Number(p.price) <= Number(price))
    );
  });

  
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filtered.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>

      
      {currentProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      
      <div className="flex justify-center mt-8 gap-2 flex-wrap">

        
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 rounded ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* NEXT */}
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default ProductList;