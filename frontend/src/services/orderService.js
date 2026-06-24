import axios from "axios";

const API = "http://localhost:5000/api/orders";

export const createOrder = async (orderData) => {

    const token = localStorage.getItem("token");

    const { data } = await axios.post(
        API,
        orderData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export const getMyOrders = async () => {

    const token = localStorage.getItem("token");

    const { data } = await axios.get(
        `${API}/myorders`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

export const cancelOrder = async (
    orderId
) => {

    const token =
        localStorage.getItem("token");

    const { data } = await axios.put(
        `${API}/${orderId}/cancel`,
        {},
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    return data;

};

export const getOrderById = async (
    orderId
) => {

    const token =
        localStorage.getItem("token");

    const { data } = await axios.get(
        `${API}/${orderId}`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    return data;
};

export const getInvoiceData = async (id) => {

    const token =
        localStorage.getItem("token");

    const { data } =
        await axios.get(
            `${API}/${id}/invoice`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return data;
};

export const returnOrder = async (
    orderId,
    reason
) => {

    const token =
        localStorage.getItem(
            "token"
        );

    const { data } =
        await axios.put(
            `http://localhost:5000/api/orders/${orderId}/return`,
            {
                reason,
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            }
        );

    return data;
};