import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { getUserOrders } from "../../services/order-service";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth.context";
import Loading from "../Loading/Loading";
import { useState } from "react";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { cartContext } from "../../Context/Cart.Context";

export default function OrdersPage() {
  const { userInfo } = useContext(AuthContext);
  const { cartInfo, setCartInfo } = useContext(cartContext);

  const [orders, setOrders] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchOrders() {
    if (!userInfo?.id) return;

    try {
      setIsLoading(true);
      const response = await getUserOrders({ userId: userInfo.id });
      if (response.data?.status === "success") {
        setOrders(response.data.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [userInfo]);

  if (isloading) {
    return <Loading />;
  }
  console.log("userInfo:", userInfo);
  console.log("orders:", orders);

  return (
    <>
      <div className="">
        <main>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">My Orders</h1>
            <div className="flex gap-3">
              <select className="border rounded-lg px-3 py-2 text-sm">
                <option>All Orders</option>
              </select>
              <input
                type="text"
                placeholder="Search orders..."
                className="border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* حالة عدم وجود طلبات */}
          {/* {(!orders || orders.length === 0) && (
          <div className="text-center py-12">
            <FontAwesomeIcon
              icon={faBox}
              className="text-6xl text-gray-300 mb-4"
            />
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              No orders found
            </h3>
            <p className="text-gray-400">
              You haven't placed any orders yet.
            </p>
            <button className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700">
              Start Shopping
            </button>
          </div>
        )} */}

          {/* حالة وجود طلبات */}

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-red-500 rounded-xl shadow-sm p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Order #{order._id}</p>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm text-green-600 bg-green-100">
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm items-center">
                  <div>
                    <p className="text-gray-500">Items</p>
                    <p className="font-medium">
                      {order.cartItems?.length || 0} items
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Amount</p>
                    <p className="font-medium">${order.totalOrderPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Delivered to</p>
                    <p className="font-medium">
                      {order.shippingAddress?.details || "Home Address"}
                    </p>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button className="text-green-600 text-sm font-medium flex items-center gap-2 cursor-pointer">
                      <FontAwesomeIcon icon={faRotateRight} />
                      Reorder
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer">
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
