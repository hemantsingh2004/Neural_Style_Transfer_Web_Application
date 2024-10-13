import React from "react";
import '../../styles/footer/footer.css';

function Footer(){
    return(
        <div className="footer">
            <p className="copyright">Copyright &copy; {new Date().getFullYear()}</p>
        </div>
    );
}

export default Footer;