import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 px-6">

            <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-16 text-center max-w-xl w-full">

                <FaExclamationTriangle className="text-7xl text-yellow-500 mx-auto mb-6" />

                <h1 className="text-7xl font-bold text-gray-900">
                    404
                </h1>

                <h2 className="text-3xl font-bold mt-4">
                    Page Not Found
                </h2>

                <p className="text-gray-500 mt-4 leading-7">
                    The page you're looking for doesn't exist or may have been moved.
                </p>

                <Link
                    to="/"
                    className="inline-block mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
                >
                    Back to Home
                </Link>

            </div>

        </section>
    );
}

export default NotFound;