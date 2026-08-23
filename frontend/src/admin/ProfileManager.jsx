import { useEffect, useState } from "react";
import "./ProfileManager.css";
import {
    getProfile,
    createProfile,
    updateProfile
} from "../api/adminApi";

import "./ProfileManager.css";

function ProfileManager() {

    const [profile, setProfile] = useState({
        name: "",
        title: "",
        location: "",
        bio: "",
        email: "",
        github: "",
        linkedin: ""
    });

    const [profileId, setProfileId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // =========================
    // LOAD PROFILE
    // =========================

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data = await getProfile();

                console.log("Profile:", data);

                setProfile({
                    name: data.name || "",
                    title: data.title || "",
                    location: data.location || "",
                    bio: data.bio || "",
                    email: data.email || "",
                    github: data.github || "",
                    linkedin: data.linkedin || ""
                });

                setProfileId(data.id);

            } catch (err) {

                // 404 means profile doesn't exist
                if (err.response?.status === 404) {

                    console.log("No profile found.");

                    setProfileId(null);

                } else {

                    console.error(
                        "Profile loading error:",
                        err
                    );

                    setError(
                        "Unable to load profile."
                    );
                }

            } finally {

                setLoading(false);

            }
        };

        loadProfile();

    }, []);


    // =========================
    // INPUT CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfile(prev => ({
            ...prev,
            [name]: value
        }));

    };


    // =========================
    // SAVE PROFILE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);
        setMessage("");
        setError("");

        try {

            let data;

            // CREATE
            if (!profileId) {

                data = await createProfile(profile);

                setProfileId(data.id);

                setMessage(
                    "Profile created successfully!"
                );

            }

            // UPDATE
            else {

                data = await updateProfile(
                    profileId,
                    profile
                );

                setMessage(
                    "Profile updated successfully!"
                );

            }

            console.log("Saved profile:", data);

        } catch (err) {

            console.error(
                "Profile save error:",
                err
            );

            if (err.response?.status === 401) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else if (err.response?.status === 403) {

                setError(
                    "You don't have permission to update the profile."
                );

            } else {

                setError(
                    "Failed to save profile."
                );
            }

        } finally {

            setSaving(false);

        }
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="profile-manager-loading">
                Loading profile...
            </div>
        );

    }


    // =========================
    // UI
    // =========================

    return (

        <div className="profile-manager">

            <div className="profile-manager-header">

                <div>

                    <span className="profile-label">
                        PORTFOLIO
                    </span>

                    <h1>
                        Profile Information
                    </h1>

                    <p>
                        Manage the information displayed
                        on your public portfolio.
                    </p>

                </div>

                <div className="profile-status">

                    <span></span>

                    {profileId
                        ? "Profile Active"
                        : "Create Profile"}

                </div>

            </div>


            {message && (

                <div className="profile-success">
                    ✓ {message}
                </div>

            )}


            {error && (

                <div className="profile-error">
                    ⚠ {error}
                </div>

            )}


            <form
                className="profile-form"
                onSubmit={handleSubmit}
            >

                {/* BASIC INFORMATION */}

                <section className="profile-section">

                    <div className="section-title">

                        <h2>
                            Basic Information
                        </h2>

                        <p>
                            Your name and professional title
                        </p>

                    </div>


                    <div className="form-grid">

                        <div className="profile-field">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />

                        </div>


                        <div className="profile-field">

                            <label>
                                Professional Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={profile.title}
                                onChange={handleChange}
                                placeholder="e.g. Backend Developer"
                                required
                            />

                        </div>


                        <div className="profile-field">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={profile.location}
                                onChange={handleChange}
                                placeholder="e.g. Bangalore, India"
                            />

                        </div>


                        <div className="profile-field">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                            />

                        </div>

                    </div>

                </section>


                {/* ABOUT */}

                <section className="profile-section">

                    <div className="section-title">

                        <h2>
                            About
                        </h2>

                        <p>
                            Tell visitors about yourself
                        </p>

                    </div>


                    <div className="profile-field">

                        <label>
                            Bio
                        </label>

                        <textarea
                            name="bio"
                            value={profile.bio}
                            onChange={handleChange}
                            placeholder="Write a short introduction about yourself..."
                            rows="7"
                        />

                        <small>
                            {profile.bio.length}/2000 characters
                        </small>

                    </div>

                </section>


                {/* SOCIAL LINKS */}

                <section className="profile-section">

                    <div className="section-title">

                        <h2>
                            Social Links
                        </h2>

                        <p>
                            Add your professional profiles
                        </p>

                    </div>


                    <div className="form-grid">

                        <div className="profile-field">

                            <label>
                                GitHub
                            </label>

                            <input
                                type="url"
                                name="github"
                                value={profile.github}
                                onChange={handleChange}
                                placeholder="https://github.com/username"
                            />

                        </div>


                        <div className="profile-field">

                            <label>
                                LinkedIn
                            </label>

                            <input
                                type="url"
                                name="linkedin"
                                value={profile.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/username"
                            />

                        </div>

                    </div>

                </section>


                {/* ACTIONS */}

                <div className="profile-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => window.location.reload()}
                    >
                        Reset
                    </button>

                    <button
                        type="submit"
                        className="save-button"
                        disabled={saving}
                    >

                        {saving
                            ? "Saving..."
                            : profileId
                                ? "Update Profile"
                                : "Create Profile"}

                    </button>

                </div>

            </form>

        </div>
    );
}

export default ProfileManager;