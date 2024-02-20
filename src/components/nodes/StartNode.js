import React from "react";
import { Handle, Position } from "reactflow";
import { MdStart } from "react-icons/md";
import { useCompiler } from "../../hooks/useCompiler";

const StartNode = ({ id }) => {
  const { isRunning, compile } = useCompiler();

  return (
    <div
      style={{
        width: 125,
        height: 40,
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      StartNode
      <Handle type="source" position={Position.Bottom} id="handle__start" />
      <div
        className="node-start__toolbar"
        style={{ position: "absolute", top: "-20px" }}
      >
        <MdStart
          onClick={() => {
            compile(id);
          }}
        />
      </div>
    </div>
  );
};

export default StartNode;
