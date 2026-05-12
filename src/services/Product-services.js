import { apiClient } from "./api-Client";

export async function getAllProducts({
  id,
  page,     // h3ml distract 
  keyWord,
  priceGreaterThan,
  priceLessThan,
  sortesBy,
  category,
  brand,

} = {}) {  //send the distracting data
  try {
    const options = {
      url: `/products?${page ? `page=${page}` : ""}${keyWord ? `&keyWord=${keyWord}` : ""
        }${priceGreaterThan ? `&price[gte]=${priceGreaterThan}` : ""
        }${priceLessThan ? `&price[lte]=${priceLessThan}` : ""
        }${sortesBy ? `&sort=${sortesBy}` : ""
        }${category ? `&category=${category}` : ""
        }${brand ? `&brand=${brand}` : ""
        }${id ? `&id=${id}` : ""
        }`,



      method: "GET",
    };


    const response = await apiClient.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

} //getAllProducts({ page: 2 })  //get products of page 2


export async function getProductById ({id}){
  try{
    const options ={
      url:`/products/${id}`,
      method:"GET",
    }
    const response = await apiClient.request (options);
    console.log (response.data);
    return response.data;
  } catch (error){
    console.error ("Error fetching product by ID:", error);
    throw error;
  }
}

