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

                <div className="flex justify-between items-center mb-10">

                    <div>

                        <h1 className="text-5xl font-bold">
                            Manage Orders
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View, track and manage customer orders.
                        </p>

                    </div>

                    <div className="bg-white shadow rounded-2xl px-6 py-4">

                        <p className="text-sm text-gray-500">
                            Total Orders
                        </p>

                        <h2 className="text-3xl font-bold">
                            {orders.length}
                        </h2>

                    </div>

                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-black text-white">

                            <tr>

                                <th className="py-4 px-2 text-left">
                                    Customer
                                </th>

                                <th className="py-4 px-2 text-left">
                                    Product
                                </th>

                                <th className="py-4 px-2 text-left">
                                    Total
                                </th>

                                <th className="py-4 px-2 text-left">
                                    Payment
                                </th>

                                <th className="py-4 px-2 text-left">
                                    Status
                                </th>

                                <th className="py-4 px-2 text-left">
                                    Date
                                </th>
                                <th className="py-4 px-2 text-left">
                                    Update Status
                                </th>
                                <th className="py-4 px-2 text-left">
                                    Return Reason
                                </th>
                                <th className="py-4 px-2 text-left">
                                    Returned Date
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {orders.map((order) => (

                                <tr
                                    key={order._id}
                                    className="border-b hover:bg-slate-200  transition duration-300"
                                >

                                    <td className="py-4 px-2">

                                        <div className="flex items-center gap-3">

                                            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold">

                                                {order.shippingInfo?.fullName?.charAt(0)}

                                            </div>

                                            <div>

                                                <p className="font-semibold">

                                                    {order.shippingInfo?.fullName}

                                                </p>

                                                <p className="text-sm text-gray-500">

                                                    {order.shippingInfo?.email}

                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="py-4 px-2">

                                        <div>

                                            <p className="font-semibold">

                                                {order.products[0]?.product?.name}

                                            </p>

                                            <p className="text-xs text-gray-500">

                                                {order.products.length} Item(s)

                                            </p>

                                        </div>

                                    </td>

                                    <td className="font-bold text-lg">

                                        ₹{order.totalPrice}

                                    </td>

                                    <td className="py-4 px-2">
                                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">

                                            {order.paymentMethod}

                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-semibold

                                                ${order.orderStatus === "Delivered"

                                                    ?

                                                    "bg-green-100 text-green-700"

                                                    :

                                                    order.orderStatus === "Cancelled"

                                                        ?

                                                        "bg-red-100 text-red-700"

                                                        :

                                                        order.orderStatus === "Returned"

                                                            ?

                                                            "bg-orange-100 text-orange-700"

                                                            :

                                                            order.orderStatus === "Confirmed"

                                                                ?

                                                                "bg-blue-100 text-blue-700"

                                                                :

                                                                "bg-yellow-100 text-yellow-700"

                                                }

                                            `}
                                        >

                                            {order.orderStatus}

                                        </span>
                                    </td>

                                    <td className="py-4 px-2">
                                        {
                                            new Date(
                                                order.createdAt
                                            ).toLocaleDateString()
                                        }
                                    </td>

                                    <td className="py-4 px-2">
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
                                                    className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
                                    <td className="py-4 px-2">
                                        <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg">

                                            {order.returnReason || "-"}

                                        </span>
                                    </td>

                                    <td className="py-4 px-2 text-gray">
                                        {
                                            order.returnedAt
                                                ?
                                                new Date(order.returnedAt).toLocaleDateString()
                                                :
                                                "-"
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