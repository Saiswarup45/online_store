import axios from "axios";
import { useState } from "react";

function AddProduct() {
  const [data, setData] = useState({});

  const handleSubmit = () => {
    axios.post("http://127.0.0.1:8000/api/add-product/", data)
      .then(() => alert("Product Added"));
  };

  return (
    <div className="p-6">
      <h2>Add Product</h2>

      <input placeholder="Name"
        onChange={(e)=>setData({...data, name:e.target.value})} />

      <input placeholder="Price"
        onChange={(e)=>setData({...data, price:e.target.value})} />

      <textarea placeholder="Description"
        onChange={(e)=>setData({...data, description:e.target.value})} />

      <button onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default AddProduct;