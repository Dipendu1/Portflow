import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});


// =========================
// GET ALL SKILLS
// =========================

export const getSkills = async () => {

    const response = await API.get("/skills");

    return response.data;
};


// =========================
// CREATE SKILL
// =========================

export const createSkill = async (skill) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.post(
        "/skills",
        skill,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// UPDATE SKILL
// =========================

export const updateSkill = async (id, skill) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.put(
        `/skills/${id}`,
        skill,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// DELETE SKILL
// =========================

export const deleteSkill = async (id) => {

    const token =
        localStorage.getItem("adminToken");

    await API.delete(
        `/skills/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};