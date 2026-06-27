import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

function Products() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");

    const [sort, setSort] = useState("");

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const data = await getProducts();

                setProducts(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchProducts();

    }, []);

    const categories = [

        "All",

        ...new Set(products.map((item) => item.category))

    ];

    const filteredProducts = useMemo(() => {

        let filtered = [...products];

        // Search

        if (search) {

            filtered = filtered.filter((item) =>

                item.name.toLowerCase().includes(

                    search.toLowerCase()

                )

            );

        }

        // Category

        if (category !== "All") {

            filtered = filtered.filter(

                (item) => item.category === category

            );

        }

        // Sorting

        if (sort === "low") {

            filtered.sort(

                (a, b) => a.price - b.price

            );

        }

        if (sort === "high") {

            filtered.sort(

                (a, b) => b.price - a.price

            );

        }

        return filtered;

    }, [products, search, category, sort]);

    return (

        <section className="max-w-7xl mx-auto py-16 px-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

                <div>

                    <h1 className="text-5xl font-bold">

                        All Products

                    </h1>

                    <p className="text-gray-500 mt-2">

                        {filteredProducts.length} Products Found

                    </p>

                </div>

                <div className="flex flex-wrap gap-4">

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="border rounded-xl px-4 py-3 w-64 focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        className="border rounded-xl px-4 py-3"
                    >

                        {categories.map((item) => (

                            <option
                                key={item}
                                value={item}
                            >

                                {item}

                            </option>

                        ))}

                    </select>

                    <select
                        value={sort}
                        onChange={(e) =>
                            setSort(e.target.value)
                        }
                        className="border rounded-xl px-4 py-3"
                    >

                        <option value="">

                            Sort

                        </option>

                        <option value="low">

                            Price : Low → High

                        </option>

                        <option value="high">

                            Price : High → Low

                        </option>

                    </select>

                </div>

            </div>

            {

                filteredProducts.length === 0 ?

                    (

                        <div className="text-center py-24">

                            <h2 className="text-6xl">

                                📦

                            </h2>

                            <h3 className="text-3xl font-bold mt-6">

                                No Products Found

                            </h3>

                            <p className="text-gray-500 mt-3">

                                Try another search or category.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="grid md:grid-cols-3 gap-8">

                            {

                                filteredProducts.map((product) => (

                                    <ProductCard
                                        key={product._id}
                                        id={product._id}
                                        name={product.name}
                                        category={product.category}
                                        price={product.price}
                                        oldPrice={product.oldPrice}
                                        image={product.image}
                                        rating={product.rating}
                                        discount={product.discount}
                                        stock={product.stock}
                                    />

                                ))

                            }

                        </div>

                    )

            }

        </section>

    );

}

export default Products;