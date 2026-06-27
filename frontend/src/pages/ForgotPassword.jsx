import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const { data } = await axios.post(

                "http://localhost:5000/api/users/forgot-password",

                { email }

            );

            toast.message(data.message);

            navigate(

                "/reset-password",

                {

                    state: {

                        email

                    }

                }

            );

        }

        catch (error) {

            toast.error(

                error.response?.data?.message

            );

        }

    };

    return (

        <section className="min-h-screen flex justify-center items-center bg-gray-100">

            <form

                onSubmit={handleSubmit}

                className="bg-white p-10 rounded-3xl shadow-xl w-[450px]"

            >

                <h1 className="text-4xl font-bold mb-6">

                    Forgot Password

                </h1>

                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e) =>

                        setEmail(e.target.value)

                    }
                    className="w-full border rounded-xl p-3"
                />

                <button
                    className="w-full mt-6 bg-black text-white py-3 rounded-xl"
                >
                    Send OTP
                </button>

            </form>

        </section>

    );

}

export default ForgotPassword;