import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faStar,
  faPlus,
  faCodeCompare,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { calcDiscount } from "../../utils/discount-utils";
import Rating from "../Rating/Rating";
import { Link } from "react-router";
import { useContext } from "react";
import { cartContext } from "../../Context/Cart.Context.jsx";
import { WishlistContext } from "../../Context/Wishlist.Context.jsx";


export function ProductCart({ productInfo }) {
  const {
    id,
    imageCover,
    priceAfterDiscount,
    price,
    ratingQuantity,
    ratingsAverage,
    title,
    category,
  } = productInfo;

  const { handleAddingProductToCart } = useContext(cartContext);
  const { handleAddToWishlist, handleRemoveFromWishlist, isInWishlist } = useContext(WishlistContext);
  const isFavorited = isInWishlist(id);

  return (
    <div className="card relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div>
        <Link to={`/product/${id}`} className="block">
          <img src={imageCover} alt={title} className="h-60 mx-auto" />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div>
          <span className="text-sm text-gray-500">{category?.name}</span>
          <Link to={`/product/${id}`}>
            <h2 className="font-semibold">{title}</h2>
          </Link>
        </div>

        {/* Rating */}
        <div className="Rating flex gap-2 items-center mt-2">
          <Rating rating={ratingsAverage} />
          <span>{ratingsAverage}</span>
          <span className="text-gray-500">{ratingQuantity}</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex justify-between items-center">
          <div className="price flex gap-2 items-center">
            <span className="text-lg font-bold text-primary-600">
              {priceAfterDiscount ?? price} EGP
            </span>
            {/* if there is a discount or not */}
            {priceAfterDiscount && (
              <del className="text-gray-500">{price} EGP</del>
            )}
          </div>

          <button className="bg-primary-600 text-white px-3 py-2 rounded-full hover:bg-primary-700 transition"
          onClick ={()=>
          { handleAddingProductToCart ({id})
          }}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="actions absolute top-3 right-3 flex flex-col gap-2">
        <button
          onClick={() => (isFavorited ? handleRemoveFromWishlist(id) : handleAddToWishlist(id, productInfo))}
          className={`bg-white p-2 rounded-full shadow hover:bg-gray-200 transition ${isFavorited ? "text-red-500" : "text-gray-700"}`}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FontAwesomeIcon icon={isFavorited ? faHeartSolid : faHeart} />
        </button>
        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-200 transition">
          <FontAwesomeIcon icon={faCodeCompare} />
        </button>
        <button className="bg-white p-2 rounded-full shadow hover:bg-gray-200 transition">
          <Link to={`/product/${id}`}>
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </button>
      </div>

      {/* Discount Badge */}
      {/* show only if there is a discount */}
      {priceAfterDiscount && (
        <span className="badge absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
          -{calcDiscount({ price, priceAfterDiscount })} %
        </span>
      )}
    </div>
  );
}

export default ProductCart;
