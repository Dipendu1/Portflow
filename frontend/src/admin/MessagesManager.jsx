import { useEffect, useState } from "react";

import {
    getMessages,
    deleteMessage
} from "../api/contactApi";

import "./MessagesManager.css";


function MessagesManager() {

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");


    // =========================
    // LOAD MESSAGES
    // =========================

    const loadMessages = async () => {

        try {

            setLoading(true);

            const data = await getMessages();

            setMessages(data);

        } catch (error) {

            console.error(
                "Error loading messages:",
                error
            );

            setMessage(
                "Unable to load messages."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadMessages();

    }, []);


    // =========================
    // DELETE MESSAGE
    // =========================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteMessage(id);

            setMessage(
                "Message deleted successfully."
            );

            await loadMessages();

        } catch (error) {

            console.error(
                "Error deleting message:",
                error
            );

            setMessage(
                "Unable to delete message."
            );

        }

    };


    return (

        <div className="messages-manager">


            {/* =========================
                HEADER
            ========================= */}

            <div className="messages-header">

                <div>

                    <h2>
                        Messages
                    </h2>

                    <p>
                        Messages received from your portfolio contact form.
                    </p>

                </div>

                <div className="message-count">

                    {messages.length} message
                    {messages.length !== 1
                        ? "s"
                        : ""
                    }

                </div>

            </div>


            {/* =========================
                STATUS MESSAGE
            ========================= */}

            {message && (

                <div className="manager-message">
                    {message}
                </div>

            )}


            {/* =========================
                LOADING
            ========================= */}

            {loading ? (

                <div className="messages-loading">
                    Loading messages...
                </div>


            ) : messages.length === 0 ? (


                /* =========================
                    EMPTY
                ========================= */

                <div className="messages-empty">

                    <div className="empty-icon">
                        ✉
                    </div>

                    <h3>
                        No messages yet
                    </h3>

                    <p>
                        Messages submitted through your
                        contact form will appear here.
                    </p>

                </div>


            ) : (


                /* =========================
                    MESSAGE LIST
                ========================= */

                <div className="messages-list">

                    {messages.map((item) => (

                        <div
                            className="message-card"
                            key={item.id}
                        >

                            {/* MESSAGE HEADER */}

                            <div className="message-card-header">

                                <div className="sender-info">

                                    <div className="sender-avatar">
                                        {item.name
                                            ?.charAt(0)
                                            .toUpperCase() || "?"}
                                    </div>

                                    <div>

                                        <h3>
                                            {item.name}
                                        </h3>

                                        <a
                                            href={`mailto:${item.email}`}
                                        >
                                            {item.email}
                                        </a>

                                    </div>

                                </div>


                                <button
                                    className="delete-message"
                                    onClick={() =>
                                        handleDelete(
                                            item.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>


                            {/* MESSAGE BODY */}

                            <div className="message-body">

                                <p>
                                    {item.message}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}


export default MessagesManager;