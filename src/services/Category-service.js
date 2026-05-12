
import { apiClient } from "./api-Client";

export async function getCategories() {
  try {
    const options = {
      url: "/categories",
      method: "GET", 
    };

    const response = await apiClient.request(options);
    console.log("Categories API Response:", response);
    return response;
    
  } catch (error) {
    console.error("Error during fetching categories:", error);

    throw error;
  }
}
