import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          AppleStore
        </h2>

        <p className="text-gray-400 mb-6">
          Premium technology products for modern lifestyles.
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <Link to="/">
            Home
          </Link>
          <Link to="/products">
            Products
          </Link>
          <Link to="/login">
            Login
          </Link>
          <Link to="/cart">
            Cart
          </Link>
        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-gray-500">
          © 2026 AppleStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;