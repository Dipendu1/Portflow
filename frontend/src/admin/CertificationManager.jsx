
import { useEffect, useState } from "react";

import {
    getCertifications,
    createCertification,
    updateCertification,
    deleteCertification,
    uploadCertificationPdf
} from "../api/certificationApi";

import "./CertificationManager.css";


function CertificationManager() {

    // =========================================
    // STATE
    // =========================================

    const [certifications, setCertifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState(null);

    const [uploading, setUploading] = useState(false);

    const [message, setMessage] = useState("");

    const [form, setForm] = useState({

        number: "",
        title: "",
        category: "",
        organization: "",
        year: "",
        description: "",
        pdf: ""

    });


    // =========================================
    // LOAD CERTIFICATIONS
    // =========================================

    const loadCertifications = async () => {

        try {

            setLoading(true);

            const data =
                await getCertifications();

            setCertifications(data);

        } catch (error) {

            console.error(
                "Failed to load certifications:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadCertifications();

    }, []);


    // =========================================
    // HANDLE INPUT
    // =========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    };


    // =========================================
    // UPLOAD PDF
    // =========================================

    const handlePdfUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) {
            return;
        }


        // Check PDF
        if (
            file.type !==
            "application/pdf"
        ) {

            setMessage(
                "Only PDF files are allowed."
            );

            return;
        }


        // Optional size limit: 10 MB
        if (
            file.size >
            10 * 1024 * 1024
        ) {

            setMessage(
                "PDF size must be less than 10 MB."
            );

            return;
        }


        try {

            setUploading(true);

            setMessage(
                "Uploading PDF..."
            );


            const pdfPath =
                await uploadCertificationPdf(
                    file
                );


            // Save returned path
            setForm(prev => ({
                ...prev,
                pdf: pdfPath
            }));


            setMessage(
                "PDF uploaded successfully."
            );


        } catch (error) {

            console.error(
                "PDF upload failed:",
                error
            );

            setMessage(
                error.response?.data ||
                error.message ||
                "PDF upload failed."
            );

        } finally {

            setUploading(false);

        }

    };


    // =========================================
    // SUBMIT FORM
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            if (editingId) {

                await updateCertification(
                    editingId,
                    form
                );

                setMessage(
                    "Certification updated successfully."
                );

            } else {

                await createCertification(
                    form
                );

                setMessage(
                    "Certification added successfully."
                );

            }


            // Reset form
            setForm({

                number: "",
                title: "",
                category: "",
                organization: "",
                year: "",
                description: "",
                pdf: ""

            });


            setEditingId(null);

            await loadCertifications();


        } catch (error) {

            console.error(
                "Failed to save certification:",
                error
            );

            setMessage(
                "Failed to save certification."
            );

        }

    };


    // =========================================
    // EDIT
    // =========================================

    const handleEdit = (certification) => {

        setEditingId(
            certification.id
        );

        setForm({

            number:
                certification.number || "",

            title:
                certification.title || "",

            category:
                certification.category || "",

            organization:
                certification.organization || "",

            year:
                certification.year || "",

            description:
                certification.description || "",

            pdf:
                certification.pdf || ""

        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =========================================
    // DELETE
    // =========================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this certification?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            await deleteCertification(id);

            setMessage(
                "Certification deleted successfully."
            );

            await loadCertifications();

        } catch (error) {

            console.error(
                "Delete failed:",
                error
            );

            setMessage(
                "Failed to delete certification."
            );

        }

    };


    // =========================================
    // CANCEL EDIT
    // =========================================

    const handleCancel = () => {

        setEditingId(null);

        setForm({

            number: "",
            title: "",
            category: "",
            organization: "",
            year: "",
            description: "",
            pdf: ""

        });

        setMessage("");

    };


    // =========================================
    // RENDER
    // =========================================

    return (

        <div className="certification-manager">


            {/* =====================================
                FORM
            ===================================== */}

            <section className="manager-card">

                <div className="manager-header">

                    <div>

                        <h2>
                            {editingId
                                ? "Edit Certification"
                                : "Add Certification"
                            }
                        </h2>

                        <p>
                            Manage your certifications
                        </p>

                    </div>

                </div>


                {message && (

                    <div className="manager-message">

                        {message}

                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                    className="certification-form"
                >


                    {/* NUMBER */}

                    <div className="form-group">

                        <label>
                            Certification Number
                        </label>

                        <input
                            type="text"
                            name="number"
                            value={form.number}
                            onChange={handleChange}
                            placeholder="01"
                        />

                    </div>


                    {/* TITLE */}

                    <div className="form-group">

                        <label>
                            Certification Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="AWS Certified Cloud Practitioner"
                            required
                        />

                    </div>


                    {/* CATEGORY */}

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Cloud"
                        />

                    </div>


                    {/* ORGANIZATION */}

                    <div className="form-group">

                        <label>
                            Organization
                        </label>

                        <input
                            type="text"
                            name="organization"
                            value={form.organization}
                            onChange={handleChange}
                            placeholder="Amazon Web Services"
                            required
                        />

                    </div>


                    {/* YEAR */}

                    <div className="form-group">

                        <label>
                            Year
                        </label>

                        <input
                            type="text"
                            name="year"
                            value={form.year}
                            onChange={handleChange}
                            placeholder="2025"
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-group full-width">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe the certification..."
                            rows="5"
                        />

                    </div>


                    {/* =================================
                        PDF UPLOAD
                    ================================= */}

                    <div className="form-group full-width">

                        <label>
                            Certificate PDF
                        </label>


                        <div className="pdf-upload-box">

                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handlePdfUpload}
                                disabled={uploading}
                            />


                            {uploading && (

                                <p>
                                    Uploading PDF...
                                </p>

                            )}


                            {!uploading &&
                                form.pdf && (

                                <p className="pdf-success">

                                    ✓ PDF uploaded

                                </p>

                            )}

                        </div>


                        {form.pdf && (

                            <small>

                                Current PDF:{" "}

                                <a
                                    href={`https://portflow-0k8l.onrender.com${form.pdf}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View Certificate
                                </a>

                            </small>

                        )}

                    </div>


                    {/* =================================
                        BUTTONS
                    ================================= */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            disabled={uploading}
                        >

                            {editingId
                                ? "Update Certification"
                                : "Add Certification"
                            }

                        </button>


                        {editingId && (

                            <button
                                type="button"
                                onClick={handleCancel}
                            >

                                Cancel

                            </button>

                        )}

                    </div>

                </form>

            </section>


            {/* =====================================
                CERTIFICATION RECORDS
            ===================================== */}

            <section className="manager-card">

                <div className="manager-header">

                    <div>

                        <h2>
                            Certification Records
                        </h2>

                        <p>
                            All certifications in your portfolio
                        </p>

                    </div>

                </div>


                {loading ? (

                    <p>
                        Loading certifications...
                    </p>

                ) : certifications.length === 0 ? (

                    <p>
                        No certifications found.
                    </p>

                ) : (

                    <div className="certification-list">

                        {certifications.map(
                            (certification) => (

                            <div
                                className="certification-item"
                                key={certification.id}
                            >

                                <div>

                                    <h3>
                                        {certification.title}
                                    </h3>

                                    <p>
                                        {certification.organization}
                                    </p>

                                    <small>
                                        {certification.year}
                                    </small>

                                </div>


                                <div className="item-actions">

                                    {certification.pdf && (

                                        <a
                                            href={
                                                `https://portflow-0k8l.onrender.com${certification.pdf}`
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View PDF
                                        </a>

                                    )}


                                    <button
                                        onClick={() =>
                                            handleEdit(
                                                certification
                                            )
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                certification.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>

    );

}


export default CertificationManager;

