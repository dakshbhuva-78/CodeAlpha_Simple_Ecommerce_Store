import { Link, useLocation, useNavigate } from "react-router-dom";
import {
 FaTachometerAlt,
 FaBox,
 FaShoppingBag,
 FaCommentDots,
 
} from "react-icons/fa";

function AdminLayout({ children }) {

    const location = useLocation();
    const navigate = useNavigate();

    const logoutHandler = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <div className="min-h-screen flex bg-gray-100">

            {/* Sidebar */}

            <div className="w-64 bg-black text-white p-6">

                <div className="mb-10">

                    <h1 className="text-3xl font-bold">
                        AppleStore
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Admin Panel
                    </p>

                </div>

                <div className="space-y-4">

                    <Link
                        to="/admin"
                        className={`block px-4 py-3 rounded-xl ${location.pathname === "/admin"
                            ? "bg-white text-black"
                            : "hover:bg-gray-800"
                            }`}
                    >
                        <FaTachometerAlt />

                        Dashboard
                    </Link>

                    <Link
                        to="/admin/products"
                        className={`block px-4 py-3 rounded-xl ${location.pathname === "/admin/products"
                            ? "bg-white text-black"
                            : "hover:bg-gray-800"
                            }`}
                    >
                        <FaBox/>
                        Products
                    </Link>

                    <Link
                        to="/admin/orders"
                        className={`block px-4 py-3 rounded-xl ${location.pathname === "/admin/orders"
                            ? "bg-white text-black"
                            : "hover:bg-gray-800"
                            }`}
                    >
                        <FaShoppingBag/>
                        Orders
                    </Link>

                    <Link
                        to="/admin/feedbacks"
                        className={`block px-4 py-3 rounded-xl ${location.pathname === "/admin/feedbacks"
                            ? "bg-white text-black"
                            : "hover:bg-gray-800"
                            }`}
                    >
                        <FaCommentDots/>
                        Feedbacks
                    </Link>

                    <button
                        onClick={logoutHandler}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-500"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* Content */}

            <div className="flex-1 p-10 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 min-h-screen">
                {children}

            </div>

        </div>

    );

}

export default AdminLayout;