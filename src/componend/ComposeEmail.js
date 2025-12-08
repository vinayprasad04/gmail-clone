import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMinus } from 'react-icons/ai';
import { MdFormatColorText, MdAttachFile } from 'react-icons/md';
import { emailService } from '../services/api';
import '../style/compose.scss';

const ComposeEmail = ({ onClose }) => {
    const [minimized, setMinimized] = useState(false);
    const [formData, setFormData] = useState({
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        message: ''
    });
    const [showCc, setShowCc] = useState(false);
    const [showBcc, setShowBcc] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleSend = async () => {
        if (!formData.to || !formData.subject || !formData.message) {
            setError('Please fill in To, Subject, and Message fields');
            return;
        }

        setSending(true);
        setError('');

        try {
            const response = await emailService.sendEmail(formData);
            if (response.success) {
                setSuccess('Email sent successfully!');
                setTimeout(() => {
                    onClose();
                }, 1500);
            }
        } catch (err) {
            setError(err.message || 'Failed to send email');
        } finally {
            setSending(false);
        }
    };

    const handleMinimize = () => {
        setMinimized(!minimized);
    };

    return (
        <div className={`composeEmailModal ${minimized ? 'minimized' : ''}`}>
            <div className="composeHeader">
                <h3>New Message</h3>
                <div className="actions">
                    <button onClick={handleMinimize}>
                        <AiOutlineMinus />
                    </button>
                    <button onClick={onClose}>
                        <AiOutlineClose />
                    </button>
                </div>
            </div>

            {!minimized && (
                <div className="composeBody">
                    <div className="formGroup">
                        <input
                            type="email"
                            name="to"
                            placeholder="To"
                            value={formData.to}
                            onChange={handleChange}
                        />
                        <div className="ccBccToggle">
                            <button onClick={() => setShowCc(!showCc)}>Cc</button>
                            <button onClick={() => setShowBcc(!showBcc)}>Bcc</button>
                        </div>
                    </div>

                    {showCc && (
                        <div className="formGroup">
                            <input
                                type="email"
                                name="cc"
                                placeholder="Cc"
                                value={formData.cc}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    {showBcc && (
                        <div className="formGroup">
                            <input
                                type="email"
                                name="bcc"
                                placeholder="Bcc"
                                value={formData.bcc}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="formGroup">
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="formGroup messageGroup">
                        <textarea
                            name="message"
                            placeholder="Write your message here..."
                            value={formData.message}
                            onChange={handleChange}
                            rows={10}
                        />
                    </div>

                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}

                    <div className="composeFooter">
                        <button
                            className="sendBtn"
                            onClick={handleSend}
                            disabled={sending}
                        >
                            {sending ? 'Sending...' : 'Send'}
                        </button>
                        <div className="formatOptions">
                            <button title="Formatting options">
                                <MdFormatColorText />
                            </button>
                            <button title="Attach files">
                                <MdAttachFile />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComposeEmail;
