import React from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../services/Product-services";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ProductCart from "../ProductCart/ProductCart";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function RelatedProducts({ productDetails }) {
  const { category } = productDetails;
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function fetchRelatedProducts() {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await getAllProducts({ category: category._id });

      if (response?.data?.data) {
        setRelatedProducts(response.data.data);
      }
    } catch (error) {
      setIsError(true);
      console.error("Error fetching related products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (category?._id) {
      fetchRelatedProducts();
    }
  }, [category?._id]); // Add category._id as dependency

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <div className="flex space-x-4 mb-4 justify-end">
          <button className="related-prev-btn  h-10 w-10  rounded-full bg-gray-100  text-gray-400 hover:bg-primary-600 shadow-md">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <button className="related-next-btn h-10 w-10 rounded-full bg-gray-100   text-gray-400 hover:bg-primary-600 shadow-md">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      {isError && (
        <p className="text-red-500 mb-4">Failed to load related products.</p>
      )}

      <Swiper
        loop={true}
        navigation={{
          nextEl: ".related-next-btn",
          prevEl: ".related-prev-btn",
        }}
        modules={[Navigation]}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1, //small
          },
          480: {
            slidesPerView: 2, //mobile
          },
          768: {
            slidesPerView: 3, // tablets
          },
          1024: {
            slidesPerView: 4, // desktop
          },
          1280: {
            slidesPerView: 5, // large desktop
          },
        }}
        className="mySwiper"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="h-full">
              <ProductCart productInfo={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
