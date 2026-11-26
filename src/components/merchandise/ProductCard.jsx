import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Product Image */}
      <Link to={`/merchandise/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover"
        />
      </Link>

      <div className="p-5">
        {/* Category */}
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600">
          {product.category}
        </span>

        {/* Product Name */}
        <h2 className="mt-4 text-xl font-bold text-slate-900">
          {product.name}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-slate-600">
          {product.description}
        </p>

        {/* Price & View Button */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            ₹{product.price}
          </span>

          <Link
            to={`/merchandise/${product._id}`}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;