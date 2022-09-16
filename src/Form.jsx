import React, { useState } from "react";
import "./Form.css";
import Checkbox from "./Checkbox";

function Form(props) {
 

  return (
    <form action="#">
      <div className="checkboxesWrapper">
        <Checkbox htmlFor="upper" text="Include Uppercase Letters" />
        <Checkbox htmlFor="lower" text="Include Lowercase Letters" />
        <Checkbox htmlFor="numbers" text="Include Numbers" />
        <Checkbox htmlFor="symbols" text="Include Symbols" />
      </div>
    </form>
  );
}

export default Form;
