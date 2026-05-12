//taking copy form axios instance file
import axios from "axios";
import { API_CONFIG } from "../config";


export const apiClient = axios.create({
  baseURL: API_CONFIG.BASEURL,
  timeout: 30000, // 10 seconds timeout
 
});

apiClient.interceptors.request.use((config) => {
 const token = localStorage.getItem("token") || sessionStorage.getItem("token");

 if (token){
  config.headers.token = token
 }
 return config;
});







apiClient.interceptors.response.use((response) => {   // use take two function //first function // return this
  return Promise.resolve({
    success: true,
    data :response,
  })
},(error) => {
  return Promise.reject({                             // second function // or return this 
    success: false, 
    error: error,
    message :error.response.data.message || "Something went wrong",
  })

})
  //bed ma ygelk bel response fa htrod 3leh bl then or catch

export default apiClient;

