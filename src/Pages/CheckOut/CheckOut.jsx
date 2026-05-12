import React from "react";
import {
  faMoneyBill1Wave,
  faCircleInfo,
  faCreditCard,
  faArrowRightLong,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcPaypal,
  faCcApplePay,
} from "@fortawesome/free-brands-svg-icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Context/Cart.Context";
import Loading from "../Loading/Loading";
import { createOrder } from "../../services/payment-services";
import { toast } from "react-hot-toast";

export default function CheckOut() {
  const { cartInfo, isLoading ,setCartInfo } = useContext(cartContext);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    paymentMethod: yup.string().required("Payment method is required"),
    shippingAddress: yup.object().shape({
      details: yup.string().required("Address details are required"),
      phone: yup.string().required("Phone number is required"),
      city: yup.string().required("City is required"),
    }),
  });

  // async function handleCreatingOrder(values) {

  //   try {
  //     const response = await createOrder({
  //       cartId,
  //       paymentMethod: values.paymentMethod,
  //       shippingAddress: values.shippingAddress,
  //     });
  //     if (response?.success){
  //       if (response?.data?.session){
  //         toast.loading('hello'),
  //         setTimeout(() => {
  //           location.href = response?.data?.session?.url;

  //         }, 3000);
  //       }
  //       // toast.success("your Order created successfully");

  //       // setTimeout(() => {
  //       //   navigate("/orders");

  //       // }, 3000);

  //       console.log(response);

  //   }

  //  } catch (error) {
  //   console.log(error);

  //   }
  // }

  async function handleCreatingOrder(values) {
    try {
      // تأكد إنك مررت cartId صح
      if (!cartInfo?.cartId) {
        toast.error("Cart ID is missing");
        return;
      }

      const response = await createOrder({
        cartId: cartInfo.cartId,
        paymentMethod: values.paymentMethod,
        shippingAddress: values.shippingAddress,
      });

      if (
        values.paymentMethod === "online" &&
        response?.data?.data?.session?.url
      ) {
        toast.loading("Redirecting to Stripe...");
        window.location.href = response.data.data.session.url;
      } else if (values.paymentMethod === "cod") {
        // الدفع كاش → نجاح الطلب وتوجيه للصفحة
        toast.success("Order created successfully (Cash on Delivery)");
        setTimeout(() => {
          navigate("/account/orders");
        }, 1000);
      } else {
        // أي حالة غير متوقعة
        toast.error("Unexpected payment method or missing session URL");
        console.log(response);
      }

      setCartInfo();; // Clear cart info after order creation
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again!");
    }
  }

  const formik = useFormik({
    initialValues: {
      paymentMethod: "online", //awl ma ygt7 ykon wa2f 3leha 3a4an da recommended
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema: validationSchema,

    onSubmit: handleCreatingOrder,
  });

  if (isLoading) return <Loading />;

  const { cartId, numOfCartItems, data } = cartInfo;
  const { totalCartPrice, products } = data;

  function handlePaymentMethodChange(e) {
    formik.setFieldValue("paymentMethod", e.target.value);
  }

  return (
    <>
      <section >
        <div className="container  max-w-6xl py-6">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="text-2xl font-semibold mb-6">CheckOUt</h1>
            <div className="grid lg:grid-cols-12 gap-8">
              {/* left side  */}
              <div className="payment-method lg:col-span-8 space-y-6">
                {/* payment method */}
                <div className="payment-options bg-white shadow-sm p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                  <div>
                    <label
                      htmlFor="cod"
                      className={` ${
                        formik.values.paymentMethod === "cod" &&
                        " bg-primary-50 border-primary-500"
                      } flex gap-4 items-center border border-gray-200 hover:border-primary-500 transition p-4 rounded-lg mt-4`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={`cod`}
                        onChange={(e) => handlePaymentMethodChange(e)}
                        id="cod"
                        checked={formik.values.paymentMethod === "cod"}
                      />

                      <div className="w-full">
                        <div className=" flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <FontAwesomeIcon
                              icon={faMoneyBill1Wave}
                              className="text-2xl text-primary-600 mt-1"
                            />
                            <div>
                              <h3 className="text-xl font-semibold">
                                Cash on Delivery
                              </h3>
                              <p className="text-gray-500">
                                Pay when your order arrives
                              </p>
                            </div>
                          </div>

                          <span className="text-primary-600">
                            No extra charges
                          </span>
                        </div>

                        {formik.values.paymentMethod === "cod" && (
                          <div className="mt-4 flex items-center gap-2 bg-green-100 border border-green-300 text-green-700 ml-9 px-4 py-3 rounded-lg">
                            <FontAwesomeIcon icon={faCircleInfo} />
                            <p>
                              Please keep exact change ready for hassle-free
                              delivery
                            </p>
                          </div>
                        )}
                      </div>
                    </label>

                    <label
                      htmlFor="online"
                      className={` ${
                        formik.values.paymentMethod === "online" &&
                        " bg-primary-50 border-primary-500"
                      } flex gap-4 items-center border border-gray-200 hover:border-primary-500 transition p-4 rounded-lg mt-4`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={`online`}
                        onChange={(e) => handlePaymentMethodChange(e)}
                        id="online"
                        checked={formik.values.paymentMethod === "online"}
                      />
                      <div className="w-full">
                        {/* Header row */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <FontAwesomeIcon
                              icon={faCreditCard}
                              className="text-2xl text-green-600 mt-1"
                            />

                            <div>
                              <h3 className="text-xl font-semibold">
                                Online Payment
                              </h3>
                              <p className="text-gray-500">
                                Pay securely with card or digital wallet
                              </p>
                            </div>
                          </div>

                          <span className="  text-green-600">Recommended</span>
                        </div>

                        {/* Info box */}
                        {formik.values.paymentMethod === "online" && (
                          <div className="mt-4 flex items-center gap-2    bg-blue-50 border border-blue-20 text-blue-700 ml-9 px-4 py-3 rounded-lg">
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              className="mt-0.5"
                            />
                            <p>
                              You will be redirected to secure payment gateway
                              to complete your transaction
                            </p>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white shadow-sm p-6 rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Address details */}
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">
                        Address Details
                      </label>
                      <textarea
                        id="addressDetails"
                        placeholder="Enter your Full Adress Details"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        name="shippingAddress.details"
                        value={formik.values.shippingAddress.details}
                        onChange={formik.handleChange}
                        rows="3"
                      ></textarea>
                    </div>

                    {/* phone number */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        name="shippingAddress.phone"
                        value={formik.values.shippingAddress.phone}
                        onChange={formik.handleChange}
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        name="shippingAddress.city"
                        value={formik.values.shippingAddress.city}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className=" w-full lg:col-span-4 mx-auto bg-white rounded-xl shadow-md p-5 space-y-5">
                {/* Title */}
                <h2 className="text-lg font-semibold">Order Summary</h2>

                {/* Item */}
                <div className="cart-items p-3 max-h-48 overflow-auto space-y-2 border-b border-gray-500/20 pb-3">
                  {products?.map((product) => (
                    <Link
                      to={`/product/${product.product.id}`}
                      key={product._id}
                      className="text-sm item flex gap-2 items-center"
                    >
                      <img
                        src={product.product.imageCover}
                        className="size-12 object-cover rounded-lg"
                        alt=""
                      />

                      <div>
                        <h3 className="text-black">{product.product.title}</h3>
                        <span className="text-xs text-gray-500">
                          Qty: {product.count}
                        </span>
                      </div>

                      <span className="ms-auto">{product.price} EGP</span>
                    </Link>
                  ))}
                </div>

                {/* Prices */}
                <ul className="space-y-2 text-sm border-b  border-gray-300 pb-6">
                  <li className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{totalCartPrice} EGP</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Discount</span>
                    <span className="text-green-600">- $2.46</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Delivery</span>
                    <span>70EGP</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span>{Math.trunc(totalCartPrice * 0.14)} EGP</span>
                  </li>
                </ul>

                {/* Total */}
                <div className="flex justify-between font-semibold text-base ">
                  <span>Total</span>
                  <span>
                    {Math.trunc(
                      totalCartPrice +
                        (products.length > 0 ? 70 : 0) +
                        totalCartPrice * 0.14 -
                        3.25
                    )}{" "}
                    EGP
                  </span>
                </div>

                {/* Buttons */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  Proceed to Payment
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </button>

                <Link
                  to="/Cart"
                  className="w-full border border-gray-300 py-3 rounded-lg text-sm flex items-center justify-center gap-2 text-gray-700"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  Return to Cart
                </Link>

                {/* Secure Checkout */}
                <div className="pt-4  space-y-2">
                  <div className="p-4  bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">
                      Secure Checkout
                    </h3>

                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="text-green-600"
                      />
                      Your payment information is secure
                    </p>

                    <div className="flex items-center mt-4 space-x-3">
                      <FontAwesomeIcon
                        icon={faCcVisa}
                        className="text-2xl text-blue-700"
                      />

                      <FontAwesomeIcon
                        icon={faCcMastercard}
                        className="text-2xl text-red-500"
                      />

                      <FontAwesomeIcon
                        icon={faCcAmex}
                        className="text-2xl text-blue-500"
                      />

                      <FontAwesomeIcon
                        icon={faCcPaypal}
                        className="text-2xl text-blue-800"
                      />

                      <FontAwesomeIcon
                        icon={faCcApplePay}
                        className="text-2xl text-gray-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
