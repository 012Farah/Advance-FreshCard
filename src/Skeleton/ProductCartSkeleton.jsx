import React from "react";

export default function ProductCartSkeleton() {
  return (
    <div className="card relative bg-white p-4 rounded-lg shadow-md transition-shadow duration-200 animate-pulse">
      {/* Image placeholder */}
      <div>
        <div className="h-60 w-full bg-gray-200 rounded-md"></div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="mb-2">
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
        </div>

        {/* Rating placeholder */}
        <div className="Rating flex gap-2 items-center mt-3">
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
          <div className="h-4 w-6 bg-gray-200 rounded"></div>
          <div className="h-4 w-10 bg-gray-200 rounded"></div>
        </div>

        {/* Price and button */}
        <div className="mt-4 flex justify-between items-center">
          <div className="price flex gap-2 items-center">
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
          </div>

          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Actions placeholder */}
      <div className="actions absolute top-3 right-3 flex flex-col gap-2">
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>

      {/* Discount badge placeholder */}
      <div className="badge absolute top-3 left-3 bg-gray-200 h-6 w-10 rounded-md"></div>
    </div>
  );
}
