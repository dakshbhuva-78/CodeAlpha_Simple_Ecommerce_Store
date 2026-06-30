import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyOrders, cancelOrder } from "../services/orderService.js";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = API_URL.replace("/api", "");

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const data = await getMyOrders();

        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const canCancelOrder = (status) => {
    return (
      status === "Order Placed" || status === "Confirmed" || status === "Packed"
    );
  };

  const canReturnOrder = (status, deliveredDate) => {
    if (status !== "Delivered" || !deliveredDate) {
      return false;
    }

    const today = new Date();

    const delivered = new Date(deliveredDate);

    const diffDays = Math.floor((today - delivered) / (1000 * 60 * 60 * 24));

    return diffDays <= 7;
  };

  const canGiveFeedback = (status, feedbackGiven) => {
    return status === "Delivered" && !feedbackGiven;
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);

      toast.success("Order cancelled successfully");

      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const orderSteps = [
    "Order Placed",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out For Delivery",
    "Delivered",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-600";

      case "Shipped":
        return "bg-blue-100 text-blue-600";

      case "Out For Delivery":
        return "bg-purple-100 text-purple-600";

      case "Packed":
        return "bg-orange-100 text-orange-600";

      case "Confirmed":
        return "bg-yellow-100 text-yellow-600";

      case "Cancelled":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const navigate = useNavigate();
  if (loading) {
    return <Loader />;
  }
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-5xl font-bold mb-10">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition"
          >
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Image */}

                <div className="bg-gray-100 p-5 rounded-2xl">
                  <img
                    src={`${IMAGE_URL}${order.products[0].product.image}`}
                    alt={order.products[0].product.name}
                    className="w-40 h-40 object-contain"
                  />
                </div>

                {/* Info */}

                <div className="flex-1">
                  <div className="flex justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-3xl font-bold">
                        {order.products[0].product.name}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        Order ID: {order._id}
                      </p>

                      <p className="text-gray-500">
                        Ordered:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-xl text-sm font-semibold ${getStatusColor(order.orderStatus)}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div>
                      <p className="text-gray-500">Quantity</p>

                      <p className="font-bold">{order.products[0].quantity}</p>
                    </div>

                    <div>
                      <p className="text-gray-500">Payment</p>

                      <p className="font-bold">{order.paymentMethod}</p>
                    </div>

                    <div>
                      <p className="text-gray-500">Total</p>

                      <p className="font-bold text-xl">₹{order.totalPrice}</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mt-8">
                    <div className="flex flex-wrap gap-3">
                      {orderSteps.map((step, index) => {
                        const currentIndex = orderSteps.indexOf(
                          order.orderStatus,
                        );

                        return (
                          <div
                            key={index}
                            className={`px-4 py-2 rounded-full text-sm font-medium
                                                            ${
                                                              index <=
                                                              currentIndex
                                                                ? "bg-green-100 text-green-600"
                                                                : "bg-gray-100 text-gray-400"
                                                            }`}
                          >
                            {step}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Buttons */}

                  <div className="flex flex-wrap gap-4 mt-8">
                    <button
                      onClick={() => navigate(`/order-details/${order._id}`)}
                      className="bg-black text-white px-6 py-3 rounded-full"
                    >
                      View Details
                    </button>

                    {canCancelOrder(order.orderStatus) && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="border border-red-500 text-red-500 px-6 py-3 rounded-full"
                      >
                        Cancel Order
                      </button>
                    )}

                    {order.orderStatus === "Delivered" && (
                      <button
                        onClick={() => navigate(`/return-order/${order._id}`)}
                        className="bg-red-500 text-white px-6 py-3 rounded-full"
                      >
                        Return Order
                      </button>
                    )}
                    {canGiveFeedback(
                      order.orderStatus,
                      order.feedbackGiven,
                    ) && (
                      <button
                        onClick={() => navigate(`/feedback/${order._id}`)}
                        className="bg-yellow-500 text-white px-6 py-3 rounded-full"
                      >
                        Leave Feedback
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyOrders;
