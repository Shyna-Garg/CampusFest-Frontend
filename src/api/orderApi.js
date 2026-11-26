import api from "./axios";

export const placeOrder = async (data) => {
  const response = await api.post("/orders", data);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/my");
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.put(`/orders/${orderId}/cancel`);
  return response.data;
};