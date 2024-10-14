import React from "react";
import logo from '../../../assets/works-anywhere.svg';

function WorksAnywhere(){
    return(
        <div className="info-div">
            <div className="info-logo">
                <img src={logo} alt="Works Anywhere" />
            </div>
            <h2 className="info-heading">Works Anywhere</h2>
            <p className="info-para">This Application is browser-based (no software to be installed), works on any platform(Windows, MacOs and linux)</p>
        </div>
    )
}

export default WorksAnywhere;