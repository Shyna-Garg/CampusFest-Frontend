
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Package,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Loader2,
  ImagePlus,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "Clothing",
  stock: "",
  isAvailable: true,
};

const categories = [
  "Clothing",
  "Accessories",
  "Stationery",
  "Other",
];

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const fetchProducts = useCallback(() => getAllProducts()
    .then((response) => setProducts(response?.data || []))
    .catch((error) => {
      toast.error(error.response?.data?.message || "Failed to fetch products");
    })
    .finally(() => setLoading(false)), []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const openAddForm = () => {
    setEditingProduct(null);
    setForm(initialForm);
    setImage(null);
    setImagePreview("");
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);

    setForm({
      name: product.name || "",
      description: product.description || "",
      price: String(product.price ?? ""),
      category: product.category || "Clothing",
      stock: String(product.stock ?? ""),
      isAvailable: product.isAvailable ?? true,
    });

    setImage(null);
    setImagePreview(product.image || "");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setForm(initialForm);
    setImage(null);
    setImagePreview("");
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      event.target.value = "";
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      form.price === "" ||
      form.stock === ""
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      toast.error("Price must be a valid non-negative number");
      return;
    }

    if (
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      toast.error("Stock must be a non-negative whole number");
      return;
    }

    if (!editingProduct && !image) {
      toast.error("Please select a product image");
      return;
    }

    try {
      setSaving(true);

      if (editingProduct) {
        // The current backend update route accepts JSON.
        // Image replacement is not handled by that route yet.
        await updateProduct(editingProduct._id, {
          name: form.name.trim(),
          description: form.description.trim(),
          price,
          category: form.category,
          stock,
          isAvailable: form.isAvailable,
        });

        toast.success("Product updated successfully");
      } else {
        const formData = new FormData();

        formData.append("name", form.name.trim());
        formData.append(
          "description",
          form.description.trim()
        );
        formData.append("price", String(price));
        formData.append("category", form.category);
        formData.append("stock", String(stock));
        formData.append("image", image);

        await createProduct(formData);

        toast.success("Product added successfully");
      }

      closeForm();
      setLoading(true);
      await fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to save product"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(product._id);

      await deleteProduct(product._id);

      setProducts((previous) =>
        previous.filter((item) => item._id !== product._id)
      );

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2
          size={40}
          className="animate-spin text-indigo-600"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-indigo-600">
              CampusFest Admin
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Product Management
            </h1>

            <p className="mt-2 text-slate-600">
              Add products and manage your merchandise inventory.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* SUMMARY */}

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Total Products"
            value={products.length}
            icon={<Package size={22} />}
          />

          <SummaryCard
            label="Available Products"
            value={
              products.filter(
                (product) =>
                  product.isAvailable && product.stock > 0
              ).length
            }
            icon={<Package size={22} />}
          />

          <SummaryCard
            label="Out of Stock"
            value={
              products.filter(
                (product) => product.stock === 0
              ).length
            }
            icon={<Package size={22} />}
          />
        </div>

        {/* SEARCH AND FILTER */}

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by product name or description..."
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 outline-none focus:border-indigo-600"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600"
          >
            <option value="All">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* PRODUCT GRID */}

        <p className="mb-4 text-sm text-slate-500">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
            <Package
              size={44}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No products found
            </h2>

            <p className="mt-2 text-slate-500">
              Try another search or add a new product.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-52 bg-slate-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      <ImagePlus size={40} />
                    </div>
                  )}

                  <span
                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                      product.isAvailable && product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock === 0
                      ? "Out of Stock"
                      : product.isAvailable
                        ? "Available"
                        : "Unavailable"}
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                    {product.category}
                  </p>

                  <h2 className="mt-2 text-lg font-bold text-slate-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm text-slate-500">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-indigo-600">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </span>

                    <span className="text-sm text-slate-500">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => openEditForm(product)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      disabled={deletingId === product._id}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === product._id ? (
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={16} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter product information below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close form"
              >
                <X size={21} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Name *
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  maxLength={120}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                  placeholder="CampusFest Hoodie"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  maxLength={2000}
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                  placeholder="Describe your product..."
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Price (₹) *
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Stock *
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleInputChange}
                    min="0"
                    step="1"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category *
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-600"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Image {editingProduct ? "(optional)" : "*"}
                </label>

                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-5 text-sm font-medium text-slate-600 transition hover:border-indigo-500 hover:text-indigo-600">
                  <ImagePlus size={20} />
                  {image ? image.name : "Choose an image"}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="mt-4 h-36 w-36 rounded-xl border border-slate-200 object-cover"
                  />
                )}

                {editingProduct && (
                  <p className="mt-2 text-xs text-slate-500">
                    The current backend supports updating product
                    details, but not replacing the stored image.
                  </p>
                )}
              </div>

              {editingProduct && (
                <label className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={form.isAvailable}
                    onChange={handleInputChange}
                    className="h-4 w-4 accent-indigo-600"
                  />

                  <span>
                    <span className="block text-sm font-semibold text-slate-800">
                      Product available in store
                    </span>

                    <span className="text-xs text-slate-500">
                      Uncheck to mark the product unavailable.
                    </span>
                  </span>
                </label>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  )}

                  {saving
                    ? "Saving..."
                    : editingProduct
                      ? "Save Changes"
                      : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>

        <p className="mt-2 text-2xl font-bold text-slate-900">
          {value}
        </p>
      </div>

      <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
        {icon}
      </div>
    </div>
  );
}

export default AdminProducts;
