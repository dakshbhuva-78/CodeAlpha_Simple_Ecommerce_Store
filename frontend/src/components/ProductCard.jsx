import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = API_URL.replace("/api", "");

function ProductCard({
  id,
  name,
  category,
  price,
  oldPrice,
  image,
  rating,
  discount,
  stock,
}) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 relative">
      <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
        {discount}
      </span>

      <button className="absolute top-4 right-4 bg-white shadow p-2 rounded-full">
        ❤️
      </button>

      <img src={`${IMAGE_URL}${image}`} alt={name} className="w-full p-4 h-64 object-contain" />

      <div className="p-6">
        <p className="text-yellow-500">⭐ {rating}</p>

        <h2 className="text-2xl font-semibold mt-2">{name}</h2>

        <p className="text-gray-500 mt-1">{category}</p>

        <p className="text-green-600 mt-2 font-medium">{stock}</p>

        <div className="mt-3 flex gap-3 items-center">
          <span className="text-2xl font-bold">₹{price}</span>

          <span className="line-through text-gray-400">₹{oldPrice}</span>
        </div>

        <Link
          to={`/ProductDetails/${id}`}
          className="block text-center mt-5 bg-black text-white px-5 py-3 rounded-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
