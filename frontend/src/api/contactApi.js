import axios from "axios";

const API = axios.create({
    baseURL: "https://portflow-0k8l.onrender.com/apii",
});


// =========================
// GET ALL MESSAGES
// =========================

export const getMessages = async () => {

    const response = await API.get(
        "/contact"
    );

    return response.data;
};


// =========================
// GET MESSAGE BY ID
// =========================

export const getMessageById = async (id) => {

    const response = await API.get(
        `/contact/${id}`
    );

    return response.data;
};


// =========================
// CREATE MESSAGE
// =========================

export const createMessage = async (
    message
) => {

    const response = await API.post(
        "/contact",
        message
    );

    return response.data;
};


// =========================
// DELETE MESSAGE
// =========================

export const deleteMessage = async (id) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.delete(
        `/contact/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};