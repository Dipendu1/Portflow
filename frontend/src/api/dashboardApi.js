import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});


// =========================
// GET DASHBOARD STATISTICS
// =========================

export const getDashboardStats = async () => {

    const token =
        localStorage.getItem("adminToken");

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const [
        profiles,
        skills,
        projects,
        experiences,
        education,
        certifications,
        achievements,
        messages
    ] = await Promise.all([

        API.get("/profile", { headers }),

        API.get("/skills", { headers }),

        API.get("/projects", { headers }),

        API.get("/experience", { headers }),

        API.get("/education", { headers }),

        API.get("/certifications", { headers }),

        API.get("/achievements", { headers }),

        API.get("/contact", { headers })

    ]);

    return {
        profile: Array.isArray(profiles.data)
            ? profiles.data.length
            : 1,

        skills: skills.data.length,

        projects: projects.data.length,

        experiences: experiences.data.length,

        education: education.data.length,

        certifications: certifications.data.length,

        achievements: achievements.data.length,

        messages: messages.data.length
    };
};