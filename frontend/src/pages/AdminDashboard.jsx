import { useEffect, useState }
  from "react";

import AdminLayout from "../components/AdminLayout";
import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaRupeeSign,
  FaSignOutAlt,
  FaUserCircle
} from "react-icons/fa";

import {
  getDashboardStats,
  getAllFeedbacks,
  getAllOrders
} from "../services/adminService";

import {
  FaPlus,
  FaClipboardList,
  FaStar,
  FaBoxes
} from "react-icons/fa";

import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function AdminDashboard() {

  const [stats, setStats] =
    useState(null);

  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {
        setLoading(true);

        const statsData =
          await getDashboardStats();

        setStats(statsData);

        const ordersData =
          await getAllOrders();

        setOrders(ordersData);

        const feedbackData =
          await getAllFeedbacks();

        setFeedbacks(feedbackData);
        setLoading(false);

      } catch (error) {

        console.log(error);

      } finally {
        setLoading(false);
      }

    };

    fetchData();

  }, []);

  if (loading) {
    return <Loader />;
  }
  
  return (
    <AdminLayout>

      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <h1 className="text-5xl font-bold text-gray-900">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back, Admin. Here's what's happening today.
            </p>

          </div>

          <div className="bg-white shadow-xl rounded-3xl px-6 py-5 flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">

              A

            </div>

            <div>

              <h3 className="font-bold text-lg">
                Administrator
              </h3>

              <p className="text-green-600 text-sm">
                ● Online
              </p>

              <p className="text-gray-400 text-xs">
                {new Date().toLocaleDateString()}
              </p>

            </div>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-3xl p-7 shadow-xl">

            <FaUsers className="text-5xl mb-6" />

            <p className="text-lg">
              Total Users
            </p>

            <h2 className="text-5xl font-bold mt-2">
              {stats.totalUsers}
            </h2>

          </div>

          <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-3xl p-7 shadow-xl">

            <FaBox className="text-5xl mb-6" />

            <p className="text-lg">
              Products
            </p>

            <h2 className="text-5xl font-bold mt-2">
              {stats.totalProducts}
            </h2>

          </div>

          <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-3xl p-7 shadow-xl">

            <FaShoppingCart className="text-5xl mb-6" />

            <p className="text-lg">
              Orders
            </p>

            <h2 className="text-5xl font-bold mt-2">
              {stats.totalOrders}
            </h2>

          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-7 shadow-xl">

            <FaRupeeSign className="text-5xl mb-6" />

            <p className="text-lg">
              Revenue
            </p>

            <h2 className="text-5xl font-bold mt-2">
              ₹{stats.totalRevenue}
            </h2>

          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-4 gap-5">

            <Link
              to="/admin/add-product"
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition"
            >
              <FaPlus className="text-4xl text-green-600 mb-4" />

              <h3 className="font-bold text-xl">
                Add Product
              </h3>

              <p className="text-gray-500 mt-2">
                Create new product
              </p>
            </Link>

            <Link
              to="/admin/products"
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition"
            >
              <FaBoxes className="text-4xl text-blue-600 mb-4" />

              <h3 className="font-bold text-xl">
                Products
              </h3>

              <p className="text-gray-500 mt-2">
                Manage all products
              </p>
            </Link>

            <Link
              to="/admin/orders"
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition"
            >
              <FaClipboardList className="text-4xl text-orange-500 mb-4" />

              <h3 className="font-bold text-xl">
                Orders
              </h3>

              <p className="text-gray-500 mt-2">
                Manage customer orders
              </p>
            </Link>

            <Link
              to="/admin/feedbacks"
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition"
            >
              <FaStar className="text-4xl text-yellow-500 mb-4" />

              <h3 className="font-bold text-xl">
                Reviews
              </h3>

              <p className="text-gray-500 mt-2">
                Customer feedback
              </p>
            </Link>

          </div>

        </div>

      </section>

      <div className="bg-white mt-10 rounded-3xl shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">

          <div>

            <h2 className="text-3xl font-bold">

              📦 Recent Orders

            </h2>

            <p className="text-gray-500">

              Latest customer purchases

            </p>

          </div>

          <span className="bg-black text-white px-5 py-2 rounded-full">

            {orders.length} Orders

          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4">
                  Customer
                </th>

                <th className="p-4">
                  Product
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4 rounded-r-xl">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.slice(0, 5).map((order) => (

                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-5">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold">

                        {order.shippingInfo.fullName.charAt(0)}

                      </div>

                      <div>

                        <p className="font-semibold">

                          {order.shippingInfo.fullName}

                        </p>

                        <p className="text-sm text-gray-500">

                          {order.shippingInfo.email}

                        </p>

                      </div>

                    </div>

                  </td>


                  <td className="font-medium">

                    {order.products[0]?.product?.name}

                  </td>

                  <td>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold

${order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"

                          : order.orderStatus === "Cancelled"
                            ? "bg-red-100 text-red-700"

                            : order.orderStatus === "Returned"
                              ? "bg-purple-100 text-purple-700"

                              : order.orderStatus === "Shipped"
                                ? "bg-blue-100 text-blue-700"

                                : order.orderStatus === "Packed"
                                  ? "bg-indigo-100 text-indigo-700"

                                  : order.orderStatus === "Confirmed"
                                    ? "bg-yellow-100 text-yellow-700"

                                    : "bg-gray-100 text-gray-700"
                        }
`}
                    >
                      {order.orderStatus}
                    </span>

                  </td>

                  <td className="font-bold">

                    ₹{order.totalPrice}

                  </td>


                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl mt-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Latest Feedback
          </h2>

          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
            {feedbacks.length} Reviews
          </span>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {feedbacks.slice(0, 3).map((item) => (

            <div
              key={item._id}
              className="bg-white border rounded-3xl p-6 shadow-md hover:shadow-xl transition"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="font-bold text-xl">
                    {item.user?.name}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {item.products[0]?.product?.name}
                  </p>

                </div>

                <div className="text-yellow-500 text-lg">
                  {"⭐".repeat(item.rating)}
                </div>

              </div>

              <p className="mt-5 text-gray-700 italic">
                "{item.feedback}"
              </p>

              <p className="text-xs text-gray-400 mt-5">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

            </div>

          ))}

        </div>

      </div>


    </AdminLayout>
  );
}

export default AdminDashboard;