import axios from "axios";

export const getCuisines = async() => {
    try {
        const { data } = await axios.get("http://localhost:4000/api/cuisines");
        return [true, data.cuisines.reverse()];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const getCuisine = async(id) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/api/cuisine/${id}`);
        return [true, data.cuisine];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const createCuisine = async(label) => {
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
            .post("http://localhost:4000/api/admin/cuisine/new", { label }, config);
        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const updateCuisine = async({ _id, label }) => {
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
            .put(`http://localhost:4000/api/admin/cuisine/${_id}`, { label }, config);

        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const deleteCuisine = async(_id) => {
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
            .delete(`http://localhost:4000/api/admin/cuisine/${_id}`, {}, config);
        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};