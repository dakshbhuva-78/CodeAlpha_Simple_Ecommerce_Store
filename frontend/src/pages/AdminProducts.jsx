import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
} from "../services/adminProductService";
import {
  FaEdit,
  FaTrash
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_URL = API_URL.replace("/api", "");

function AdminProducts() {

  const [products, setProducts] =
    useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {
      setLoading(true);

      const data =
        await getProducts();

      setProducts(data);
      setLoading(false);

    } catch (error) {

      console.log(error);

    } finally {
      setLoading(false);
    }

  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      fetchProducts();

      toast.success(
        "Product Deleted Successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error("Delete Failed");

    }

  };
  
  if (loading) {
    return <Loader />;
  }
  return (

    <AdminLayout>

      <section className="max-w-7xl mx-auto py-8 md:py-16 px-4 md:px-6">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-10">

          <h1 className="text-3xl md:text-5xl font-bold">
            Manage Products
          </h1>

          <button
            onClick={() =>
              navigate("/admin/add-product")
            }
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl w-full md:w-auto"          >
            Add Product
          </button>

        </div>

        <div className="hidden md:block bg-white rounded-3xl shadow-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-black text-white">

              <tr>

                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Stock
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product._id}
                  className="border-b"
                >

                  <td className="p-4">

                    <img
                      src={`${IMAGE_URL}${product.image}`}
                      alt={product.name}
                      className="w-18 h-18 rounded-xl object-cover bg-gray-50 p-2"
                    />

                  </td>

                  <td>
                    <div>
                      <p className="font-semibold text-lg">
                        {product.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        #{product._id.slice(-6)}
                      </p>
                    </div>
                  </td>

                  <td className="">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                      {product.category}
                    </span>
                  </td>

                  <td className="">
                    <div>
                      <p className="font-bold text-lg">
                        ₹{product.price}
                      </p>

                      <p className="text-sm text-gray-400 line-through">
                        ₹{product.oldPrice}
                      </p>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${product.stock === "In Stock"
                        ?
                        "bg-green-100 text-green-700"
                        :
                        "bg-red-100 text-red-700"
                        }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="pt-8 flex gap-2">

                    <button onClick={() =>
                      navigate(
                        `/admin/edit-product/${product._id}`
                      )
                    }
                      className="bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center"
                    >
                      <FaEdit />
                    </button>

                    <button onClick={() =>
                      handleDelete(product._id)
                    }
                      className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-xl flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>

                  </td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="md:hidden space-y-5">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white rounded-3xl shadow-lg p-5"
            >

              <div className="flex gap-4">

                <img
                  src={`${IMAGE_URL}${product.image}`}
                  alt={product.name}
                  className="w-24 h-24 rounded-2xl object-cover bg-gray-100 p-2"
                />

                <div className="flex-1">

                  <h3 className="font-bold text-lg">

                    {product.name}

                  </h3>

                  <p className="text-gray-500 text-sm mt-1">

                    #{product._id.slice(-6)}

                  </p>

                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">

                    {product.category}

                  </span>

                </div>

              </div>

              <div className="mt-5 flex justify-between items-center">

                <div>

                  <p className="font-bold text-xl">

                    ₹{product.price}

                  </p>

                  <p className="text-sm text-gray-400 line-through">

                    ₹{product.oldPrice}

                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${product.stock === "In Stock"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >

                  {product.stock}

                </span>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">

                <button
                  onClick={() =>
                    navigate(`/admin/edit-product/${product._id}`)
                  }
                  className="bg-blue-500 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                >

                  <FaEdit />

                  Edit

                </button>

                <button
                  onClick={() =>
                    handleDelete(product._id)
                  }
                  className="bg-red-500 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                >

                  <FaTrash />

                  Delete

                </button>

              </div>

            </div>

          ))}

        </div>

      </section>
    </AdminLayout>
  );

}

export default AdminProducts;