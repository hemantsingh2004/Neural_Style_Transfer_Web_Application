import React from "react";
import PerfectQuality from "./perfectquality";
import LightingFast from "./lightingfast";
import EasyToUse from "./easytouse";
import WorksAnywhere from "./worksanywhere";
import PrivacyGuaranteed from "./privacyguaranteed";
import ItsFree from "./itsfree";

function Information(){
    return(
        <div className="information">
            {PerfectQuality()}
            {LightingFast()}
            {EasyToUse()}
            {WorksAnywhere()}
            {PrivacyGuaranteed()}
            {ItsFree()}
        </div>
    )
}

export default Information;