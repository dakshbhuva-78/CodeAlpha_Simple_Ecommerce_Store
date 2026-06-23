import { useNavigate } from "react-router-dom";

function Cart({
    cartItems,
    setCartItems
}) {

    const navigate = useNavigate();


    const increaseQty = (id) => {

        const updated = cartItems.map(item =>
            item._id === id
                ? {
                    ...item,
                    quantity: item.quantity + 1
                }
                : item
        );

        setCartItems(updated);
    };

    const decreaseQty = (id) => {

        const updated = cartItems.map(item =>
            item._id === id
                ? {
                    ...item,
                    quantity:
                        item.quantity > 1
                            ? item.quantity - 1
                            : 1
                }
                : item
        );

        setCartItems(updated);
    };

    const removeItem = (id) => {

        setCartItems(
            cartItems.filter(item => item._id !== id)
        );
    };

    const total = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    return (

        <section className="max-w-7xl mx-auto py-16 px-6">

            <div className="mb-12">

                <h1 className="text-5xl font-bold">
                    Shopping Cart
                </h1>

                <p className="text-gray-500 mt-2">
                    {cartItems.length} item(s) in your cart
                </p>

            </div>

            {cartItems.length === 0 ? (

                <div className="text-center py-28">

                    <div className="text-8xl mb-6">
                        🛒
                    </div>

                    <h2 className="text-4xl font-bold">
                        Your Cart Is Empty
                    </h2>

                    <p className="text-gray-500 mt-4">
                        Looks like you haven't added anything yet.
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                        className="mt-8 bg-black text-white px-8 py-3 rounded-full">
                        Continue Shopping
                    </button>

                </div>

            ) : (

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="md:col-span-2 space-y-6">

                        {cartItems.map(item => (

                            <div
                                key={item._id}
                                className="bg-white rounded-3xl shadow-lg p-6 flex gap-6 items-center hover:shadow-2xl transition"
                            >

                                <div className="bg-gray-100 rounded-2xl p-4">
                                    <img
                                        src={`http://localhost:5000${item.image}`}
                                        alt={item.name}
                                        className="w-32 h-32 object-contain"
                                    />
                                </div>

                                <div className="flex-1">

                                    <h2 className="text-2xl font-bold">
                                        {item.name}
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        {item.category}
                                    </p>

                                    <p className="text-2xl font-bold mt-3">
                                        ₹{item.price}
                                    </p>

                                    <div className="flex items-center gap-4 mt-5">

                                        <button
                                            onClick={() => decreaseQty(item._id)}
                                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-xl"
                                        >
                                            -
                                        </button>

                                        <span className="text-xl font-semibold">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => increaseQty(item._id)}
                                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-xl"
                                        >
                                            +
                                        </button>

                                    </div>

                                </div>

                                <div className="text-right">

                                    <p className="font-bold text-xl mb-5">
                                        ₹{item.price * item.quantity}
                                    </p>

                                    <button
                                        onClick={() => removeItem(item._id)}
                                        className="text-red-500 hover:text-red-700 font-medium"
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                    <div className="bg-white shadow-xl rounded-3xl p-8 sticky top-28">

                        <h2 className="text-3xl font-bold mb-8">
                            Order Summary
                        </h2>

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
                            onClick={() => navigate("/checkout")}
                            className="w-full mt-8 bg-black text-white py-4 rounded-full hover:bg-gray-800 transition">
                            Proceed To Checkout
                        </button>

                    </div>

                </div>

            )}

        </section>

    );
}

export default Cart;