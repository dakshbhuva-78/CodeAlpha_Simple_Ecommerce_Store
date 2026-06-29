import axios from "axios";

const API =
`${import.meta.env.VITE_API_URL}/admin`;

export const getDashboardStats =
  async () => {

    const token =
      localStorage.getItem("token");

    const { data } =
      await axios.get(
        `${API}/dashboard`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return data;
};

export const getAllFeedbacks =
async () => {

    const token =
        localStorage.getItem("token");

    const { data } =
        await axios.get(
            `${API}/feedbacks`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return data;

};

export const getAllOrders = async () => {

  const token =
    localStorage.getItem("token");

  const { data } = await axios.get(
    `${API}/orders`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  return data;
};