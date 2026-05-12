import { useContext } from "react";
import { WishlistContext } from "../../Context/Wishlist.Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";

export default function Wishlist() {
  const { wishlist, isLoading, handleRemoveFromWishlist } =
    useContext(WishlistContext);

  if (isLoading) return <p>Loading...</p>;

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <FontAwesomeIcon
          icon={faHeartBroken}
          className="text-5xl text-gray-300 mb-4"
        />
        <p className="text-gray-500">Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <>
      <div className="container py-8 p-35 space-y-4">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="flex items-center bg-white border border-gray-500/30 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* صورة المنتج أصغر */}
            {product.imageCover ? (
              <img
                src={product.imageCover}
                alt={product.title ?? "Product"}
                className="w-32 h-32 object-cover"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-gray-400">
                No image
              </div>
            )}

            {/* معلومات المنتج */}
            <div className="flex-1 p-3 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-md text-gray-800">
                  {product.title ?? "Product"}
                </h3>
                <p className="text-primary-600 font-medium mt-1">
                  {product.price ? `${product.price} EGP` : "—"}
                </p>
              </div>

              {/* زر إزالة أصغر */}
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="mt-2 self-start bg-red-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-red-600 transition-colors duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
