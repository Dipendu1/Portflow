import {
    FaGithub,
    FaLinkedin,
    FaArrowDown,
    FaDownload,
    FaMapMarkerAlt
} from "react-icons/fa";

function Hero({ profile }) {

    return (
        <section id="home" className="hero">

            {/* Background */}
            <div className="hero-background">
                <div className="gradient-orb orb-one"></div>
                <div className="gradient-orb orb-two"></div>
                <div className="grid-background"></div>
            </div>

            <div className="hero-container">

                {/* LEFT CONTENT */}
                <div className="hero-content">

                    <div className="availability">
                        <span className="status-dot"></span>
                        Available for opportunities
                    </div>

                    <p className="hero-greeting">
                        Hello, I'm
                    </p>

                    <h1>
                        {profile.name}
                    </h1>

                    <h2>
                        <span>
                            {profile.title}
                        </span>
                    </h2>

                    <div className="hero-location">
                        <FaMapMarkerAlt />
                        <span>
                            {profile.location}
                        </span>
                    </div>

                    <p className="hero-bio">
                        {profile.bio}
                    </p>

                    {/* Buttons */}
                    <div className="hero-buttons">

                        <a
                            href="#projects"
                            className="primary-btn"
                        >
                            Explore My Work
                        </a>

                        <a
                            href="#contact"
                            className="secondary-btn"
                        >
                            Let's Connect
                        </a>

                        <a
                            href="/resume.pdf"
                            download
                            className="resume-btn"
                        >
                            <FaDownload />
                            Resume
                        </a>

                    </div>

                    {/* Social */}
                    <div className="hero-socials">

                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            GitHub
                        </a>

                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaLinkedin />
                            LinkedIn
                        </a>

                    </div>

                </div>

                {/* PROFILE IMAGE */}
                <div className="hero-image-wrapper">

                    <div className="profile-glow"></div>

                    <div className="profile-ring">

                        <img
                            src="/profile.jpg"
                            alt={profile.name}
                            className="profile-image"
                        />

                    </div>

                    {/* Floating Cards */}
                    <div className="floating-card card-one">
                        <span>☕</span>
                        Java
                    </div>

                    <div className="floating-card card-two">
                        <span>⚡</span>
                        Spring Boot
                    </div>

                    <div className="floating-card card-three">
                        <span>◈</span>
                        MySQL
                    </div>

                </div>

            </div>

            {/* Scroll indicator */}
            <a
                href="#about"
                className="scroll-indicator"
            >
                <span>
                    Scroll to explore
                </span>

                <FaArrowDown />
            </a>

        </section>
    );
}

export default Hero;