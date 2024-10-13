import React, { useState, useEffect } from "react";
import "../../../styles/mainPage/processing/slider.css";

function IntensitySubmit({ onSubmit, setIntensity }) {
    const [value, setValue] = useState(50);

    const handleChange = (event) => {
        setValue(event.target.value);

        if (setIntensity) {
            setIntensity(event.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    useEffect(() => {
        document.getElementById('slider').style.setProperty('--value', `${value}%`);
    }, [value]);

    return (
        <div className="intensity-submit">
            <div className="intensity">
                <p>Choose Intensity of Style: <span>{value}%</span></p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    id="slider"
                    value={value}
                    onChange={handleChange}
                    className="intensity-meter slider"
                />
            </div>
            <div className="submit">
                <button className="submit-button main-button" type="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default IntensitySubmit;
