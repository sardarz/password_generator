import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ReactComponent as Copy } from "./images/icon-copy.svg";
import { ReactComponent as ArrowRight } from "./images/icon-arrow-right.svg";
import Slider from "./Slider";
import Form from "./Form";
import { CheckboxContext } from "./CheckboxContext";
import SlideIn from "./SlideIn";

const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()",
};

function App() {
  const lenEl = useRef(null);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [length, setLength] = useState(8);
  const [pass, setPass] = useState("");
  const ref = useRef(null)
  const [passwordParams, setPasswordParams] = useState({
    upper: true,
    lower: false,
    numbers: false,
    symbols: false,
  });

  useEffect(() => {
    setNewPassword();
  }, []);

  function getNewPassword() {
    let possibleChars = "";
    for (const [key, value] of Object.entries(passwordParams)) {
      if (value) {
        possibleChars += CHARS[key];
      }
    }

    if (!possibleChars.length) return pass;
    let result = "";
    for (let i = 0; i < length; i++) {
      let n = Math.floor(Math.random() * possibleChars.length);
      result += possibleChars[n];
    }
    return result;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(pass);
    ref.current.style.animationName = "slidein"
    ref.current.style.transform = "translateY(50%)";
    setTimeout(() => {
      ref.current.style.transform = "translateY(-100%)";
    }, 1000)
  }

  function setNewPassword() {
    let newPassword = getNewPassword();
    setPass(newPassword);
    let selectedParamsCount = 0;

    for (const value of Object.values(passwordParams)) {
      if (value) selectedParamsCount++;
    }

    if (selectedParamsCount === 0) {
    } else if (selectedParamsCount === 1) {
      setPasswordStrength("too weak");
    } else if (selectedParamsCount === 2) {
      setPasswordStrength("weak");
    } else if (selectedParamsCount === 3) {
      setPasswordStrength("medium");
    } else if (selectedParamsCount === 4 && length < 11) {
      setPasswordStrength("medium");
    } else if (selectedParamsCount === 4) {
      setPasswordStrength("strong");
    }
  }

  return (
    <CheckboxContext.Provider value={{ passwordParams, setPasswordParams }}>
      <div className="App">
        <SlideIn slideRef={ref}/>
        <main className="main">
          <div className="container">
            <div className="main-content">
              <h2 className="main-title">Password Generator</h2>
              <div className="main-output">
                <p className="main-password">{pass}</p>
                <div className="copy-wrapper" onClick={copyToClipboard}>
                  <Copy />
                </div>
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
                    <p>{passwordStrength}</p>
                    <div
                      className={`bars ${
                        passwordStrength === "too weak"
                          ? "too-weak"
                          : passwordStrength
                      }`}
                    >
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(evt) => {
                    evt.preventDefault();
                    setNewPassword();
                  }}
                  className="btn-generate"
                >
                  Generate <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CheckboxContext.Provider>
  );
}

export default App;
