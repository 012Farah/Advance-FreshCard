import { createContext, useEffect } from "react";
import { useState } from "react";
import {
  addProductToCart,
  getCartItems,
  removeItemFromCart,
  updateProductQuantity,
} from "../services/Cart-Service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const cartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  //Add products to Cart
  async function handleAddingProductToCart({ id }) {
    try {
      setIsLoading(true);
      const response = await addProductToCart({ id });
      if (response.success) {
        setIsLoading(false);
        toast.success(
          response.data.message || "Product added to cart successfully"
        );
        const updatedCart = await getCartItems(); // fetch latest cart
        setCartInfo(updatedCart.data?.data);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error.message || "Something went wrong");
    }
  }

  //Get Cart Products
  async function handleFetchCartItem() {
    try {
      setIsLoading(true);
      const response = await getCartItems();
      if (response.success) {
        setIsLoading(false);
        setCartInfo(response?.data?.data);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  }

  //Remove item from Cart
  async function handleRemoveFromCart({ id }) {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        iconColor: "#d33",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#333446",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const toastId = toast.loading("We are DELETE the item from your cart");
        const response = await removeItemFromCart({ id });
        if (response.success) {
          toast.dismiss(toastId);
          setCartInfo(response?.data?.data);
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error.message || "Something went wrong");
    }
  }

  //Update countity
  async function handleUpdateProductQuantity({ id, count }) {
    try {
      // حماية: العدد ميقلش عن 1
      if (count < 1) return;
      const toastId = toast.loading("Updating Product Quantity ");
      const response = await updateProductQuantity({ id, count });
      if (response.success) {
        toast.dismiss(toastId);
        setCartInfo(response?.data?.data);
      }
    } catch (error) {
      setIsError(true);
      setError(error.message || "Failed to update quantity");
    }
  }

  useEffect(() => {
    //bsha8lha f mounting phase awl mft7 3a4an t3dl rkm el cart fo2
    handleFetchCartItem();
  }, []);

  return (
    <cartContext.Provider
      value={{
        cartInfo,
        setCartInfo,
        isLoading,
        isError,
        error,
        handleAddingProductToCart,
        refreshCart:handleFetchCartItem,
        handleRemoveFromCart,
        handleUpdateProductQuantity,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
