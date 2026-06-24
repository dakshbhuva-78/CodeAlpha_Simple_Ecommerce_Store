import axios from "axios";

const API_URL =
  "http://localhost:5000/api/products";

export const getProducts = async () => {

  const response =
    await axios.get(API_URL);

  return response.data;
};

export const getProductById =
  async (id) => {

    const response =
      await axios.get(
        `${API_URL}/${id}`
      );

    return response.data;
};

export const getProductReviews =
    async (id) => {

        const { data } =
            await axios.get(
                `http://localhost:5000/api/products/${id}/reviews`
            );

        return data;
    };