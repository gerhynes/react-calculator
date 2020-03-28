import React from "react";

export default function Display({ formula, currentVal }) {
  return (
    <div className="display-container">
      <div className="formula">{formula}</div>
      <div className="display" id="display">
        {currentVal}
      </div>
    </div>
  );
}
