import React, {useEffect, useRef} from 'react';

import SearchHeader from './SearchHeader';

import {AiOutlineMenu, AiOutlineSearch, AiOutlineQuestionCircle, AiFillSetting, AiFillCamera } from 'react-icons/ai';
import {IoIosOptions } from 'react-icons/io';
import {SiGmail,SiGoogleplay,SiGooglemeet,SiGooglecalendar} from 'react-icons/si';
import {GrApps} from 'react-icons/gr';
import {CgProfile} from 'react-icons/cg';
import {BsFillChatLeftDotsFill} from 'react-icons/bs';
import {FaGoogleDrive} from 'react-icons/fa';
import {ImUserPlus} from 'react-icons/im';
import {MdGTranslate,MdPhotoSizeSelectActual,MdOutlineDuo} from 'react-icons/md';
import {RiMapPinFill,RiAccountCircleFill,RiShoppingBag2Fill} from 'react-icons/ri';
import {FcGoogle,FcStart,FcNews,FcContacts} from 'react-icons/fc';

import Default from './../static/Default.png';
import Compact from './../static/Compact.png';
import Comfortable from './../static/Comfortable.png';
import Prev1 from   './../static/prev1.png';
import Prev2 from   './../static/prev2.jpg';
import Prev3 from   './../static/prev3.jpg';
import Prev4 from   './../static/prev4.jpg';
import Prev5 from   './../static/prev5.jpg';
import Prev6 from   './../static/prev6.jpg';
import Prev7 from   './../static/prev7.jpg';
import Prev8 from   './../static/prev8.jpg';

import Classic from './../static/Classic.png';
import Importantfirst from './../static/Importantfirst.png';
import MultipleInboxes from './../static/MultipleInboxes.png';
import Priorityinbox from './../static/Priorityinbox.png';
import Starredfirst from './../static/Starredfirst.png';
import Unreadfirst from './../static/Unreadfirst.png';


const Support =()=>{
    const [dropdown, setDropdown] = React.useState(false);
    const wrapperRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)){
                setDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const onClick =()=>{
        setDropdown(!dropdown);
    }
    return(
        <div className="support" ref={wrapperRef}>
           <div className="icon" onClick={onClick}><AiOutlineQuestionCircle/></div>
            {
                dropdown &&
                <div className="supportDropDown">
                    <ul>
                        <li><div className="link">Help</div></li>
                        <li><div className="link">Training</div></li>
                        <li><div className="link">Updates</div></li>
                        <li><div className="link">Send feedback to Google</div></li>
                    </ul>
                </div>
            }

        </div>
    )
}

const GoogleApps = ()=>{
    const [dropdownApps, setDropdownApps] = React.useState(false);
    const wrapperAppsRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperAppsRef.current && !wrapperAppsRef.current.contains(event.target)){
                setDropdownApps(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperAppsRef]);

    const onClick =()=>{
        setDropdownApps(!dropdownApps);
    }
    return(
        <div className="apps" ref={wrapperAppsRef}>
            <div className="icon" onClick={onClick}><GrApps/></div>
            {
                dropdownApps &&
                <div className="googleApps">
                    <ul>
                        <li><div className="link"><FcGoogle/><label>Search</label></div></li>
                        <li><div className="link"><RiMapPinFill/><label>Maps</label></div></li>
                        <li><div className="link"><FcStart/> <label>Youtube</label></div></li>
                        <li><div className="link"><RiAccountCircleFill/> <label>Account</label></div></li>
                        <li><div className="link"><SiGoogleplay/> <label>Play</label></div></li>
                        <li><div className="link"><FcNews/> <label>News</label></div></li>
                        <li><div className="link"><SiGmail/> <label>Gmail</label></div></li>
                        <li><div className="link"><SiGooglemeet/> <label>Meet</label></div></li>
                        <li><div className="link"><BsFillChatLeftDotsFill/> <label>Chat</label></div></li>
                        <li><div className="link"><FcContacts/> <label>Contacts</label></div></li>
                        <li><div className="link"><FaGoogleDrive/> <label>Drive</label></div></li>
                        <li><div className="link"><SiGooglecalendar/> <label>Calendar</label></div></li>
                        <li><div className="link"><MdGTranslate/> <label>Translate</label></div></li>
                        <li><div className="link"><MdPhotoSizeSelectActual/> <label>Photos</label></div></li>
                        <li><div className="link"><MdOutlineDuo/> <label>Duo</label></div></li>
                        <li><div className="link"><RiShoppingBag2Fill/> <label>Shopping</label></div></li>
                    </ul>
                </div>
            }
        </div>
    )
}

