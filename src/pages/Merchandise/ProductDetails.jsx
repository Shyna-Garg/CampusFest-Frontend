import { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import useProduct from "../../hooks/useProduct";
import useCart from "../../hooks/useCart";

const ProductDetails = () => {
  const { id } = useParams();

  const { product, loading, error } = useProduct(id);

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    console.log("Button clicked");
    console.log(product);

    try {
      setAdding(true);

      console.log("Calling addToCart...");

      const response = await addToCart(product._id, quantity);

      console.log("Success:", response);

      toast.success("Product added successfully");
    } catch (err) {
      console.log("Error:", err);

      toast.error("Failed");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={40} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-xl text-red-500">{error}</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-xl">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-14">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2">
        {/* Product Image */}

        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-3xl shadow-xl"
          />
        </div>

        {/* Product Details */}

        <div>
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-600">
            {product.category}
          </span>

          <h1 className="mt-6 text-5xl font-bold text-slate-900">
            {product.name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            {product.description}
          </p>

          <h2 className="mt-8 text-4xl font-bold text-indigo-600">
            ₹{product.price}
          </h2>

          <div className="mt-6">
            <span className="font-semibold">Stock:</span> {product.stock}
          </div>

          {/* Quantity */}

          <div className="mt-8">
            <label className="mb-2 block font-semibold">Quantity</label>

            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-600"
            />
          </div>

          {/* Add To Cart */}

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="mt-10 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {adding ? "Adding..." : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
