import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Features from "../components/Features";
import { getProducts } from "../services/productService";
import Loader from "../components/Loader";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        setLoading(true);

        const data = await getProducts();
        setProducts(data);

        setLoading(false);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if(loading){
    return <Loader />;
  }

  return (
    <>

      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center md:text-left">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
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
      <Features />
    </>
  );
}

export default Home;