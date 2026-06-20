import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Features from "../components/Features";
import products from "../data/products";

function Home() {
  return (
    <>
      
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              category={product.category}
              image={product.image}
              rating={product.rating}
              discount={product.discount}
            />
          ))}
        </div>
      </section>
    <Features />
    </>
  );
}

export default Home;