import { useEffect, useState } from "react";

import {
    getEducation,
    createEducation,
    updateEducation,
    deleteEducation
} from "../api/educationApi";

import "./EducationManager.css";


function EducationManager() {

    // =========================
    // STATE
    // =========================

    const [educationList, setEducationList] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        year: "",
        type: "",
        degree: "",
        field: "",
        institution: "",
        description: ""
    });


    // =========================
    // LOAD EDUCATION
    // =========================

    const loadEducation = async () => {

        try {

            setLoading(true);

            const data = await getEducation();

            setEducationList(data);

        } catch (error) {

            console.error("Error loading education:", error);

            setMessage("Failed to load education.");

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // LOAD ON PAGE OPEN
    // =========================

    useEffect(() => {

        loadEducation();

    }, []);


    // =========================
    // INPUT CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

    };


    // =========================
    // RESET FORM
    // =========================

    const resetForm = () => {

        setForm({
            year: "",
            type: "",
            degree: "",
            field: "",
            institution: "",
            description: ""
        });

        setEditingId(null);

    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            if (editingId) {

                await updateEducation(
                    editingId,
                    form
                );

                setMessage("Education updated successfully.");

            } else {

                await createEducation(form);

                setMessage("Education added successfully.");

            }

            resetForm();

            await loadEducation();

        } catch (error) {

            console.error("Error saving education:", error);

            setMessage("Failed to save education.");

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (education) => {

        setEditingId(education.id);

        setForm({
            year: education.year || "",
            type: education.type || "",
            degree: education.degree || "",
            field: education.field || "",
            institution: education.institution || "",
            description: education.description || ""
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

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this education record?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setLoading(true);

            await deleteEducation(id);

            setMessage("Education deleted successfully.");

            await loadEducation();

        } catch (error) {

            console.error("Error deleting education:", error);

            setMessage("Failed to delete education.");

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // UI
    // =========================

    return (

        <div className="education-manager">


            {/* =========================
                MESSAGE
            ========================= */}

            {message && (

                <div className="education-message">

                    {message}

                    <button
                        onClick={() => setMessage("")}
                    >
                        ×
                    </button>

                </div>

            )}


            {/* =========================
                FORM
            ========================= */}

            <section className="education-form-card">

                <div className="education-section-header">

                    <div>

                        <h2>
                            {editingId
                                ? "Edit Education"
                                : "Add Education"
                            }
                        </h2>

                        <p>
                            {editingId
                                ? "Update education information"
                                : "Add a new education record"
                            }
                        </p>

                    </div>

                </div>


                <form
                    className="education-form"
                    onSubmit={handleSubmit}
                >


                    {/* YEAR */}

                    <div className="education-form-group">

                        <label>
                            Year
                        </label>

                        <input
                            type="text"
                            name="year"
                            value={form.year}
                            onChange={handleChange}
                            placeholder="Example: 2021 - 2025"
                            required
                        />

                    </div>


                    {/* TYPE */}

                    <div className="education-form-group">

                        <label>
                            Type
                        </label>

                        <input
                            type="text"
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            placeholder="Example: DEGREE"
                            required
                        />

                    </div>


                    {/* DEGREE */}

                    <div className="education-form-group">

                        <label>
                            Degree
                        </label>

                        <input
                            type="text"
                            name="degree"
                            value={form.degree}
                            onChange={handleChange}
                            placeholder="Example: Bachelor of Engineering"
                            required
                        />

                    </div>


                    {/* FIELD */}

                    <div className="education-form-group">

                        <label>
                            Field of Study
                        </label>

                        <input
                            type="text"
                            name="field"
                            value={form.field}
                            onChange={handleChange}
                            placeholder="Example: Computer Science & Engineering"
                        />

                    </div>


                    {/* INSTITUTION */}

                    <div className="education-form-group full-width">

                        <label>
                            Institution
                        </label>

                        <input
                            type="text"
                            name="institution"
                            value={form.institution}
                            onChange={handleChange}
                            placeholder="Example: Shridevi Institute of Engineering and Technology"
                            required
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="education-form-group full-width">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Enter education description..."
                            rows="5"
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="education-form-actions">

                        <button
                            type="submit"
                            className="education-save-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : editingId
                                    ? "Update Education"
                                    : "Add Education"
                            }

                        </button>


                        {editingId && (

                            <button
                                type="button"
                                className="education-cancel-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </section>


            {/* =========================
                EDUCATION LIST
            ========================= */}

            <section className="education-list-card">

                <div className="education-section-header">

                    <div>

                        <h2>
                            Education Records
                        </h2>

                        <p>
                            Manage your education history
                        </p>

                    </div>

                    <button
                        className="education-refresh-btn"
                        onClick={loadEducation}
                    >
                        ↻ Refresh
                    </button>

                </div>


                {loading && educationList.length === 0 ? (

                    <div className="education-empty">
                        Loading education...
                    </div>

                ) : educationList.length === 0 ? (

                    <div className="education-empty">

                        <h3>
                            No education records
                        </h3>

                        <p>
                            Add your first education record using the form above.
                        </p>

                    </div>

                ) : (

                    <div className="education-list">

                        {educationList.map((education) => (

                            <div
                                className="education-item"
                                key={education.id}
                            >

                                {/* HEADER */}

                                <div className="education-item-header">

                                    <div>

                                        <span className="education-type">
                                            {education.type}
                                        </span>

                                        <h3>
                                            {education.degree}
                                        </h3>

                                        <p className="education-field">
                                            {education.field}
                                        </p>

                                    </div>


                                    <span className="education-year">
                                        {education.year}
                                    </span>

                                </div>


                                {/* INSTITUTION */}

                                <div className="education-institution">

                                    🎓

                                    <strong>
                                        {education.institution}
                                    </strong>

                                </div>


                                {/* DESCRIPTION */}

                                {education.description && (

                                    <p className="education-description">

                                        {education.description}

                                    </p>

                                )}


                                {/* ACTIONS */}

                                <div className="education-item-actions">

                                    <button
                                        className="education-edit-btn"
                                        onClick={() =>
                                            handleEdit(education)
                                        }
                                    >
                                        ✏️ Edit
                                    </button>


                                    <button
                                        className="education-delete-btn"
                                        onClick={() =>
                                            handleDelete(education.id)
                                        }
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>

    );

}


export default EducationManager;