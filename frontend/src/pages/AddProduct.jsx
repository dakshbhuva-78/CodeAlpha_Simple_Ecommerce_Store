import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";

function AddProduct() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        oldPrice: "",
        image: "",
        discount: "",
        stock: "In Stock",
        description: "",
        features: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const productData = {

                ...formData,

                features: formData.features
                    .split(",")
                    .map((item) => item.trim()),

            };

            await axios.post(
                "http://localhost:5000/api/products",
                productData
            );

            toast.success("Product Added Successfully");

            navigate("/admin/products");

        } catch (error) {

            console.log(error);

            toast.error("Failed To Add Product");

        }

    };

    return (
        <AdminLayout>
            <section className="max-w-4xl mx-auto py-8 md:py-16 px-4 md:px-6">

                <div className="mb-10">

                    <h1 className="text-3xl md:text-5xl font-bold">
                        Add New Product
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Fill in the product information to add it to your store.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl shadow-xl p-5 md:p-10 space-y-8"
                >

                    {/* Product Information */}

                    <div>

                        <h2 className="text-2xl font-bold mb-6">
                            📦 Product Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />

                            <input
                                type="text"
                                name="category"
                                placeholder="Category"
                                value={formData.category}
                                onChange={handleChange}
                                className="border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />

                        </div>

                    </div>

                    {/* Pricing */}

                    <div>

                        <h2 className="text-2xl font-bold mb-6">
                            💰 Pricing
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                                className="border rounded-xl p-4"
                                required
                            />

                            <input
                                type="number"
                                name="oldPrice"
                                placeholder="Old Price"
                                value={formData.oldPrice}
                                onChange={handleChange}
                                className="border rounded-xl p-4"
                            />

                            <input
                                type="text"
                                name="discount"
                                placeholder="Discount (Ex. 20% OFF)"
                                value={formData.discount}
                                onChange={handleChange}
                                className="border rounded-xl p-4"
                            />

                            <select
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="border rounded-xl p-4"
                            >

                                <option>In Stock</option>

                                <option>Out Of Stock</option>

                            </select>

                        </div>

                    </div>

                    {/* Media */}

                    <div>

                        <h2 className="text-2xl font-bold mb-6">
                            🖼 Product Image
                        </h2>

                        <input
                            type="text"
                            name="image"
                            placeholder="/uploads/macbook.webp"
                            value={formData.image}
                            onChange={handleChange}
                            className="border rounded-xl p-4 w-full"
                        />

                    </div>

                    {/* Description */}

                    <div>

                        <h2 className="text-2xl font-bold mb-6">
                            📝 Description
                        </h2>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write product description..."
                            className="border rounded-xl p-4 w-full h-36"
                        />

                    </div>

                    {/* Features */}

                    <div>

                        <h2 className="text-2xl font-bold mb-6">
                            ⭐ Features
                        </h2>

                        <textarea
                            name="features"
                            value={formData.features}
                            onChange={handleChange}
                            placeholder="M4 Chip, Retina Display, 18 Hours Battery..."
                            className="border rounded-xl p-4 w-full h-32"
                        />

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4 pt-6 border-t">

                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="px-8 py-3 rounded-xl border hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition"
                        >
                            Add Product
                        </button>

                    </div>

                </form>

            </section>
        </AdminLayout>
    );

}

export default AddProduct;