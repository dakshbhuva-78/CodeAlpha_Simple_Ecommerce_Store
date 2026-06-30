import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService.js";
import { useState } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = API_URL.replace("/api", "");

function Checkout({ cartItems, setCartItems }) {

  const navigate = useNavigate();

  const placeOrder = async () => {

    if (
      !shippingInfo.fullName ||
      !shippingInfo.phone ||
      !shippingInfo.email ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.pincode
    ) {
      return toast.error("Please fill all fields");
    }

    if (!/^[0-9]{10}$/.test(shippingInfo.phone)) {
      return toast.error("Enter valid phone number");
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        shippingInfo.email
      )
    ) {
      return toast.error("Enter valid email");
    }

    if (!/^[0-9]{6}$/.test(shippingInfo.pincode)) {
      return toast.error("Enter valid pincode");
    }

    try {

      const orderData = {

        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),

        totalPrice: total,

        paymentMethod,

        shippingInfo,

      };

      await createOrder(orderData);

      setCartItems([]);

      localStorage.removeItem("cart");

      navigate("/OrderSuccess");

    } catch (error) {

      console.log(error);

      console.log(error.response);

      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
        "Order Failed"
      );

    }

  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

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
              value={shippingInfo.fullName}
              onChange={(e) => setShippingInfo({
                ...shippingInfo,
                fullName: e.target.value,
              })
              }
              className="border rounded-xl px-4 py-3"

            />

            <input
              type="text"
              placeholder="Phone Number"
              value={shippingInfo.phone}
              onChange={(e) => setShippingInfo({
                ...shippingInfo,
                phone: e.target.value,
              })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={shippingInfo.email}
              onChange={(e) => setShippingInfo({
                ...shippingInfo,
                email: e.target.value,
              })
              }
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />

            <input
              type="text"
              placeholder="Address"
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo({
                ...shippingInfo,
                address: e.target.value,
              })
              }
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />

            <input
              type="text"
              placeholder="City"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({
                ...shippingInfo,
                city: e.target.value,
              })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="State"
              value={shippingInfo.state}
              onChange={(e) => setShippingInfo({
                ...shippingInfo,
                state: e.target.value,
              })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Pincode"
              value={shippingInfo.pincode}
              onChange={(e) => setShippingInfo({
                ...shippingInfo,
                pincode: e.target.value,
              })
              }
              className="border rounded-xl px-4 py-3"
            />

          </div>

          {/* Payment */}

          <h2 className="text-3xl font-bold mt-12 mb-6">
            Payment Method
          </h2>

          <div className="space-y-4">

            <label className="flex items-center gap-3 border p-4 rounded-xl">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "COD"}
                onChange={() =>
                  setPaymentMethod("COD")
                }
              />
              Cash On Delivery
            </label>

            <label className="flex items-center gap-3 border p-4 rounded-xl">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "UPI"}
                onChange={() =>
                  setPaymentMethod("UPI")
                }
              />
              UPI Payment
            </label>

            <label className="flex items-center gap-3 border p-4 rounded-xl">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "CARD"}
                onChange={() =>
                  setPaymentMethod("CARD")
                }
              />
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
                    src={`${IMAGE_URL}${item.image}`}
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