import React from "react";
import Logo from "./logo";
import Navigation from "./navigation";

function Navbar(){
    return(
        <div className="navbar">
            {Logo()}
            {Navigation()}
        </div>
    );
}

export default Navbar;