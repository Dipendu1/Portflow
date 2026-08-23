import { useEffect, useState } from "react";

import { getProfile } from "./api/profileApi";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";


import "./App.css";


function App() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data = await getProfile();

                console.log("Profile data:", data);

                setProfile(data);

            } catch (err) {

                console.error("Profile loading error:", err);

                setError("Unable to load profile.");

            } finally {

                setLoading(false);

            }
        };

        loadProfile();

    }, []);


    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (
            <div className="loading">
                <div className="loading-spinner"></div>

                <p>
                    Loading Portflow...
                </p>
            </div>
        );

    }


    /* =========================
       ERROR
    ========================= */

    if (error) {

        return (
            <div className="error">

                <h2>
                    Something went wrong
                </h2>

                <p>
                    {error}
                </p>

                <button
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>

            </div>
        );

    }


    /* =========================
       MAIN APPLICATION
    ========================= */

    return (
        <>

            <Navbar profile={profile} />


            <main>

                {/* =========================
                    HERO
                ========================= */}

                <Hero profile={profile} />


                {/* =========================
                    ABOUT
                ========================= */}

                <About profile={profile} />


                {/* =========================
                    SKILLS
                ========================= */}

                <Skills />


                {/* =========================
                    PROJECTS
                ========================= */}

                <Projects />


                {/* =========================
                    EXPERIENCE
                ========================= */}

               <Experience />

               {/* =========================
                    EDUCATION
                ========================= */}
                <Education />

                {/* =========================
                    CERTIFICATION
                ========================= */}

                <Certifications />

                {/* =========================
                    ACHIEVEMENTS
                ========================= */}

                <Achievements />


                {/* =========================
                    CONTACT
                ========================= */}

                <Contact profile={profile} />

            </main>

        </>
    );
}


export default App;