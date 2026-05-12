import { createContext, useEffect, useState } from "react";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlist-service";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchWishlist() {
    try {
      setIsLoading(true);
      const response = await getWishlist();
      // Log the raw response to inspect its shape (helps debug when response isn't an array)
      console.log("Wishlist response:", response?.data);

      // Normalize the response so `wishlist` is always an array
      let items = response?.data;
      if (!Array.isArray(items)) {
        if (items && Array.isArray(items.data)) items = items.data;
        else if (items && Array.isArray(items.wishlist)) items = items.wishlist;
        else if (items && Array.isArray(items.products)) items = items.products;
        else items = [];
      }

      setWishlist(items);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddToWishlist(productId, product = null) {
    try {
      setWishlist((prev) => {
        if (prev.some((item) => item.id === productId)) return prev;
        const newItem = product ? product : { id: productId };
        return [...prev, newItem];
      });
      await addToWishlist(productId);
      // ازالة fetchWishlist() هنا
    } catch (error) {
      setWishlist((prev) => prev.filter((item) => item.id !== productId));
    }
  }

  async function handleRemoveFromWishlist(productId) {
    try {
      setWishlist((prev) => prev.filter((item) => item.id !== productId));
      await removeFromWishlist(productId);
      // لا داعي لعمل fetch بعد الحذف
    } catch (error) {
      // optional: ارجع العنصر لو حصل خطأ
      fetchWishlist();
    }
  }

  function isInWishlist(productId) {
    return wishlist.some((item) => item.id === productId);
  }

  // تحميل wishlist من localStorage أو السيرفر
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    } else {
      fetchWishlist();
    }
  }, []);

  // تخزين wishlist في localStorage بعد أي تغيير
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        handleAddToWishlist,
        handleRemoveFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