const Profile =()=>{
    const [dropdown, setDropdown] = React.useState(false);
    const wrapperRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)){
                setDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const onClick =()=>{
        setDropdown(!dropdown);
    }

    const [image, setImage] = React.useState(null);
    const onImageChange = (event)=>{
            let img = event.target.files[0];
            setImage(URL.createObjectURL(img));
    }

    return(
        <div className="profile" ref={wrapperRef}>
            <div className="icon" onClick={onClick}><CgProfile/></div>
            {
                dropdown &&
                <div className="profileWrap">
                   <div className="imgUpload">
                       <img src={image} alt="userImage"/>
                        <div className="inputWrap">
                          <AiFillCamera/>
                            <input type="file" name="myImage" onChange={onImageChange} />
                        </div>
                   </div>
                    <div className="manageGoogle">
                        <label className="name"> Vinay Prasad</label>
                        <label className="email">vinayprasad04@gmail.com</label>
                        <button>Manage your Google Account</button>
                    </div>
                    <div className="addAccount">
                        <ImUserPlus/>
                        Add another account
                    </div>
                    <div className="signOut">
                        <button>Sign out</button>
                    </div>
                    <div className="extra">
                        <div className="link">Privacy Policy</div>
                        <div className="link">Terms of Services</div>
                    </div>
                </div>
            }

        </div>
    )
}

const Setting =()=>{
    const [dropdown, setDropdown] = React.useState(false);
    const wrapperRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)){
                setDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const onClick =()=>{
        setDropdown(!dropdown);
    }
    return(
        <div className="setting" ref={wrapperRef}>
            <div className="icon" onClick={onClick}><AiFillSetting/></div>
            {
                dropdown &&
                <div className="settingInner">
                    <div className="quick">
                        <h4>Quick settings</h4>
                        <button className="setting">
                            See all settings
                        </button>
                    </div>

                    <div className="density">
                        <h6>DENSITY</h6>
                        <ul>
                            <li>
                                <div className="left">
                                    <input type="radio" checked={true} name={"DENSITY"}/>
                                    Default
                                </div>
                                <img src={Default} alt="Default"/>
                            </li>
                            <li>
                                <div className="left">
                                    <input type="radio" name={"DENSITY"}/>
                                    Compact
                                </div>
                                <img src={Compact} alt="Compact"/>
                            </li>
                            <li>
                                <div className="left">
                                    <input type="radio" name={"DENSITY"}/>
                                    Comfortable
                                </div>
                                <img src={Comfortable} alt="Comfortable"/>
                            </li>
                        </ul>
                    </div>
                    <div className="theme">
                        <h6>THEME</h6>
                        <img src={Prev1} alt="prev"/>
                        <img src={Prev2} alt="prev"/>
                        <img src={Prev3} alt="prev"/>
                        <img src={Prev4} alt="prev"/>
                        <img src={Prev5} alt="prev"/>
                        <img src={Prev6} alt="prev"/>
                        <img src={Prev7} alt="prev"/>
                        <img src={Prev8} alt="prev"/>
                    </div>
                    <div className="density">
                        <h6>INBOX TYPE</h6>
                        <ul>
                            <li>
                                <div className="left">
                                    <input type="radio" checked={true} name={"inbox"}/>
                                    Default
                                </div>
                                <img src={Classic} alt="Default"/>
                            </li>
                            <li>
                                <div className="left">
                                    <input type="radio" checked={true} name={"inbox"}/>

                                    Important first
                                </div>
                                <img src={Importantfirst} alt="Default"/>
                            </li>
                            <li>
                                <div className="left">
                                    <input type="radio" checked={true} name={"inbox"}/>
                                    Unread first
                                </div>
                                <img src={Unreadfirst} alt="Default"/>
                            </li>
                            <li>
                                <div className="left">
                                    <input type="radio" checked={true} name={"inbox"}/>

                                    Starred first
                                </div>
                                <img src={Starredfirst} alt="Default"/>
                            </li>
                            <li>
                                <div className="left">
                                    <input type="radio" checked={true} name={"inbox"}/>
                                    Priority Inbox
                                </div>
                                <img src={Priorityinbox} alt="Default"/>
                            </li>
                            <li>
                                <div className="left">
                                    <input type="radio" checked={true} name={"inbox"}/>
                                    Multiple Inboxes
                                </div>
                                <img src={MultipleInboxes} alt="Default"/>
                            </li>
                        </ul>
                    </div>
                </div>
            }

        </div>
    )
}

const Header =(props)=>{
   const {onMenuClick, onSearch} = props;
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

            <SearchHeader onSearch={onSearch}/>

            <div className="rightMenu">
                <Support/>
                <Setting/>
               <GoogleApps/>
               <Profile/>
            </div>

        </div>
    )
}
export default Header;