import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ReactComponent as Copy } from "./images/icon-copy.svg";
import { ReactComponent as ArrowRight } from "./images/icon-arrow-right.svg";
import Slider from "./Slider";
import Form from "./Form";
import { CheckboxContext } from "./CheckboxContext";



const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()",
}

function App() {
  const lenEl = useRef(null);
  const [length, setLength] = useState(8);
  const [pass, setPass] = useState('')
  const [passwordParams, setPasswordParams] = useState({
    upper: false,
    lower: false,
    numbers: false,
    symbols: false,
  });

  
  function getNewPassword() {
    let possibleChars = ""
    for (const [key, value] of Object.entries(passwordParams)) {
      if (value) {
        possibleChars += CHARS[key]
      }
    }
    
    if (!possibleChars.length) return ''
    let result = ''
    for (let i = 0; i < length; i++) {
      let n = Math.floor(Math.random() * possibleChars.length)
      result += possibleChars[n]

    }
    return result
  }

  function setNewPassword() {
    let newPassword = getNewPassword();
    setPass(newPassword)
  }

  return (
    <CheckboxContext.Provider value={{passwordParams, setPasswordParams}}>
      <div className="App">
        <main className="main">
          <div className="container">
            <div className="main-content">
              <h2 className="main-title">Password Generator</h2>
              <div className="main-output">
                <p className="main-password">{pass}</p>
                <Copy />
              </div>
              <div className="generate">
                <div className="generate-title-wrapper">
                  <p className="generate-title">Character Length</p>
                  <p className="generated-length" ref={lenEl}>
                    {length}
                  </p>
                </div>
                <Slider length={length} setLength={setLength} />
                <Form />
                <div className="password-strength">
                  <p>strength</p>
                  <div className="strength-output">
                    <p>medium</p>
                    <div className="bars">
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                    </div>
                  </div>
                </div>
                <button onClick={evt => {
                  evt.preventDefault()
                  setNewPassword()
                }} className="btn-generate">Generate <ArrowRight /></button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CheckboxContext.Provider>
  );
}

export default App;
