import { useEffect, useState } from "react";

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} from "../api/projectApi";

import "./ProjectsManager.css";


function ProjectsManager() {

    // =========================
    // STATE
    // =========================

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [editingId, setEditingId] = useState(null);


    const emptyProject = {
        number: "",
        title: "",
        category: "",
        description: "",
        impact: "",
        technologies: "",
        achievement: ""
    };


    const [form, setForm] = useState(emptyProject);


    // =========================
    // LOAD PROJECTS
    // =========================

    const loadProjects = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getProjects();

            setProjects(data);

        } catch (err) {

            console.error("Projects loading error:", err);

            setError("Unable to load projects.");

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadProjects();

    }, []);


    // =========================
    // INPUT CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setSaving(true);

        try {

            if (editingId) {

                await updateProject(
                    editingId,
                    form
                );

                setSuccess(
                    "Project updated successfully."
                );

            } else {

                await createProject(form);

                setSuccess(
                    "Project created successfully."
                );
            }

            setForm(emptyProject);

            setEditingId(null);

            await loadProjects();

        } catch (err) {

            console.error(
                "Project save error:",
                err
            );

            setError(
                "Unable to save project."
            );

        } finally {

            setSaving(false);
        }
    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (project) => {

        setEditingId(project.id);

        setForm({
            number: project.number || "",
            title: project.title || "",
            category: project.category || "",
            description: project.description || "",
            impact: project.impact || "",
            technologies: project.technologies || "",
            achievement: project.achievement || ""
        });

        setSuccess("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =========================
    // CANCEL EDIT
    // =========================

    const handleCancel = () => {

        setEditingId(null);

        setForm(emptyProject);

        setError("");
        setSuccess("");
    };


    // =========================
    // DELETE
    // =========================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await deleteProject(id);

            setSuccess(
                "Project deleted successfully."
            );

            await loadProjects();

        } catch (err) {

            console.error(
                "Project delete error:",
                err
            );

            setError(
                "Unable to delete project."
            );
        }
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="projects-manager">

                <div className="projects-loading">

                    <div className="projects-spinner"></div>

                    <p>
                        Loading projects...
                    </p>

                </div>

            </div>
        );
    }


    // =========================
    // UI
    // =========================

    return (

        <div className="projects-manager">


            {/* =========================
                HEADER
            ========================= */}

            <div className="projects-manager-header">

                <div>

                    <span className="section-label">
                        PORTFOLIO
                    </span>

                    <h2>
                        Projects Management
                    </h2>

                    <p>
                        Add, update and manage your
                        portfolio projects.
                    </p>

                </div>

                <div className="project-count">

                    <strong>
                        {projects.length}
                    </strong>

                    <span>
                        Projects
                    </span>

                </div>

            </div>


            {/* =========================
                MESSAGES
            ========================= */}

            {success && (

                <div className="project-message success">
                    ✓ {success}
                </div>

            )}


            {error && (

                <div className="project-message error">
                    ⚠ {error}
                </div>

            )}


            {/* =========================
                FORM
            ========================= */}

            <div className="project-form-card">

                <div className="project-form-header">

                    <div>

                        <h3>
                            {editingId
                                ? "Edit Project"
                                : "Add New Project"
                            }
                        </h3>

                        <p>
                            {editingId
                                ? "Update your project information."
                                : "Add a new project to your portfolio."
                            }
                        </p>

                    </div>

                </div>


                <form
                    className="project-form"
                    onSubmit={handleSubmit}
                >


                    {/* NUMBER */}

                    <div className="project-form-row">

                        <div className="project-field">

                            <label>
                                Project Number
                            </label>

                            <input
                                type="text"
                                name="number"
                                placeholder="01"
                                value={form.number}
                                onChange={handleChange}
                            />

                        </div>


                        {/* CATEGORY */}

                        <div className="project-field">

                            <label>
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                placeholder="Full Stack Development"
                                value={form.category}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* TITLE */}

                    <div className="project-field">

                        <label>
                            Project Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Enter project title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="project-field">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Describe your project..."
                            value={form.description}
                            onChange={handleChange}
                            rows="5"
                            required
                        />

                    </div>


                    {/* IMPACT */}

                    <div className="project-field">

                        <label>
                            Impact
                        </label>

                        <textarea
                            name="impact"
                            placeholder="What impact or improvement did this project make?"
                            value={form.impact}
                            onChange={handleChange}
                            rows="4"
                        />

                    </div>


                    {/* TECHNOLOGIES */}

                    <div className="project-field">

                        <label>
                            Technologies
                        </label>

                        <textarea
                            name="technologies"
                            placeholder="Java, Spring Boot, MySQL, React"
                            value={form.technologies}
                            onChange={handleChange}
                            rows="3"
                        />

                        <small>
                            Separate technologies with commas.
                        </small>

                    </div>


                    {/* ACHIEVEMENT */}

                    <div className="project-field">

                        <label>
                            Achievement
                        </label>

                        <input
                            type="text"
                            name="achievement"
                            placeholder="1st Place - Project Exhibition 2024"
                            value={form.achievement}
                            onChange={handleChange}
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="project-form-actions">

                        {editingId && (

                            <button
                                type="button"
                                className="project-cancel-button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        )}

                        <button
                            type="submit"
                            className="project-save-button"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Project"
                                    : "Add Project"
                            }

                        </button>

                    </div>

                </form>

            </div>


            {/* =========================
                PROJECT LIST
            ========================= */}

            <div className="projects-list-card">

                <div className="projects-list-header">

                    <div>

                        <h3>
                            Your Projects
                        </h3>

                        <p>
                            Manage existing portfolio projects.
                        </p>

                    </div>

                </div>


                {projects.length === 0 ? (

                    <div className="no-projects">

                        <div className="no-projects-icon">
                            💼
                        </div>

                        <h3>
                            No Projects Yet
                        </h3>

                        <p>
                            Add your first project using
                            the form above.
                        </p>

                    </div>

                ) : (

                    <div className="projects-table-wrapper">

                        <table className="projects-table">

                            <thead>

                                <tr>

                                    <th>
                                        #
                                    </th>

                                    <th>
                                        Project
                                    </th>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Technologies
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {projects.map((project) => (

                                    <tr key={project.id}>

                                        <td>
                                            {project.number || "-"}
                                        </td>


                                        <td>

                                            <div className="project-title-cell">

                                                <strong>
                                                    {project.title}
                                                </strong>

                                                {project.achievement && (

                                                    <small>
                                                        🏆 {project.achievement}
                                                    </small>

                                                )}

                                            </div>

                                        </td>


                                        <td>

                                            <span className="project-category">
                                                {project.category || "-"}
                                            </span>

                                        </td>


                                        <td>

                                            <div className="technology-cell">

                                                {project.technologies
                                                    ? project.technologies
                                                        .split(",")
                                                        .slice(0, 3)
                                                        .map((tech, index) => (

                                                            <span
                                                                key={index}
                                                            >
                                                                {tech.trim()}
                                                            </span>

                                                        ))
                                                    : "-"
                                                }

                                            </div>

                                        </td>


                                        <td>

                                            <div className="project-actions">

                                                <button
                                                    className="edit-project-button"
                                                    onClick={() =>
                                                        handleEdit(project)
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    className="delete-project-button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            project.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default ProjectsManager;