import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});


// =========================
// GET ALL EXPERIENCES
// =========================

export const getExperiences = async () => {

    const response = await API.get("/experience");

    return response.data;
};


// =========================
// GET EXPERIENCE BY ID
// =========================

export const getExperienceById = async (id) => {

    const response = await API.get(
        `/experience/${id}`
    );

    return response.data;
};


// =========================
// CREATE EXPERIENCE
// =========================

export const createExperience = async (experience) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.post(
        "/experience",
        experience,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// UPDATE EXPERIENCE
// =========================

export const updateExperience = async (
    id,
    experience
) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.put(
        `/experience/${id}`,
        experience,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// DELETE EXPERIENCE
// =========================

export const deleteExperience = async (id) => {

    const token =
        localStorage.getItem("adminToken");

    await API.delete(
        `/experience/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};