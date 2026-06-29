import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FaStar, FaRegCommentDots } from "react-icons/fa";
import { getAllFeedbacks } from "../services/adminService";
import Loader from "../components/Loader";

function AdminFeedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            setLoading(true);

            const data = await getAllFeedbacks();
            setFeedbacks(data); 
            
            setLoading(false);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <Loader />;
    }
    return (
        <AdminLayout>

            <section className="max-w-7xl mx-auto py-10 md:py-16 px-4 md:px-6">
                {/* Header */}

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

                    <div>

                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                            Customer Reviews
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View customer feedback and ratings for your products.
                        </p>

                    </div>

                    <div className="bg-white shadow-xl rounded-3xl px-5 py-4 flex items-center justify-between lg:justify-start gap-4 w-full lg:w-auto">
                        <p className="text-gray-500 text-sm">
                            Total Reviews
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold">
                            {feedbacks.length}
                        </h2>

                    </div>

                </div>

                {/* No Feedback */}

                {feedbacks.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 text-center">

                        <FaRegCommentDots className="text-5xl md:text-6xl mx-auto text-gray-300 mb-6" />

                        <h2 className="text-2xl md:text-3xl font-bold mb-3">
                            No Reviews Yet
                        </h2>

                        <p className="text-gray-500">
                            Customer feedback will appear here after purchases.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">

                        {feedbacks.map((item) => (

                            <div
                                key={item._id}
                                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-5 md:p-8"                            >

                                {/* Customer */}

                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5">

                                    <div className="flex gap-4">

                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center text-xl font-bold">

                                            {item.user?.name?.charAt(0)}

                                        </div>

                                        <div>

                                            <h3 className="text-lg md:text-xl font-bold break-words">
                                                {item.user?.name}
                                            </h3>

                                            <p className="text-gray-500 text-sm break-all">
                                                {item.user?.email}
                                            </p>

                                        </div>

                                    </div>

                                    <span className="bg-blue-100 text-blue-700 text-xs md:text-sm font-semibold px-3 md:px-4 py-2 rounded-full self-start">
                                        {item.products[0]?.product?.name}

                                    </span>

                                </div>

                                {/* Rating */}

                                <div className="flex flex-wrap items-center gap-1 mt-5">
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

                                <div className="mt-5 bg-gray-50 rounded-2xl p-4 md:p-5">
                                    <p className="text-gray-700 leading-7 italic break-words">
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