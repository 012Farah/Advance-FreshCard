import React, { useEffect, useState } from 'react'
import ProductInfo from './ProductInfo'
import ProductDetailsTabs from './ProductDetailsTabs'
import RelatedProducts from './RelatedProducts'
import { getProductById } from '../../services/Product-services';
import { useParams } from 'react-router';
import Loading  from '../Loading/Loading';

export default function ProductDetails() {
  const [productDetails, setProductDetails]= useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError ,setIsError] = useState(false);

  const {id} = useParams();  // make id as params

  async function fetchProductDetails(){
    // fetch product details from API
    try{
      setIsLoading (true);
      const response = await getProductById({id}); // make id as params
      if (response?.data?.data){
        setProductDetails (response.data.data);
        setIsLoading (false);
        setIsError (false);
      } else {
        setIsError (true);
        setIsLoading (false);
      }
      console.log(response);
      
    } catch(error){
      console.error("Error fetching product details:", error);
    }
  }

  useEffect (() => {
    fetchProductDetails();
  } , [id])  // adelo el id 3a4an lama ytbdel y3ml fetch tany (intail render)

   if (isLoading) {
    return <Loading />;
  } 

  return (
    <>
    <ProductInfo productDetails ={productDetails}/>
    <ProductDetailsTabs  productDetails ={productDetails}/>
    <RelatedProducts  productDetails ={productDetails}/>
    </>
  )
}


// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRotateLeft, faTruck } from "@fortawesome/free-solid-svg-icons";
// import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
// import Rating from "../Rating/Rating";

// export default function ProductDetails() {

//   const images = [
//     "https://storage.googleapis.com/uxpilot-auth.appspot.com/66f3095795-fba420d1957f831ebcd0.png",
//     "https://storage.googleapis.com/uxpilot-auth.appspot.com/6716429665-92030b96fcf0ef12b01b0.png",
//     "https://storage.googleapis.com/uxpilot-auth.appspot.com/67cfa3f59c-2aad159029c2ffd34e1c.png",
//     "https://storage.googleapis.com/uxpilot-auth.appspot.com/84b79040ff5-2ff55481485e07a63de1.png",
//   ];

//   const [mainImage, setMainImage] = useState(images[0]);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedWeight, setSelectedWeight] = useState("250g");

//   return (
//     <>
//       <section className="container ">
//         <section id="product-detail" className="py-10">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col lg:flex-row gap-8">
//               {/* ------------------- Product Images -------------------- */}
//               <div className="lg:w-1/2">
//                 {/* Main Image */}
//                 <div className="w-full h-[400px] rounded-lg overflow-hidden mb-4">
//                   <img
//                     src={mainImage}
//                     alt="main-image"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 {/* Small Images */}
//                 <div className="grid grid-cols-4 gap-3">
//                   {images.map((img, idx) => (
//                     <div
//                       key={idx}
//                       onClick={() => setMainImage(img)}
//                       className="border rounded-lg overflow-hidden cursor-pointer hover:border-primary-500"
//                     >
//                       <img
//                         src={img}
//                         alt="product"
//                         className="w-full h-24 object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* ------------------- Product Info -------------------- */}
//               <div className="lg:w-1/2 space-y-5">
//                 <div className=" flex justify-between  ">
//                   <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-md">
//                     In Stock
//                   </span>

//                   <div>
//                     <FontAwesomeIcon icon={faShareNodes} />
//                     <FontAwesomeIcon icon={faHeart} />
//                   </div>
//                 </div>

//                 <h2 className="text-2xl font-bold">
//                   Organic Fresh Strawberries
//                 </h2>

//                 {/* Rating */}
//                 <Rating/>

//                 {/* Price */}
//                 <div className="flex items-center gap-4">
//                   <p className="text-3xl font-bold text-green-700">$4.99</p>
//                   <p className="line-through text-gray-400">$6.99</p>
//                   <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
//                     Save 28%
//                   </span>
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-600">
//                   Sweet, juicy, and bursting with flavor, our organic
//                   strawberries are freshly harvested from sustainable farms.
//                   Perfect for snacking, baking, or adding to your smoothies.
//                 </p>

//                 {/* Weight Options */}
//                 <div>
//                   <h3 className="font-medium mb-2">Weight:</h3>
//                   <div className="flex gap-3">
//                     {["250g", "500g", "1kg"].map((w) => (
//                       <button
//                         key={w}
//                         onClick={() => setSelectedWeight(w)}
//                         className={`px-4 py-2 rounded-full border ${
//                           selectedWeight === w
//                             ? "bg-green-600 text-white border-green-600"
//                             : "border-gray-300 text-gray-700"
//                         }`}
//                       >
//                         {w}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Quantity */}
//                 <div className="flex items-center gap-4">
//                   <p className="font-medium">Quantity:</p>

//                   <div className="flex items-center border rounded-full">
//                     <button
//                       onClick={() => quantity > 1 && setQuantity(quantity - 1)}
//                       className="px-3 py-1 text-xl"
//                     >
//                       -
//                     </button>
//                     <span className="px-4">{quantity}</span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="px-3 py-1 text-xl"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <p className="text-sm text-red-500">
//                     Only 12 items left in stock
//                   </p>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex gap-4 mt-4">
//                   <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold">
//                     Add to Cart
//                   </button>
//                   <button className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold">
//                     Buy Now
//                   </button>
//                 </div>

//                 {/* Footer Info */}
//                 <div className="flex flex-col sm:flex-row gap-6 mt-6">
//                   <div className="flex items-center p-4 border border-gray-100 rounded-lg">
//                     <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
//                       <FontAwesomeIcon icon={faTruck} className="text-xl" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">Free Delivery</h3>
//                       <p className="text-sm text-gray-500">
//                         Orders $50 or more
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center p-4 border border-gray-100 rounded-lg">
//                     <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
//                       <FontAwesomeIcon
//                         icon={faRotateLeft}
//                         className="text-xl"
//                       />
//                     </div>
//                     <div>
//                       <h3 className="font-medium">30 Days Return</h3>
//                       <p className="text-sm text-gray-500">
//                         Satisfaction guaranteed
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </section>
//     </>
//   );
// }
