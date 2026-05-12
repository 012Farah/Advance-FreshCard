import React from "react";
import { faHeadset, faRotateLeft, faShieldHalved, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomeFeatures() {
  
  return (
    <section id="features" className="py-10 bg-white">
      <div className="container ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Feature 1 */}
          <div className="flex items-center p-4 border border-gray-100 rounded-lg">
            <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faTruck} className="text-xl" />
            </div>
            <div>
              <h3 className="font-medium">Free Delivery</h3>
              <p className="text-sm text-gray-500">Orders $50 or more</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center p-4 border border-gray-100 rounded-lg">
            <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faRotateLeft} className="text-xl" />
            </div>
            <div>
              <h3 className="font-medium">30 Days Return</h3>
              <p className="text-sm text-gray-500">Satisfaction guaranteed</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center p-4 border border-gray-100 rounded-lg">
            <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faShieldHalved} className="text-xl" />
            </div>
            <div>
              <h3 className="font-medium">Secure Payment</h3>
              <p className="text-sm text-gray-500">Protected transactions</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center p-4 border border-gray-100 rounded-lg">
            <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faHeadset} className="text-xl" />
            </div>
            <div>
              <h3 className="font-medium">24/7 Support</h3>
              <p className="text-sm text-gray-500">We’re here to help you</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
