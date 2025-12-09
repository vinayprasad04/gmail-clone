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

const MainListing = ({activeFolder, searchQuery})=>{
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [activeTab, setActiveTab] = useState('primary');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalEmails, setTotalEmails] = useState(0);
    const [pageTokens, setPageTokens] = useState({1: null}); // Store page tokens
    const [nextPageToken, setNextPageToken] = useState(null);
    const emailsPerPage = 20;

    useEffect(() => {
        // Reset pagination when tab, folder, or search query changes
        setCurrentPage(1);
        setPageTokens({1: null});
        setNextPageToken(null);
        setEmails([]); // Clear emails immediately
    }, [activeTab, activeFolder, searchQuery]);

    useEffect(() => {
        // Fetch emails when page changes or after reset
        fetchEmails();
    }, [currentPage]);

    const fetchEmails = async () => {
        setLoading(true);
        try {
            // Get the page token for current page
            const token = pageTokens[currentPage] || null;

            // Use activeFolder if provided, otherwise use activeTab
            const category = activeFolder || activeTab;
            const response = await emailService.getEmails(category, currentPage, emailsPerPage, token, searchQuery);
            if (response.success) {
                setEmails(response.emails);
                setTotalEmails(response.total || response.emails.length);

                // Store next page token if available
                if (response.nextPageToken) {
                    setNextPageToken(response.nextPageToken);
                    setPageTokens(prev => ({
                        ...prev,
                        [currentPage + 1]: response.nextPageToken
                    }));
                } else {
                    setNextPageToken(null);
                }
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

    const handleNextPage = () => {
        const totalPages = Math.ceil(totalEmails / emailsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * emailsPerPage + 1;
    const endIndex = Math.min(currentPage * emailsPerPage, totalEmails);
    const totalPages = Math.ceil(totalEmails / emailsPerPage);

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
                       {totalEmails > 0 ? `${startIndex}-${endIndex} of ${totalEmails}` : '0 of 0'}
                   </div>
                   <div className="nextPrev">
                       <GrFormPrevious
                           onClick={handlePrevPage}
                           style={{
                               cursor: currentPage > 1 ? 'pointer' : 'not-allowed',
                               opacity: currentPage > 1 ? 1 : 0.5
                           }}
                       />
                       <GrFormNext
                           onClick={handleNextPage}
                           style={{
                               cursor: currentPage < totalPages ? 'pointer' : 'not-allowed',
                               opacity: currentPage < totalPages ? 1 : 0.5
                           }}
                       />
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
