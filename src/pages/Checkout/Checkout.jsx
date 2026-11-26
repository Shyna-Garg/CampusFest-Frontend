import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  Banknote,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

import useCart from "../../hooks/useCart";
import { placeOrder } from "../../api/orderApi";

function Checkout() {
  const navigate = useNavigate();

  const { cart, cartTotal, loading: cartLoading, fetchCart } = useCart();

  const [shippingAddress, setShippingAddress] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!shippingAddress.trim()) {
      toast.error("Please enter your shipping address");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      navigate("/merchandise");
      return;
    }

    try {
      setPlacingOrder(true);

      const response = await placeOrder({
        shippingAddress: shippingAddress.trim(),
        paymentMethod: "COD",
      });

      console.log("PLACE ORDER RESPONSE:", response);

      toast.success("Order placed successfully!");

      await fetchCart();

      navigate("/orders");
    } catch (error) {
      console.error("Place Order Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (cartLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2
          size={40}
          className="animate-spin text-indigo-600"
        />
      </div>
    );
  }

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <MapPin size={38} />
          </div>

          <h1 className="mt-7 text-4xl font-bold text-slate-900">
            Your Cart is Empty
          </h1>

          <p className="mt-4 max-w-md text-lg text-slate-600">
            Add some merchandise to your cart before proceeding
            to checkout.
          </p>

          <button
            onClick={() => navigate("/merchandise")}
            className="mt-8 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700"
          >
            Shop Merchandise
          </button>

        </div>
      </div>
    );
  }

  // ==========================================
  // CHECKOUT PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-6xl px-6 py-12">

        {/* HEADER */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Checkout
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            Complete your order details below.
          </p>
        </div>

        {/* MAIN GRID */}

        <form
          onSubmit={handlePlaceOrder}
          className="grid gap-8 lg:grid-cols-[1fr_400px]"
        >

          {/* ==================================== */}
          {/* LEFT SECTION */}
          {/* ==================================== */}

          <div className="space-y-8">

            {/* SHIPPING ADDRESS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <MapPin size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Shipping Address
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Where should we deliver your order?
                  </p>
                </div>

              </div>

              <div className="mt-7">

                <label
                  htmlFor="shippingAddress"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Address
                </label>

                <textarea
                  id="shippingAddress"
                  value={shippingAddress}
                  onChange={(e) =>
                    setShippingAddress(e.target.value)
                  }
                  placeholder="Enter your complete shipping address"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />

              </div>

            </div>

            {/* PAYMENT METHOD */}

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <CreditCard size={22} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Payment Method
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Cash on delivery is currently available.
                  </p>
                </div>

              </div>

              <div className="mt-7 flex items-center gap-4 rounded-xl border border-indigo-600 bg-indigo-50 p-5">
                <Banknote size={24} className="text-green-600" />
                <div>
                  <p className="font-semibold text-slate-900">Cash on Delivery</p>
                  <p className="text-sm text-slate-500">Pay when your order arrives.</p>
                </div>
              </div>

            </div>

          </div>

          {/* ==================================== */}
          {/* ORDER SUMMARY */}
          {/* ==================================== */}

          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-bold text-slate-900">
              Order Summary
            </h2>

            {/* PRODUCTS */}

            <div className="mt-7 space-y-5">

              {cart.map((item) => {

                const product = item.productId;

                if (!product) {
                  return null;
                }

                return (
                  <div
                    key={product._id}
                    className="flex items-center gap-4"
                  >

                    {/* IMAGE */}

                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">

                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      )}

                    </div>

                    {/* DETAILS */}

                    <div className="min-w-0 flex-1">

                      <p className="truncate font-semibold text-slate-900">
                        {product.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        ₹{product.price} × {item.quantity}
                      </p>

                    </div>

                    {/* ITEM TOTAL */}

                    <p className="font-semibold text-slate-900">
                      ₹{product.price * item.quantity}
                    </p>

                  </div>
                );
              })}

            </div>

            <div className="my-7 border-t border-slate-200" />

            {/* SUBTOTAL */}

            <div className="flex items-center justify-between">
              <span className="text-slate-600">
                Subtotal
              </span>

              <span className="font-semibold text-slate-900">
                ₹{cartTotal}
              </span>
            </div>

            {/* DELIVERY */}

            <div className="mt-5 flex items-center justify-between">
              <span className="text-slate-600">
                Delivery
              </span>

              <span className="font-semibold text-green-600">
                Free
              </span>
            </div>

            <div className="my-6 border-t border-slate-200" />

            {/* TOTAL */}

            <div className="flex items-center justify-between">

              <span className="text-xl font-bold text-slate-900">
                Total
              </span>

              <span className="text-2xl font-bold text-indigo-600">
                ₹{cartTotal}
              </span>

            </div>

            {/* PLACE ORDER */}

            <button
              type="submit"
              disabled={placingOrder}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {placingOrder ? (
                <>
                  <Loader2
                    size={22}
                    className="animate-spin"
                  />

                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}

            </button>

            {/* BACK TO CART */}

            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="mt-5 w-full text-center font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              ← Back to Cart
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Checkout;