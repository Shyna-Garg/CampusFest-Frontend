import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Loader2,
  IndianRupee,
  Search,
  Filter,
  CalendarDays,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../api/adminApi";

const statusOptions = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchOrders = useCallback(() => getAllOrders()
    .then((response) => {
      console.log("ADMIN ORDERS:", response);
      setOrders(response?.data || []);
    })
    .catch((error) => {
      console.error("Fetch Admin Orders Error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    })
    .finally(() => setLoading(false)), []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // =========================
  // STATS
  // =========================

  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter((order) => order.orderStatus !== "Cancelled")
      .reduce(
        (total, order) =>
          total + Number(order.totalAmount || 0),
        0
      );

    return {
      total: orders.length,

      pending: orders.filter(
        (order) => order.orderStatus === "Pending"
      ).length,

      confirmed: orders.filter(
        (order) => order.orderStatus === "Confirmed"
      ).length,

      shipped: orders.filter(
        (order) => order.orderStatus === "Shipped"
      ).length,

      delivered: orders.filter(
        (order) => order.orderStatus === "Delivered"
      ).length,

      cancelled: orders.filter(
        (order) => order.orderStatus === "Cancelled"
      ).length,

      revenue: totalRevenue,
    };
  }, [orders]);

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredOrders = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "All" ||
        order.orderStatus === statusFilter;

      const matchesSearch =
        !searchValue ||
        order._id?.toLowerCase().includes(searchValue) ||
        order.userId?.username
          ?.toLowerCase()
          .includes(searchValue) ||
        order.userId?.email
          ?.toLowerCase()
          .includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  // =========================
  // STATUS UPDATE
  // =========================

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {
    try {
      setUpdatingOrder(orderId);

      const response = await updateOrderStatus(
        orderId,
        newStatus
      );

      console.log("STATUS UPDATE:", response);

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: newStatus,
              }
            : order
        )
      );

      toast.success("Order status updated");
    } catch (error) {
      console.error(
        "Update Order Status Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  // =========================
  // STATUS COLORS
  // =========================

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2
          size={42}
          className="animate-spin text-indigo-600"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* ================= HEADER ================= */}

        <div className="mb-10">
          <p className="font-semibold text-indigo-600">
            CampusFest Admin
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-slate-600">
            Manage customer orders, sales and order
            statuses from one place.
          </p>
        </div>

        {/* ================= STATS ================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          <StatCard
            title="Total Orders"
            value={stats.total}
            icon={<Package size={22} />}
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.revenue.toLocaleString("en-IN")}`}
            icon={<IndianRupee size={22} />}
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            icon={<Clock size={22} />}
          />

          <StatCard
            title="Confirmed"
            value={stats.confirmed}
            icon={<CheckCircle size={22} />}
          />

          <StatCard
            title="Shipped"
            value={stats.shipped}
            icon={<Truck size={22} />}
          />

          <StatCard
            title="Delivered"
            value={stats.delivered}
            icon={<CheckCircle size={22} />}
          />

          <StatCard
            title="Cancelled"
            value={stats.cancelled}
            icon={<XCircle size={22} />}
          />

        </div>

        {/* ================= ORDERS SECTION ================= */}

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* HEADER */}

          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  All Orders
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Showing {filteredOrders.length} of{" "}
                  {orders.length} orders
                </p>
              </div>

              {/* SEARCH + FILTER */}

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* SEARCH */}

                <div className="relative">

                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search orders..."
                    className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-600 sm:w-64"
                  />

                </div>

                {/* FILTER */}

                <div className="relative">

                  <Filter
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-9 text-sm outline-none transition focus:border-indigo-600 sm:w-44"
                  >
                    <option value="All">
                      All Status
                    </option>

                    {statusOptions.map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

            </div>

          </div>

          {/* ================= EMPTY ================= */}

          {filteredOrders.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <Package
                size={48}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                No orders found
              </h3>

              <p className="mt-2 text-slate-500">
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-slate-200">

              {filteredOrders.map((order) => (

                <div
                  key={order._id}
                  className="p-5 transition hover:bg-slate-50 sm:p-6"
                >

                  {/* ================= TOP ================= */}

                  <div className="grid gap-5 lg:grid-cols-4">

                    {/* ORDER */}

                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Order ID
                      </p>

                      <p className="mt-1 break-all font-mono text-sm text-slate-900">
                        #{order._id}
                      </p>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                        <CalendarDays size={14} />
                        {formatDate(order.createdAt)}
                      </div>
                    </div>

                    {/* CUSTOMER */}

                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Customer
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        {order.userId?.username ||
                          "Unknown User"}
                      </p>

                      <p className="break-all text-sm text-slate-500">
                        {order.userId?.email ||
                          "No email"}
                      </p>
                    </div>

                    {/* TOTAL */}

                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Total Amount
                      </p>

                      <p className="mt-1 text-xl font-bold text-indigo-600">
                        ₹
                        {Number(
                          order.totalAmount || 0
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* PAYMENT */}

                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Payment
                      </p>

                      <p className="mt-1 font-medium text-slate-900">
                        {order.paymentMethod}
                      </p>

                      <p className="text-sm text-slate-500">
                        {order.paymentStatus}
                      </p>
                    </div>

                  </div>

                  {/* ================= PRODUCTS ================= */}

                  <div className="mt-6">

                    <p className="mb-3 text-sm font-semibold text-slate-700">
                      Products
                    </p>

                    <div className="flex flex-wrap gap-3">

                      {order.products?.map(
                        (item) => (

                          <div
                            key={item._id}
                            className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-2"
                          >

                            {item.productId?.image && (
                              <img
                                src={
                                  item.productId.image
                                }
                                alt={
                                  item.productId.name
                                }
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            )}

                            <div>

                              <p className="text-sm font-semibold text-slate-900">
                                {item.productId?.name ||
                                  "Product"}
                              </p>

                              <p className="text-xs text-slate-500">
                                Qty: {item.quantity} × ₹
                                {item.price}
                              </p>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                  {/* ================= BOTTOM ================= */}

                  <div className="mt-6 flex flex-col gap-5 border-t border-slate-200 pt-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* SHIPPING */}

                    <div className="max-w-2xl">

                      <p className="text-sm text-slate-500">
                        Shipping Address
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-800">
                        {order.shippingAddress ||
                          "No address provided"}
                      </p>

                    </div>

                    {/* STATUS */}

                    <div className="flex flex-wrap items-center gap-3">

                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>

                      <select
                        value={order.orderStatus}
                        disabled={
                          updatingOrder ===
                          order._id
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium outline-none transition focus:border-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {statusOptions.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          )
                        )}
                      </select>

                      {updatingOrder ===
                        order._id && (
                        <Loader2
                          size={20}
                          className="animate-spin text-indigo-600"
                        />
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

// =========================
// STAT CARD
// =========================

function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;