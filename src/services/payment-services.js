import { apiClient } from "./api-Client";


export async function createOrder({ paymentMethod, cartId, shippingAddress }) {
  try {
    // التأكد من وجود cartId
    if (!cartId) {
      throw new Error("cartId is missing");
    }

    // تجهيز الخيارات العامة للـ request
    const options = {
      method: "POST",
      data: {
        shippingAddress,
      },
    };

    // ضبط URL حسب طريقة الدفع
    if (paymentMethod === "cod") {
      options.url = `/orders/${cartId}`; // Cash on Delivery
    } else if (paymentMethod === "online") {
      options.url = `/orders/checkout-session/${cartId}?url=${location.origin}`; // Online payment
    } else {
      throw new Error("Invalid payment method");
    }

    // تنفيذ الـ request
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    console.error("createOrder error:", error);
    throw error;
  }
}
// export async function verifyPayment({ orderId, paymentDetails }) {
//   try {
//     const options = {
//       method: "POST",
//       url: `/orders/verify/${orderId}`,
//       data: paymentDetails,
//     };    
//     const response = await apiClient.request(options);
//     return response;
//   } catch (error) {
//     console.error("verifyPayment error:", error);
//     throw error;
//   }
// }