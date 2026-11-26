import { useMemo, useState } from "react";
import ProductGrid from "../../components/merchandise/ProductGrid";
import useProducts from "../../hooks/useProducts";

const Merchandise = () => {
  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Clothing",
    "Accessories",
    "Stationery",
    "Other",
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Merchandise Store
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-indigo-100">
            Discover official CampusFest merchandise.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 outline-none focus:border-indigo-600 lg:w-96"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 outline-none focus:border-indigo-600"
          >
            {categories.map((cat) => (
              <option key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            {filteredProducts.length} Products Found
          </h2>
        </div>

        <ProductGrid
          products={filteredProducts}
          loading={loading}
          error={error}
        />
      </section>
    </div>
  );
};

export default Merchandise;