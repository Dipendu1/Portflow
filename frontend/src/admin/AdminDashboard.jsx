import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Admin.css";

import ProfileManager from "./ProfileManager";
import SkillsManager from "./SkillsManager";
import ProjectsManager from "./ProjectsManager";
import ExperienceManager from "./ExperienceManager";
import EducationManager from "./EducationManager";
import CertificationManager from "./CertificationManager";
import AchievementManager from "./AchievementManager";
import MessagesManager from "./MessagesManager";


function AdminDashboard() {

    const navigate = useNavigate();

    // =========================
    // ACTIVE SECTION
    // =========================

    const [activeSection, setActiveSection] =
        useState("dashboard");


    // =========================
    // ADMIN USER
    // =========================

    const username =
        localStorage.getItem("adminUsername") || "Admin";


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUsername");
        localStorage.removeItem("adminRole");

        navigate("/admin");
    };


    // =========================
    // SECTION CHANGE
    // =========================

    const handleSectionChange = (section) => {

        setActiveSection(section);

        // Scroll to top when changing section
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =========================
    // PAGE TITLE
    // =========================

    const getPageTitle = () => {

        switch (activeSection) {

            case "dashboard":
                return "Dashboard";

            case "profile":
                return "Profile Management";

            case "skills":
                return "Skills Management";

            case "projects":
                return "Projects Management";

            case "experience":
                return "Experience Management";

            case "education":
                return "Education Management";

            case "certifications":
                return "Certifications Management";

            case "achievements":
                return "Achievements Management";

            case "messages":
                return "Messages";

            default:
                return "Dashboard";
        }
    };


    // =========================
    // PAGE SUBTITLE
    // =========================

    const getPageSubtitle = () => {

        if (activeSection === "dashboard") {

            return "Manage your Portflow portfolio";
        }

        if (activeSection === "messages") {

            return "View messages received from your portfolio";
        }

        return "Manage your portfolio content";
    };


    return (

        <div className="dashboard">


            {/* =========================================
                SIDEBAR
            ========================================= */}

            <aside className="sidebar">


                {/* LOGO */}

                <div className="sidebar-logo">

                    <h2>
                        Port<span>flow</span>
                    </h2>

                    <p>
                        Admin Panel
                    </p>

                </div>


                {/* NAVIGATION */}

                <nav className="sidebar-nav">


                    {/* DASHBOARD */}

                    <button
                        className={`nav-item ${
                            activeSection === "dashboard"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleSectionChange("dashboard")
                        }
                    >

                        <span>▣</span>

                        Dashboard

                    </button>


                    {/* PROFILE */}

                    <button
                        className={`nav-item ${
                            activeSection === "profile"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleSectionChange("profile")
                        }
                    >

                        <span>👤</span>

                        Profile

                    </button>


                    {/* SKILLS */}

                    <button
                        className={`nav-item ${
                            activeSection === "skills"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleSectionChange("skills")
                        }
                    >

                        <span>⚡</span>

                        Skills

                    </button>


                    {/* PROJECTS */}

                    <button
                        className={`nav-item ${
                            activeSection === "projects"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleSectionChange("projects")
                        }
                    >

                        <span>💼</span>

                        Projects

                    </button>


                    {/* EXPERIENCE */}

                    <button
                        className={`nav-item ${
                            activeSection === "experience"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleSectionChange("experience")
                        }
                    >

                        <span>🏢</span>

                        Experience

                    </button>


                    {/* EDUCATION */}

                    <button
                        className={`nav-item ${
                            activeSection === "education"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleSectionChange("education")
                        }
                    >

                        <span>🎓</span>

                        Education

                    </button>


                    {/* CERTIFICATIONS */}

                    <button
                        className={`nav-item ${
                            activeSection === "certifications"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleSectionChange("certifications")
                        }
                    >

                        <span>📜</span>

                        Certifications

                    </button>


                    {/* ACHIEVEMENTS */}

                    <button
                        className={`nav-item ${
                            activeSection === "achievements"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleSectionChange("achievements")
                        }
                    >

                        <span>🏆</span>

                        Achievements

                    </button>


                    {/* MESSAGES */}

                    <button
                        className={`nav-item ${
                            activeSection === "messages"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleSectionChange("messages")
                        }
                    >

                        <span>✉</span>

                        Messages

                    </button>


                </nav>


                {/* SIDEBAR BOTTOM */}

                <div className="sidebar-bottom">

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >

                        <span>↪</span>

                        Logout

                    </button>

                </div>


            </aside>



            {/* =========================================
                MAIN CONTENT
            ========================================= */}

            <main className="dashboard-main">


                {/* =========================================
                    HEADER
                ========================================= */}

                <header className="dashboard-header">

                    <div>

                        <h1>
                            {getPageTitle()}
                        </h1>

                        <p>
                            {getPageSubtitle()}
                        </p>

                    </div>


                    {/* ADMIN USER */}

                    <div className="admin-user">

                        <div className="user-avatar">

                            {username
                                .charAt(0)
                                .toUpperCase()}

                        </div>


                        <div className="user-info">

                            <strong>
                                {username}
                            </strong>

                            <span>
                                Administrator
                            </span>

                        </div>

                    </div>

                </header>



                {/* =========================================
                    PROFILE
                ========================================= */}

                {activeSection === "profile" && (
                    <ProfileManager />
                )}



                {/* =========================================
                    SKILLS
                ========================================= */}

                {activeSection === "skills" && (
                    <SkillsManager />
                )}



                {/* =========================================
                    PROJECTS
                ========================================= */}

                {activeSection === "projects" && (
                    <ProjectsManager />
                )}



                {/* =========================================
                    EXPERIENCE
                ========================================= */}

                {activeSection === "experience" && (
                    <ExperienceManager />
                )}



                {/* =========================================
                    EDUCATION
                ========================================= */}

                {activeSection === "education" && (
                    <EducationManager />
                )}



                {/* =========================================
                    CERTIFICATIONS
                ========================================= */}

                {activeSection === "certifications" && (
                    <CertificationManager />
                )}



                {/* =========================================
                    ACHIEVEMENTS
                ========================================= */}

                {activeSection === "achievements" && (
                    <AchievementManager />
                )}



                {/* =========================================
                    MESSAGES
                ========================================= */}

                {activeSection === "messages" && (
                    <MessagesManager />
                )}



                {/* =========================================
                    DASHBOARD
                ========================================= */}

                {activeSection === "dashboard" && (

                    <>


                        {/* =====================================
                            WELCOME CARD
                        ===================================== */}

                        <section className="welcome-card">

                            <div>

                                <p className="welcome-small">
                                    Welcome back 👋
                                </p>

                                <h2>
                                    Hello, {username}!
                                </h2>

                                <p>
                                    Manage your portfolio content,
                                    projects, experience and
                                    messages from one place.
                                </p>

                            </div>


                            <div className="welcome-icon">
                                🚀
                            </div>

                        </section>



                        {/* =====================================
                            STATISTICS
                        ===================================== */}

                        <section className="stats-grid">


                            {/* PROFILE */}

                            <div
                                className="stat-card"
                                onClick={() =>
                                    handleSectionChange("profile")
                                }
                            >

                                <div className="stat-icon blue">
                                    👤
                                </div>

                                <div>

                                    <span>
                                        Profile
                                    </span>

                                    <h3>
                                        Manage
                                    </h3>

                                </div>

                            </div>



                            {/* PROJECTS */}

                            <div
                                className="stat-card"
                                onClick={() =>
                                    handleSectionChange("projects")
                                }
                            >

                                <div className="stat-icon purple">
                                    💼
                                </div>

                                <div>

                                    <span>
                                        Projects
                                    </span>

                                    <h3>
                                        Manage
                                    </h3>

                                </div>

                            </div>



                            {/* SKILLS */}

                            <div
                                className="stat-card"
                                onClick={() =>
                                    handleSectionChange("skills")
                                }
                            >

                                <div className="stat-icon green">
                                    ⚡
                                </div>

                                <div>

                                    <span>
                                        Skills
                                    </span>

                                    <h3>
                                        Manage
                                    </h3>

                                </div>

                            </div>



                            {/* EXPERIENCE */}

                            <div
                                className="stat-card"
                                onClick={() =>
                                    handleSectionChange("experience")
                                }
                            >

                                <div className="stat-icon orange">
                                    🏢
                                </div>

                                <div>

                                    <span>
                                        Experience
                                    </span>

                                    <h3>
                                        Manage
                                    </h3>

                                </div>

                            </div>



                            {/* EDUCATION */}

                            <div
                                className="stat-card"
                                onClick={() =>
                                    handleSectionChange("education")
                                }
                            >

                                <div className="stat-icon blue">
                                    🎓
                                </div>

                                <div>

                                    <span>
                                        Education
                                    </span>

                                    <h3>
                                        Manage
                                    </h3>

                                </div>

                            </div>



                            {/* CERTIFICATIONS */}

                            <div
                                className="stat-card"
                                onClick={() =>
                                    handleSectionChange(
                                        "certifications"
                                    )
                                }
                            >

                                <div className="stat-icon purple">
                                    📜
                                </div>

                                <div>

                                    <span>
                                        Certifications
                                    </span>

                                    <h3>
                                        Manage
                                    </h3>

                                </div>

                            </div>



                            {/* ACHIEVEMENTS */}

                            <div
                                className="stat-card"
                                onClick={() =>
                                    handleSectionChange(
                                        "achievements"
                                    )
                                }
                            >

                                <div className="stat-icon green">
                                    🏆
                                </div>

                                <div>

                                    <span>
                                        Achievements
                                    </span>

                                    <h3>
                                        Manage
                                    </h3>

                                </div>

                            </div>



                            {/* MESSAGES */}

                            <div
                                className="stat-card"
                                onClick={() =>
                                    handleSectionChange(
                                        "messages"
                                    )
                                }
                            >

                                <div className="stat-icon orange">
                                    ✉
                                </div>

                                <div>

                                    <span>
                                        Messages
                                    </span>

                                    <h3>
                                        View
                                    </h3>

                                </div>

                            </div>


                        </section>



                        {/* =====================================
                            CONTENT GRID
                        ===================================== */}

                        <section className="dashboard-content">


                            {/* =================================
                                QUICK ACTIONS
                            ================================= */}

                            <div className="dashboard-card">

                                <div className="card-header">

                                    <div>

                                        <h2>
                                            Quick Actions
                                        </h2>

                                        <p>
                                            Manage your portfolio
                                        </p>

                                    </div>

                                </div>


                                <div className="quick-actions">


                                    {/* PROFILE */}

                                    <button
                                        onClick={() =>
                                            handleSectionChange(
                                                "profile"
                                            )
                                        }
                                    >

                                        <span>
                                            👤
                                        </span>

                                        <div>

                                            <strong>
                                                Edit Profile
                                            </strong>

                                            <small>
                                                Update personal information
                                            </small>

                                        </div>

                                    </button>



                                    {/* PROJECTS */}

                                    <button
                                        onClick={() =>
                                            handleSectionChange(
                                                "projects"
                                            )
                                        }
                                    >

                                        <span>
                                            💼
                                        </span>

                                        <div>

                                            <strong>
                                                Add Project
                                            </strong>

                                            <small>
                                                Create a new project
                                            </small>

                                        </div>

                                    </button>



                                    {/* SKILLS */}

                                    <button
                                        onClick={() =>
                                            handleSectionChange(
                                                "skills"
                                            )
                                        }
                                    >

                                        <span>
                                            ⚡
                                        </span>

                                        <div>

                                            <strong>
                                                Manage Skills
                                            </strong>

                                            <small>
                                                Update technical skills
                                            </small>

                                        </div>

                                    </button>



                                    {/* EXPERIENCE */}

                                    <button
                                        onClick={() =>
                                            handleSectionChange(
                                                "experience"
                                            )
                                        }
                                    >

                                        <span>
                                            🏢
                                        </span>

                                        <div>

                                            <strong>
                                                Manage Experience
                                            </strong>

                                            <small>
                                                Update work experience
                                            </small>

                                        </div>

                                    </button>



                                    {/* EDUCATION */}

                                    <button
                                        onClick={() =>
                                            handleSectionChange(
                                                "education"
                                            )
                                        }
                                    >

                                        <span>
                                            🎓
                                        </span>

                                        <div>

                                            <strong>
                                                Manage Education
                                            </strong>

                                            <small>
                                                Update education details
                                            </small>

                                        </div>

                                    </button>



                                    {/* CERTIFICATIONS */}

                                    <button
                                        onClick={() =>
                                            handleSectionChange(
                                                "certifications"
                                            )
                                        }
                                    >

                                        <span>
                                            📜
                                        </span>

                                        <div>

                                            <strong>
                                                Certifications
                                            </strong>

                                            <small>
                                                Manage certifications
                                            </small>

                                        </div>

                                    </button>



                                    {/* ACHIEVEMENTS */}

                                    <button
                                        onClick={() =>
                                            handleSectionChange(
                                                "achievements"
                                            )
                                        }
                                    >

                                        <span>
                                            🏆
                                        </span>

                                        <div>

                                            <strong>
                                                Achievements
                                            </strong>

                                            <small>
                                                Manage achievements
                                            </small>

                                        </div>

                                    </button>



                                    {/* MESSAGES */}

                                    <button
                                        onClick={() =>
                                            handleSectionChange(
                                                "messages"
                                            )
                                        }
                                    >

                                        <span>
                                            ✉
                                        </span>

                                        <div>

                                            <strong>
                                                View Messages
                                            </strong>

                                            <small>
                                                Read contact messages
                                            </small>

                                        </div>

                                    </button>


                                </div>

                            </div>



                            {/* =================================
                                PORTFOLIO STATUS
                            ================================= */}

                            <div className="dashboard-card">

                                <div className="card-header">

                                    <div>

                                        <h2>
                                            Portfolio Status
                                        </h2>

                                        <p>
                                            Current portfolio sections
                                        </p>

                                    </div>

                                </div>


                                <div className="status-list">


                                    <div className="status-item">

                                        <span>
                                            Profile
                                        </span>

                                        <strong className="status-active">
                                            Active
                                        </strong>

                                    </div>



                                    <div className="status-item">

                                        <span>
                                            Projects
                                        </span>

                                        <strong className="status-active">
                                            Active
                                        </strong>

                                    </div>



                                    <div className="status-item">

                                        <span>
                                            Skills
                                        </span>

                                        <strong className="status-active">
                                            Active
                                        </strong>

                                    </div>



                                    <div className="status-item">

                                        <span>
                                            Experience
                                        </span>

                                        <strong className="status-active">
                                            Active
                                        </strong>

                                    </div>



                                    <div className="status-item">

                                        <span>
                                            Education
                                        </span>

                                        <strong className="status-active">
                                            Active
                                        </strong>

                                    </div>



                                    <div className="status-item">

                                        <span>
                                            Certifications
                                        </span>

                                        <strong className="status-active">
                                            Active
                                        </strong>

                                    </div>



                                    <div className="status-item">

                                        <span>
                                            Achievements
                                        </span>

                                        <strong className="status-active">
                                            Active
                                        </strong>

                                    </div>



                                    <div className="status-item">

                                        <span>
                                            Contact
                                        </span>

                                        <strong className="status-active">
                                            Active
                                        </strong>

                                    </div>


                                </div>

                            </div>


                        </section>

                    </>

                )}



                {/* =========================================
                    OTHER SECTIONS
                ========================================= */}

                {activeSection !== "dashboard" &&
                 activeSection !== "profile" &&
                 activeSection !== "skills" &&
                 activeSection !== "projects" &&
                 activeSection !== "experience" &&
                 activeSection !== "education" &&
                 activeSection !== "certifications" &&
                 activeSection !== "achievements" &&
                 activeSection !== "messages" && (

                    <section className="dashboard-card coming-soon">

                        <h2>

                            {activeSection
                                .charAt(0)
                                .toUpperCase() +
                             activeSection.slice(1)}

                        </h2>

                        <p>
                            This management section will be
                            available soon.
                        </p>

                    </section>

                )}



                {/* =========================================
                    FOOTER
                ========================================= */}

                <footer className="dashboard-footer">

                    <p>
                        © 2026 Portflow Admin Panel
                    </p>

                    <p>
                        Portfolio Management System
                    </p>

                </footer>


            </main>

        </div>
    );
}

export default AdminDashboard;