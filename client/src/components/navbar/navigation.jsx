import React from "react";
import HomeLink from "./home";
import AboutLink from "./about";
import LoginLink from "./login";

function Navigation(){
    return(
        <div className="navigation">
            {HomeLink()}
            {AboutLink()}
            {LoginLink()}
        </div>
    );
}

export default Navigation;