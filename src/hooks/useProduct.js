import { useEffect, useState } from "react";
import { getProductById } from "../api/productApi";

const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);

        setProduct(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Failed to fetch product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
  };
};

export default useProduct;