import { Link } from "react-router-dom";

function Navbar({ cartItems }) {

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-black"
        >
          AppleStore
        </Link>

        <div className="flex gap-8 text-gray-700 font-semibold text-lg">

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link
            to="/cart"
            className="relative"
          >
            🛒Cart

            {cartCount > 0 && (
              <span className="absolute -top-3 -right-5 bg-black text-white text-xs px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;