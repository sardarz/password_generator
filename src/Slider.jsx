import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";

function Slider({ length, setLength }) {
  const thumbRef = useRef(null);
  const sliderRef = useRef(null);
  const progressRef = useRef(null);
  let newLeft;
  let slider_width;
  let pillarDistance;
  let pillarHalf;
  let pillars = 19;
  useEffect(() => {
    slider_width = sliderRef.current.getBoundingClientRect().width;
    pillarDistance = Math.ceil(slider_width / pillars);
    pillarHalf = Math.round(pillarDistance / 2);
  });

  function onMouseDown(evt) {
    let thumbRect = thumbRef.current.getBoundingClientRect();
    let sliderRect = sliderRef.current.getBoundingClientRect();
    let shiftX = evt.clientX - thumbRect.left;

    function onMouseMove(evt) {
      evt.preventDefault();
      newLeft = evt.clientX - shiftX - sliderRect.left;
      thumbRef.current.classList.add('hovering')
      if (newLeft < 0) newLeft = 0;
      if (newLeft > sliderRect.width - thumbRect.width)
        newLeft = sliderRect.width - thumbRect.width;
      thumbRef.current.style.left = newLeft + "px";
      progressRef.current.style.width = newLeft + "px";
      let counter = 0;
      while (counter * pillarDistance <= newLeft) counter++;
      setLength(counter + 7);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", (evt) => {
      document.removeEventListener("mousemove", onMouseMove);
      thumbRef.current.removeEventListener("mousedown", onMouseDown);
      thumbRef.current.classList.remove('hovering')
    });
  }

  return (
    <div className="slider" ref={sliderRef}>
      <div className="progress" ref={progressRef}></div>
      <div className="thumb" ref={thumbRef} onMouseDown={onMouseDown}></div>
    </div>
  );
}

export default Slider;
