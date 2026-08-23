import { useState } from "react";
import { FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";

function Navbar({ profile }) {

    const [moreOpen, setMoreOpen] = useState(false);

    return (
        <nav className="navbar">

            {/* Logo */}
            <div className="logo">
                PORT<span>FLOW</span>
            </div>


            {/* Navigation */}
            <div className="nav-links">

                <a href="#home">
                    Home
                </a>

                <a href="#about">
                    About
                </a>

                <a href="#skills">
                    Skills
                </a>

                <a href="#projects">
                    Projects
                </a>

                <a href="#experience">
                    Experience
                </a>


                {/* More Dropdown */}
                <div
                    className="nav-dropdown"
                    onMouseEnter={() => setMoreOpen(true)}
                    onMouseLeave={() => setMoreOpen(false)}
                >

                    <button
                        className="more-button"
                        onClick={() => setMoreOpen(!moreOpen)}
                    >
                        More
                        <FaChevronDown
                            className={moreOpen ? "rotate-arrow" : ""}
                        />
                    </button>


                    {moreOpen && (

                        <div className="dropdown-menu">

                            <a href="#education">
                                Education
                            </a>

                            <a href="#certifications">
                                Certifications
                            </a>

                            <a href="#achievements">
                                Achievements
                            </a>

                        </div>

                    )}

                </div>


                <a href="#contact">
                    Contact
                </a>

            </div>


            {/* Social Links */}
            <div className="social-links">

                <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                >
                    <FaGithub />
                </a>


                <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                >
                    <FaLinkedin />
                </a>

            </div>

        </nav>
    );
}

export default Navbar;