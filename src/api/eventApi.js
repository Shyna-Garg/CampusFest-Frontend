import axios from "./axios";

export const getAllEvents = async () => {
  const response = await axios.get("/events");
  return response.data.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`/events/${id}`);
  return response.data.data;
};