import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  CalendarDays,
  MapPin,
  CreditCard,
  Loader2,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  getOrderById,
  cancelOrder as cancelOrderApi,
} from "../../api/orderApi";

function OrderDetails() {
  const { id } = useParams();
  return <OrderDetailsView key={id} id={id} />;
}

function OrderDetailsView({ id }) {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  // ==========================================
  // FETCH ORDER
  // ==========================================

  const fetchOrder = useCallback(() => getOrderById(id)
    .then((response) => {
      console.log("ORDER DETAILS RESPONSE:", response);
      setOrder(response?.data || null);
    })
    .catch((error) => {
      console.error("Get Order Details Error:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch order details");
      setOrder(null);
    })
    .finally(() => setLoading(false)), [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // ==========================================
  // CANCEL ORDER
  // ==========================================

  const handleCancelOrder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancelling(true);

      await cancelOrderApi(order._id);

      toast.success("Order cancelled successfully");

      setLoading(true);
      await fetchOrder();
    } catch (error) {
      console.error("Cancel Order Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to cancel order"
      );
    } finally {
      setCancelling(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <Loader2
          size={40}
          className="animate-spin text-indigo-600"
        />
      </div>
    );
  }

  // ==========================================
  // ORDER NOT FOUND
  // ==========================================

  if (!order) {
    return (
      <div className="min-h-[70vh] bg-slate-50">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Package size={38} />
          </div>

          <h1 className="mt-7 text-4xl font-bold text-slate-900">
            Order Not Found
          </h1>

          <p className="mt-4 max-w-md text-lg text-slate-600">
            We couldn't find the order you're looking for.
          </p>

          <Link
            to="/orders"
            className="mt-8 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // ORDER DATE
  // ==========================================

  const orderDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // ==========================================
  // STATUS STYLE
  // ==========================================

  const statusClass =
    order.orderStatus === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : order.orderStatus === "Confirmed"
      ? "bg-blue-100 text-blue-700"
      : order.orderStatus === "Shipped"
      ? "bg-purple-100 text-purple-700"
      : order.orderStatus === "Delivered"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  // ==========================================
  // TOTAL ITEMS
  // ==========================================

  const totalItems = order.products.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">

        {/* ====================================== */}
        {/* BACK BUTTON */}
        {/* ====================================== */}

        <button
          onClick={() => navigate("/orders")}
          className="mb-8 flex items-center gap-2 font-semibold text-indigo-600 transition hover:text-indigo-700"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>

        {/* ====================================== */}
        {/* HEADER */}
        {/* ====================================== */}

        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Package
                size={28}
                className="text-indigo-600"
              />

              <h1 className="text-3xl font-bold text-slate-900">
                Order #{order._id.slice(-8)}
              </h1>
            </div>

            <div className="mt-3 flex items-center gap-2 text-slate-500">
              <CalendarDays size={18} />

              <span>
                Placed on {orderDate}
              </span>
            </div>
          </div>

          {/* STATUS */}

          <span
            className={`w-fit rounded-full px-5 py-2 text-sm font-semibold ${statusClass}`}
          >
            {order.orderStatus}
          </span>
        </div>

        {/* ====================================== */}
        {/* MAIN GRID */}
        {/* ====================================== */}

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* ==================================== */}
          {/* LEFT SECTION */}
          {/* ==================================== */}

          <div className="space-y-6">

            {/* ================================== */}
            {/* ORDER ITEMS */}
            {/* ================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-2xl font-bold text-slate-900">
                Order Items
              </h2>

              <div className="mt-6 space-y-5">

                {order.products.map((item) => {
                  const product = item.productId;

                  const itemTotal =
                    Number(item.price) *
                    Number(item.quantity);

                  return (
                    <div
                      key={item._id}
                      className="flex flex-col gap-4 border-b border-slate-200 pb-5 last:border-b-0 last:pb-0 sm:flex-row sm:items-center"
                    >

                      {/* IMAGE */}

                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        {product?.image ? (
                          <img
                            src={product.image}
                            alt={
                              product?.name ||
                              "Product"
                            }
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package
                              size={30}
                              className="text-slate-400"
                            />
                          </div>
                        )}
                      </div>

                      {/* PRODUCT DETAILS */}

                      <div className="flex-1">

                        <h3 className="text-lg font-semibold text-slate-900">
                          {product?.name ||
                            "Product unavailable"}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          ₹{item.price} each
                        </p>

                      </div>

                      {/* ITEM TOTAL */}

                      <p className="text-lg font-bold text-slate-900">
                        ₹{itemTotal}
                      </p>

                    </div>
                  );
                })}

              </div>
            </div>

            {/* ================================== */}
            {/* SHIPPING ADDRESS */}
            {/* ================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <MapPin
                  size={22}
                  className="text-indigo-600"
                />

                <h2 className="text-xl font-bold text-slate-900">
                  Shipping Address
                </h2>

              </div>

              <p className="mt-4 rounded-xl bg-slate-50 p-4 text-slate-600">
                {order.shippingAddress}
              </p>

            </div>
          </div>

          {/* ==================================== */}
          {/* RIGHT SECTION */}
          {/* ==================================== */}

          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-bold text-slate-900">
              Order Summary
            </h2>

            {/* PAYMENT */}

            <div className="mt-6 rounded-xl bg-slate-50 p-4">

              <div className="flex items-center gap-2">

                <CreditCard
                  size={18}
                  className="text-indigo-600"
                />

                <span className="font-semibold text-slate-700">
                  Payment
                </span>

              </div>

              <div className="mt-3 space-y-2 text-sm">

                <p className="flex justify-between">
                  <span className="text-slate-500">
                    Method
                  </span>

                  <span className="font-medium text-slate-900">
                    {order.paymentMethod}
                  </span>
                </p>

                <p className="flex justify-between">
                  <span className="text-slate-500">
                    Status
                  </span>

                  <span className="font-medium text-slate-900">
                    {order.paymentStatus}
                  </span>
                </p>

              </div>
            </div>

            {/* ORDER ITEMS COUNT */}

            <div className="mt-6 flex items-center justify-between text-slate-600">
              <span>
                Items
              </span>

              <span className="font-medium text-slate-900">
                {totalItems}
              </span>
            </div>

            {/* TOTAL */}

            <div className="mt-5 border-t border-slate-200 pt-5">

              <div className="flex items-center justify-between">

                <span className="text-lg font-bold text-slate-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-indigo-600">
                  ₹{order.totalAmount}
                </span>

              </div>

            </div>

            {/* CANCEL ORDER */}

            {order.orderStatus === "Pending" && (
              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelling ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <XCircle size={18} />
                    Cancel Order
                  </>
                )}
              </button>
            )}

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

export default OrderDetails;