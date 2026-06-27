import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ResetPassword() {

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");

    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const { data } = await axios.post(

                "http://localhost:5000/api/users/reset-password",

                {

                    email,

                    otp,

                    password

                }

            );

            toast.message(data.message);

            navigate("/login");

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

                    Reset Password

                </h1>

                <input

                    type="text"

                    placeholder="OTP"

                    value={otp}

                    onChange={(e)=>

                        setOtp(e.target.value)

                    }

                    className="w-full border rounded-xl p-3 mb-4"

                />

                <input

                    type="password"

                    placeholder="New Password"

                    value={password}

                    onChange={(e)=>

                        setPassword(e.target.value)

                    }

                    className="w-full border rounded-xl p-3"

                />

                <button

                    className="w-full mt-6 bg-black text-white py-3 rounded-xl"

                >

                    Update Password

                </button>

            </form>

        </section>

    );

}

export default ResetPassword;