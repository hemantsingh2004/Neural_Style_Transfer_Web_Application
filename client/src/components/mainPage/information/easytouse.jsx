import React from "react";
import logo from '../../../assets/easy-to-use.svg';

function EasyToUse(){
    return(
        <div className="info-div">
            <div className="info-logo">
                <img src={logo} alt="Easy To Use" />
            </div>
            <h2 className="info-heading">Easy To Use</h2>
            <p className="info-para">Simply upload your images, select the intensity and hit the submit button, its easy as that</p>
        </div>
    )
}

export default EasyToUse;