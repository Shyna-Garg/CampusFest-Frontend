import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Events from "../pages/Events/Events";
import EventDetails from "../components/sections/events/EventDetails.jsx";
import Merchandise from "../pages/Merchandise/Merchandise";
import Cart from "../pages/Cart/Cart";
import Orders from "../pages/Orders/Orders";
import Profile from "../pages/Profile/Profile";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import ProductDetails from "../pages/Merchandise/ProductDetails";
import Checkout from "../pages/Checkout/Checkout";
import OrderDetails from "../pages/Orders/OrderDetails";
import AdminRoute from "../components/auth/AdminRoute";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProducts from "../pages/Admin/AdminProducts";

function AppRoutes() {
  return (
    <Routes>
      {/* Routes with Navbar & Footer */}
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/merchandise/:id" element={<ProductDetails />} />

        {/* Protected Routes */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />


        <Route
  path="/orders/:id"
  element={
    <ProtectedRoute>
      <OrderDetails />
    </ProtectedRoute>
  }
/>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

    <Route
  path="/admin/products"
  element={
    <AdminRoute>
      <AdminProducts />
    </AdminRoute>
  }
/>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;
