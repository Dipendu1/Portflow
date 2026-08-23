import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

function Education() {

    const [headingRef, headingVisible] = useScrollReveal();
    const [timelineRef, timelineVisible] = useScrollReveal();

    const [education, setEducation] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        fetch("http://localhost:8080/api/education")

            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to fetch education");
                }

                return response.json();
            })

            .then(data => {

                setEducation(data);
                setLoading(false);

            })

            .catch(error => {

                console.error(
                    "Error fetching education:",
                    error
                );

                setError("Unable to load education.");
                setLoading(false);

            });

    }, []);


    if (loading) {

        return (
            <section
                id="education"
                className="education-section"
            >

                <div className="section-heading">

                    <span>05</span>

                    <h2>
                        Education
                    </h2>

                </div>

                <p className="section-description">
                    Loading education...
                </p>

            </section>
        );
    }


    if (error) {

        return (
            <section
                id="education"
                className="education-section"
            >

                <div className="section-heading">

                    <span>05</span>

                    <h2>
                        Education
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
            id="education"
            className="education-section"
        >

            <div
                ref={headingRef}
                className={`section-heading reveal ${
                    headingVisible
                        ? "reveal-visible"
                        : ""
                }`}
            >

                <span>05</span>

                <h2>
                    Education
                </h2>

            </div>


            <div
                ref={timelineRef}
                className={`education-timeline reveal-stagger ${
                    timelineVisible
                        ? "reveal-visible"
                        : ""
                }`}
            >

                {education.map((item) => (

                    <div
                        className="education-item"
                        key={item.id}
                    >

                        <div className="education-dot"></div>


                        <div className="education-card">

                            <div className="education-top">

                                <span className="education-year">
                                    {item.year}
                                </span>

                                <span className="education-type">
                                    {item.type}
                                </span>

                            </div>


                            <h3>
                                {item.field}
                            </h3>


                            <h4>
                                {item.institution}
                            </h4>


                            <p>
                                {item.description}
                            </p>


                            <div className="education-meta">

                                <div>

                                    <span>
                                        DEGREE
                                    </span>

                                    <strong>
                                        {item.type}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        FIELD
                                    </span>

                                    <strong>
                                        {item.field}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );
}

export default Education;