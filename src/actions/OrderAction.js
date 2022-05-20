import axios from "axios";

export const myOrders = async() => {
    try {
        const { data } = await axios
            .create({
                withCredentials: true,
            })
            .get("http://localhost:4000/api/orders/me");
        return [true, data.orders.reverse()];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const getOrders = async() => {
    try {
        const { data } = await axios
            .create({
                withCredentials: true,
            })
            .get("http://localhost:4000/api/admin/orders");
        return [true, data.orders.reverse()];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const getOrder = async(id) => {
    try {
        const { data } = await axios
            .create({
                withCredentials: true,
            })
            .get(`http://localhost:4000/api/order/${id}`);
        return [true, data.order];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const createOrder = async(order) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios
            .create({
                withCredentials: true,
            })
            .post("http://localhost:4000/api/order/new", order, config);
        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const updateOrder = async({ _id, ...order }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios
            .create({
                withCredentials: true,
            })
            .put(`http://localhost:4000/api/admin/order/${_id}`, order, config);
        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const deleteOrder = async(id) => {
    try {
        const { data } = await axios
            .create({
                withCredentials: true,
            })
            .delete(`http://localhost:4000/api/admin/order/${id}`);
        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};