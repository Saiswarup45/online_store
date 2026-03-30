import axios from "axios";
import { useState } from "react";

const API_BASE = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api").replace(/\/+$/, "");

function AddProduct() {
  const [data, setData] = useState({ name: "", price: "", description: "" });
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      if (imageFile) formData.append("image", imageFile);

      await axios.post(`${API_BASE}/add-product/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product Added");
      setData({ name: "", price: "", description: "" });
      setImageFile(null);
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

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default AddProduct;