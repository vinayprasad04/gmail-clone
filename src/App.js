import React from 'react';
import Header from "./componend/Header";
import Body from "./componend/Body";
import ComposeEmail from "./componend/ComposeEmail";

const App =()=> {
    const [leftMenuOpen, setLeftMenuOpen] = React.useState(true);
    const [showCompose, setShowCompose] = React.useState(false);
    const [activeFolder, setActiveFolder] = React.useState('inbox');
    const [emailCounts, setEmailCounts] = React.useState({});
    const [searchQuery, setSearchQuery] = React.useState('');

    const onLeftMenuClick = ()=>{
        setLeftMenuOpen(!leftMenuOpen);
    }

    const handleComposeClick = () => {
        setShowCompose(true);
    }

    const handleComposeClose = () => {
        setShowCompose(false);
    }

    const handleFolderChange = (folder) => {
        setActiveFolder(folder);
        setSearchQuery(''); // Clear search when changing folders
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
    }

    return(
        <>
            <Header onMenuClick={onLeftMenuClick} onSearch={handleSearch}/>
            <Body
                leftMenuOpen={leftMenuOpen}
                onComposeClick={handleComposeClick}
                activeFolder={activeFolder}
                onFolderChange={handleFolderChange}
                emailCounts={emailCounts}
                searchQuery={searchQuery}
            />
            {showCompose && <ComposeEmail onClose={handleComposeClose}/>}
        </>
    )
}
export default App;