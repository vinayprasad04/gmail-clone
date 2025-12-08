import React, { useState, useEffect } from 'react';
import {MdArrowDropDown, MdVerticalSplit, MdLabelImportantOutline} from "react-icons/md";
import {IoMdRefresh} from "react-icons/io";
import {FiMoreVertical} from "react-icons/fi";
import {BsKeyboardFill, BsFillInboxFill} from "react-icons/bs";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import {ImUsers} from "react-icons/im";
import {AiFillTag, AiOutlineStar, AiFillStar} from "react-icons/ai";
import { emailService } from '../../services/api';
import EmailDetail from '../EmailDetail';

const MainListing = ()=>{
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [activeTab, setActiveTab] = useState('primary');

    useEffect(() => {
        fetchEmails();
    }, [activeTab]);

    const fetchEmails = async () => {
        setLoading(true);
        try {
            const response = await emailService.getEmails(activeTab);
            if (response.success) {
                setEmails(response.emails);
            }
        } catch (error) {
            console.error('Error fetching emails:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
    };

    const handleToggleStar = async (id) => {
        try {
            const response = await emailService.toggleStar(id);
            if (response.success) {
                setEmails(emails.map(email =>
                    email.id === id ? { ...email, isStarred: !email.isStarred } : email
                ));
                if (selectedEmail && selectedEmail.id === id) {
                    setSelectedEmail({ ...selectedEmail, isStarred: !selectedEmail.isStarred });
                }
            }
        } catch (error) {
            console.error('Error toggling star:', error);
        }
    };

    const handleRefresh = () => {
        fetchEmails();
    };

    return(
        <div className="mailListing">
           <div className="filterUpper">
               <div className="leftFilter">
                   <input type="checkbox"/>
                   <div className="dropdown">
                      <MdArrowDropDown/>
                   </div>
                   <div className="refreshIcon" onClick={handleRefresh} style={{cursor: 'pointer'}}>
                       <IoMdRefresh/>
                   </div>
                   <div className="more">
                       <FiMoreVertical/>
                   </div>
               </div>
               <div className="rightFiter">
                   <div className="totalNum">
                       1-{emails.length} of {emails.length}
                   </div>
                   <div className="nextPrev">
                       <GrFormPrevious/>
                       <GrFormNext/>
                   </div>
                   <div className="split">
                    <MdVerticalSplit/>
                    <MdArrowDropDown/>
                   </div>
                   <div className="inputTool">
                       <BsKeyboardFill/>
                       <MdArrowDropDown/>
                   </div>
               </div>
           </div>

           <div className="listInner">
               <div className="tab">
                   <ul>
                       <li className={activeTab === 'primary' ? 'active' : ''}>
                           <button onClick={() => setActiveTab('primary')}>
                               <BsFillInboxFill/> Primary
                           </button>
                       </li>
                       <li className={activeTab === 'social' ? 'active' : ''}>
                           <button onClick={() => setActiveTab('social')}>
                               <ImUsers/> Social
                           </button>
                       </li>
                       <li className={activeTab === 'promotions' ? 'active' : ''}>
                           <button onClick={() => setActiveTab('promotions')}>
                               <AiFillTag/> Promotion
                           </button>
                       </li>
                   </ul>
               </div>
               <div className="listing">
                   {loading ? (
                       <div style={{padding: '20px', textAlign: 'center'}}>Loading emails...</div>
                   ) : emails.length === 0 ? (
                       <div style={{padding: '20px', textAlign: 'center'}}>No emails found</div>
                   ) : (
                       emails.map((email) => (
                           <div
                               key={email.id}
                               className={`item ${!email.isRead ? 'unread' : ''}`}
                               onClick={() => handleEmailClick(email)}
                               style={{cursor: 'pointer'}}
                           >
                               <div className="checkBox">
                                   <input type="checkbox" onClick={(e) => e.stopPropagation()}/>
                               </div>
                               <div className="star" onClick={(e) => {
                                   e.stopPropagation();
                                   handleToggleStar(email.id);
                               }}>
                                   {email.isStarred ? <AiFillStar color="#ffc107"/> : <AiOutlineStar/>}
                               </div>
                               <div className="import">
                                   <MdLabelImportantOutline/>
                               </div>
                               <div className="subject">
                                   {email.from.name}
                               </div>
                               <div className="summary">
                                   <strong>{email.subject}</strong> - {email.snippet}
                               </div>
                               <div className="dateTime">
                                   {email.time}
                               </div>
                           </div>
                       ))
                   )}
               </div>
           </div>
           {selectedEmail && (
               <EmailDetail
                   email={selectedEmail}
                   onClose={() => setSelectedEmail(null)}
                   onBack={() => setSelectedEmail(null)}
                   onToggleStar={handleToggleStar}
               />
           )}
        </div>
    )
}
export default MainListing;
