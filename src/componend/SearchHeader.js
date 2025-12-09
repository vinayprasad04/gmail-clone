import {AiOutlineSearch} from "react-icons/ai";
import {IoIosOptions} from "react-icons/io";
import React, { useRef, useEffect } from "react";

const DropDownBox = ({wrapperRef, filters, onFilterChange, onSearch, onClear})=>{
    return(
        <div className="filterBox" ref={wrapperRef}>
            <div className="form">
                <div className="row">
                    <div className="col-md-3"><label>From</label></div>
                    <div className="col-md-9">
                        <input
                            type="text"
                            value={filters.from}
                            onChange={(e) => onFilterChange('from', e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"><label>To</label></div>
                    <div className="col-md-9">
                        <input
                            type="text"
                            value={filters.to}
                            onChange={(e) => onFilterChange('to', e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"><label>Subject</label></div>
                    <div className="col-md-9">
                        <input
                            type="text"
                            value={filters.subject}
                            onChange={(e) => onFilterChange('subject', e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"><label>Has the words</label></div>
                    <div className="col-md-9">
                        <input
                            type="text"
                            value={filters.hasWords}
                            onChange={(e) => onFilterChange('hasWords', e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"><label>Doesn't have</label></div>
                    <div className="col-md-9">
                        <input
                            type="text"
                            value={filters.doesntHave}
                            onChange={(e) => onFilterChange('doesntHave', e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"><label>Size</label></div>
                    <div className="col-md-4">
                        <select
                            value={filters.sizeOperator}
                            onChange={(e) => onFilterChange('sizeOperator', e.target.value)}
                        >
                            <option value="larger">Greater than</option>
                            <option value="smaller">Less than</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            value={filters.sizeValue}
                            onChange={(e) => onFilterChange('sizeValue', e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <select
                            value={filters.sizeUnit}
                            onChange={(e) => onFilterChange('sizeUnit', e.target.value)}
                        >
                            <option value="M">MB</option>
                            <option value="K">KB</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"><label>Date within</label></div>
                    <div className="col-md-4">
                        <select
                            value={filters.dateWithin}
                            onChange={(e) => onFilterChange('dateWithin', e.target.value)}
                        >
                            <option value="">Any time</option>
                            <option value="1d">1 Day</option>
                            <option value="3d">3 Days</option>
                            <option value="1w">1 Week</option>
                            <option value="1m">1 Month</option>
                            <option value="6m">6 Months</option>
                            <option value="1y">1 Year</option>
                        </select>
                    </div>
                    <div className="col-md-5">
                        <input
                            type="date"
                            value={filters.specificDate}
                            onChange={(e) => onFilterChange('specificDate', e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="">Search</label>
                    </div>
                    <div className="col-md-9">
                        <select
                            value={filters.searchIn}
                            onChange={(e) => onFilterChange('searchIn', e.target.value)}
                        >
                            <option value="">All Mail</option>
                            <option value="inbox">Inbox</option>
                            <option value="sent">Sent</option>
                            <option value="drafts">Drafts</option>
                            <option value="spam">Spam</option>
                            <option value="trash">Trash</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="checkboxGr">
                            <input
                                type="checkbox"
                                checked={filters.hasAttachment}
                                onChange={(e) => onFilterChange('hasAttachment', e.target.checked)}
                            />
                            <label>Has attachment</label>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="checkboxGr">
                            <input
                                type="checkbox"
                                checked={filters.excludeChats}
                                onChange={(e) => onFilterChange('excludeChats', e.target.checked)}
                            />
                            <label>Don't include chat</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="filterBtnGr">
                            <button className={"btn btn-blank"} onClick={onClear}>Clear filter</button>
                            <button className={"btn btn-primary"} onClick={onSearch}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SearchHeader = ({onSearch}) =>{
    const [filterDropDown, setFilterDropDown] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [advancedFilters, setAdvancedFilters] = React.useState({
        from: '',
        to: '',
        subject: '',
        hasWords: '',
        doesntHave: '',
        sizeOperator: 'larger',
        sizeValue: '',
        sizeUnit: 'M',
        dateWithin: '',
        specificDate: '',
        searchIn: '',
        hasAttachment: false,
        excludeChats: false
    });

    const onFilterClick = ()=>{
        setFilterDropDown(!filterDropDown);
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            if (onSearch) {
                onSearch(searchQuery.trim());
            }
        }
    }

    const handleSearchClick = () => {
        if (searchQuery.trim() && onSearch) {
            onSearch(searchQuery.trim());
        }
    }

    const handleFilterChange = (field, value) => {
        setAdvancedFilters(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const buildAdvancedQuery = () => {
        let query = [];

        if (advancedFilters.from) {
            query.push(`from:${advancedFilters.from}`);
        }
        if (advancedFilters.to) {
            query.push(`to:${advancedFilters.to}`);
        }
        if (advancedFilters.subject) {
            query.push(`subject:${advancedFilters.subject}`);
        }
        if (advancedFilters.hasWords) {
            query.push(advancedFilters.hasWords);
        }
        if (advancedFilters.doesntHave) {
            query.push(`-${advancedFilters.doesntHave}`);
        }
        if (advancedFilters.sizeValue) {
            query.push(`${advancedFilters.sizeOperator}:${advancedFilters.sizeValue}${advancedFilters.sizeUnit}`);
        }
        if (advancedFilters.dateWithin) {
            query.push(`newer_than:${advancedFilters.dateWithin}`);
        }
        if (advancedFilters.specificDate) {
            query.push(`after:${advancedFilters.specificDate}`);
        }
        if (advancedFilters.hasAttachment) {
            query.push('has:attachment');
        }

        return query.join(' ');
    }

    const handleAdvancedSearch = () => {
        const query = buildAdvancedQuery();
        if (query.trim() && onSearch) {
            setSearchQuery(query);
            onSearch(query.trim());
            setFilterDropDown(false);
        }
    }

    const handleClearFilters = () => {
        setAdvancedFilters({
            from: '',
            to: '',
            subject: '',
            hasWords: '',
            doesntHave: '',
            sizeOperator: 'larger',
            sizeValue: '',
            sizeUnit: 'M',
            dateWithin: '',
            specificDate: '',
            searchIn: '',
            hasAttachment: false,
            excludeChats: false
        });
        setSearchQuery('');
        if (onSearch) {
            onSearch('');
        }
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
                <div className="searchIcon" onClick={handleSearchClick} style={{cursor: 'pointer'}}>
                    <AiOutlineSearch size ={24} color={'#595959'}/>
                </div>
                <input
                    className={"searchInput"}
                    type="text"
                    placeholder={'Search mail'}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleSearchKeyPress}
                />
                {!filterDropDown && <div className="optionIcon" onClick={onFilterClick}><IoIosOptions size ={24} color ={"#595959"}/></div>}
                {filterDropDown && (
                    <DropDownBox
                        wrapperRef={wrapperRef}
                        filters={advancedFilters}
                        onFilterChange={handleFilterChange}
                        onSearch={handleAdvancedSearch}
                        onClear={handleClearFilters}
                    />
                )}
            </div>
        </div>
    )
}

export default SearchHeader;

