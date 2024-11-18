import React from "react";
import "../../../styles/mainPage/processed/processed.css";

function Processed({ setGeneratedImage, generatedImage }) {
  const handleGenerateButton = (e) => {
    e.preventDefault();
    setGeneratedImage(null);
  };

  const handleDownloadButton = (e) => {
    e.preventDefault();
    const imagePath = generatedImage.split("/").slice(-2).join("/");
    const downloadUrl = `http://localhost:8000/download-image/${imagePath}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    const imageName = generatedImage.split("/").slice(-1);
    link.download = decodeURIComponent(imageName);
    link.click();
  };

  return (
    <div className="processed-window">
      <div className="processed">
        <div className="generated">
          <img
            src={generatedImage}
            alt="Generated Image"
            caption="Generated Image"
          />
        </div>
        <div className="processed-window-buttons">
          <div className="new-process">
            <button onClick={handleGenerateButton}>Generate New</button>
          </div>
          <div className="download-image">
            <button onClick={handleDownloadButton}>Download</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Processed;
