import React from "react";

function LoginLink(){
    return(
        <div className="login-link">
            <a href="" onClick={e => e.preventDefault()}>Login</a>
        </div>
    );
}

export default LoginLink;