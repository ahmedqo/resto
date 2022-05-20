import Cookies from "js-cookie";
import axios from "axios";

export const loginUser = async(user) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post("http://localhost:4000/api/login", user, config);
        Cookies.set("token", data.token);
        Cookies.set("role", data.user.role);
        return [true, data.user];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const loadUser = async() => {
    try {
        const { data } = await axios
            .create({
                withCredentials: true,
            })
            .get("http://localhost:4000/api/me");

        return [true, data.user];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const logoutUser = async() => {
    try {
        await axios.get("http://localhost:4000/api/logout");
        Cookies.remove("token");
        Cookies.remove("role");
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const updateProfile = async(userData) => {
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
            .put("http://localhost:4000/api/me/update", userData, config);

        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const updatePassword = async(passwords) => {
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
            .put("http://localhost:4000/api/password/update", passwords, config);

        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const forgotPassword = async(email) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post("http://localhost:4000/api/password/forgot", email, config);

        return [true, data.message];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const resetPassword = async(token, passwords) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`http://localhost:4000/api/password/reset/${token}`, passwords, config);

        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const getUsers = async() => {
    try {
        const { data } = await axios
            .create({
                withCredentials: true,
            })
            .get("http://localhost:4000/api/admin/users");
        return [true, data.users.reverse()];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const getUser = async(id) => {
    try {
        const { data } = await axios
            .create({
                withCredentials: true,
            })
            .get(`http://localhost:4000/api/admin/user/${id}`);
        return [true, data.user];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const createUser = async(user) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post("http://localhost:4000/api/register", user, config);
        Cookies.set("token", data.token);
        Cookies.set("role", data.user.role);
        return [true, data.user];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const updateUser = async({ _id, ...user }) => {
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
            .put(`http://localhost:4000/api/admin/user/${_id}`, user, config);
        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};

export const deleteUser = async(id) => {
    try {
        const { data } = await axios
            .create({
                withCredentials: true,
            })
            .delete(`http://localhost:4000/api/admin/user/${id}`);
        return [true, data.success];
    } catch (error) {
        return [false, error.response.data.message];
    }
};