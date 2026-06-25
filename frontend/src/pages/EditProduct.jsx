import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getProductById,
    updateProduct,
} from "../services/adminProductService";
import AdminLayout from "../components/AdminLayout";

function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        oldPrice: "",
        image: "",
        discount: "",
        stock: "",
        description: "",
        features: "",
    });

    useEffect(() => {

        fetchProduct();

    }, []);

    const fetchProduct = async () => {

        try {

            const data =
                await getProductById(id);

            setFormData({
                name: data.name || "",
                category: data.category || "",
                price: data.price || "",
                oldPrice: data.oldPrice || "",
                image: data.image || "",
                discount: data.discount || "",
                stock: data.stock || "",
                features: data.features
                    ? data.features.join(", ")
                    : "",
                description: data.description || "",
            });

        } catch (error) {

            console.log(error);

        }

    };

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

            await updateProduct(
                id,
                productData
            );

            alert(
                "Product Updated Successfully"
            );

            navigate("/admin/products");

        } catch (error) {

            console.log(error);

            alert(
                "Failed To Update Product"
            );

        }

    };

    return (


        <AdminLayout>

            <section className="max-w-4xl mx-auto py-16 px-6">

                <div className="mb-10">

                    <h1 className="text-5xl font-bold">
                        Edit Product
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Update product information and save your changes.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl shadow-xl p-10 space-y-10"
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
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Product Name"
                                className="border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />

                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Category"
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
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="border rounded-xl p-4"
                                required
                            />

                            <input
                                type="number"
                                name="oldPrice"
                                value={formData.oldPrice}
                                onChange={handleChange}
                                placeholder="Old Price"
                                className="border rounded-xl p-4"
                            />

                            <input
                                type="text"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                placeholder="Discount"
                                className="border rounded-xl p-4"
                            />

                            <select
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="border rounded-xl p-4"
                            >
                                <option value="In Stock">
                                    In Stock
                                </option>

                                <option value="Out Of Stock">
                                    Out Of Stock
                                </option>
                            </select>

                        </div>

                    </div>

                    {/* Product Image */}

                    <div>

                        <h2 className="text-2xl font-bold mb-6">
                            🖼 Product Image
                        </h2>

                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="/uploads/macbook.webp"
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
                            placeholder="M4 Chip, Retina Display, Face ID..."
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
                            Update Product
                        </button>

                    </div>

                </form>

            </section>
        </AdminLayout>

    );

}

export default EditProduct;
