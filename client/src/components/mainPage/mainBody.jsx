import React, { useState } from "react";
import StylingForm from "./processing/stylingForm";
import Information from "./information/information";
import Processed from "./processed/processed";
import '../../styles/mainPage/mainBody.css';

function MainBody(){
    const [generatedImage, setGeneratedImage] = useState(null);

    return(
        <div className="main-body">
            {generatedImage 
            ? (<Processed setGeneratedImage={setGeneratedImage} generatedImage={generatedImage} />)
            : (<StylingForm setGeneratedImage={setGeneratedImage}/>)
            }
            <Information/>
        </div>
    );
}

export default MainBody;