import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ReactComponent as Copy } from "./images/icon-copy.svg";
import Slider from "./Slider";
import Form from "./Form";
import { CheckboxContext } from "./CheckboxContext";
function App() {
  const lenEl = useRef(null);
  const [length, setLength] = useState(8);

  const [passwordParams, setPasswordParams] = useState({
    upper: false,
    lower: false,
    numbers: false,
    symbols: false,
  });

  return (
    <CheckboxContext.Provider value={{passwordParams, setPasswordParams}}>
      <div className="App">
        <main className="main">
          <div className="container">
            <div className="main-content">
              <h2 className="main-title">Password Generator</h2>
              <div className="main-output">
                <p className="main-password">$fP32@mz9</p>
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </CheckboxContext.Provider>
  );
}

export default App;
