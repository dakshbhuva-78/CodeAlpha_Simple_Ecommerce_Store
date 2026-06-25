import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FaStar, FaRegCommentDots } from "react-icons/fa";
import { getAllFeedbacks } from "../services/adminService";

function AdminFeedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const data = await getAllFeedbacks();
            setFeedbacks(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminLayout>

            <section className="max-w-7xl mx-auto py-16 px-6">

                {/* Header */}

                <div className="flex justify-between items-center mb-10">

                    <div>

                        <h1 className="text-5xl font-bold">
                            Customer Reviews
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View customer feedback and ratings for your products.
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg px-6 py-4">

                        <p className="text-gray-500 text-sm">
                            Total Reviews
                        </p>

                        <h2 className="text-3xl font-bold">
                            {feedbacks.length}
                        </h2>

                    </div>

                </div>

                {/* No Feedback */}

                {feedbacks.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

                        <FaRegCommentDots className="text-6xl mx-auto text-gray-300 mb-6" />

                        <h2 className="text-3xl font-bold mb-3">
                            No Reviews Yet
                        </h2>

                        <p className="text-gray-500">
                            Customer feedback will appear here after purchases.
                        </p>

                    </div>

                ) : (

                    <div className="grid lg:grid-cols-2 gap-8">

                        {feedbacks.map((item) => (

                            <div
                                key={item._id}
                                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-8"
                            >

                                {/* Customer */}

                                <div className="flex justify-between items-start">

                                    <div className="flex gap-4">

                                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center text-xl font-bold">

                                            {item.user?.name?.charAt(0)}

                                        </div>

                                        <div>

                                            <h3 className="text-xl font-bold">
                                                {item.user?.name}
                                            </h3>

                                            <p className="text-gray-500 text-sm">
                                                {item.user?.email}
                                            </p>

                                        </div>

                                    </div>

                                    <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full">

                                        {item.products[0]?.product?.name}

                                    </span>

                                </div>

                                {/* Rating */}

                                <div className="flex items-center gap-1 mt-6">

                                    {Array.from({
                                        length: item.rating
                                    }).map((_, index) => (

                                        <FaStar
                                            key={index}
                                            className="text-yellow-400"
                                        />

                                    ))}

                                    <span className="ml-2 text-gray-600">

                                        ({item.rating}/5)

                                    </span>

                                </div>

                                {/* Review */}

                                <div className="mt-6 bg-gray-50 rounded-2xl p-5">

                                    <p className="text-gray-700 leading-7 italic">

                                        "{item.feedback}"

                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </AdminLayout>
    );
}

export default AdminFeedbacks;