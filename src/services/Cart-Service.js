import apiClient from "./api-Client";

// Add product to cart
export async function addProductToCart({ id }) {
  try {
    const options = {
      method: "POST",
      url: "/cart",
      data: {
        productId: id, 
      },
    };

    const response = await apiClient.request(options);
    return response; 
  } catch (error) {
    throw error; 
  }
}

//Get Cart Products 
export async function getCartItems() {
  try{
    const options ={
       url :"/cart",
      method :"GET"
    }

    const response = await apiClient.request(options);
    return response;
  }catch(error){
    throw error
  }
  
}


//Remove item From Cart 
export async function removeItemFromCart({id}) {
  const options ={
    url: `/cart/${id}`,
    method :"DELETE"
  }
  const response = await apiClient.request(options)
  return response 
}


//Update Countity of item

export async function updateProductQuantity({ id, count }) {
  try {
    const options = {
      url: `/cart/${id}`,
      method: "PUT",
      data: {
        count,
      },
    };

    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
