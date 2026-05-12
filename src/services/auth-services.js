//taking copy form axios instance file
import apiClient from "./api-Client";
import { API_CONFIG } from "../config";

// Register API
export async function SendDataToSignup(values) {
  try {
    const options = {
      method: "POST",
      url: "/auth/signup",
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        rePassword: values.rePassword,
      },
    };

    const response = await apiClient.request(options);
    console.log("Signup API Response:", response);
    return response; // will return { success: true, data, message } from interceptor
  } catch (error) {
    console.error("Error during signup:", error);
    throw error; // { success: false, message, error }
  }
}

// Login API
export async function SendDataToLogin(values) {
  try {
    const options = {
      method: "POST",
      url: "/auth/signin", // الصحيح حسب مسار API
      data: {
        email: values.email,
        password: values.password,
      },
    };

    const response = await apiClient.request(options);
    console.log("Login API Response:", response);
    return response; // يرجع بنفس شكل الـ interceptor
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function verifyToken(token) {
  try {
    const options = {
      method: "GET",
      url: "/auth/verifyToken",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    };

    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    console.error("Error during token verification:", error);
    throw error;
  }
}
