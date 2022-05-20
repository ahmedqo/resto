import axios from "axios";

export const getProducts = async(keyword = "", cuisine = "0", price = [0, 500]) => {
    try {
        const { data } = await axios.get("http://localhost:4000/api/products");
        var products = data.products.filter((el) => el.price >= price[0] && el.price <= price[1]);

        if (keyword.length)
            products = products.filter(
                (el) => el.name.toLowerCase().includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(el.name.toLowerCase())
            );

        if (cuisine !== "0") products = products.filter((el) => el.cuisine === cuisine);

        return [true, products.reverse()];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const getProduct = async(id) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/api/product/${id}`);
        return [true, data.product];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const createProduct = async(product) => {
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
            .post("http://localhost:4000/api/admin/product/new", product, config);
        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const updateProduct = async({ _id, ...product }) => {
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
            .put(`http://localhost:4000/api/admin/product/${_id}`, product, config);

        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const deleteProduct = async(_id) => {
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
            .delete(`http://localhost:4000/api/admin/product/${_id}`, {}, config);
        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};