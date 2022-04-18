import React from 'react';

import SearchHeader from './SearchHeader';

import {AiOutlineMenu, AiOutlineSearch, AiOutlineQuestionCircle, AiFillSetting } from 'react-icons/ai';
import {IoIosOptions } from 'react-icons/io';
import {SiGmail} from 'react-icons/si';
import {GrApps} from 'react-icons/gr';
import {CgProfile} from 'react-icons/cg';

const Header =(props)=>{
   const {onMenuClick} = props;
    return(
        <div className={"header"}>
            <div className="leftNav">
                <div className="bar" onClick={onMenuClick}>
                    <AiOutlineMenu size ={24}/>
                </div>
                <div className="logo">
                    <SiGmail color={'red'} size ={24}/> Gmail
                </div>
            </div>

            <SearchHeader/>

            <div className="rightMenu">
                <div className="support">
                    <AiOutlineQuestionCircle/>
                </div>
                <div className="setting">
                    <AiFillSetting/>
                </div>
                <div className="apps">
                    <GrApps/>
                </div>
                <div className="profile">
                    <CgProfile/>
                </div>
            </div>

        </div>
    )
}
export default Header;