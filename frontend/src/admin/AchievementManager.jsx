import { useEffect, useState } from "react";

import {
    getAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement
} from "../api/achievementApi";

import "./AchievementManager.css";


function AchievementManager() {

    const [achievements, setAchievements] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        icon: "",
        category: "",
        title: "",
        description: ""
    });


    // =========================
    // LOAD ACHIEVEMENTS
    // =========================

    const loadAchievements = async () => {

        try {

            setLoading(true);

            const data = await getAchievements();

            setAchievements(data);

        } catch (error) {

            console.error(
                "Error loading achievements:",
                error
            );

            setMessage(
                "Unable to load achievements."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadAchievements();

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
            icon: "",
            category: "",
            title: "",
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

            if (editingId) {

                await updateAchievement(
                    editingId,
                    form
                );

                setMessage(
                    "Achievement updated successfully."
                );

            } else {

                await createAchievement(form);

                setMessage(
                    "Achievement added successfully."
                );

            }

            resetForm();

            await loadAchievements();

        } catch (error) {

            console.error(
                "Error saving achievement:",
                error
            );

            setMessage(
                "Unable to save achievement."
            );

        }

    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (achievement) => {

        setEditingId(achievement.id);

        setForm({
            icon: achievement.icon || "",
            category: achievement.category || "",
            title: achievement.title || "",
            description: achievement.description || ""
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
            "Are you sure you want to delete this achievement?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteAchievement(id);

            setMessage(
                "Achievement deleted successfully."
            );

            await loadAchievements();

        } catch (error) {

            console.error(
                "Error deleting achievement:",
                error
            );

            setMessage(
                "Unable to delete achievement."
            );

        }

    };


    return (

        <div className="achievement-manager">


            {/* =========================
                FORM
            ========================= */}

            <div className="achievement-form-card">

                <div className="manager-header">

                    <div>

                        <h2>
                            {editingId
                                ? "Edit Achievement"
                                : "Add Achievement"
                            }
                        </h2>

                        <p>
                            Manage your achievements,
                            awards and accomplishments.
                        </p>

                    </div>

                </div>


                {message && (

                    <div className="manager-message">
                        {message}
                    </div>

                )}


                <form
                    className="achievement-form"
                    onSubmit={handleSubmit}
                >


                    {/* ICON */}

                    <div className="form-field">

                        <label>
                            Icon
                        </label>

                        <input
                            type="text"
                            name="icon"
                            placeholder="🏆"
                            value={form.icon}
                            onChange={handleChange}
                        />

                        <small>
                            Example: 🏆, 🥇, 🎯, 🚀
                        </small>

                    </div>


                    {/* CATEGORY */}

                    <div className="form-field">

                        <label>
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            placeholder="e.g. Competition"
                            value={form.category}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* TITLE */}

                    <div className="form-field full">

                        <label>
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. 1st Place in Project Exhibition"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-field full">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Describe your achievement..."
                            value={form.description}
                            onChange={handleChange}
                            rows="5"
                            required
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="save-achievement-btn"
                        >

                            {editingId
                                ? "Update Achievement"
                                : "Add Achievement"
                            }

                        </button>


                        {editingId && (

                            <button
                                type="button"
                                className="cancel-achievement-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </div>


            {/* =========================
                ACHIEVEMENT LIST
            ========================= */}

            <div className="achievement-list-card">

                <div className="manager-header">

                    <div>

                        <h2>
                            Your Achievements
                        </h2>

                        <p>
                            {achievements.length} achievement
                            {achievements.length !== 1
                                ? "s"
                                : ""
                            } found
                        </p>

                    </div>

                </div>


                {loading ? (

                    <div className="achievement-loading">
                        Loading achievements...
                    </div>

                ) : achievements.length === 0 ? (

                    <div className="achievement-empty">

                        <h3>
                            No achievements found
                        </h3>

                        <p>
                            Add your first achievement above.
                        </p>

                    </div>

                ) : (

                    <div className="achievement-list">

                        {achievements.map((achievement) => (

                            <div
                                className="achievement-item"
                                key={achievement.id}
                            >


                                {/* ICON */}

                                <div className="achievement-item-icon">

                                    {achievement.icon || "🏆"}

                                </div>


                                {/* CONTENT */}

                                <div className="achievement-item-content">

                                    <span className="achievement-category">

                                        {achievement.category}

                                    </span>

                                    <h3>

                                        {achievement.title}

                                    </h3>

                                    {achievement.description && (

                                        <p>

                                            {achievement.description}

                                        </p>

                                    )}

                                </div>


                                {/* ACTIONS */}

                                <div className="achievement-actions">

                                    <button
                                        className="edit-achievement"
                                        onClick={() =>
                                            handleEdit(
                                                achievement
                                            )
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        className="delete-achievement"
                                        onClick={() =>
                                            handleDelete(
                                                achievement.id
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


export default AchievementManager;