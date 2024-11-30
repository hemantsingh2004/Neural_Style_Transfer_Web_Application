import React from "react";

function HomeLink(){
    return(
        <div className="home-link">
            <a href="" onClick={e => e.preventDefault()}>Home</a>
        </div>
    );
}

export default HomeLink;