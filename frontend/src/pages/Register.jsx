import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";


function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await registerUser({
                name,
                email,
                password,
            });
            toast.success("Registration Successful");

            navigate("/login");

            // toast.success("OTP sent to your email.");

            // navigate(
            //     "/verify-otp",
            //     {
            //         state: {
            //             email,
            //         },
            //     }
            // );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }
    };

    return (
        <section className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">

            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

                {/* Left Side */}

                <div className="bg-black text-white p-12 flex flex-col justify-center">

                    <h1 className="text-5xl font-bold">
                        AppleStore
                    </h1>

                    <p className="mt-6 text-gray-300 text-lg">
                        Join the future of premium technology shopping.
                    </p>

                    <div className="mt-10 space-y-4">

                        <div className="flex items-center gap-3">
                            <span>✓</span>
                            <p>Premium Products</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span>✓</span>
                            <p>Secure Payments</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span>✓</span>
                            <p>Fast Delivery</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span>✓</span>
                            <p>24/7 Support</p>
                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <div className="p-12">

                    <h2 className="text-4xl font-bold">
                        Create Account
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Create your account to continue shopping.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                        >
                            Create Account

                        </button>

                    </form>

                    <div className="text-center mt-6">

                        <p className="text-gray-500">

                            Already have an account?

                            <Link
                                to="/login"
                                className="ml-2 font-semibold text-black hover:underline"
                            >
                                Login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Register;