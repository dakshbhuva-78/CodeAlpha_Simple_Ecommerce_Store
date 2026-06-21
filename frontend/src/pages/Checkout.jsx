import { useNavigate } from "react-router-dom";

function Checkout({ cartItems, setCartItems }) {

  const navigate = useNavigate();

  const placeOrder = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    navigate("/OrderSuccess");
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">

      <h1 className="text-5xl font-bold mb-12">
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-10">

        {/* Left Section */}

        <div className="md:col-span-2 bg-white shadow-xl rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Shipping Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />

            <input
              type="text"
              placeholder="Address"
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />

            <input
              type="text"
              placeholder="City"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="State"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Pincode"
              className="border rounded-xl px-4 py-3"
            />

          </div>

          {/* Payment */}

          <h2 className="text-3xl font-bold mt-12 mb-6">
            Payment Method
          </h2>

          <div className="space-y-4">

            <label className="flex items-center gap-3 border p-4 rounded-xl">
              <input type="radio" name="payment" />
              Cash On Delivery
            </label>

            <label className="flex items-center gap-3 border p-4 rounded-xl">
              <input type="radio" name="payment" />
              UPI Payment
            </label>

            <label className="flex items-center gap-3 border p-4 rounded-xl">
              <input type="radio" name="payment" />
              Credit / Debit Card
            </label>

          </div>

        </div>

        {/* Right Section */}

        <div className="bg-white shadow-xl rounded-3xl p-8 h-fit sticky top-28">

          <h2 className="text-3xl font-bold mb-8">
            Order Summary
          </h2>

          <div className="space-y-4 mb-8">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-3"
              >
                {/* Product Thumbnail */}

                <div className="bg-gray-100 rounded-xl p-2">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain"
                  />

                </div>

                {/* Product Details */}

                <div className="flex-1 m-2">

                  <h4 className="font-semibold text-sm">
                    {item.name}
                  </h4>

                  <p className="text-gray-500 text-sm">
                    Qty: {item.quantity}
                  </p>                  

                </div>

                {/* Price */}

                <span className="font-bold">
                  ₹{item.price * item.quantity}
                </span>
              </div>

            ))}

          </div>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">
                Free
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹0</span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold">

              <span>Total</span>

              <span>₹{total}</span>

            </div>

          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-8 bg-black text-white py-4 rounded-full hover:bg-gray-800 transition"
          >
            Place Order
          </button>

        </div>

      </div>

    </section>
  );
}

export default Checkout;