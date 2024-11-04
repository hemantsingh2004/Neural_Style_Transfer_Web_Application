import React from "react";

function Processed({setGeneratedImage, generatedImage}){
    const handleGenerateButton = (e) => {
        e.preventDefault();
        setGeneratedImage(null);
    }

    const handleDownloadButton = (e) => {
        e.preventDefault();
    }

    return(
        <div className="processed">
            <div className="generated">
                <img src={generatedImage} alt="Generated Image" caption="Generated Image" />
            </div>
            <div className="new-process">
                <button onClick={handleGenerateButton}>Generate New</button>
            </div>
            <div className="download-image">
                <button onClick={handleDownloadButton}>Download</button>
            </div>
        </div>
    );
}

export default Processed;