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

function AdminProducts() {

  const [products, setProducts] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const data =
        await getProducts();

      setProducts(data);

    } catch (error) {

      console.log(error);

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

      alert(
        "Product Deleted Successfully"
      );

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  return (

    <AdminLayout>

      <section className="max-w-7xl mx-auto py-16 px-6">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-bold">
            Manage Products
          </h1>

          <button
            onClick={() =>
              navigate("/admin/add-product")
            }
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Add Product
          </button>

        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

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
                      src={`http://localhost:5000${product.image}`}
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

      </section>
    </AdminLayout>
  );

}

export default AdminProducts;