import { useEffect, useState } from "react";
import axios from "axios";
import {
    updateOrderStatus
} from "../services/adminOrderService";
import AdminLayout from "../components/AdminLayout";

function AdminOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const { data } = await axios.get(
                "http://localhost:5000/api/admin/orders",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setOrders(data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleStatusChange =
        async (id, status) => {

            try {

                await updateOrderStatus(
                    id,
                    status
                );

                fetchOrders();

            } catch (error) {

                console.log(error);

            }

        };

    return (
        <AdminLayout>
        <section className="max-w-7xl mx-auto py-16 px-6">

            <h1 className="text-5xl font-bold mb-10">
                Manage Orders
            </h1>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                <table className="w-full">

                    <thead className="bg-black text-white">

                        <tr>

                            <th className="p-4 text-left">
                                Customer
                            </th>

                            <th className="p-4 text-left">
                                Product
                            </th>

                            <th className="p-4 text-left">
                                Total
                            </th>

                            <th className="p-4 text-left">
                                Payment
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Date
                            </th>
                            <th className="p-4 text-left">
                                Update Status
                            </th>
                            <th className="p-4 text-left">
                                Return Reason
                            </th>
                            <th className="p-4 text-left">
                                Returned Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr
                                key={order._id}
                                className="border-b"
                            >

                                <td className="p-4">
                                    {order.shippingInfo?.fullName}
                                </td>

                                <td className="p-4">
                                    {order.products[0]?.product?.name}
                                </td>

                                <td className="p-4">
                                    ₹{order.totalPrice}
                                </td>

                                <td className="p-4">
                                    {order.paymentMethod}
                                </td>

                                <td>

                                    {
                                        order.orderStatus === "Delivered" ? (

                                            <span className="text-green-600 font-semibold">
                                                Delivered
                                            </span>

                                        ) :

                                            order.orderStatus === "Cancelled" ? (

                                                <span className="text-red-600 font-semibold">
                                                    Cancelled
                                                </span>

                                            ) :

                                                order.orderStatus === "Returned" ? (

                                                    <span className="text-orange-600 font-semibold">
                                                        Returned
                                                    </span>

                                                ) : (

                                                    <span className="text-blue-600 font-semibold">
                                                        {order.orderStatus}
                                                    </span>

                                                )

                                    }

                                </td>

                                <td className="p-4">
                                    {
                                        new Date(
                                            order.createdAt
                                        ).toLocaleDateString()
                                    }
                                </td>

                                <td className="p-4">
                                    {
                                        order.orderStatus === "Returned" ? (

                                            <span className="bg-red-100 text-red-600 px-4 py-2 rounded-xl">
                                                Returned
                                            </span>

                                        ) : (

                                            <select
                                                value={order.orderStatus}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        order._id,
                                                        e.target.value
                                                    )
                                                }
                                                className="border p-2 rounded-lg"
                                            >

                                                <option>Order Placed</option>
                                                <option>Confirmed</option>
                                                <option>Packed</option>
                                                <option>Shipped</option>
                                                <option>Out For Delivery</option>
                                                <option>Delivered</option>
                                                <option>Cancelled</option>

                                            </select>

                                        )
                                    }
                                </td>
                                <td className="p-4">
                                    {
                                        order.orderStatus === "Returned"
                                            ? order.returnReason
                                            : "-"
                                    }
                                </td>

                                <td className="p-4">
                                    {
                                        order.returnedAt
                                            ? new Date(
                                                order.returnedAt
                                            ).toLocaleDateString()
                                            : "-"
                                    }
                                </td>
                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </section>
        </AdminLayout>
    );

}

export default AdminOrders;