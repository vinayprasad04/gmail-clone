import React from 'react';

import '../style/body.scss';

import LeftMenu from './body/LeftMenu';
import MainListing from './body/MainListing';
import UserList from './body/UserList';

const Body =({leftMenuOpen, onComposeClick, activeFolder, onFolderChange, emailCounts, searchQuery})=> {
    return(
        <div className="mainContainer">
            <LeftMenu
                leftMenuOpen={leftMenuOpen}
                onComposeClick={onComposeClick}
                activeFolder={activeFolder}
                onFolderChange={onFolderChange}
                emailCounts={emailCounts}
            />
            <MainListing activeFolder={activeFolder} searchQuery={searchQuery}/>
            <UserList/>
        </div>
    )
}

export default Body;


