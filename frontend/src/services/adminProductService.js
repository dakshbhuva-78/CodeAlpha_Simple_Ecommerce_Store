import axios from "axios";

const API =
`${import.meta.env.VITE_API_URL}/products`;


export const getProducts = async () => {
    const { data } = await axios.get(API);
    return data;
};

export const getProductById = async (id) => {
    const { data } = await axios.get(`${API}/${id}`);
    return data;
};

export const createProduct = async (productData) => {
    const { data } = await axios.post(API, productData);
    return data;
};

export const updateProduct = async (id, productData) => {
    const { data } = await axios.put(
        `${API}/${id}`,
        productData
    );
    return data;
};

export const deleteProduct = async (id) => {
    const { data } = await axios.delete(`${API}/${id}`);
    return data;
};
