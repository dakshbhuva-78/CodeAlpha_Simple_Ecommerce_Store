import { useEffect, useState }
  from "react";

import AdminLayout from "../components/AdminLayout";
import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaRupeeSign
} from "react-icons/fa";

import {
  getDashboardStats,
  getAllFeedbacks,
  getAllOrders
} from "../services/adminService";

function AdminDashboard() {

  const [stats, setStats] =
    useState(null);

  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const statsData =
          await getDashboardStats();

        setStats(statsData);

        const ordersData =
          await getAllOrders();

        setOrders(ordersData);

        const feedbackData =
          await getAllFeedbacks();

        setFeedbacks(feedbackData);

      } catch (error) {

        console.log(error);

      }

    };

    fetchData();

  }, []);

  if (!stats) {

    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );

  }

  return (
    <AdminLayout>

      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Welcome Back Admin 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Manage products, orders and customers
            from one place.
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">            <h3>Total Users</h3>
            <FaUsers
              className="text-purple-600 text-4xl mb-3"
            />

            <p className="text-4xl font-bold mt-3">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">            <h3>Total Products</h3>
            <FaBox
              className="text-brown text-4xl mb-3"
            />
            <p className="text-4xl font-bold mt-3">
              {stats.totalProducts}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <h3>Total Orders</h3>
            <FaShoppingCart
              className="text-gray-600 text-4xl mb-3"
            />
            <p className="text-4xl font-bold mt-3">
              {stats.totalOrders}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">            <h3>Revenue</h3>
            <FaRupeeSign
              className="text-green-600 text-4xl mb-3"
            />
            <p className="text-4xl font-bold mt-3">
              ₹{stats.totalRevenue}
            </p>
          </div>

        </div>

      </section>

      <div className="bg-white rounded-3xl p-8 shadow-xl mt-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            Recent Orders
          </h2>

          <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
            {orders.length} Orders
          </span>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-100 text-left">

                <th className="p-4 rounded-l-xl">
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

                  <td className="p-4 font-medium">
                    {order.shippingInfo.fullName}
                  </td>

                  <td className="p-4">
                    {order.products[0]?.product?.name}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                ${order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : order.orderStatus === "Returned"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                    >

                      {order.orderStatus}

                    </span>

                  </td>

                  <td className="p-4 font-bold">
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
              className="border rounded-2xl p-5 hover:shadow-lg transition"
            >

              <div className="flex justify-between items-center mb-3">

                <h3 className="font-bold text-lg">
                  {item.user?.name}
                </h3>

                <span className="text-yellow-500 text-lg">
                  {"⭐".repeat(item.rating)}
                </span>

              </div>

              <p className="text-gray-500 text-sm mb-2">
                {item.products[0]?.product?.name}
              </p>

              <p className="text-gray-700">
                {item.feedback}
              </p>

            </div>

          ))}

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;