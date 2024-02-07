import React, { useEffect, useState } from "react";
import "./Terminal.css";
import { useCompiler } from "../../hooks/useCompiler";

const Terminal = () => {
  const { terminalLines } = useCompiler();
  const [terminalOutput, setTerminalOutput] = useState(terminalLines);

  useEffect(() => {
    setTerminalOutput(terminalLines);
  }, [terminalLines]);

  return (
    <div className="terminal">
      {JSON.stringify(terminalOutput)}
      {terminalOutput.map((line) => {
        return <div className="terminal__line">{line}</div>;
      })}
    </div>
  );
};

export default Terminal;
