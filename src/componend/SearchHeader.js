import {AiOutlineSearch} from "react-icons/ai";
import {IoIosOptions} from "react-icons/io";
import React, { useRef, useEffect } from "react";

const DropDownBox = ({wrapperRef})=>{
    return(
        <div className="filterBox" ref={wrapperRef}>
            <div className="form">
                <div className="row">
                    <div className="col-md-3"><label>From</label></div>
                    <div className="col-md-9"><input type="text"/></div>
                </div>
                <div className="row">
                    <div className="col-md-3"><label>to</label></div>
                    <div className="col-md-9"><input type="text"/></div>
                </div>
                <div className="row">
                    <div className="col-md-3"><label>Subject</label></div>
                    <div className="col-md-9"><input type="text"/></div>
                </div>
                <div className="row">
                    <div className="col-md-3"><label>Has the words</label></div>
                    <div className="col-md-9"><input type="text"/></div>
                </div>
                <div className="row">
                    <div className="col-md-3"><label>Doesn't have</label></div>
                    <div className="col-md-9"><input type="text"/></div>
                </div>
                <div className="row">
                    <div className="col-md-3"><label>size</label></div>
                    <div className="col-md-4">
                        <select>
                            <option>Greater than</option>
                            <option>less than</option>
                        </select>
                    </div>
                    <div className="col-md-3"><input type="text"/></div>
                    <div className="col-md-2">
                        <select>
                            <option>MB</option>
                            <option>KB</option>
                            <option>Bits</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"><label>Date within</label></div>
                    <div className="col-md-4">
                        <select>
                            <option>1 Day</option>
                            <option>3 Days</option>
                            <option>1 Week</option>
                        </select>
                    </div>
                    <div className="col-md-5">
                        <input type="date"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="">Search</label>
                    </div>
                    <div className="col-md-9">
                        <select>
                            <option>All Mail</option>
                            <option>Inbox</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                        <div className="col-md-3">
                            <div className="checkboxGr">
                                <input type="checkbox"/>
                                <label>Has attachment</label>
                            </div>
                        </div>
                    <div className="col-md-4">
                        <div className="checkboxGr">
                            <input type="checkbox"/>
                            <label>Don't include chat</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="filterBtnGr">
                            <button className={"btn btn-blank"}>Clear filter</button>
                            <button className={"btn btn-primary"}>Search</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

const SearchHeader = () =>{
    const [filterDropDown, setFilterDropDown] = React.useState(false);
    const onFilterClick = ()=>{
        setFilterDropDown(!filterDropDown);
    }
    const wrapperRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)){
                setFilterDropDown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    return(
        <div className="searchHeader">
            <div className="searchBox">
                <div className="searchIcon"><AiOutlineSearch size ={24} color={'#595959'}/></div>
                <input className={"searchInput"} type="text" placeholder={'Search all conversation'} />
                {!filterDropDown && <div className="optionIcon" onClick={onFilterClick}><IoIosOptions size ={24} color ={"#595959"}/></div>}
                {filterDropDown && <DropDownBox wrapperRef={wrapperRef}/>}
            </div>
        </div>
    )
}

export default SearchHeader;

