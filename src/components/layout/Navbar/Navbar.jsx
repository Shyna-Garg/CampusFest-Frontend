import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useCart from "../../../hooks/useCart";
import { Menu, X, Search, User, LogOut } from "lucide-react";
import { toast } from "react-toastify";

import Button from "../../ui/Button";
import Container from "../../ui/Container";
import navLinks from "./NavLinks";
import useAuth from "../../../hooks/useAuth";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logged out successfully");

      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
              CF
            </div>

            <span className="text-2xl font-bold text-slate-900">
              CampusFest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-700 hover:text-indigo-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden items-center gap-4 lg:flex">
            <button className="rounded-xl p-2 transition hover:bg-slate-100">
              <Search size={20} />
            </button>

            {!isAuthenticated ? (
              <>
                <Button variant="secondary" onClick={() => navigate("/login")}>
                  Login
                </Button>

                <Button onClick={() => navigate("/register")}>Register</Button>
              </>
            ) : (
              <>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `relative flex items-center gap-2 ${
                      isActive
                        ? "text-indigo-600"
                        : "text-slate-700 hover:text-indigo-600"
                    }`
                  }
                >
                  <ShoppingCart size={20} />
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium text-indigo-600"
                      : "font-medium text-slate-700 hover:text-indigo-600"
                  }
                >
                  Orders
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "hover:bg-slate-100"
                    }`
                  }
                >
                  <User size={18} />
                  <span>{user?.username}</span>
                </NavLink>

                <Button variant="secondary" onClick={handleLogout}>
                  <div className="flex items-center gap-2">
                    <LogOut size={18} />
                    Logout
                  </div>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-slate-200 py-5 lg:hidden">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-medium ${
                      isActive
                        ? "text-indigo-600"
                        : "text-slate-700 hover:text-indigo-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <hr />

              {!isAuthenticated ? (
                <>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    className="w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/register");
                    }}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/cart" onClick={() => setIsMenuOpen(false)}>
                    Cart
                  </NavLink>

                  <NavLink to="/orders" onClick={() => setIsMenuOpen(false)}>
                    Orders
                  </NavLink>

                  <NavLink
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <User size={18} />
                    {user?.username}
                  </NavLink>

                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}

export default Navbar;
