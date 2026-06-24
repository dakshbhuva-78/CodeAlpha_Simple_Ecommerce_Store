import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
} from "../services/adminProductService";
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
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain"
                    />

                  </td>

                  <td className="p-4 font-semibold">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4">
                    ₹{product.price}
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4 flex gap-3">

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/edit-product/${product._id}`
                        )
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
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