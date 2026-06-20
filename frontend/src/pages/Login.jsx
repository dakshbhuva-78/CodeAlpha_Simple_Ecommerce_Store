import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-6">

      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left */}

        <div className="bg-black text-white p-12 flex flex-col justify-center">

          <h1 className="text-5xl font-bold">
            AppleStore
          </h1>

          <p className="mt-6 text-gray-300">
            Premium technology products
            for modern lifestyles.
          </p>

        </div>

        {/* Right */}

        <div className="p-12">

          <h2 className="text-4xl font-bold">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-3">
            Sign in to continue shopping
          </p>

          <form className="mt-8 space-y-5">

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-xl px-4 py-3"
            />

            <div className="flex justify-end">

              <a
                href="#"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>

            </div>

<Link to="/">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              Login
            </button>
            </Link>

            <div className="text-center mt-6">

              <p className="text-gray-500">

                Don't have an account?

                <Link
                  to="/register"
                  className="text-black font-semibold ml-2 hover:underline"
                >
                  Create Account
                </Link>

              </p>

            </div>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Login;