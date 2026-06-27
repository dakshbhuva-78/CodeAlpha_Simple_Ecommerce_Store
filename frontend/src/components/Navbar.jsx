import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt, FaBoxOpen } from "react-icons/fa";

function Navbar({ cartItems }) {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logoutHandler = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };


  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {

    const handler = (e) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {

        setShowMenu(false);

      }

    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener("mousedown", handler);

  }, []);

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

          {token && (
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
          )}

          {token ? (

            <div
              className="relative"
              ref={menuRef}
            >

              <button
                onClick={() =>
                  setShowMenu(!showMenu)
                }
                className="flex items-center gap-2 hover:text-black"
              >

                <FaUserCircle className="text-2xl" />
                {/* 
                <span>

                  {user?.name}

                </span> */}

              </button>

              {showMenu && (

                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border overflow-hidden z-50">

                  <div className="px-5 py-4 border-b">

                    <h3 className="font-bold">

                      {user?.name}

                    </h3>

                    <p className="text-sm text-gray-500">

                      {user?.email}

                    </p>

                  </div>

                  <Link
                    to="/profile"
                    onClick={() =>
                      setShowMenu(false)
                    }
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                  >

                    <FaUserCircle />

                    My Profile

                  </Link>

                  <Link
                    to="/my-orders"
                    onClick={() =>
                      setShowMenu(false)
                    }
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                  >

                    <FaBoxOpen />

                    My Orders

                  </Link>

                  <button
                    onClick={logoutHandler}
                    className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50"
                  >

                    <FaSignOutAlt />

                    Logout

                  </button>

                </div>

              )}

            </div>

          ) : (

            <Link
              to="/login"
            >
              Login

            </Link>

          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;