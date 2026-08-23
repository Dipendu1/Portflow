import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

function Experience() {

    const [headingRef, headingVisible] = useScrollReveal();
    const [containerRef, containerVisible] = useScrollReveal();

    const [experiences, setExperiences] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedExperience, setSelectedExperience] = useState(null);


    useEffect(() => {

        fetch("http://localhost:8080/api/experience")

            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to fetch experience");
                }

                return response.json();
            })

            .then(data => {

                setExperiences(data);
                setLoading(false);

            })

            .catch(error => {

                console.error(
                    "Error fetching experience:",
                    error
                );

                setError("Unable to load experience.");
                setLoading(false);

            });

    }, []);


    if (loading) {

        return (
            <section
                id="experience"
                className="experience-section"
            >

                <div className="section-heading">

                    <span>04</span>

                    <h2>
                        Experience
                    </h2>

                </div>

                <p className="section-description">
                    Loading experience...
                </p>

            </section>
        );
    }


    if (error) {

        return (
            <section
                id="experience"
                className="experience-section"
            >

                <div className="section-heading">

                    <span>04</span>

                    <h2>
                        Experience
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
            id="experience"
            className="experience-section"
        >

            <div
                ref={headingRef}
                className={`section-heading reveal ${
                    headingVisible
                        ? "reveal-visible"
                        : ""
                }`}
            >

                <span>04</span>

                <h2>
                    Experience
                </h2>

            </div>


            <div
                ref={containerRef}
                className={`experience-container reveal-stagger ${
                    containerVisible
                        ? "reveal-visible"
                        : ""
                }`}
            >

                {experiences.map((experience) => (

                    <div
                        className="experience-card"
                        key={experience.id}
                        onClick={() =>
                            setSelectedExperience(experience)
                        }
                        role="button"
                        tabIndex={0}
                    >

                        <div className="experience-header">

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

                            <span className="experience-date">
                                {experience.duration}
                            </span>

                        </div>


                        <div className="experience-content">

                            <p>
                                {experience.description}
                            </p>


                            <div className="experience-highlights">

                                {experience.highlights
                                    ?.split("|")
                                    .map((highlight, index) => (

                                        <div key={index}>

                                            <span>
                                                {String(
                                                    index + 1
                                                ).padStart(2, "0")}
                                            </span>

                                            <p>
                                                {highlight.trim()}
                                            </p>

                                        </div>

                                    ))}

                            </div>


                            <div className="experience-tech">

                                {experience.technologies
                                    ?.split(",")
                                    .map((technology) => (

                                        <span
                                            key={technology}
                                        >
                                            {technology.trim()}
                                        </span>

                                    ))}

                            </div>


                            {experience.certificate && (

                                <span className="experience-view-hint">
                                    View Internship Certificate
                                </span>

                            )}

                        </div>

                    </div>

                ))}

            </div>


            {selectedExperience && (

                <div
                    className="certificate-modal-overlay"
                    onClick={() =>
                        setSelectedExperience(null)
                    }
                >

                    <div
                        className="certificate-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="certificate-modal-close"
                            onClick={() =>
                                setSelectedExperience(null)
                            }
                        >
                            X
                        </button>


                        <div className="certificate-modal-header">

                            <span>04</span>

                            <div>

                                <h3>
                                    {selectedExperience.position}
                                </h3>

                                <p>
                                    {selectedExperience.company}
                                    {" - "}
                                    {selectedExperience.duration}
                                </p>

                            </div>

                        </div>


                        <div className="certificate-pdf-wrapper">

                            <iframe
                                src={
                                    selectedExperience.certificate
                                }
                                title={`${selectedExperience.position} Certificate`}
                                className="certificate-pdf-frame"
                            />

                        </div>


                        <a
                            href={
                                selectedExperience.certificate
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="certificate-open-btn"
                        >
                            Open in New Tab
                        </a>

                    </div>

                </div>

            )}

        </section>
    );
}

export default Experience;