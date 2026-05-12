import apiClient from "./api-Client";

export function getWishlist() {
  return apiClient.get("/wishlist");
}

export function addToWishlist(productId) {
  return apiClient.post("/wishlist", {
    productId,
  });
}

export function removeFromWishlist(productId) {
  return apiClient.delete(`/wishlist/${productId}`);
}
