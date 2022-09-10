import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";

function Slider({length, setLength}) {
  const thumbRef = useRef(null);
  const sliderRef = useRef(null);
  let slider_width
  let pillarDistance
  let pillarHalf
  let pillars = 19
  let counter = 0
  useEffect(() => {
    slider_width = sliderRef.current.getBoundingClientRect().width
    pillarDistance = Math.ceil(slider_width / pillars)
    pillarHalf = Math.round(pillarDistance / 2)
  }, [length])

  function onMouseDown(evt) {
    let thumbRect = thumbRef.current.getBoundingClientRect();
    let sliderRect = sliderRef.current.getBoundingClientRect();
    let shiftX = evt.clientX - thumbRect.left;

    function onMouseMove(evt) {
      let newLeft = evt.clientX - shiftX - sliderRect.left;
      
      if (newLeft < 0) newLeft = 0;
      if (newLeft > sliderRect.width - thumbRect.width) newLeft = sliderRect.width - thumbRect.width;
      thumbRef.current.style.left = newLeft + "px";
      
      counter = 0
      while (counter * pillarDistance <= newLeft) counter++
      console.log(counter * pillarDistance, pillarDistance)
      setLength(counter + 7)
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", (evt) => {
      document.removeEventListener("mousemove", onMouseMove);
      thumbRef.current.removeEventListener('mousedown', onMouseDown)
    });
  }

  return (
    <div className="slider" ref={sliderRef}>
      <div className="thumb" ref={thumbRef} onMouseDown={onMouseDown}></div>
    </div>
  );
}

export default Slider;
