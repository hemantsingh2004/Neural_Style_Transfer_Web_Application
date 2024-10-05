import React from "react";
import Navbar from "../navbar/navbar";
import MainBody from "./mainBody";
import Footer from "../footer/footer";

function MainPage(){
    return(<div className="mainpage">
        {Navbar()}
        {MainBody()}
        {Footer()}
        </div>
    );
}

export default MainPage;