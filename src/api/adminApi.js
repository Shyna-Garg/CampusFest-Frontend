import api from "./axios";

export const getAllOrders = async () => {
  const response = await api.get("/orders/admin/all");

  return response.data;
};

export const updateOrderStatus = async (orderId, orderStatus) => {
  const response = await api.put(
    `/orders/${orderId}/status`,
    {
      orderStatus,
    }
  );

  return response.data;
};