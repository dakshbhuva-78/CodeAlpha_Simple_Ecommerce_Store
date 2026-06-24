import {
    useEffect,
    useState
} from "react";

import {
    getAllFeedbacks
} from "../services/adminService";

import AdminLayout from "../components/AdminLayout";

function AdminFeedbacks() {

    const [feedbacks,
        setFeedbacks] = useState([]);

    useEffect(() => {

        fetchFeedbacks();

    }, []);

    const fetchFeedbacks =
        async () => {

            try {

                const data =
                    await getAllFeedbacks();

                setFeedbacks(data);

            } catch (error) {

                console.log(error);

            }

        };

    return (
        <AdminLayout>
        <div>

            <h1 className="text-5xl font-bold mb-10">
                Customer Feedbacks
            </h1>

            <div className="space-y-6">

                {feedbacks.map((item) => (

                    <div
                        key={item._id}
                        className="bg-white p-6 rounded-2xl shadow"
                    >

                        <h3 className="font-bold text-xl">
                            {item.user?.name}
                        </h3>

                        <p className="text-gray-500">
                            {
                                item.products[0]
                                ?.product?.name
                            }
                        </p>

                        <p className="text-yellow-500 mt-2">
                            {"⭐".repeat(
                                item.rating
                            )}
                        </p>

                        <p className="mt-3">
                            {item.feedback}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    </AdminLayout>
);

}

export default AdminFeedbacks;