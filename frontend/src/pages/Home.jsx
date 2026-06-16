import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

function Home() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 65000,
      image: "src/assets/products/laptop.webp",
    },
    {
      id: 2,
      name: "Smartphone",
      price: 25000,
      image: "src/assets/products/smartphone.webp",
    },
    {
      id: 3,
      name: "Headphones",
      price: 3000,
      image: "src/assets/products/headphone.webp",
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 5000,
      image: "src/assets/products/smartwatch.webp",
    },
  ];

  return (
    <>
      <Navbar />
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;