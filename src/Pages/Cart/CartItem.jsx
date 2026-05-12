import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "../Rating/Rating";
import { useContext, useState } from "react";
import { cartContext } from "../../Context/Cart.Context";

export default function CartItem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { title, imageCover, category, ratingsAverage, ratingsQuantity, id } =
  product;
  const { handleRemoveFromCart , handleUpdateProductQuantity} = useContext(cartContext);
  const [isUpdating , setIsUpdating] =useState(false)

  async function handleUpdate({id , count}){
    setIsUpdating(true)
    await handleUpdateProductQuantity({id , count})
    setIsUpdating(false)
  }

  if (!product) return null;

  return (
    <div className={`p-6 flex flex-col md:flex-row md:items-center md:space-x-4 border-b border-gray-100 gap-4 ${isUpdating && "opacity-70"}`}>
      {/* Image */}
      <img
        className="w-20 h-20 object-cover rounded-lg self-center md:self-auto"
        src={imageCover}
        alt={title}
      />

      {/* Product info */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="font-medium text-black text-lg">{title}</h3>

        <p className="text-sm text-gray-500">{category?.name}</p>

        <div className="Rating flex gap-2 items-center justify-center md:justify-start mt-2">
          <Rating rating={ratingsAverage} />
          <span>{ratingsAverage}</span>
          <span className="text-black">({ratingsQuantity} reviews)</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between md:justify-start gap-4">
        {/* Quantity */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          {/* Decrease */}
          <button
            className="px-3 py-2 text-gray-500 hover:bg-gray-100"
            onClick={() =>
              handleUpdate({ id, count: count - 1 })
            }
            disabled={count <= 1} // منع تصفير العدد
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          {/* Current count */}
          <span className="px-4 py-2 border-x border-gray-300 text-sm font-medium">
            {count}
          </span>

          {/* Increase */}
          <button
            className="px-3 py-2 text-gray-500 hover:bg-gray-100"
            onClick={() =>
              handleUpdate({ id, count: count + 1 })
            }
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {/* Price */}
        <span className="font-bold text-black whitespace-nowrap">
          {price} EGP
        </span>

        {/* Delete */}
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => {
            handleRemoveFromCart({ id });
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
