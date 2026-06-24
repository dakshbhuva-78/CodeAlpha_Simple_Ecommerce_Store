import axios from "axios";

const API =
    "http://localhost:5000/api/admin";

export const updateOrderStatus =
    async (id, orderStatus) => {

        const token =
            localStorage.getItem("token");

        const { data } =
            await axios.put(
                `${API}/orders/${id}`,
                { orderStatus },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return data;
    };