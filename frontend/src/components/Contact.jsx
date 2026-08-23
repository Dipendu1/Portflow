import { useState } from "react";

import {
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPaperPlane
} from "react-icons/fa";

import { useScrollReveal } from "../hooks/useScrollReveal";


function Contact({ profile }) {

    const [headingRef, headingVisible] =
        useScrollReveal();

    const [containerRef, containerVisible] =
        useScrollReveal();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });


    const [sending, setSending] = useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setSending(true);
        setSuccess("");
        setError("");


        try {

            const response = await fetch(
                "https://portflow-0k8l.onrender.com/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            if (!response.ok) {
                throw new Error(
                    "Failed to send message"
                );
            }


            await response.json();


            setSuccess(
                "Your message has been sent successfully!"
            );


            setFormData({
                name: "",
                email: "",
                message: ""
            });

        } catch (error) {

            console.error(
                "Error sending message:",
                error
            );

            setError(
                "Unable to send your message. Please try again."
            );

        } finally {

            setSending(false);

        }

    };


    return (

        <section
            id="contact"
            className="contact-section"
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

                <span>08</span>

                <h2>
                    Let's Connect
                </h2>

            </div>


            {/* Main Contact Container */}

            <div
                ref={containerRef}
                className={`contact-container reveal-stagger ${
                    containerVisible
                        ? "reveal-visible"
                        : ""
                }`}
            >

                {/* LEFT SIDE */}

                <div className="contact-content">

                    <p className="contact-label">
                        HAVE A PROJECT IN MIND?
                    </p>


                    <h3>

                        Let's build something

                        <span>
                            meaningful.
                        </span>

                    </h3>


                    <p className="contact-description">

                        I'm always interested in discussing
                        software engineering opportunities,
                        backend development, interesting projects
                        and new ideas.

                    </p>


                    {/* Contact Details */}

                    <div className="contact-details">

                        <a
                            href={`mailto:${profile.email}`}
                            className="contact-detail"
                        >

                            <div className="contact-icon">
                                <FaEnvelope />
                            </div>

                            <div>

                                <span>
                                    Email
                                </span>

                                <strong>
                                    {profile.email}
                                </strong>

                            </div>

                        </a>


                        <div className="contact-detail">

                            <div className="contact-icon">

                                <FaMapMarkerAlt />

                            </div>

                            <div>

                                <span>
                                    Location
                                </span>

                                <strong>
                                    {profile.location}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="contact-card">

                    <div className="contact-card-header">

                        <span className="contact-status"></span>

                        <span>
                            Open to opportunities
                        </span>

                    </div>


                    <h4>
                        Start a conversation
                    </h4>


                    <p>
                        Whether it's a job opportunity,
                        collaboration or just a tech discussion,
                        feel free to reach out.
                    </p>


                    {/* Contact Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="contact-form"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />


                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />


                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            required
                        />


                        <button
                            type="submit"
                            className="contact-email-btn"
                            disabled={sending}
                        >

                            <FaPaperPlane />

                            {sending
                                ? "Sending..."
                                : "Send Message"
                            }

                        </button>


                        {success && (

                            <p className="contact-success">
                                {success}
                            </p>

                        )}


                        {error && (

                            <p className="contact-error">
                                {error}
                            </p>

                        )}

                    </form>


                    {/* Social Links */}

                    <div className="contact-socials">

                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noreferrer"
                        >

                            <FaGithub />

                            GitHub

                        </a>


                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noreferrer"
                        >

                            <FaLinkedin />

                            LinkedIn

                        </a>

                    </div>

                </div>

            </div>


            {/* Footer */}

            <div className="contact-footer">

                <span>
                    © {new Date().getFullYear()}{" "}
                    {profile.name}
                </span>

                <span>
                    Built with React & Spring Boot
                </span>

            </div>

        </section>

    );
}


export default Contact;