import heroImage from "../assets/hero.jpg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        data-aos="fade-up"
        data-aos-duration="1200">
        <p className="uppercase tracking-[8px] text-gray-300 mb-4">
          New Collection 2026
        </p>
        <h1 className="text-7xl font-bold text-white mb-6 animate-pulse">
          Think Different.
        </h1>

        <p className="text-2xl text-gray-200 mb-10 max-w-2xl">
          Premium technology products for modern lifestyles.
        </p>

        <div className="flex gap-4">
          <Link
            to="/products"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            data-aos="zoom-out"
            data-aos-duration="1200"
          >
            Shop Now
          </Link>

          <button className="border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition" data-aos="zoom-out" data-aos-duration="1200">
            Learn More
          </button>

        </div>
        <div className="flex gap-10 mt-12 text-white">
          <div>
            <h3 className="text-3xl font-bold">50+</h3>
            <p className="text-gray-300">Products</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="text-gray-300">Customers</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">4.9★</h3>
            <p className="text-gray-300">Rating</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce text-white text-3xl">
          ↓
        </div>
      </div>
    </section>
  );
}

export default Hero;