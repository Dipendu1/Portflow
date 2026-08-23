import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});

// =========================
// GET ALL EDUCATION
// =========================

export const getEducation = async () => {
    const response = await API.get("/education");
    return response.data;
};


// =========================
// CREATE EDUCATION
// =========================

export const createEducation = async (education) => {
    const token = localStorage.getItem("adminToken");

    const response = await API.post(
        "/education",
        education,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// UPDATE EDUCATION
// =========================

export const updateEducation = async (id, education) => {
    const token = localStorage.getItem("adminToken");

    const response = await API.put(
        `/education/${id}`,
        education,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// DELETE EDUCATION
// =========================

export const deleteEducation = async (id) => {
    const token = localStorage.getItem("adminToken");

    await API.delete(
        `/education/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};