import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import useCart from "../../hooks/useCart";

function Cart() {
  const {
    cart,
    loading,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    cartTotal,
  } = useCart();

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const handleRemove = async (productId) => {
    try {
      await removeItem(productId);

      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Remove Error:", error);

      toast.error("Failed to remove item");
    }
  };

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const handleIncrease = async (item) => {
    try {
      if (item.quantity >= item.productId.stock) {
        toast.info("Maximum available stock reached");
        return;
      }

      await increaseQuantity(item);
    } catch (error) {
      console.error("Increase Quantity Error:", error);

      toast.error("Failed to update quantity");
    }
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const handleDecrease = async (item) => {
    try {
      if (item.quantity <= 1) {
        return;
      }

      await decreaseQuantity(item);
    } catch (error) {
      console.error("Decrease Quantity Error:", error);

      toast.error("Failed to update quantity");
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 size={40} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50">
          <ShoppingBag size={44} className="text-indigo-600" />
        </div>

        <h1 className="text-4xl font-bold text-slate-900">
          Your Cart is Empty
        </h1>

        <p className="mt-4 max-w-md text-lg text-slate-600">
          Looks like you haven't added anything to your cart yet.
        </p>

        <Link
          to="/merchandise"
          className="mt-8 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // ==========================================
  // CART PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50 py-14">
      <div className="mx-auto max-w-7xl px-6">
        {/* ====================================== */}
        {/* HEADER */}
        {/* ====================================== */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Shopping Cart</h1>

          <p className="mt-2 text-lg text-slate-600">
            Review your items before checkout.
          </p>
        </div>

        {/* ====================================== */}
        {/* MAIN GRID */}
        {/* ====================================== */}

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* ==================================== */}
          {/* CART ITEMS */}
          {/* ==================================== */}

          <div className="space-y-5">
            {cart.map((item) => {
              const product = item.productId;

              if (!product) {
                return null;
              }

              const itemTotal = product.price * item.quantity;

              return (
                <div
                  key={product._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-6 sm:flex-row">
                    {/* PRODUCT IMAGE */}

                    <div className="h-36 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-36">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>

                    {/* PRODUCT DETAILS */}

                    <div className="flex flex-1 flex-col">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row">
                        <div>
                          <p className="text-sm font-medium text-indigo-600">
                            {product.category}
                          </p>

                          <h2 className="mt-2 text-xl font-bold text-slate-900">
                            {product.name}
                          </h2>

                          <p className="mt-2 text-slate-600">
                            ₹{product.price}
                          </p>
                        </div>

                        {/* ITEM TOTAL */}

                        <p className="text-xl font-bold text-indigo-600">
                          ₹{itemTotal}
                        </p>
                      </div>

                      {/* BOTTOM ACTIONS */}

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        {/* QUANTITY */}

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleDecrease(item)}
                            disabled={item.quantity <= 1}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus size={18} />
                          </button>

                          <span className="min-w-[20px] text-center font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleIncrease(item)}
                            disabled={item.quantity >= product.stock}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus size={18} />
                          </button>
                        </div>

                        {/* REMOVE */}

                        <button
                          onClick={() => handleRemove(product._id)}
                          className="flex items-center gap-2 font-medium text-red-500 transition hover:text-red-700"
                        >
                          <Trash2 size={18} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ==================================== */}
          {/* ORDER SUMMARY */}
          {/* ==================================== */}

          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Order Summary</h2>

            {/* SUBTOTAL */}

            <div className="mt-8 flex items-center justify-between">
              <span className="text-slate-600">Subtotal</span>

              <span className="font-semibold text-slate-900">₹{cartTotal}</span>
            </div>

            {/* DELIVERY */}

            <div className="mt-5 flex items-center justify-between">
              <span className="text-slate-600">Delivery</span>

              <span className="font-semibold text-slate-900">Free</span>
            </div>

            <div className="my-6 border-t border-slate-200" />

            {/* TOTAL */}

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-slate-900">Total</span>

              <span className="text-2xl font-bold text-slate-900">
                ₹{cartTotal}
              </span>
            </div>

            {/* CHECKOUT */}

            <Link
              to="/checkout"
              className="mt-8 block w-full rounded-xl bg-indigo-600 px-6 py-4 text-center text-lg font-semibold text-white transition hover:bg-indigo-700"
            >
              Proceed to Checkout
            </Link>

            {/* CONTINUE SHOPPING */}

            <Link
              to="/merchandise"
              className="mt-5 block text-center font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
