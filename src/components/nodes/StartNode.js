import React from "react";
import { Handle, Position } from "reactflow";

const StartNode = () => {
  return (
    <div
      style={{
        width: 125,
        height: 40,
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      StartNode
      <Handle type="source" position={Position.Bottom} id="handle__start" />
    </div>
  );
};

export default StartNode;
