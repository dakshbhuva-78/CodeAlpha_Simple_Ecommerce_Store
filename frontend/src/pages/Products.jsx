import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">

      <h1 className="text-5xl font-bold mb-8">
        Products Collection
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl px-4 py-3 mb-6"
      />

      {/* Filters */}
      <div className="flex gap-4 mb-8 flex-wrap">

        <button
          onClick={() => setCategory("All")}
          className="px-5 py-2 rounded-full bg-black text-white"
        >
          All
        </button>

        <button
          onClick={() => setCategory("Laptop")}
          className="px-5 py-2 rounded-full border"
        >
          Laptop
        </button>

        <button
          onClick={() => setCategory("Phone")}
          className="px-5 py-2 rounded-full border"
        >
          Phone
        </button>

        <button
          onClick={() => setCategory("Watch")}
          className="px-5 py-2 rounded-full border"
        >
          Watch
        </button>

      </div>

      <p className="text-gray-500 mb-8">
        Showing {filteredProducts.length} Products
      </p>

      <div className="grid md:grid-cols-3 gap-8">

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            oldPrice={product.oldPrice}
            image={product.image}
            rating={product.rating}
            discount={product.discount}
            stock={product.stock}
          />
        ))}

      </div>
    </section>
  );
}

export default Products;