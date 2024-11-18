import React, { useState } from "react";
import ImageUpload from "./imageupload";
import IntensitySubmit from "./intensitysubmit";
import "../../../styles/mainPage/processing/stylingForm.css";

function StylingForm({setGeneratedImage}) {
  const [processing, setProcessing] = useState(false);
  const [styleImage, setStyleImage] = useState(null);
  const [contentImage, setContentImage] = useState(null);
  const [intensity, setIntensity] = useState(50);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    if (styleImage) {
        if (typeof styleImage === "string") {
            formData.append("styleImageUrl", styleImage);
        } else {
            formData.append("styleImage", styleImage);
        }
    }else{
        alert("Please select style image");
        return;
    }
    if (contentImage) {
      formData.append("contentImage", contentImage);
    }else{
      alert("Please select content image");
      return;
    }
    formData.append("intensity", intensity);
    try {
      setProcessing(true);
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setGeneratedImage(data.generatedImageURL);
      } else {
        const data = await response.json();
        alert(data.message);
        console.error("Error uploading images:", response.statusText);
      }
    } catch (error) {
      alert("Error: Failed to upload images");
      console.error("Error uploading images:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="style-form">
      {processing ? (
        <div id="loading-indicator">
        <div className="lds-hourglass"></div>
      </div>
      ) : (
      <form className="processing-form" onSubmit={handleFormSubmit}>
        <ImageUpload
          setStyleImage={setStyleImage}
          setContentImage={setContentImage}
          styleImage={styleImage}
          contentImage={contentImage}
        />
        <IntensitySubmit onSubmit={handleFormSubmit} setIntensity={setIntensity}/>
      </form>
      )}
    </div>
  );
}

export default StylingForm;
