import React from 'react';
import { AiOutlineClose, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { MdArrowBack, MdDelete, MdArchive } from 'react-icons/md';
import { BiReply } from 'react-icons/bi';
import '../style/emailDetail.scss';

const EmailDetail = ({ email, onClose, onBack, onToggleStar }) => {
    if (!email) return null;

    const handleStarClick = () => {
        if (onToggleStar) {
            onToggleStar(email.id);
        }
    };

    return (
        <div className="emailDetailOverlay">
            <div className="emailDetailContainer">
                <div className="emailDetailHeader">
                    <div className="leftActions">
                        <button onClick={onBack} title="Back to list">
                            <MdArrowBack />
                        </button>
                        <button onClick={handleStarClick} title={email.isStarred ? 'Unstar' : 'Star'}>
                            {email.isStarred ? <AiFillStar color="#ffc107" /> : <AiOutlineStar />}
                        </button>
                    </div>
                    <div className="rightActions">
                        <button title="Archive">
                            <MdArchive />
                        </button>
                        <button title="Delete">
                            <MdDelete />
                        </button>
                        <button onClick={onClose} title="Close">
                            <AiOutlineClose />
                        </button>
                    </div>
                </div>

                <div className="emailDetailBody">
                    <h2 className="subject">{email.subject}</h2>

                    <div className="emailMeta">
                        <div className="senderInfo">
                            <div className="avatar">
                                {email.from.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="senderDetails">
                                <div className="senderName">{email.from.name}</div>
                                <div className="senderEmail">&lt;{email.from.email}&gt;</div>
                            </div>
                        </div>
                        <div className="emailTime">{email.time}</div>
                    </div>

                    <div className="emailContent" dangerouslySetInnerHTML={{ __html: email.body }} />

                    <div className="emailActions">
                        <button className="replyBtn">
                            <BiReply /> Reply
                        </button>
                        <button className="forwardBtn">
                            Forward
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailDetail;
