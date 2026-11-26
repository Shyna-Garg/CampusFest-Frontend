import api from "./axios";

export const addToCart = async (data) => {
  const response = await api.post("/cart", data);
  return response.data;
};

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const updateCartQuantity = async (
  productId,
  quantity
) => {
  const response = await api.put(
    `/cart/${productId}`,
    {
      quantity,
    }
  );

  return response.data;
};

export const removeFromCart = async (
  productId
) => {
  const response = await api.delete(
    `/cart/${productId}`
  );

  return response.data;
};