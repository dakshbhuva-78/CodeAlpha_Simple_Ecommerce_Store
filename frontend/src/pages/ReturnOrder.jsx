import {
    useParams,
    useNavigate
} from "react-router-dom";

import {
    useState
} from "react";

import {
    returnOrder
}
    from "../services/orderService";
import toast from "react-hot-toast";

function ReturnOrder() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const [reason,
        setReason] =
        useState("");

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                await returnOrder(
                    id,
                    reason
                );

                toast.success(
                    "Return Request Submitted"
                );

                navigate(
                    "/my-orders"
                );

            } catch (error) {

                console.log(error);

            }

        };

    return (

        <section className="max-w-3xl mx-auto py-16 px-6">

            <h1 className="text-5xl font-bold mb-8">
                Return Order
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl p-8 rounded-3xl"
            >

                <textarea
                    placeholder="Reason for return"
                    value={reason}
                    onChange={(e) =>
                        setReason(
                            e.target.value
                        )
                    }
                    className="w-full border p-4 rounded-xl h-40"
                    required
                />

                <button
                    className="bg-black text-white px-8 py-3 rounded-xl mt-5"
                >
                    Submit Return Request
                </button>

            </form>

        </section>

    );

}

export default ReturnOrder;