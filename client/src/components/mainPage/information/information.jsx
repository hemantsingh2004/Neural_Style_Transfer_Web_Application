import React from "react";
import PerfectQuality from "./perfectquality";
import LightningFast from "./lightningfast";
import EasyToUse from "./easytouse";
import WorksAnywhere from "./worksanywhere";
import PrivacyGuaranteed from "./privacyguaranteed";
import ItsFree from "./itsfree";
import "../../../styles/mainPage/information/information.css";

function Information(){
    return(
        <div className="information">
            {PerfectQuality()}
            {LightningFast()}
            {EasyToUse()}
            {WorksAnywhere()}
            {PrivacyGuaranteed()}
            {ItsFree()}
        </div>
    )
}

export default Information;