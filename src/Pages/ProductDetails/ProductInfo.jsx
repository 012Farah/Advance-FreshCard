import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft, faTruck } from "@fortawesome/free-solid-svg-icons";
import Rating from "../Rating/Rating";
import { calcDiscount } from "../../utils/discount-utils";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useContext } from "react";
import { cartContext } from "../../Context/Cart.Context.jsx";


function ProductInfo({ productDetails }) {
  const {
    id,
    imageCover,
    images,
    priceAfterDiscount,
    price,
    description,
    quantity,
    ratingsQuantity,
    ratingsAverage,
    title,
    category,
  } = productDetails;
  //   console.log("PRODUCTDETAILS");
  //   console.log(productDetails);
    const {handleAddingProductToCart} = useContext(cartContext);
  


  return (
    <>
      <section className="container ">
        <div className=" mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-1">
          {/* Left: Main Image + Thumbnails */}
          {/* <div>
            <img
              src={imageCover}
              alt="Main"
              className="w-full h-[420px] object-cover rounded-xl shadow"
            />

            <div className="flex gap-4 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-full h-20 rounded-lg overflow-hidden  hover:border-primary cursor-pointer"
                >
                  <img
                    src={images[i - 1]}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-4">
              {images.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  className="w-full h-20 rounded-lg shadow overflow-hidden  hover:border-primary cursor-pointer"
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div> */}

          <div id="product-images" className="lg:w-96 w-1/3 mx-auto">
            <ReactImageGallery
              showNav={false}
              showPlayButton={false}
              showFullscreenButton={false}
              items={images.map((image) => {
                return {
                  original: image,
                  thumbnail: image,
                };
              })}
            />
          </div>

          {/* Right: Product Info */}
          <div className="space-y-4">
            <div className=" flex justify-between  ">
              <span
                className={`${
                  quantity > 0
                    ? "text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-md"
                    : "text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-md"
                } font-semibold bg-green-100 px-3 py-1 rounded-md`}
              >
                {quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>

              <div>
                <FontAwesomeIcon icon={faShareNodes} />
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>

            <h1 className="text-3xl font-bold">{title}</h1>

            {/* Rating Placeholder */}
            <div className="Rating flex gap-2 items-center mt-2">
              <Rating rating={ratingsAverage} />
              <span>{ratingsAverage}</span>
              <span className="text-balck">({ratingsQuantity} reviews) </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold">
                $ {priceAfterDiscount || price}
              </p>

              {productDetails.priceAfterDiscount ? (
                <>
                  {/* if there is a discount appers */}

                  <p className="line-through text-gray-400">$ {price}</p>

                  {/* if there is % of discount appers  */}

                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                    save -{calcDiscount({ price, priceAfterDiscount })} %
                  </span>
                </>
              ) : (
                ""
              )}
            </div>

            <p className="text-gray-600 leading-6">{description}</p>

            {/* Weight Selection */}
            <div className="flex space-y-2 gap-8">
              <p className="font-semibold px-4 py-2 ">Weight:</p>
              <div className="flex gap-3">
                {["250g", "500g", "1kg"].map((w, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded-full border hover:border-primary ${
                      i === 0 ? "border-green-500 bg-green-50" : ""
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex   gap-6  ">
              <p className="font-semibold px-4 py-2">Quantity:</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 border rounded-full px-4 py-2">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <p className="text-sm text-gray-500">
                  Only {quantity} items left in stock
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 shadow"
               onClick ={()=>
                { handleAddingProductToCart ({id})
                }}>
                Add to Cart
              </button>
              <button className="flex-1 border py-3 rounded-lg hover:border-primary">
                Buy Now
              </button>
            </div>

            {/* Icons Row */}
            <div className="flex flex-col sm:flex-row gap-6 mt-6">
              <div className="flex items-center p-4 border border-gray-100 rounded-lg">
                <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faTruck} className="text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Free Delivery</h3>
                  <p className="text-sm text-gray-500">Orders $50 or more</p>
                </div>
              </div>

              <div className="flex items-center p-4 border border-gray-100 rounded-lg">
                <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faRotateLeft} className="text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">30 Days Return</h3>
                  <p className="text-sm text-gray-500">
                    Satisfaction guaranteed
                  </p>
                </div>
              </div>
            </div>

            

            
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductInfo;
