import React from 'react';
import Header from "./componend/Header";
import Body from "./componend/Body";

const App =()=> {
    const [leftMenuOpen, setLeftMenuOpen] = React.useState(true);
    const onLeftMenuClick = ()=>{
        setLeftMenuOpen(!leftMenuOpen);
    }
    return(
        <>
            <Header onMenuClick={onLeftMenuClick}/>
            <Body leftMenuOpen={leftMenuOpen}/>
        </>
    )
}
export default App;