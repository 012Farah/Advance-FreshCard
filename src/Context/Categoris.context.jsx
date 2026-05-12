import { createContext } from "react";
import { useEffect, useState } from "react";
import { getCategories  } from "../services/Category-service";

export const CategoriesContext = createContext(null);

export default function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  async function fetchCategories() {
    try {
      setIsLoading(true);   
      const response = await getCategories ();                                          
      if (response?.data?.data) {
        setIsLoading(false);
        setCategories(response.data?.data?.data || []);
      } 
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    setError(error);
    }
}   

    useEffect(() => {
    fetchCategories();
  }, []);   
  return (
    <CategoriesContext.Provider value={{categories, isLoading, isError, error}}>
      {children}
    </CategoriesContext.Provider>
  );
}
