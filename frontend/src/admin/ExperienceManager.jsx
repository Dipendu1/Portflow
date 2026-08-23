import { useEffect, useState } from "react";

import {
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience
} from "../api/experienceApi";

import "./ExperienceManager.css";


function ExperienceManager() {

    const [experiences, setExperiences] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        type: "",
        position: "",
        company: "",
        duration: "",
        description: "",
        highlights: "",
        technologies: "",
        certificate: ""
    });


    // =========================
    // LOAD EXPERIENCES
    // =========================

    const loadExperiences = async () => {

        try {

            setLoading(true);

            const data = await getExperiences();

            setExperiences(data);

        } catch (error) {

            console.error(
                "Error loading experiences:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadExperiences();

    }, []);


    // =========================
    // INPUT CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    };


    // =========================
    // RESET FORM
    // =========================

    const resetForm = () => {

        setForm({
            type: "",
            position: "",
            company: "",
            duration: "",
            description: "",
            highlights: "",
            technologies: "",
            certificate: ""
        });

        setEditingId(null);

    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await updateExperience(
                    editingId,
                    form
                );

                setMessage(
                    "Experience updated successfully."
                );

            } else {

                await createExperience(form);

                setMessage(
                    "Experience added successfully."
                );
            }

            resetForm();

            await loadExperiences();

        } catch (error) {

            console.error(
                "Error saving experience:",
                error
            );

            setMessage(
                "Unable to save experience."
            );

        }

    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (experience) => {

        setEditingId(experience.id);

        setForm({
            type: experience.type || "",
            position: experience.position || "",
            company: experience.company || "",
            duration: experience.duration || "",
            description: experience.description || "",
            highlights: experience.highlights || "",
            technologies: experience.technologies || "",
            certificate: experience.certificate || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =========================
    // DELETE
    // =========================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this experience?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteExperience(id);

            setMessage(
                "Experience deleted successfully."
            );

            await loadExperiences();

        } catch (error) {

            console.error(
                "Error deleting experience:",
                error
            );

            setMessage(
                "Unable to delete experience."
            );

        }

    };


    return (

        <div className="experience-manager">


            {/* =========================
                FORM
            ========================= */}

            <div className="experience-form-card">

                <div className="manager-header">

                    <div>

                        <h2>
                            {editingId
                                ? "Edit Experience"
                                : "Add Experience"
                            }
                        </h2>

                        <p>
                            Manage your professional
                            experience and internships.
                        </p>

                    </div>

                </div>


                {message && (

                    <div className="manager-message">
                        {message}
                    </div>

                )}


                <form
                    className="experience-form"
                    onSubmit={handleSubmit}
                >


                    {/* TYPE */}

                    <div className="form-field">

                        <label>
                            Experience Type
                        </label>

                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select type
                            </option>

                            <option value="INTERNSHIP">
                                Internship
                            </option>

                            <option value="JOB">
                                Job
                            </option>

                            <option value="FREELANCE">
                                Freelance
                            </option>

                            <option value="PROJECT">
                                Project
                            </option>

                        </select>

                    </div>


                    {/* POSITION */}

                    <div className="form-field">

                        <label>
                            Position
                        </label>

                        <input
                            type="text"
                            name="position"
                            placeholder="e.g. DevOps Intern"
                            value={form.position}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* COMPANY */}

                    <div className="form-field">

                        <label>
                            Company
                        </label>

                        <input
                            type="text"
                            name="company"
                            placeholder="e.g. Rooman Technologies"
                            value={form.company}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* DURATION */}

                    <div className="form-field">

                        <label>
                            Duration
                        </label>

                        <input
                            type="text"
                            name="duration"
                            placeholder="e.g. 2024 - 2025"
                            value={form.duration}
                            onChange={handleChange}
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-field full">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Describe your role..."
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                        />

                    </div>


                    {/* HIGHLIGHTS */}

                    <div className="form-field full">

                        <label>
                            Highlights
                        </label>

                        <textarea
                            name="highlights"
                            placeholder="Enter each highlight separated by |"
                            value={form.highlights}
                            onChange={handleChange}
                            rows="5"
                        />

                        <small>
                            Example: Built CI/CD pipelines.|Worked with Docker and Kubernetes.
                        </small>

                    </div>


                    {/* TECHNOLOGIES */}

                    <div className="form-field full">

                        <label>
                            Technologies
                        </label>

                        <input
                            type="text"
                            name="technologies"
                            placeholder="Docker,Kubernetes,Jenkins,CI/CD"
                            value={form.technologies}
                            onChange={handleChange}
                        />

                    </div>


                    {/* CERTIFICATE */}

                    <div className="form-field full">

                        <label>
                            Certificate Path
                        </label>

                        <input
                            type="text"
                            name="certificate"
                            placeholder="/certificates/rooman-devops-internship.pdf"
                            value={form.certificate}
                            onChange={handleChange}
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="save-experience-btn"
                        >
                            {editingId
                                ? "Update Experience"
                                : "Add Experience"
                            }
                        </button>


                        {editingId && (

                            <button
                                type="button"
                                className="cancel-experience-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </div>


            {/* =========================
                EXPERIENCE LIST
            ========================= */}

            <div className="experience-list-card">

                <div className="manager-header">

                    <div>

                        <h2>
                            Your Experience
                        </h2>

                        <p>
                            {experiences.length} experience
                            {experiences.length !== 1
                                ? "s"
                                : ""
                            } found
                        </p>

                    </div>

                </div>


                {loading ? (

                    <div className="experience-loading">
                        Loading experiences...
                    </div>

                ) : experiences.length === 0 ? (

                    <div className="experience-empty">

                        <h3>
                            No experience found
                        </h3>

                        <p>
                            Add your first professional
                            experience above.
                        </p>

                    </div>

                ) : (

                    <div className="experience-list">

                        {experiences.map((experience) => (

                            <div
                                className="experience-item"
                                key={experience.id}
                            >

                                <div className="experience-item-top">

                                    <div>

                                        <span className="experience-type">
                                            {experience.type}
                                        </span>

                                        <h3>
                                            {experience.position}
                                        </h3>

                                        <p className="experience-company">
                                            {experience.company}
                                        </p>

                                    </div>

                                    <span className="experience-duration">
                                        {experience.duration}
                                    </span>

                                </div>


                                {experience.description && (

                                    <p className="experience-description">
                                        {experience.description}
                                    </p>

                                )}


                                {experience.highlights && (

                                    <ul className="experience-highlights">

                                        {experience.highlights
                                            .split("|")
                                            .map((highlight, index) => (

                                                <li key={index}>
                                                    {highlight}
                                                </li>

                                            ))
                                        }

                                    </ul>

                                )}


                                {experience.technologies && (

                                    <div className="experience-technologies">

                                        {experience.technologies
                                            .split(",")
                                            .map((technology, index) => (

                                                <span key={index}>
                                                    {technology.trim()}
                                                </span>

                                            ))
                                        }

                                    </div>

                                )}


                                <div className="experience-actions">

                                    <button
                                        className="edit-experience"
                                        onClick={() =>
                                            handleEdit(experience)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-experience"
                                        onClick={() =>
                                            handleDelete(
                                                experience.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default ExperienceManager;