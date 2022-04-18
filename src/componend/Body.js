import React from 'react';

import '../style/body.scss';

import LeftMenu from './body/LeftMenu';
import MainListing from './body/MainListing';
import UserList from './body/UserList';

const Body =({leftMenuOpen})=> {
    return(
        <div className="mainContainer">
            <LeftMenu leftMenuOpen={leftMenuOpen}/>
            <MainListing/>
            <UserList/>
        </div>
    )
}

export default Body;


