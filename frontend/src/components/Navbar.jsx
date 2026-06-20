import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-black"
        >
          AppleStore
        </Link>

        <div className="flex gap-8 text-gray-700 font-medium">

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
      </div>
    </nav>
  );
}

export default Navbar;