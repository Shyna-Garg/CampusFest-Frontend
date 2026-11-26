import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  CalendarDays,
  Loader2,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  getMyOrders,
  cancelOrder as cancelOrderApi,
} from "../../api/orderApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  // ==========================================
  // FETCH ORDERS
  // ==========================================

  const fetchOrders = useCallback(() => getMyOrders()
    .then((response) => {
      console.log("MY ORDERS RESPONSE:", response);
      setOrders(response?.data || []);
    })
    .catch((error) => {
      console.error("Get Orders Error:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch orders");
      setOrders([]);
    })
    .finally(() => setLoading(false)), []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ==========================================
  // CANCEL ORDER
  // ==========================================

  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingId(orderId);

      const response = await cancelOrderApi(orderId);

      console.log("CANCEL ORDER RESPONSE:", response);

      toast.success("Order cancelled successfully");

      setLoading(true);
      await fetchOrders();
    } catch (error) {
      console.error("Cancel Order Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to cancel order"
      );
    } finally {
      setCancellingId(null);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
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
  // EMPTY ORDERS
  // ==========================================

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <Package size={38} />
          </div>

          <h1 className="mt-7 text-4xl font-bold text-slate-900">
            No Orders Yet
          </h1>

          <p className="mt-4 max-w-md text-lg text-slate-600">
            You haven't placed any orders yet. Explore our
            merchandise and place your first order.
          </p>

          <Link
            to="/merchandise"
            className="mt-8 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700"
          >
            Shop Merchandise
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // ORDERS PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">

        {/* HEADER */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            My Orders
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            Track and manage your CampusFest orders.
          </p>
        </div>

        {/* ORDERS */}

        <div className="space-y-6">
          {orders.map((order) => {
            const orderDate = new Date(
              order.createdAt
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <div
                key={order._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                {/* TOP SECTION */}

                <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-5 md:flex-row md:items-center">

                  <div>
                    <div className="flex items-center gap-3">
                      <Package
                        size={22}
                        className="text-indigo-600"
                      />

                      <h2 className="text-xl font-bold text-slate-900">
                        Order #{order._id.slice(-8)}
                      </h2>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays size={16} />

                      <span>
                        {orderDate}
                      </span>
                    </div>
                  </div>

                  {/* STATUS */}

                  <span
                    className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                      order.orderStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.orderStatus === "Confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : order.orderStatus === "Shipped"
                        ? "bg-purple-100 text-purple-700"
                        : order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                {/* PRODUCTS */}

                <div className="mt-6 space-y-4">
                  {order.products.map((item) => {
                    const product = item.productId;

                    return (
                      <div
                        key={item._id}
                        className="flex items-center gap-4"
                      >
                        {/* IMAGE */}

                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                          {product?.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>

                        {/* DETAILS */}

                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">
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

                        <p className="font-semibold text-slate-900">
                          ₹
                          {Number(item.price) *
                            Number(item.quantity)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* BOTTOM */}

                <div className="mt-6 flex flex-col gap-5 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">

                  <div className="space-y-2">
                    <p className="text-sm text-slate-500">
                      Payment:{" "}
                      <span className="font-medium text-slate-900">
                        {order.paymentMethod}
                      </span>
                    </p>

                    <p className="text-sm text-slate-500">
                      Payment Status:{" "}
                      <span className="font-medium text-slate-900">
                        {order.paymentStatus}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">

  <div>
    <span className="text-sm text-slate-500">
      Total
    </span>

    <p className="text-2xl font-bold text-indigo-600">
      ₹{order.totalAmount}
    </p>
  </div>

  <div className="flex flex-wrap gap-3">

    {/* VIEW DETAILS */}

    <Link
      to={`/orders/${order._id}`}
      className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
    >
      View Details
    </Link>

    {/* CANCEL */}

    {order.orderStatus === "Pending" && (
      <button
        onClick={() =>
          handleCancelOrder(order._id)
        }
        disabled={cancellingId === order._id}
        className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {cancellingId === order._id ? (
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
  </div>
</div>
                </div>

                {/* SHIPPING ADDRESS */}

                <div className="mt-5 rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-700">
                    Shipping Address
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {order.shippingAddress}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* SHOP MORE */}

        <div className="mt-10 text-center">
          <Link
            to="/merchandise"
            className="font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Orders;