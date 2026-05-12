import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Pages/Home/Home";
import Brands from "./Pages/Brands/Brands";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";
import CheckOut from "./Pages/CheckOut/CheckOut";
import Favorites from "./Pages/Favorites/Favorites";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Orders from "./Pages/Orders/Orders";
import SearchProducts from "./Pages/SearchProducts/SearchProducts";
import SignUp from "./Pages/SignUp/SignUp";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import WishList from "./Pages/WishList/WishList";
import { ToastContainer } from "react-toastify";
import ProductsProvider from "./Context/Products.Context";
import CategoriesProvider from "./Context/Categoris.context";
import AuthProvider from "./Context/Auth.context";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import CartProvider from "./Context/Cart.Context";
import AccountLayout from "./Components/AccountLayout/AccountLayout";
import OfflineScreen from "./Pages/OfflineScreen/OfflineScreen";
import RecentlyAdded from "./Pages/RecentlyAdded/RecentlyAdded";
import FeaturedProduct from "./Pages/FeaturedProduct/FeaturedProduct";
import HomeDeals from "./Pages/Home/HomeDeals";
import {BrandProvider} from "./Context/Brands.context";
import WishlistProvider from "./Context/Wishlist.Context";






function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        { index: true, element: <Home /> },
        { path: "brands", element: <Brands /> },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
           {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        
        { path: "categories", element: <Categories /> },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },

        { path: "forget-password", element: <ForgetPassword /> },
        { path: "login", element: <Login /> },

        { path: "product/:id", element: <ProductDetails /> },
        { path: "search", element: <SearchProducts /> },
        { path: "signup", element: <SignUp /> },
        { path: "verify-email", element: <VerifyEmail /> },
        { path: "*", element: <NotFound /> },
        {path:"RecentlyAdded",element:<RecentlyAdded></RecentlyAdded>},
        {path:"FeaturedProduct",element:<FeaturedProduct></FeaturedProduct>},
        {path:"HomeDeals",element:<HomeDeals></HomeDeals>},
        {
          path: "account",
          element: (
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <Orders /> }, // default page when /account
            { path: "orders", element: <Orders /> },
            { path: "wishlist", element: <WishList /> },
            { path: "addresses", element: <div>Addresses Page</div> },
            { path: "payment", element: <CheckOut/> },
            { path: "logout", element: <div>Logout Page</div> },
            
          ],
        },
      ],
    },
  ]);

  return (
    <>
     <WishlistProvider>
    <BrandProvider>
      <OfflineScreen>
      <CartProvider>
        <AuthProvider>
          <CategoriesProvider>
            <ProductsProvider>
              <ToastContainer />
              <RouterProvider router={router} />
            </ProductsProvider>
          </CategoriesProvider>
        </AuthProvider>
      </CartProvider>
      </OfflineScreen>
      </BrandProvider>
      </WishlistProvider>
    </>
  );
}

export default App;
