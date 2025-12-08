import React from 'react';
import Header from "./componend/Header";
import Body from "./componend/Body";
import ComposeEmail from "./componend/ComposeEmail";

const App =()=> {
    const [leftMenuOpen, setLeftMenuOpen] = React.useState(true);
    const [showCompose, setShowCompose] = React.useState(false);

    const onLeftMenuClick = ()=>{
        setLeftMenuOpen(!leftMenuOpen);
    }

    const handleComposeClick = () => {
        setShowCompose(true);
    }

    const handleComposeClose = () => {
        setShowCompose(false);
    }

    return(
        <>
            <Header onMenuClick={onLeftMenuClick}/>
            <Body leftMenuOpen={leftMenuOpen} onComposeClick={handleComposeClick}/>
            {showCompose && <ComposeEmail onClose={handleComposeClose}/>}
        </>
    )
}
export default App;