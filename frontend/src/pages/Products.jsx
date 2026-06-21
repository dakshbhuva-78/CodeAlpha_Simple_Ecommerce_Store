import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getProducts();

        setProducts(data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProducts();

  }, []);

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">

      <h1 className="text-5xl font-bold mb-10">
        All Products
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {products.map((product) => (

          <ProductCard
            key={product._id}
            id={product._id}
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