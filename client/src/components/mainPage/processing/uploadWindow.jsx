import React, { useState, useEffect } from "react";
import "../../../styles/mainPage/processing/uploadWindow.css";

function StyleImageSelection({ onSelectImage, onUploadNew, setVisibility, visibility }) {
  const [availableImages, setAvailableImages] = useState([]);

  const handleCloseButton = (e) => {
    e.preventDefault();
    setVisibility(false);
  }

  const handleUploadButton = (e) => {
    e.preventDefault();
    setVisibility(false);
    onUploadNew();
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/style-images");
        const data = await response.json();
        setAvailableImages(data.images);
      } catch (error) {
        console.error("Error fetching style images:", error);
        alert("Error: Failed to fetch style images");
      }
    };
    fetchImages();
  }, []);

  return (
    <div className={visibility ? "style-image-selection-window" : "style-image-selection-window no-display"}>
      <button className="close-button" onClick={handleCloseButton} type="button">X</button>
      <h3>Select a Style Image</h3>
      <div className="available-images-grid">
        {availableImages.map((image, index) => (
          <div key={index} className="available-image-item" onClick={() => onSelectImage(image)}>
            <img src={image} alt={`Style ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="desktop-upload-button button" onClick={handleUploadButton} type="button">Or Upload from Desktop</button>
    </div>
  );
}

export default StyleImageSelection;