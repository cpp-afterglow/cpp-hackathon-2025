import React from "react";
import { Slider } from "@heroui/react";
import '../styles/Student.css'

const MoodSlider = ({ value, onChange }) => {
  return (
    <div className="snt-card-center">
      <h2 className="snt-desc-text">How are you feeling today?</h2>
      <Slider
        className="w-full"
        minValue={0}
        maxValue={100}
        step={1}
        value={value}
        label="Mood"
        size="lg"
        onChange={onChange}
      />
    </div>
  );
};

export default MoodSlider;
