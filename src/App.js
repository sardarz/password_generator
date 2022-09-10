import { useEffect, useRef, useState } from 'react';
import './App.css';
import {ReactComponent as Copy} from "./images/icon-copy.svg"
import Slider from './Slider';
function App() {
  const lenEl = useRef(null)
  const [length, setLength] = useState(8)
  useEffect(() => {
    lenEl.current.innerHTML = length
  }, [length])

  return (
    <div className="App">
      <main className="main">
        <div className="container">
          <div className="main-content">
            <h2 className="main-title">Password Generator</h2>
            <div className="main-output">
              <p className="main-password"></p>
              <Copy />
            </div>
            <div className="generate">
              <div className="generate-title-wrapper">
                <p className="generate-title">Character Length</p>
                <p className="generated-length" ref={lenEl}>10</p>
              </div>
              <Slider length={length} setLength={setLength} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
