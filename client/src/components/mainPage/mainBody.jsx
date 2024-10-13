import React from "react";
import Processing from "./processing/processing";
import Information from "./information/information";
import '../../styles/mainPage/mainBody.css';

function MainBody(){
    return(
        <div className="main-body">
            {Processing()}
            {Information()}
        </div>
    );
}

export default MainBody;