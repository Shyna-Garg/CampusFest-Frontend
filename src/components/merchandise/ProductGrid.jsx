import ProductCard from "./ProductCard";

const ProductGrid = ({
  products,
  loading,
  error,
}) => {

  if (loading) {
    return (
      <div className="py-20 text-center text-lg">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="py-20 text-center text-slate-500">
        No products available.
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

      {products.map((product) => (

        <ProductCard
          key={product._id}
          product={product}
        />

      ))}

    </div>
  );
};

export default ProductGrid;