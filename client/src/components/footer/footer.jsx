import React from "react";

function Footer(){
    return(
        <div className="footer">
            <p className="copyright">Copyright &copy; {new Date().getFullYear()}</p>
        </div>
    );
}

export default Footer;