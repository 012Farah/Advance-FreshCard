import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCart from "../ProductCart/ProductCart";
import { getAllProducts } from "../../services/Product-services";
import { calcTimeLeft } from "../../utils/Counterdown";
import { useContext } from "react";
import { ProductsContext } from "../../Context/Products.Context";
import HomeDealsSkeleton from "../../Skeleton/HomeDealsSkeleton";



export default function HomeDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  
  // async function fetchProducts() {
  //   try {
  //     const response = await getAllProducts();

  //     console.log("API RESPONSE:", response);

  //     if (response?.data?.data) {
  //       setProducts(response.data.data);
  //     }

  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchProducts();
  // }, []);
   
  //------------------------------productscontext------------------------------- 
  const { isLoading, products } = useContext(ProductsContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);
    return () => clearInterval(timer);  //  cleanup function to clear the interval on unmount when you close the component
  }, []);

  if (isLoading) return <HomeDealsSkeleton />;

  const deals = products
    .filter((product) => product.priceAfterDiscount)
    .slice(0, 5);

  return (
    <>
      <section>
        <div className="container">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-3">Deals of the Day</h2>
              <div className="flex items-center gap-4 mt-2">
                <p>Offers ends in:</p>
                <div className="counter flex items-center gap-2">
                  <div className="size-7 text-center bg-gray-900 text-white rounded-md  ">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </div>
                  <span>:</span>
                  <div className="size-7 text-center bg-gray-900 text-white rounded-md ">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </div>
                  <span>:</span>
                  <div className="size-7 text-center bg-gray-900 text-white rounded-md ">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/deals"
              className="text-primary-600 hover:text-primary-700 transition duration-200"
            >
              View All Deals
            </Link>
          </div>

          {/* Cards Section */}
          <div className="py-6 grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {deals.map((product) => (
              <ProductCart key={product.id} productInfo={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


