import { useEffect, useState } from "react";
import {
    FaTrophy,
    FaCode,
    FaMedal
} from "react-icons/fa";

import { useScrollReveal } from "../hooks/useScrollReveal";


// Convert icon name from backend into React icon
function getAchievementIcon(icon) {

    switch (icon) {

        case "trophy":
            return <FaTrophy />;

        case "code":
            return <FaCode />;

        case "medal":
            return <FaMedal />;

        default:
            return <FaTrophy />;
    }
}


function Achievements() {

    const [headingRef, headingVisible] =
        useScrollReveal();

    const [gridRef, gridVisible] =
        useScrollReveal();


    const [achievements, setAchievements] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);


    useEffect(() => {

        fetch("http://localhost:8080/api/achievements")

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        "Failed to fetch achievements"
                    );
                }

                return response.json();
            })

            .then(data => {

                setAchievements(data);

                setLoading(false);
            })

            .catch(error => {

                console.error(
                    "Error fetching achievements:",
                    error
                );

                setError(
                    "Unable to load achievements."
                );

                setLoading(false);
            });

    }, []);


    // Loading state
    if (loading) {

        return (
            <section
                id="achievements"
                className="achievements-section"
            >

                <div className="section-heading">

                    <span>07</span>

                    <h2>
                        Achievements
                    </h2>

                </div>

                <p className="section-description">
                    Loading achievements...
                </p>

            </section>
        );
    }


    // Error state
    if (error) {

        return (
            <section
                id="achievements"
                className="achievements-section"
            >

                <div className="section-heading">

                    <span>07</span>

                    <h2>
                        Achievements
                    </h2>

                </div>

                <p className="section-description">
                    {error}
                </p>

            </section>
        );
    }


    return (

        <section
            id="achievements"
            className="achievements-section"
        >

            {/* Heading */}

            <div
                ref={headingRef}
                className={`section-heading reveal ${
                    headingVisible
                        ? "reveal-visible"
                        : ""
                }`}
            >

                <span>07</span>

                <h2>
                    Achievements
                </h2>

            </div>


            {/* Achievement Grid */}

            <div
                ref={gridRef}
                className={`achievements-grid reveal-stagger ${
                    gridVisible
                        ? "reveal-visible"
                        : ""
                }`}
            >

                {achievements.map(
                    (achievement) => (

                        <div
                            className="achievement-card"
                            key={achievement.id}
                        >

                            {/* Icon */}

                            <div className="achievement-icon">

                                {getAchievementIcon(
                                    achievement.icon
                                )}

                            </div>


                            {/* Content */}

                            <div className="achievement-content">

                                <span>
                                    {achievement.category}
                                </span>

                                <h3>
                                    {achievement.title}
                                </h3>

                                <p>
                                    {achievement.description}
                                </p>

                            </div>

                        </div>

                    )
                )}

            </div>

        </section>
    );
}

export default Achievements;