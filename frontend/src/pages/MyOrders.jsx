function MyOrders() {

    const orders = [

        {
            id: "ORD001",
            productName: "MacBook Pro",
            image: "http://localhost:5000/assets/products/laptop.webp",
            quantity: 1,
            totalPrice: 65000,
            paymentMethod: "COD",
            status: "Delivered",
            orderDate: "2026-07-10",
            deliveredDate: "2026-07-15",
            feedbackGiven: false,
        },

        {
            id: "ORD002",
            productName: "iPhone 15 Pro",
            image: "http://localhost:5000/assets/products/iphone.webp",
            quantity: 1,
            totalPrice: 75000,
            paymentMethod: "UPI",
            status: "Shipped",
            orderDate: "2026-07-15",
            feedbackGiven: false,
        },

        {
            id: "ORD003",
            productName: "Apple Watch",
            image: "http://localhost:5000/assets/products/watch.webp",
            quantity: 1,
            totalPrice: 25000,
            paymentMethod: "Card",
            status: "Packed",
            orderDate: "2026-07-20",
            feedbackGiven: false,
        },

        {
            id: "ORD004",
            productName: "AirPods Pro",
            image: "http://localhost:5000/assets/products/headphone.webp",
            quantity: 1,
            totalPrice: 18000,
            paymentMethod: "UPI",
            status: "Out For Delivery",
            orderDate: "2026-07-21",
            feedbackGiven: false,
        }

    ];


    const canCancelOrder = (status) => {
        return (
            status === "Order Placed" ||
            status === "Confirmed" ||
            status === "Packed"
        );
    };

    const canReturnOrder = (
        status,
        deliveredDate
    ) => {

        if (
            status !== "Delivered" ||
            !deliveredDate
        ) {
            return false;
        }

        const today = new Date();

        const delivered =
            new Date(deliveredDate);

        const diffDays = Math.floor(
            (today - delivered) /
            (1000 * 60 * 60 * 24)
        );

        return diffDays <= 7;
    };

    const canGiveFeedback = (
        status,
        feedbackGiven
    ) => {

        return (
            status === "Delivered" &&
            !feedbackGiven
        );

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

    return (
        <section className="max-w-7xl mx-auto py-16 px-6">

            <h1 className="text-5xl font-bold mb-10">
                My Orders
            </h1>

            <div className="space-y-6">

                {orders.map((order) => (

                    <div
                        key={order.id}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition"
                    >

                        <div className="p-8">

                            <div className="flex flex-col md:flex-row gap-8">

                                {/* Image */}

                                <div className="bg-gray-100 p-5 rounded-2xl">

                                    <img
                                        src={order.image}
                                        alt={order.productName}
                                        className="w-40 h-40 object-contain"
                                    />

                                </div>

                                {/* Info */}

                                <div className="flex-1">

                                    <div className="flex justify-between flex-wrap gap-4">

                                        <div>

                                            <h2 className="text-3xl font-bold">
                                                {order.productName}
                                            </h2>

                                            <p className="text-gray-500 mt-1">
                                                Order ID: {order.id}
                                            </p>

                                            <p className="text-gray-500">
                                                Ordered: {order.orderDate}
                                            </p>

                                        </div>

                                        <span
                                            className={`px-4 py-2 rounded-xl text-sm font-semibold ${getStatusColor(order.status)}`}
                                        >
                                            {order.status}
                                        </span>

                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6 mt-8">

                                        <div>

                                            <p className="text-gray-500">
                                                Quantity
                                            </p>

                                            <p className="font-bold">
                                                {order.quantity}
                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-gray-500">
                                                Payment
                                            </p>

                                            <p className="font-bold">
                                                {order.paymentMethod}
                                            </p>

                                        </div>

                                        <div>

                                            <p className="text-gray-500">
                                                Total
                                            </p>

                                            <p className="font-bold text-xl">
                                                ₹{order.totalPrice}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Timeline */}
                                    <div className="mt-8">

                                        <div className="flex flex-wrap gap-3">

                                            {orderSteps.map((step, index) => {

                                                const currentIndex =
                                                    orderSteps.indexOf(order.status);

                                                return (

                                                    <div
                                                        key={index}
                                                        className={`px-4 py-2 rounded-full text-sm font-medium
                    ${index <= currentIndex
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

                                        <button className="bg-black text-white px-6 py-3 rounded-full">
                                            View Details
                                        </button>

                                        {
                                            canCancelOrder(order.status) && (
                                                <button className="border border-red-500 text-red-500 px-6 py-3 rounded-full">
                                                    Cancel Order
                                                </button>
                                            )}

                                        {
                                            canReturnOrder(
                                                order.status,
                                                order.deliveredDate
                                            ) && (
                                                <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-full">
                                                    Return Product
                                                </button>
                                            )}

                                        {
                                            canGiveFeedback(
                                                order.status,
                                                order.feedbackGiven
                                            ) && (
                                                <button className="bg-yellow-500 text-white px-6 py-3 rounded-full">
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