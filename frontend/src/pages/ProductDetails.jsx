import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProductById, getProducts, getProductReviews } from "../services/productService";
import { useEffect, useState } from "react";



function ProductDetails({ cartItems, setCartItems }) {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const productData =
                    await getProductById(id);

                setProduct(productData);

                const reviewData =
                    await getProductReviews(id);

                setReviews(reviewData);

                const allProducts =
                    await getProducts();

                const filteredProducts =
                    allProducts.filter(
                        item => item._id !== productData._id
                    );

                setRecommendedProducts(
                    filteredProducts.slice(0, 3)
                );

            } catch (error) {

                console.error(error);

            }

        };

        fetchProduct();

    }, [id]);

    const navigate = useNavigate();

    if (!product) {

        return (
            <h1 className="text-center text-4xl py-20">
                Loading...
            </h1>
        );

    }


    const addToCart = () => {
        const existingItem = cartItems.find((item) => item._id === product._id);

        if (existingItem) {
            const updatedCart = cartItems.map((item) =>
                item._id === product._id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item,
            );

            setCartItems(updatedCart);
        } else {
            setCartItems([
                ...cartItems,
                {
                    ...product,
                    quantity: 1,
                },
            ]);
        }
        navigate("/cart");
    };

    return (
        <section className="max-w-7xl mx-auto py-20 px-6">
            {/* Product Section */}

            <div className="grid md:grid-cols-2 gap-12">
                {/* Product Image */}

                <div className="bg-gray-100 rounded-3xl p-10 shadow-lg">
                    <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full" />
                </div>

                {/* Product Info */}

                <div>
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
                        {product.discount}
                    </span>

                    <h1 className="text-5xl font-bold mt-6">{product.name}</h1>

                    <p className="text-yellow-500 mt-4 text-xl">⭐ {product.rating}</p>

                    <p className="text-gray-500 mt-4">{product.category}</p>

                    <div className="flex gap-4 items-center mt-6">
                        <span className="text-4xl font-bold">₹{product.price}</span>

                        <span className="line-through text-gray-400 text-xl">
                            ₹{product.oldPrice}
                        </span>
                    </div>

                    <p className="text-green-600 mt-4 font-semibold">{product.stock}</p>

                    <p className="mt-6 text-gray-600 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Features */}

                    <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-4">Features</h2>

                        <ul className="space-y-3">
                            {product.features.map((feature, index) => (
                                <li key={index} className="bg-gray-100 px-4 py-3 rounded-xl">
                                    ✓ {feature}
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Buttons */}

                    <div className="flex gap-4 mt-10">
                        <button
                            onClick={addToCart}
                            className="bg-black text-white px-8 py-3 rounded-full"
                        >
                            Add To Cart
                        </button>

                        <button className="border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Specifications */}

            {/* <div className="mt-24">

    <h2 className="text-4xl font-bold mb-8">
      Specifications
    </h2>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-gray-100 p-5 rounded-xl">
        Brand : Apple
      </div>

      <div className="bg-gray-100 p-5 rounded-xl">
        Warranty : 1 Year
      </div>

      <div className="bg-gray-100 p-5 rounded-xl">
        Free Delivery
      </div>

      <div className="bg-gray-100 p-5 rounded-xl">
        Secure Payment
      </div>

    </div>

  </div> */}

            {/* Recommended Products */}

            <div className="mt-24">
                <div className="text-center mb-12">
                    <p className="text-gray-500 uppercase tracking-widest">
                        You May Also Like
                    </p>

                    <h2 className="text-5xl font-bold mt-2">Recommended Products</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {recommendedProducts.map((item) => (
                        <ProductCard
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            category={item.category}
                            price={item.price}
                            oldPrice={item.oldPrice}
                            image={item.image}
                            rating={item.rating}
                            discount={item.discount}
                            stock={item.stock}
                        />
                    ))}
                </div>
            </div>

            {/* Shipping Benefits */}

            <div className="mt-24">
                <h2 className="text-4xl font-bold mb-8">Why Shop With Us</h2>

                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                        🚚
                        <h3 className="font-bold mt-3">Free Delivery</h3>
                    </div>

                    <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                        🔄
                        <h3 className="font-bold mt-3">Easy Returns</h3>
                    </div>

                    <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                        🔒
                        <h3 className="font-bold mt-3">Secure Payment</h3>
                    </div>

                    <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                        🛡️
                        <h3 className="font-bold mt-3">Warranty</h3>
                    </div>
                </div>
            </div>

            {/* Reviews */}

            <div className="mt-24">

                <h2 className="text-2xl font-bold mb-4">
                    Customer Reviews
                </h2>

                {
                    reviews.length === 0 ? (

                        <p className="text-gray-500">
                            No reviews yet
                        </p>

                    ) : (

                        reviews.map((review) => (

                            <div
                                key={review._id}
                                className="bg-gray-100 p-4 rounded-xl mb-3"
                            >

                                <p className="font-bold">
                                    {review.user?.name}
                                </p>

                                <p className="text-yellow-500">
                                    {"⭐".repeat(
                                        review.rating
                                    )}
                                </p>

                                <p>
                                    {review.feedback}
                                </p>

                            </div>

                        ))

                    )
                }

            </div>
        </section>
    );
}

export default ProductDetails;
