import React from "react";

import {GrAppsRounded, GrSchedules} from "react-icons/gr";
import {RiMailSendFill, RiSpamFill} from "react-icons/ri";
import {BsInboxFill, BsTrash2Fill} from "react-icons/bs";
import {AiFillStar} from "react-icons/ai";
import {CgMoreO} from "react-icons/cg";
import {SiGoogletagmanager} from "react-icons/si";
import {BiCategoryAlt} from "react-icons/bi";
import {IoIosSend, IoIosTime, IoIosCreate} from "react-icons/io";
import {MdOutlineLabelImportant, MdDrafts} from "react-icons/md";


const LeftMenu = ({leftMenuOpen, onComposeClick, activeFolder, onFolderChange, emailCounts})=>{

    const menuItems = [
        { id: 'inbox', label: 'Inbox', icon: <BsInboxFill/>, category: 'inbox' },
        { id: 'starred', label: 'Starred', icon: <AiFillStar/>, category: 'starred' },
        { id: 'snoozed', label: 'Snoozed', icon: <IoIosTime/>, category: 'snoozed' },
        { id: 'important', label: 'Important', icon: <MdOutlineLabelImportant/>, category: 'important' },
        { id: 'sent', label: 'Sent', icon: <IoIosSend/>, category: 'sent' },
        { id: 'drafts', label: 'Drafts', icon: <MdDrafts/>, category: 'drafts' },
        { id: 'spam', label: 'Spam', icon: <RiSpamFill/>, category: 'spam' },
        { id: 'trash', label: 'Trash', icon: <BsTrash2Fill/>, category: 'trash' },
    ];

    return(
        <div className={`leftMenu ${!leftMenuOpen ?'small':''}`}>
            <div className="composeBtn">
                <button onClick={onComposeClick}>
                    <GrAppsRounded color={"red"}/>
                    <label>Compose</label>
                </button>
            </div>
            <div className={'listInner'}>
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <div
                                className={`link ${activeFolder === item.category ? 'active' : ''}`}
                                onClick={() => onFolderChange(item.category)}
                                style={{cursor: 'pointer'}}
                            >
                                <label>
                                    {item.icon}
                                    <span className="text">{item.label}</span>
                                </label>
                                {emailCounts && emailCounts[item.category] > 0 && (
                                    <em>{emailCounts[item.category]}</em>
                                )}
                            </div>
                        </li>
                    ))}
                    <li>
                        <div className="link">
                            <label> <BiCategoryAlt/> <span className="text">Categories</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <GrSchedules/> <span className="text">Scheduled</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <RiMailSendFill/> <span className="text">All Mail</span></label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default LeftMenu;