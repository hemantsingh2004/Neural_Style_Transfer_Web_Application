import React from "react";
import logo from '../../../assets/lightening-fast.svg';

function LightningFast(){
    return(
        <div className="info-div">
            <div className="info-logo">
                <img src={logo} alt="Lightening Fast" />
            </div>
            <h2 className="info-heading">Lighting Fast</h2>
            <p className="info-para">This Cloud hosted, highly scalable tool can style your images within seconds</p>
        </div>
    )
}

export default LightningFast;