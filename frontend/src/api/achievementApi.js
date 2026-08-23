import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});


// =========================
// GET ALL ACHIEVEMENTS
// =========================

export const getAchievements = async () => {

    const response = await API.get(
        "/achievements"
    );

    return response.data;
};


// =========================
// GET ACHIEVEMENT BY ID
// =========================

export const getAchievementById = async (id) => {

    const response = await API.get(
        `/achievements/${id}`
    );

    return response.data;
};


// =========================
// CREATE ACHIEVEMENT
// =========================

export const createAchievement = async (
    achievement
) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.post(
        "/achievements",
        achievement,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// UPDATE ACHIEVEMENT
// =========================

export const updateAchievement = async (
    id,
    achievement
) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.put(
        `/achievements/${id}`,
        achievement,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// DELETE ACHIEVEMENT
// =========================

export const deleteAchievement = async (id) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.delete(
        `/achievements/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};