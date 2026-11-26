import { useCallback, useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(() => getAllProducts()
    .then((response) => setProducts(response.data || []))
    .catch((err) => setError(
      err.response?.data?.message || "Failed to fetch products"
    ))
    .finally(() => setLoading(false)), []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
  };
};

export default useProducts;