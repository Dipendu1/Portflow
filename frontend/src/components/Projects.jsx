import { useEffect, useState } from "react";

import {
    FaJava,
    FaPython,
    FaReact,
    FaDocker,
    FaGitAlt
} from "react-icons/fa";

import {
    SiSpringboot,
    SiMysql,
    SiMongodb,
    SiKubernetes,
    SiGithubactions,
    SiGitlab,
    SiFlask,
    SiHelm
} from "react-icons/si";


function Projects() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        fetch("http://localhost:8080/api/projects")

            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }

                return response.json();
            })

            .then(data => {

                setProjects(data);
                setLoading(false);

            })

            .catch(error => {

                console.error("Error fetching projects:", error);

                setError("Unable to load projects.");
                setLoading(false);

            });

    }, []);


    const getIcon = (technology) => {

        const tech = technology.trim().toLowerCase();

        switch (tech) {

            case "java":
                return <FaJava />;

            case "python":
                return <FaPython />;

            case "react":
            case "react.js":
                return <FaReact />;

            case "docker":
                return <FaDocker />;

            case "git":
                return <FaGitAlt />;

            case "spring boot":
                return <SiSpringboot />;

            case "mysql":
                return <SiMysql />;

            case "mongodb":
                return <SiMongodb />;

            case "kubernetes":
                return <SiKubernetes />;

            case "github actions":
                return <SiGithubactions />;

            case "gitlab":
                return <SiGitlab />;

            case "flask":
                return <SiFlask />;

            case "helm":
                return <SiHelm />;

            default:
                return null;
        }
    };


    if (loading) {

        return (

            <section
                id="projects"
                className="projects-section"
            >

                <div className="section-heading">

                    <span>03</span>

                    <h2>
                        Featured Projects
                    </h2>

                </div>

                <p className="section-description">
                    Loading projects...
                </p>

            </section>

        );
    }


    if (error) {

        return (

            <section
                id="projects"
                className="projects-section"
            >

                <div className="section-heading">

                    <span>03</span>

                    <h2>
                        Featured Projects
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
            id="projects"
            className="projects-section"
        >

            <div className="section-heading">

                <span>03</span>

                <h2>
                    Featured Projects
                </h2>

            </div>


            <p className="section-description">

                A selection of projects showcasing my experience
                across backend development, AI, full-stack development
                and DevOps.

            </p>


            <div className="projects-container">

                {projects.map((project) => (

                    <article
                        className="project-card"
                        key={project.id}
                    >

                        <div className="project-top">

                            <span className="project-number">
                                {project.number}
                            </span>

                            <span className="project-category">
                                {project.category}
                            </span>

                        </div>


                        <h3>
                            {project.title}
                        </h3>


                        <p className="project-description">

                            {project.description}

                        </p>


                        <div className="project-impact">

                            <span>
                                Impact
                            </span>

                            <p>
                                {project.impact}
                            </p>

                        </div>


                        {project.achievement && (

                            <div className="project-achievement">

                                {project.achievement}

                            </div>

                        )}


                        <div className="project-technologies">

                            {project.technologies
                                ?.split(",")
                                .map((technology) => (

                                    <div
                                        className="technology"
                                        key={technology.trim()}
                                    >

                                        {getIcon(technology)}

                                        <span>
                                            {technology.trim()}
                                        </span>

                                    </div>

                                ))}

                        </div>


                        <div className="project-footer">

                            <button
                                className="project-details-btn"
                            >

                                View Details

                                <span>
                                    ↗
                                </span>

                            </button>

                        </div>

                    </article>

                ))}

            </div>

        </section>

    );
}


export default Projects;