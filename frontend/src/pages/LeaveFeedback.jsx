import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function LeaveFeedback() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [rating, setRating] = useState(5);

    const [feedback, setFeedback] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/orders/${id}/feedback`,
                {
                    rating,
                    feedback,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            toast.success("Feedback Submitted");

            navigate("/my-orders");

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <section className="max-w-3xl mx-auto py-16 px-6">

            <h1 className="text-5xl font-bold mb-10">
                Leave Feedback
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-3xl shadow-xl space-y-5"
            >

                <select
                    value={rating}
                    onChange={(e) =>
                        setRating(e.target.value)
                    }
                    className="w-full border p-3 rounded-xl"
                >
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                </select>

                <textarea
                    placeholder="Write your review"
                    value={feedback}
                    onChange={(e) =>
                        setFeedback(e.target.value)
                    }
                    className="w-full border p-3 rounded-xl h-40"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-8 py-3 rounded-xl"
                >
                    Submit Feedback
                </button>

            </form>

        </section>

    );
}

export default LeaveFeedback;