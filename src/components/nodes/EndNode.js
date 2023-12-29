import React from "react";
import { Handle, Position } from "reactflow";

const EndNode = () => {
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
      EndNode
      <Handle type="target" position={Position.Top} id="handle__end" />
    </div>
  );
};

export default EndNode;
