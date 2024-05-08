import "../src/App.css";
import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";

function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const handelCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <>
    <div className="title">Password Generator</div>
      <div className="app glass-container">
        {password && (
          <div className="header">
            <div className="title">{password}</div>
            <button className="copyBtn" onClick={handleCopy}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}

        <div className="charLength">
          <span>
            <label>Character Length</label>
            <label>{length}</label>
          </span>
          <input
            type="range"
            min="4"
            max="12"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="checkboxes">
          {checkboxData.map((checkbox, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  onChange={() => handelCheckboxChange(index)}
                  checked={checkbox.state}
                />
                <label>{checkbox.title}</label>
              </div>
            );
          })}
        </div>

        {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        <button
          className="generateBtn"
          onClick={() => generatePassword(checkboxData, length)}
        >
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
