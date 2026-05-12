import { apiClient } from "./api-Client";

// Create Order API 3a4an ab3tha f mkan el accounr ll orders bta3ty
export async function getUserOrders({ userId }) {
    try {
        const options = {
            method: "GET",
           url: `/orders/user/${userId}`,

        }
        const response = await apiClient.request(options);
        console.log("Get User Orders API Response:", response);
        return response; // will return { success: true, data, message } from interceptor
    } catch (error) {
        console.error("Error during getting user orders:", error);
        throw error; // { success: false, message, error }
    }

}
