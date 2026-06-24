import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

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

            alert("Product Added Successfully");

            navigate("/admin/products");

        } catch (error) {

            console.log(error);

            alert("Failed To Add Product");

        }

    };

    return (
        <AdminLayout>
        <section className="max-w-4xl mx-auto py-16 px-6">

            <h1 className="text-5xl font-bold mb-10">
                Add Product
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-3xl p-8 space-y-5"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl"
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl"
                    required
                />

                <input
                    type="number"
                    name="oldPrice"
                    placeholder="Old Price"
                    value={formData.oldPrice}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl"
                />

                <input
                    type="text"
                    name="image"
                    placeholder="eg. /assets/products/iphone15pro.webp"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl"
                />

                <input
                    type="text"
                    name="discount"
                    placeholder="Discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl"
                />

                <textarea
                    name="features"
                    placeholder="Features (comma separated)"
                    value={formData.features}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl h-28"
                />


                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl h-32"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-8 py-3 rounded-xl"
                >
                    Add Product
                </button>

            </form>

        </section>
        </AdminLayout>
    );

}

export default AddProduct;