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


const LeftMenu = ({leftMenuOpen})=>{
    console.log("leftMenuOpen inside",leftMenuOpen);
    return(
        <div className={`leftMenu ${!leftMenuOpen ?'small':''}`}>
            <div className="composeBtn">
                <button>
                    <GrAppsRounded color={"red"}/>
                    <label>Compose</label>
                </button>
            </div>
            <div className={'listInner'}>
                <ul>
                    <li>
                        <div className="link active">
                            <label><BsInboxFill/> <span className="text">Inbox</span></label>
                            <em>3,800</em>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label><AiFillStar/> <span className="text">Starred</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label><IoIosTime/> <span className="text">Snoozed</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <MdOutlineLabelImportant/> <span className="text">Important</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <AiFillStar/> <span className="text">Chats</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <IoIosSend/> <span className="text">Sends</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <MdDrafts/> <span className="text">Drafts</span></label><em>80</em>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <RiMailSendFill/> <span className="text">All Mails</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <RiSpamFill/> <span className="text">Spam</span></label><em>50</em>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <BsTrash2Fill/> <span className="text">Trash</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <BiCategoryAlt/> <span className="text">Categories</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <CgMoreO/> <span className="text">More</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <GrSchedules/> <span className="text">Schedules</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <SiGoogletagmanager/> <span className="text">Manage labels</span> </label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <IoIosCreate/> <span className="text">Create new labels</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <IoIosSend/> <span className="text">Sends</span></label>
                        </div>
                    </li>
                    <li>
                        <div className="link">
                            <label> <IoIosSend/> <span className="text">Sends</span></label>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
    )
}
export default LeftMenu;