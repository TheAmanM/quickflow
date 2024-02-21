import React, { useEffect, useState } from "react";
import "./Terminal.css";
import { useCompiler } from "../../hooks/useCompiler";

const Terminal = () => {
  const { terminalLines, showInputField, handleEnter, setInputValue } =
    useCompiler();
  const [terminalOutput, setTerminalOutput] = useState(terminalLines);
  const [localInput, setLocalInput] = useState("");
  useEffect(() => {
    setTerminalOutput(terminalLines);
  }, [terminalLines]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEnter(localInput);
    }
  };

  return (
    <div className="terminal">
      {terminalOutput.map((line) => {
        return <div className="terminal__line">{line}</div>;
      })}
      {showInputField && (
        <input
          type="text"
          onChange={(e) => {
            setLocalInput(e.target.value);
          }}
          onKeyUp={handleKeyPress}
        ></input>
      )}
    </div>
  );
};

export default Terminal;
