import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BrandContext = createContext();

export function BrandProvider({ children }) {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getBrands() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <BrandContext.Provider value={{ brands, isLoading, error }}>
      {children}
    </BrandContext.Provider>
  );
}
