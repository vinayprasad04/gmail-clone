import React from 'react';

import {BsFillCameraVideoFill, BsFillKeyboardFill} from 'react-icons/bs';
import {FaUserCircle} from 'react-icons/fa';
import {MdArrowDropDown} from 'react-icons/md';
import {AiOutlinePlus} from 'react-icons/ai';

const UserList = ()=>{
    return(
        <div className="userList">
            <div className="userListInner meetSection">
                <h6>Meet</h6>
                <ul>
                    <li><div className="link"><label> <BsFillCameraVideoFill/> New meeting</label></div></li>
                    <li><div className="link"><label> <BsFillKeyboardFill/> Join a meeting</label></div></li>
                </ul>
            </div>
            <div className="userListInner hangouts">
                <div className="hangoutSelf">
                    <div className="userImg">
                        <FaUserCircle/> Vinay <MdArrowDropDown/>
                    </div>
                    <div className="plusIcon">
                        <AiOutlinePlus/>
                    </div>
                </div>
                <h6>Hangouts</h6>
                <ul>
                    <li><div className="link"><label> <FaUserCircle/> Abhishek Prasad</label></div></li>
                    <li><div className="link"><label> <FaUserCircle/> Lucy Prasad</label></div></li>
                    <li><div className="link"><label> <FaUserCircle/> Manmeet Singh</label></div></li>
                    <li><div className="link"><label> <FaUserCircle/> Nidhi Tiwari</label></div></li>
                    <li><div className="link"><label> <FaUserCircle/> Raj Verma</label></div></li>
                    <li><div className="link"><label> <FaUserCircle/></label></div></li>
                    <li><div className="link"><label> <FaUserCircle/> Salman Shekh</label></div></li>
                    <li><div className="link"><label> <FaUserCircle/> Saurabh Goel</label></div></li>
                    <li><div className="link"><label> <FaUserCircle/> Shalini Aggarwal</label></div></li>
                </ul>
            </div>
        </div>
    )
}
export default UserList;