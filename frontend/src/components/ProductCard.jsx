function ProductCard({ name, price, image }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
      />

      <div className="p-6">
        <h2 className="text-2xl font-semibold">
          {name}
        </h2>

        <p className="text-gray-500 mt-2">
          Premium Product
        </p>

        <p className="text-xl font-bold mt-4">
          ₹{price}
        </p>

        <button className="mt-5 bg-black text-white px-5 py-2 rounded-full">
          View Details
        </button>
      </div>
    </div>
  );
}

export default ProductCard;