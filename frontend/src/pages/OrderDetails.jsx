import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "../services/orderService";
const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = API_URL.replace("/api", "");

function OrderDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const data = await getOrderById(id);

                setOrder(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchOrder();

    }, [id]);

    if (!order) {

        return (

            <div className="text-center py-20 text-2xl">

                Loading...

            </div>

        );

    }

    if (
        !order.products ||
        order.products.length === 0
    ) {

        return (

            <div className="text-center py-20 text-2xl">

                No Products Found

            </div>

        );

    }

    const statuses = [
        "Order Placed",
        "Confirmed",
        "Packed",
        "Shipped",
        "Out For Delivery",
        "Delivered",
    ];

    const currentIndex =
        statuses.indexOf(order.orderStatus);

    return (

        <section className="max-w-7xl mx-auto py-16 px-6">

            <h1 className="text-5xl font-bold mb-12">
                Order Details
            </h1>

            <div className="grid md:grid-cols-3 gap-8">

                {/* Left Section */}

                <div className="md:col-span-2 space-y-8">

                    {/* Product Information */}

                    <div className="bg-white shadow-xl rounded-3xl p-8">

                        <h2 className="text-3xl font-bold mb-6">
                            Product Information
                        </h2>

                        <div className="flex gap-6">

                            <img
                                src={`${IMAGE_URL}${order.products[0].product.image}`}
                                alt={order.products[0].product.name}
                                className="w-40 h-40 object-contain bg-gray-100 rounded-2xl p-4"
                            />

                            <div>

                                <h3 className="text-2xl font-bold">
                                    {order.products[0].product.name}
                                </h3>

                                <p className="mt-3">
                                    Quantity: {order.products[0].quantity}
                                </p>

                                <p className="mt-2">
                                    Price: ₹
                                    {order.products[0].product.price}
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Tracking */}

                    <div className="bg-white shadow-xl rounded-3xl p-8">

                        <h2 className="text-3xl font-bold mb-8">
                            Order Tracking
                        </h2>

                        <div className="flex flex-wrap gap-3">

                            {statuses.map((status, index) => (

                                <div
                                    key={status}
                                    className={`px-4 py-2 rounded-full
                                    ${index <= currentIndex
                                            ? "bg-green-100 text-green-600"
                                            : "bg-gray-100 text-gray-400"
                                        }`}
                                >
                                    {index <= currentIndex ? "✓ " : ""}
                                    {status}
                                </div>

                            ))}

                        </div>

                    </div>

                    {/* Shipping Address */}

                    <div className="bg-white shadow-xl rounded-3xl p-8">

                        <h2 className="text-3xl font-bold mb-6">
                            Shipping Address
                        </h2>

                        <p>{order.shippingInfo.fullName}</p>

                        <p>{order.shippingInfo.address}</p>

                        <p>
                            {order.shippingInfo.city},
                            {" "}
                            {order.shippingInfo.state}
                        </p>

                        <p>
                            {order.shippingInfo.pincode}
                        </p>

                        <p>
                            {order.shippingInfo.phone}
                        </p>

                        <p>
                            {order.shippingInfo.email}
                        </p>

                    </div>

                </div>

                {/* Right Section */}

                <div className="space-y-8">

                    {/* Order Summary */}

                    <div className="bg-white shadow-xl rounded-3xl p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-3">

                            <div className="flex justify-between">

                                <span>Order ID</span>

                                <span>{order._id}</span>

                            </div>

                            <div className="flex justify-between">

                                <span>Order Date</span>

                                <span>
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Delivered</span>

                                <span>
                                    {order.deliveredAt
                                        ? new Date(
                                            order.deliveredAt
                                        ).toLocaleDateString()
                                        : "Not Delivered Yet"}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Payment</span>

                                <span>
                                    {order.paymentMethod}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Status</span>

                                <span
                                    className={
                                        order.orderStatus === "Delivered"
                                            ? "text-green-600"
                                            : order.orderStatus === "Cancelled"
                                                ? "text-red-600"
                                                : "text-blue-600"
                                    }
                                >
                                    {order.orderStatus}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Price Details */}

                    <div className="bg-white shadow-xl rounded-3xl p-8">

                        <h2 className="text-2xl font-bold mb-6">
                            Price Details
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between">

                                <span>Product Price</span>

                                <span>
                                    ₹{
                                        order.products[0].product.price *
                                        order.products[0].quantity
                                    }
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Shipping</span>

                                <span>Free</span>

                            </div>

                            <div className="flex justify-between">

                                <span>GST</span>

                                <span>₹0</span>

                            </div>

                            <hr />

                            <div className="flex justify-between font-bold text-xl">

                                <span>Total</span>

                                <span>
                                    ₹{order.totalPrice}
                                </span>

                            </div>

                        </div>

                    </div>

                    <button
                        onClick={() =>
                            navigate(`/invoice/${order._id}`)
                        }
                        className="w-full bg-black text-white py-4 rounded-full"
                    >
                        View Invoice
                    </button>

                </div>

            </div>

        </section>

    );

}

export default OrderDetails;