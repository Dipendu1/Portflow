import { useEffect, useState } from "react";

import {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill
} from "../api/skillsApi";

import "./SkillsManager.css";


function SkillsManager() {

    // =========================
    // STATE
    // =========================

    const [skills, setSkills] = useState([]);

    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =========================
    // LOAD SKILLS
    // =========================

    const loadSkills = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getSkills();

            setSkills(data);

        } catch (err) {

            console.error("Skills loading error:", err);

            setError("Unable to load skills.");

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // INITIAL LOAD
    // =========================

    useEffect(() => {

        loadSkills();

    }, []);


    // =========================
    // CLEAR FORM
    // =========================

    const clearForm = () => {

        setCategory("");
        setName("");
        setIcon("");

        setEditingId(null);

        setError("");
        setSuccess("");
    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!category.trim() || !name.trim()) {

            setError(
                "Category and skill name are required."
            );

            return;
        }

        try {

            setSaving(true);

            const skillData = {

                category: category.trim(),

                name: name.trim(),

                icon: icon.trim()

            };


            // UPDATE

            if (editingId) {

                await updateSkill(
                    editingId,
                    skillData
                );

                setSuccess(
                    "Skill updated successfully."
                );

            }

            // CREATE

            else {

                await createSkill(
                    skillData
                );

                setSuccess(
                    "Skill added successfully."
                );

            }


            clearForm();

            await loadSkills();

        } catch (err) {

            console.error(
                "Skill save error:",
                err
            );

            setError(
                "Unable to save skill. Please try again."
            );

        } finally {

            setSaving(false);

        }
    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (skill) => {

        setEditingId(skill.id);

        setCategory(skill.category || "");

        setName(skill.name || "");

        setIcon(skill.icon || "");

        setError("");
        setSuccess("");

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
            "Are you sure you want to delete this skill?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await deleteSkill(id);

            setSuccess(
                "Skill deleted successfully."
            );

            await loadSkills();

        } catch (err) {

            console.error(
                "Skill delete error:",
                err
            );

            setError(
                "Unable to delete skill."
            );
        }
    };


    // =========================
    // GROUP SKILLS
    // =========================

    const groupedSkills = skills.reduce(
        (groups, skill) => {

            const category =
                skill.category || "Other";

            if (!groups[category]) {

                groups[category] = [];

            }

            groups[category].push(skill);

            return groups;

        },
        {}
    );


    // =========================
    // RENDER
    // =========================

    return (

        <div className="skills-manager">


            {/* =====================================
                HEADER
            ===================================== */}

            <div className="skills-manager-header">

                <div>

                    <h2>
                        Skills Management
                    </h2>

                    <p>
                        Add and manage your technical skills
                    </p>

                </div>


                <div className="skills-count">

                    <strong>
                        {skills.length}
                    </strong>

                    <span>
                        Total Skills
                    </span>

                </div>

            </div>


            {/* =====================================
                MESSAGES
            ===================================== */}

            {error && (

                <div className="skills-message error-message">

                    {error}

                </div>

            )}


            {success && (

                <div className="skills-message success-message">

                    {success}

                </div>

            )}


            {/* =====================================
                FORM
            ===================================== */}

            <section className="skill-form-card">

                <div className="section-title">

                    <div>

                        <h3>
                            {editingId
                                ? "Edit Skill"
                                : "Add New Skill"
                            }
                        </h3>

                        <p>
                            {editingId
                                ? "Update the selected skill"
                                : "Add a skill to your portfolio"
                            }
                        </p>

                    </div>

                </div>


                <form
                    className="skill-form"
                    onSubmit={handleSubmit}
                >


                    {/* CATEGORY */}

                    <div className="skill-form-group">

                        <label>
                            Category
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Backend, Frontend, DevOps"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        />

                    </div>


                    {/* NAME */}

                    <div className="skill-form-group">

                        <label>
                            Skill Name
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Java, React, Docker"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>


                    {/* ICON */}

                    <div className="skill-form-group">

                        <label>
                            Icon
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. FaJava or SiSpringboot"
                            value={icon}
                            onChange={(e) =>
                                setIcon(e.target.value)
                            }
                        />

                        <small>
                            Enter the React Icons component name.
                        </small>

                    </div>


                    {/* BUTTONS */}

                    <div className="skill-form-actions">

                        <button
                            type="submit"
                            className="save-skill-button"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Skill"
                                    : "Add Skill"
                            }

                        </button>


                        {editingId && (

                            <button
                                type="button"
                                className="cancel-skill-button"
                                onClick={clearForm}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </section>


            {/* =====================================
                SKILLS LIST
            ===================================== */}

            <section className="skills-list-section">

                <div className="section-title">

                    <div>

                        <h3>
                            Your Skills
                        </h3>

                        <p>
                            Skills currently displayed in your portfolio
                        </p>

                    </div>

                </div>


                {loading ? (

                    <div className="skills-loading">

                        <div className="skills-spinner"></div>

                        <p>
                            Loading skills...
                        </p>

                    </div>

                ) : skills.length === 0 ? (

                    <div className="skills-empty">

                        <div>
                            ⚡
                        </div>

                        <h3>
                            No skills found
                        </h3>

                        <p>
                            Add your first skill using the form above.
                        </p>

                    </div>

                ) : (

                    <div className="skills-categories">

                        {Object.entries(
                            groupedSkills
                        ).map(
                            ([category, categorySkills]) => (

                                <div
                                    className="skill-category"
                                    key={category}
                                >

                                    <div className="category-header">

                                        <h3>
                                            {category}
                                        </h3>

                                        <span>
                                            {categorySkills.length}
                                        </span>

                                    </div>


                                    <div className="skill-items">

                                        {categorySkills.map(
                                            (skill) => (

                                                <div
                                                    className="skill-item"
                                                    key={skill.id}
                                                >


                                                    <div className="skill-item-icon">

                                                        {skill.icon
                                                            ? "⚡"
                                                            : "◇"
                                                        }

                                                    </div>


                                                    <div className="skill-item-info">

                                                        <strong>
                                                            {skill.name}
                                                        </strong>

                                                        <small>
                                                            {skill.icon ||
                                                                "No icon specified"
                                                            }
                                                        </small>

                                                    </div>


                                                    <div className="skill-item-actions">

                                                        <button
                                                            type="button"
                                                            className="edit-skill-button"
                                                            onClick={() =>
                                                                handleEdit(skill)
                                                            }
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="delete-skill-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    skill.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </section>

        </div>
    );
}


export default SkillsManager;