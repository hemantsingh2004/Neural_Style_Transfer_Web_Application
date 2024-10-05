import React from "react";
import Processing from "./processing/processing";
import Information from "./information/information";

function MainBody(){
    return(
        <div className="main-body">
            {Processing()}
            {Information()}
        </div>
    );
}

export default MainBody;