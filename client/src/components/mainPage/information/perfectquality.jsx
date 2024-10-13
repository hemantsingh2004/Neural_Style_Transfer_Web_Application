import React from "react";
import logo from '../../../assets/perfect-quality.svg';

function PerfectQuality(){
    return(
        <div className="info-div">
            <div className="info-logo">
                <img src={logo} alt="perfect quality logo" />
            </div>
            <h2 className="info-heading">Perfect Quality</h2>
            <p className="info-para">The best Neural Style Transfer Application to style your picture according to your mood in highest quality</p>
        </div>
    )
}

export default PerfectQuality;