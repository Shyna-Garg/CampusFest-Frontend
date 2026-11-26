import { createContext, useCallback, useEffect, useState } from "react";

import {
  getCart,
  addToCart as addToCartApi,
  updateCartQuantity as updateCartQuantityApi,
  removeFromCart as removeFromCartApi,
} from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH CART
  // ==========================================

  const loadCart = useCallback(() => getCart()
    .then((response) => {
      console.log("GET CART RESPONSE:", response);
      setCart(response?.data?.products || []);
    })
    .catch((error) => {
      console.error("Fetch Cart Error:", error);
      setCart([]);
    })
    .finally(() => setLoading(false)), []);

  const fetchCart = () => {
    setLoading(true);
    return loadCart();
  };

  // ==========================================
  // INITIAL CART LOAD
  // ==========================================

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await addToCartApi({
        productId,
        quantity,
      });

      console.log("ADD TO CART RESPONSE:", response);

      await fetchCart();

      return response;
    } catch (error) {
      console.error("Add To Cart Error:", error);
      throw error;
    }
  };

  // ==========================================
  // UPDATE QUANTITY
  // ==========================================

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) {
        return;
      }

      const response = await updateCartQuantityApi(
        productId,
        quantity
      );

      console.log("UPDATE CART RESPONSE:", response);

      await fetchCart();

      return response;
    } catch (error) {
      console.error("Update Quantity Error:", error);
      throw error;
    }
  };

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = async (item) => {
    try {
      if (!item || !item.productId) {
        throw new Error("Invalid cart item");
      }

      const productId = item.productId._id;

      const newQuantity = item.quantity + 1;

      console.log("Increasing quantity:", {
        productId,
        oldQuantity: item.quantity,
        newQuantity,
      });

      return await updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error("Increase Quantity Error:", error);
      throw error;
    }
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = async (item) => {
    try {
      if (!item || !item.productId) {
        throw new Error("Invalid cart item");
      }

      if (item.quantity <= 1) {
        return;
      }

      const productId = item.productId._id;

      const newQuantity = item.quantity - 1;

      console.log("Decreasing quantity:", {
        productId,
        oldQuantity: item.quantity,
        newQuantity,
      });

      return await updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error("Decrease Quantity Error:", error);
      throw error;
    }
  };

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const removeItem = async (productId) => {
    try {
      const response = await removeFromCartApi(productId);

      console.log("REMOVE CART RESPONSE:", response);

      await fetchCart();

      return response;
    } catch (error) {
      console.error("Remove Item Error:", error);
      throw error;
    }
  };

  // ==========================================
  // CART TOTAL
  // ==========================================

  const cartTotal = cart.reduce((total, item) => {
    const price = Number(item?.productId?.price) || 0;
    const quantity = Number(item?.quantity) || 0;

    return total + price * quantity;
  }, 0);

  // ==========================================
  // CART COUNT
  // ==========================================

  const cartCount = cart.reduce((total, item) => {
    return total + (Number(item?.quantity) || 0);
  }, 0);

  // ==========================================
  // CONTEXT
  // ==========================================

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,

        fetchCart,

        addToCart,

        updateQuantity,
        increaseQuantity,
        decreaseQuantity,

        removeItem,

        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;