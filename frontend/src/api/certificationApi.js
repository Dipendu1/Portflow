
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});


// =========================
// GET ALL CERTIFICATIONS
// =========================

export const getCertifications = async () => {

    const response = await API.get(
        "/certifications"
    );

    return response.data;
};


// =========================
// GET CERTIFICATION BY ID
// =========================

export const getCertificationById = async (id) => {

    const response = await API.get(
        `/certifications/${id}`
    );

    return response.data;
};


// =========================
// CREATE CERTIFICATION
// =========================

export const createCertification = async (
    certification
) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.post(
        "/certifications",
        certification,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// UPDATE CERTIFICATION
// =========================

export const updateCertification = async (
    id,
    certification
) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.put(
        `/certifications/${id}`,
        certification,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// DELETE CERTIFICATION
// =========================

export const deleteCertification = async (id) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await API.delete(
        `/certifications/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// =========================
// UPLOAD CERTIFICATION PDF
// =========================

export const uploadCertificationPdf = async (
    file
) => {

    const token =
        localStorage.getItem("adminToken");


    // Create FormData
    const formData = new FormData();

    formData.append("file", file);


    const response = await API.post(
        "/certifications/upload",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,

                // Do NOT manually set
                // multipart/form-data.
                // Axios/browser sets the boundary.
            }
        }
    );


    // Backend returns:
    // /uploads/certificates/filename.pdf

    return response.data;
};

