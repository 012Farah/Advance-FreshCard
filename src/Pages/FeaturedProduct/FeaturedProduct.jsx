import React from 'react'
import { getAllProducts } from '../../services/Product-services';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import ProductCart from '../ProductCart/ProductCart';
import { useContext } from 'react';
import { ProductsContext } from '../../Context/Products.Context';

export default function FeaturedProduct() {
  // const [featuredProduct , setFeaturedProduct] =useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [ isError, setIsError] = useState(false);

  // async function fetchFeaturedProduct() {
  //   try {
  //     setIsLoading(true);
  //      const response = await getAllProducts();
  //      if (response?.data?.data) {
  //       setIsLoading(false);
  //       setFeaturedProduct(response.data.data);
  //      }
      
  //   } catch (error) {
  //     setIsLoading(false);
  //     setIsError(true);
  //     console.error("Error fetching featured product:", error);
  //   }

  
  // }
  // useEffect(() => { // 48ali el fn de fe mra7el el mounting phase bs
  //   fetchFeaturedProduct();
  // }
  // , []);

  //------------------------------productscontext------------------------------- 

  const { isLoading, products, isError, error } = useContext(ProductsContext);
  const featuredProduct = products?.filter(product => product.isFeatured);


  if (isLoading) {
    return <Loading />;
  } 
  
 


  return (
  <>
  <section>
    <div className="container">
      <h2 className='text-3xl font-bold'>Featured Product</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => <ProductCart key={product.id} productInfo={product} />)}
      </div>
    </div>
  </section>

  </>
  )
}

