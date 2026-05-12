    import { createContext } from "react";
    import { useEffect, useState } from "react";
    import { getAllProducts } from "../services/Product-services";

    export const ProductsContext = createContext(null);

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const response = await getAllProducts();
      if (response?.data?.data) {
        setIsLoading(false);
        setProducts(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
      console.error("Error fetching featured product:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ isLoading, products, isError, error }}>
      {children}
    </ProductsContext.Provider>
  );
}
