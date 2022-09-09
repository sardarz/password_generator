import './App.css';
import {ReactComponent as Copy} from "./images/icon-copy.svg"
function App() {
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
                <p className="generated-length">10</p>
              </div>
              <div className="slider">here goes the slider</div>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
