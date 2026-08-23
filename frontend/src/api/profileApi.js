import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});


// =========================
// GET PROFILE
// Public API
// =========================

export const getProfile = async () => {

    const response = await API.get("/profile");

    return response.data;
};


// =========================
// CREATE PROFILE
// Admin API
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
// Admin API
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