import { Link } from "react-router-dom";

function Register() {
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

                    <form className="mt-8 space-y-5">

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <Link to="/login" className="w-full text-center">
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                            >
                                Create Account

                            </button>
                        </Link>

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