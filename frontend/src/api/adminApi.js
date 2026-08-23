import axios from "axios";

const API = axios.create({
    baseURL: "https://portflow-0k8l.onrender.com/api",
});


// =========================
// GET PROFILE
// =========================

export const getProfile = async () => {

    const response = await API.get("/profile");

    return response.data;
};


// =========================
// CREATE PROFILE
// =========================

export const createProfile = async (profile) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.post(
        "/profile",
        profile,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// UPDATE PROFILE
// =========================

export const updateProfile = async (id, profile) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.put(
        `/profile/${id}`,
        profile,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};