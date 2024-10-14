import React, { useState } from "react";
import ImageUpload from "./imageupload";
import IntensitySubmit from "./intensitysubmit";
import "../../../styles/mainPage/processing/processing.css";

function Processing() {
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
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="processing">
      <form className="processing-form" onSubmit={handleFormSubmit}>
        <ImageUpload
          setStyleImage={setStyleImage}
          setContentImage={setContentImage}
          styleImage={styleImage}
          contentImage={contentImage}
        />
        <IntensitySubmit onSubmit={handleFormSubmit} setIntensity={setIntensity}/>
      </form>
    </div>
  );
}

export default Processing;
