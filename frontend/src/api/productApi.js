import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const getProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products/`);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};