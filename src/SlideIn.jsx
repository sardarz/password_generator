import React from "react";
import "./SlideIn.css";

function SlideIn({ slideRef }) {
  return (
    <div className="slidein">
      <h3 ref={slideRef}>Text copied to clipboard!</h3>
    </div>
  );
}

export default SlideIn;
