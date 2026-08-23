import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const BACKEND_BASE_URL = "http://localhost:8080";

// Old certs live in frontend/public/certificates/ (served by Vite as-is).
// New certs uploaded via the admin dashboard live under backend/uploads/
// and must be resolved against the Spring Boot origin.
function getPdfUrl(pdfPath) {

    if (!pdfPath) {
        return null;
    }

    if (pdfPath.startsWith("/uploads/")) {
        return `${BACKEND_BASE_URL}${pdfPath}`;
    }

    return pdfPath;
}


function Certifications() {

    const [headingRef, headingVisible] = useScrollReveal();
    const [gridRef, gridVisible] = useScrollReveal();

    const [certifications, setCertifications] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedCert, setSelectedCert] = useState(null);


    useEffect(() => {

        fetch("http://localhost:8080/api/certifications")

            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch certifications"
                    );
                }

                return response.json();
            })

            .then(data => {

                setCertifications(data);
                setLoading(false);

            })

            .catch(error => {

                console.error(
                    "Error fetching certifications:",
                    error
                );

                setError(
                    "Unable to load certifications."
                );

                setLoading(false);

            });

    }, []);


    if (loading) {

        return (
            <section
                id="certifications"
                className="certifications-section"
            >

                <div className="section-heading">

                    <span>06</span>

                    <h2>
                        Certifications
                    </h2>

                </div>

                <p className="section-description">
                    Loading certifications...
                </p>

            </section>
        );
    }


    if (error) {

        return (
            <section
                id="certifications"
                className="certifications-section"
            >

                <div className="section-heading">

                    <span>06</span>

                    <h2>
                        Certifications
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
            id="certifications"
            className="certifications-section"
        >

            <div
                ref={headingRef}
                className={`section-heading reveal ${
                    headingVisible
                        ? "reveal-visible"
                        : ""
                }`}
            >

                <span>06</span>

                <h2>
                    Certifications
                </h2>

            </div>


            <p
                className={`section-description reveal ${
                    headingVisible
                        ? "reveal-visible"
                        : ""
                }`}
            >
                Certifications, training and technical workshops
                that have contributed to my software engineering
                journey.
            </p>


            <div
                ref={gridRef}
                className={`certifications-grid reveal-stagger ${
                    gridVisible
                        ? "reveal-visible"
                        : ""
                }`}
            >

                {certifications.map((cert) => (

                    <div
                        className="certification-card"
                        key={cert.id}
                        onClick={() =>
                            setSelectedCert(cert)
                        }
                        role="button"
                        tabIndex={0}
                    >

                        <div className="certification-top">

                            <span className="certification-number">
                                {cert.number}
                            </span>

                            <span className="certification-category">
                                {cert.category}
                            </span>

                        </div>


                        <h3>
                            {cert.title}
                        </h3>


                        <div className="certification-meta">

                            <span>
                                {cert.organization}
                            </span>

                            <span>
                                {cert.year}
                            </span>

                        </div>


                        <p>
                            {cert.description}
                        </p>


                        <div className="certification-line"></div>


                        <span className="certification-view-hint">
                            View Certificate
                        </span>

                    </div>

                ))}

            </div>


            {selectedCert && (

                <div
                    className="certificate-modal-overlay"
                    onClick={() =>
                        setSelectedCert(null)
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
                                setSelectedCert(null)
                            }
                        >
                            X
                        </button>


                        <div className="certificate-modal-header">

                            <span>
                                {selectedCert.number}
                            </span>

                            <div>

                                <h3>
                                    {selectedCert.title}
                                </h3>

                                <p>
                                    {selectedCert.organization}
                                    {" - "}
                                    {selectedCert.year}
                                </p>

                            </div>

                        </div>


                        <div className="certificate-pdf-wrapper">

                            <iframe
                                src={getPdfUrl(selectedCert.pdf)}
                                title={selectedCert.title}
                                className="certificate-pdf-frame"
                            />

                        </div>


                        <a
                            href={getPdfUrl(selectedCert.pdf)}
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

export default Certifications;