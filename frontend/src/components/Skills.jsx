import { useEffect, useState } from "react";

import {
    FaJava,
    FaPython,
    FaJs,
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
    SiFlask
} from "react-icons/si";


function Skills() {

    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        fetch("http://localhost:8080/api/skills")

            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to fetch skills");
                }

                return response.json();
            })

            .then(data => {

                setSkills(data);
                setLoading(false);

            })

            .catch(error => {

                console.error("Error fetching skills:", error);

                setError("Unable to load skills.");
                setLoading(false);

            });

    }, []);


    const getIcon = (icon) => {

        switch (icon) {

            case "java":
                return <FaJava />;

            case "python":
                return <FaPython />;

            case "javascript":
                return <FaJs />;

            case "springboot":
                return <SiSpringboot />;

            case "flask":
                return <SiFlask />;

            case "react":
                return <FaReact />;

            case "mysql":
                return <SiMysql />;

            case "mongodb":
                return <SiMongodb />;

            case "docker":
                return <FaDocker />;

            case "kubernetes":
                return <SiKubernetes />;

            case "githubactions":
                return <SiGithubactions />;

            case "gitlab":
                return <SiGitlab />;

            case "git":
                return <FaGitAlt />;

            default:
                return icon?.toUpperCase();
        }
    };


    // Group skills by category
    const skillGroups = skills.reduce((groups, skill) => {

        if (!groups[skill.category]) {
            groups[skill.category] = [];
        }

        groups[skill.category].push(skill);

        return groups;

    }, {});


    if (loading) {
        return (
            <section id="skills" className="skills-section">

                <div className="section-heading">

                    <span>02</span>

                    <h2>
                        Technical Skills
                    </h2>

                </div>

                <p className="section-description">
                    Loading skills...
                </p>

            </section>
        );
    }


    if (error) {
        return (
            <section id="skills" className="skills-section">

                <div className="section-heading">

                    <span>02</span>

                    <h2>
                        Technical Skills
                    </h2>

                </div>

                <p className="section-description">
                    {error}
                </p>

            </section>
        );
    }


    return (

        <section id="skills" className="skills-section">

            <div className="section-heading">

                <span>02</span>

                <h2>
                    Technical Skills
                </h2>

            </div>


            <p className="section-description">

                Technologies and tools I use to build,
                deploy, and maintain software applications.

            </p>


            <div className="skills-grid">

                {Object.entries(skillGroups).map(
                    ([category, categorySkills]) => (

                        <div
                            className="skill-group"
                            key={category}
                        >

                            <h3>
                                {category}
                            </h3>


                            <div className="skills-list">

                                {categorySkills.map((skill) => (

                                    <div
                                        className="skill-item"
                                        key={skill.id}
                                    >

                                        <span className="skill-icon">

                                            {getIcon(skill.icon)}

                                        </span>


                                        <span>
                                            {skill.name}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                    )
                )}

            </div>

        </section>

    );
}


export default Skills;