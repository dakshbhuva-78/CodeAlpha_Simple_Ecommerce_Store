import axios from "axios";

const API =
`${import.meta.env.VITE_API_URL}/admin`;

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