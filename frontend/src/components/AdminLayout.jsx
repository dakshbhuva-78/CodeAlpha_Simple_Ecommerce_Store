import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    FaBars,
    FaTimes,
    FaTachometerAlt,
    FaBox,
    FaShoppingBag,
    FaCommentDots,
    FaSignOutAlt,
    FaUserCircle
} from "react-icons/fa";

function AdminLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (

        <div className="min-h-screen flex bg-gray-100">
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-black text-white h-16 flex items-center justify-between px-5 z-50 shadow-lg">

                <h2 className="text-2xl font-bold">
                    AppleStore
                </h2>

                <button
                    onClick={() => setSidebarOpen(true)}
                >
                    <FaBars className="text-2xl" />
                </button>

            </div>
            {/* Sidebar */}

            <div className={`fixed top-0 left-0 h-screen w-64 bg-black text-white p-6 shadow-2xl z-50 transition-transform duration-300 ${sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"}
                            lg:translate-x-0`}>
                <div className="mb-10">
                    <div className="flex justify-end lg:hidden">

                        <button
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FaTimes className="text-2xl" />
                        </button>

                    </div>
                    <h1 className="text-4xl font-extrabold tracking-wide">

                        Apple<span className="text-blue-500">Store</span>

                    </h1>

                    <p className="text-gray-400 mt-1">

                        Admin Dashboard

                    </p>
                </div>

                <div className="flex flex-col justify-between h-[calc(100vh-130px)]">

                    {/* Navigation */}
                    <div className="space-y-4">

                        <Link
                            onClick={() => setSidebarOpen(false)}
                            to="/admin"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${location.pathname === "/admin"
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <FaTachometerAlt />
                            Dashboard
                        </Link>

                        <Link
                            onClick={() => setSidebarOpen(false)}
                            to="/admin/products"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${location.pathname === "/admin/products"
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <FaBox />
                            Products
                        </Link>

                        <Link
                            onClick={() => setSidebarOpen(false)}
                            to="/admin/orders"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${location.pathname === "/admin/orders"
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <FaShoppingBag />
                            Orders
                        </Link>

                        <Link
                            onClick={() => setSidebarOpen(false)}
                            to="/admin/feedbacks"
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${location.pathname === "/admin/feedbacks"
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <FaCommentDots />
                            Feedbacks
                        </Link>

                    </div>

                    {/* Bottom Profile */}
                    <div className="border-t border-gray-800 pt-2">

                        <div className="flex items-center justify-between bg-gray-900 rounded-2xl p-3">

                            <div className="flex items-center gap-2 pr-2">

                                <FaUserCircle className="text-4xl text-blue-500" />

                                <div>
                                    <h3 className="font-semibold">
                                        Administrator
                                    </h3>

                                    <p className="text-xs text-gray-400">
                                        Super Admin
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={logoutHandler}
                                className="w-10 h-10 rounded-xl bg-red-500 hover:bg-red-600 flex items-center justify-center transition"
                            >
                                <FaSignOutAlt />
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* Content */}

            <div className="md:ml-64 flex-1 min-h-screen p-4 md:p-10 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 overflow-x-auto overflow-y-auto">
                {children}
            </div>


        </div>
    );
}

export default AdminLayout;
