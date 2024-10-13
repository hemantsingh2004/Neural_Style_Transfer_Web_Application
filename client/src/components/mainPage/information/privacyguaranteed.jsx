import React from "react";
import logo from '../../../assets/privacy-guaranteed.svg';

function PrivacyGuaranteed(){
    return(
        <div className="info-div">
            <div className="info-logo">
                <img src={logo} alt="Privacy Guaranteed" />
            </div>
            <h2 className="info-heading">Privacy Guaranteed</h2>
            <p className="info-para">We don't save your images indefinitely, they are deleted within 6 hours automatically to safeguard privacy</p>
        </div>
    )
}

export default PrivacyGuaranteed;