import React, { useContext, useEffect, useState } from "react";
import "./Checkbox.css";
import { CheckboxContext } from "./CheckboxContext";

function Checkbox({ htmlFor, text }) {
  const { passwordParams, setPasswordParams } = useContext(CheckboxContext);

  return (
    <div className="checkboxWrapper">
      <input
        onChange={() =>
          setPasswordParams({
            ...passwordParams,
            [htmlFor]: !passwordParams[htmlFor],
          })
        }
        checked={passwordParams[htmlFor]}
        className="checkbox"
        type="checkbox"
        id={htmlFor}
      />

      <label className="checkboxLabel" htmlFor={htmlFor}>
        {text}
      </label>
    </div>
  );
}

export default Checkbox;
