import { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // ✅ ADD / REMOVE
  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <ShopContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </ShopContext.Provider>
  );
};