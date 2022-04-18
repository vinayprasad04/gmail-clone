import React from 'react';
import {MdArrowDropDown, MdVerticalSplit, MdLabelImportantOutline} from "react-icons/md";
import {IoMdRefresh} from "react-icons/io";
import {FiMoreVertical} from "react-icons/fi";
import {BsKeyboardFill, BsFillInboxFill} from "react-icons/bs";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import {ImUsers} from "react-icons/im";
import {AiFillTag, AiOutlineStar} from "react-icons/ai";

const MainListing = ()=>{
    return(
        <div className="mailListing">
           <div className="filterUpper">
               <div className="leftFilter">
                   <input type="checkbox"/>
                   <div className="dropdown">
                      <MdArrowDropDown/>
                   </div>
                   <div className="refreshIcon">
                       <IoMdRefresh/>
                   </div>
                   <div className="more">
                       <FiMoreVertical/>
                   </div>
               </div>
               <div className="rightFiter">
                   <div className="totalNum">
                       1-100 of 8,599
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
                       <li className={"active"}><button><BsFillInboxFill/> Primary</button></li>
                       <li><button><ImUsers/> Social</button></li>
                       <li><button><AiFillTag/> Promotion</button></li>
                   </ul>
               </div>
               <div className="listing">
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                            <AiOutlineStar/>
                       </div>
                       <div className="import">
                            <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                            Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                            <AiOutlineStar/>
                       </div>
                       <div className="import">
                            <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                            Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                            <AiOutlineStar/>
                       </div>
                       <div className="import">
                            <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                            Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                            <AiOutlineStar/>
                       </div>
                       <div className="import">
                            <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                            Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                            <AiOutlineStar/>
                       </div>
                       <div className="import">
                            <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                            Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                            <AiOutlineStar/>
                       </div>
                       <div className="import">
                            <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                            Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                            <AiOutlineStar/>
                       </div>
                       <div className="import">
                            <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                            Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                           <AiOutlineStar/>
                       </div>
                       <div className="import">
                           <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                           Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                           <AiOutlineStar/>
                       </div>
                       <div className="import">
                           <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                           Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                           <AiOutlineStar/>
                       </div>
                       <div className="import">
                           <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                           Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                           <AiOutlineStar/>
                       </div>
                       <div className="import">
                           <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                           Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                           <AiOutlineStar/>
                       </div>
                       <div className="import">
                           <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                           Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
                   <div className="item">
                       <div className="checkBox">
                           <input type="checkbox"/>
                       </div>
                       <div className="star">
                           <AiOutlineStar/>
                       </div>
                       <div className="import">
                           <MdLabelImportantOutline/>
                       </div>
                       <div className="subject">
                           Quora Digest
                       </div>
                       <div className="summary">
                           Should I leave my 20 LPA SDE job to carry out an MBA from the top IIMs?
                           Many years ago in the early 1980's, a friend and colleague in SBI –
                           a young officer who had joined SBI as a PO a few years back, wrote the test for IIM's
                           and was called for the interview for
                       </div>
                       <div className="dateTime">
                           7:44PM
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}
export default MainListing;