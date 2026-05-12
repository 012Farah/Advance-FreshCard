import { createContext, useState, useEffect } from "react";
import { verifyToken } from "../services/auth-services";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      if (!token) return;

      try {
        const response = await verifyToken(token);
        console.log(response);

        if (response.success) {
          setIsAuthenticated(true);
          const decoded = response?.data?.data?.decoded; // path مضبوط
          setUserInfo(decoded);
          localStorage.setItem("userInfo", JSON.stringify(decoded));
        }
      } catch (error) {
        Logout();
      }
    }

    checkAuth();
  }, [token]);  //token 3a4an y4t8l awl ma aft7 

  function Logout() {
    setToken(null);
    setIsAuthenticated(false);
    setUserInfo(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{ token, setToken, isAuthenticated, userInfo, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
