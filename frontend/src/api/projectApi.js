import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});


// =========================
// GET ALL PROJECTS
// =========================

export const getProjects = async () => {

    const response = await API.get("/projects");

    return response.data;
};


// =========================
// GET PROJECT BY ID
// =========================

export const getProjectById = async (id) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.get(
        `/projects/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// CREATE PROJECT
// =========================

export const createProject = async (project) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.post(
        "/projects",
        project,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// UPDATE PROJECT
// =========================

export const updateProject = async (id, project) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.put(
        `/projects/${id}`,
        project,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// DELETE PROJECT
// =========================

export const deleteProject = async (id) => {

    const token =
        localStorage.getItem("adminToken");

    await API.delete(
        `/projects/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};