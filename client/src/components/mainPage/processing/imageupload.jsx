import React, { useState } from "react";
import StyleImageSelection from "./uploadWindow";
import "../../../styles/mainPage/processing/imageUpload.css";

function ImageUpload({setStyleImage, setContentImage, styleImage, contentImage}) {
  const [isStyleSelectionVisible, setStyleSelectionVisible] = useState(false);

  const handleImageChange = (file, setImage) => {
    if (file && file.type.match("image.*")) {
      setImage(file);
    } else {
      alert("Only image files are allowed");
    }
  };

  const handleDrop = (e, setImage) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange(file, setImage);
  };

  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    handleImageChange(file, setImage);
  };

  const handleStyleImageSelect = (imageUrl) => {
    setStyleImage(imageUrl);
    setStyleSelectionVisible(false);
  };

  return (
    <div className="image-upload">
      {/* Style Image Upload Section */}
      <div
        className="style-image-upload image-uploader"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, setStyleImage)}
      >
        {styleImage ? (
          <div className="uploaded-image-container">
            <img
              src={typeof styleImage === "string" ? styleImage : URL.createObjectURL(styleImage)}
              alt="Style"
              className="uploaded-image-preview"
            />
            <button className="button" type="button" onClick={() => setStyleImage(null)}>
              Remove Selected Style Image
            </button>
          </div>
        ) : (
          <>
            <p>Drag and drop the content image here or select one from your desktop.</p>
            <button className="button" type="button" onClick={() => setStyleSelectionVisible(true)}>
              Upload Style Image
            </button>
          </>
        )}
      </div>

      {/* Style Image Selection Window */}
      <StyleImageSelection
        onSelectImage={handleStyleImageSelect}
        onUploadNew={() => document.getElementById("styleImageInput").click()}
        setVisibility={setStyleSelectionVisible}
        visibility={isStyleSelectionVisible}
      />

      {/* Hidden input for uploading style image */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="styleImageInput"
        onChange={(e) => handleFileChange(e, setStyleImage)}
      />

      <div className="image-upload-separator"></div>

      {/* Content Image Upload Section */}
      <div
        className="content-image-upload image-uploader"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, setContentImage)}
      >
        {contentImage ? (
          <div className="uploaded-image-container">
            <img
              src={URL.createObjectURL(contentImage)}
              alt="Content"
              className="uploaded-image-preview"
            />
            <button className="button" type="button" onClick={() => setContentImage(null)}>
              Remove Selected Content Image
            </button>
          </div>
        ) : (
          <>
            <p>Drag and drop the content image here or select one from your desktop.</p>
            <button className="button" type="button" onClick={() => document.getElementById("contentImageInput").click()}>
              Upload Content Image
            </button>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="contentImageInput"
              onChange={(e) => handleFileChange(e, setContentImage)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;