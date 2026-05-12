import {
  faHeadset,
  faRotateLeft,
  faShieldHalved,
  faShoppingCart,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { cartContext } from "../../Context/Cart.Context";
import Loading from "../Loading/Loading";
import CartItem from "./CartItem";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export default function Cart() {
  const { cartInfo, isLoading } = useContext(cartContext);
  const navigate = useNavigate();

  // نتأكد إن الداتا جاهزة قبل أي استخدام
  if (isLoading || !cartInfo || !cartInfo.data) {
    return <Loading />;
  }

  // destructuring بعد التأكد إن الداتا موجودة
  const { numOfCartItems, data } = cartInfo;
  const { products = [], totalCartPrice = 0 } = data;

  return (
    <main className="py-8 container bg-gray-50">
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-300">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            {products.length > 0 && (
              <p className="text-gray-600 mt-1">
                {numOfCartItems} items in your cart
              </p>
            )}
          </div>

          <div>
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem key={product.product?._id} productInfo={product} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
                  Your Cart is Empty
                  <FontAwesomeIcon icon={faShoppingCart} />
                </p>
                <p>
                  You can continue Shopping from{" "}
                  <Link to="/">
                    <span className=" text-primary-600">here</span>
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-24">
          <h3 className="text-xl font-medium text-black  mb-6">
            Order Summary
          </h3>

          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal ({numOfCartItems} items)</span>
              <span className="font-medium">${totalCartPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">
                ${products.length > 0 ?  70 : 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Discount (FRESH20)</span>
              <span className="text-green-600">-$3.25</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>
                ${products.length > 0 ? Math.trunc(totalCartPrice * 0.14) : 0}
              </span>
            </div>

            <hr className="border-gray-300" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                $
                {Math.trunc(
                  totalCartPrice +
                    (products.length > 0 ? 70 : 0) +
                    totalCartPrice * 0.14 -
                    3.25
                )}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-3 border py-3 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Continue Shopping
          </button>

          <div className="flex items-center p-4 border border-gray-100 rounded-lg mt-4">
            <div className="text-primary-600 flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faTruck} className="text-xl" />
            </div>
            <div>
              <h3 className="font-medium">Free Delivery</h3>
              <p className="text-sm text-gray-500">
                Your order qualifies for free delivery. Estimated: 2-3 business
                days.
              </p>
            </div>
          </div>

          <div className="flex items-center p-4 border bg-primary-100/70 border-primary-300 rounded-lg mt-4">
            <div className="text-primary-600 flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faShieldHalved} className="text-xl" />
            </div>
            <div>
              <h3 className="font-medium">Secure Payment</h3>
              <p className="text-sm text-gray-500">
                Your payment information is protected with 256-bit SSL
                encryption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
