import { useScrollReveal } from "../hooks/useScrollReveal";

function About({ profile }) {

    const [headingRef, headingVisible] = useScrollReveal();
    const [containerRef, containerVisible] = useScrollReveal();

    return (
        <section id="about" className="about-section">

            <div
                ref={headingRef}
                className={`section-heading reveal ${headingVisible ? "reveal-visible" : ""}`}
            >
                <span>01</span>
                <h2>About Me</h2>
            </div>

            <div
                ref={containerRef}
                className={`about-container reveal-stagger ${containerVisible ? "reveal-visible" : ""}`}
            >

                <div className="about-main">

                    <p className="about-intro">
                        I am a Computer Engineering graduate focused on
                        backend development, scalable applications,
                        automation, and AI-driven solutions.
                    </p>

                    <p>
                        My experience includes building backend systems
                        using Java and Spring Boot, developing REST APIs,
                        working with MySQL and MongoDB, and creating
                        full-stack applications with React.js.
                    </p>

                    <p>
                        I also have hands-on experience with Docker,
                        Kubernetes, CI/CD pipelines, GitHub Actions,
                        GitLab, and cloud-oriented development.
                    </p>

                </div>


                <div className="about-info">

                    <div className="info-card">

                        <span className="info-label">
                            EDUCATION
                        </span>

                        <h3>
                            B.E. Computer Engineering
                        </h3>

                        <p>
                            Shridevi Institute of Engineering
                            and Technology
                        </p>

                    </div>


                    <div className="info-card">

                        <span className="info-label">
                            FOCUS
                        </span>

                        <h3>
                            Backend Development
                        </h3>

                        <p>
                            Java • Spring Boot • Python
                        </p>

                    </div>


                    <div className="info-card">

                        <span className="info-label">
                            INTERESTS
                        </span>

                        <h3>
                            Software Engineering
                        </h3>

                        <p>
                            Backend • AI • DevOps • Cloud
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;