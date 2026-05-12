import React from "react";
import { Link } from "react-router-dom";
import ProductCartSkeleton from "./ProductCartSkeleton";
import { useContext } from "react";
import { ProductsContext } from "../Context/Products.Context";

export default function HomeDealsSkeleton() {
  const { isLoading } = useContext(ProductsContext);

  // Render a static timer placeholder and skeleton cards while loading
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
                  <div className="size-7 text-center bg-gray-900 text-white rounded-md animate-pulse" />
                  <span>:</span>
                  <div className="size-7 text-center bg-gray-900 text-white rounded-md animate-pulse" />
                  <span>:</span>
                  <div className="size-7 text-center bg-gray-900 text-white rounded-md animate-pulse" />
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

          {/* Skeleton Cards Section */}
          <div className="py-6 grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCartSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


