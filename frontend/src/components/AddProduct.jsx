import axios from "axios";
import { useState } from "react";

const API_BASE = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api").replace(/\/+$/, "");

function AddProduct() {
  const [data, setData] = useState({ name: "", price: "", description: "" });

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE}/add-product/`, data, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Product Added");
      setData({ name: "", price: "", description: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="p-6">
      <h2>Add Product</h2>

      <input
        placeholder="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input
        placeholder="Price"
        value={data.price}
        onChange={(e) => setData({ ...data, price: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default AddProduct;