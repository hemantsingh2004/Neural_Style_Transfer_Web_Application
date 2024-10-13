import React from "react";
import logo from '../../../assets/its-free.svg';

function ItsFree(){
    return(
        <div className="info-div">
            <div className="info-logo">
                <img src={logo} alt="Its Free" />
            </div>
            <h2 className="info-heading">It's Free</h2>
            <p className="info-para">There is no software needed to be installed or No registration, Watermarks which gives you quality experience for free</p>
        </div>
    )
}

export default ItsFree;