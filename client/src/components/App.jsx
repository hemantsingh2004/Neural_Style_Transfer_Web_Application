import React from "react";
import MainPage from "./mainPage/mainPage";
import '../styles/app.css';

function App(){
    return(
        <div className="app">{MainPage()}</div>
    )
}

export default App;