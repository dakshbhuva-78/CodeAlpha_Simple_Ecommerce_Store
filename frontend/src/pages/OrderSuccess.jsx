import { useNavigate } from "react-router-dom";

function OrderSuccess() {

  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <div className="text-8xl">
          🎉
        </div>

        <h1 className="text-5xl font-bold mt-6">
          Order Placed Successfully
        </h1>

        <p className="text-gray-500 mt-4">
          Thank you for shopping with AppleStore.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-8 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Continue Shopping
        </button>

      </div>

    </section>
  );
}

export default OrderSuccess;