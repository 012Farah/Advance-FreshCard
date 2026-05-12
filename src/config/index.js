// Fix the API_CONFIG - remove the line break and extra spaces
export const API_CONFIG = {
  BASEURL: `${import.meta.env.VITE_BASE_URL}/api/${import.meta.env.VITE_API_VERSION}`,
  
};
console.log("BASEURL:", API_CONFIG.BASEURL);


