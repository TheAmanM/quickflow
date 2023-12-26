import { Handle, Position, useReactFlow, useStoreApi } from "reactflow";
import React, { useLayoutEffect, useRef } from "react";

import "./DecisionNode.css";

const DecisionNode = ({ id }) => {
  const textFieldRef = useRef(null);

  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const updateNode = () => {
    // Update node internals
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === id) {
          node.data = textFieldRef.current.value;
        }

        return node;
      })
    );
  };

  const adjustWidth = () => {
    // Update input size
    console.log(textFieldRef.current.value.length);
    const currentLength = Math.max(textFieldRef.current.value.length + 2, 24);
    const newWidth = currentLength.toString() + "ch";
    textFieldRef.current.style.width = newWidth;
  };

  //   useLayoutEffect(adjustWidth, []);

  const onChange = () => {
    // adjustWidth();
    updateNode();
  };

  return (
    <>
      {/* <div
        style={{
          width: 125,
          aspectRatio: 1,
          // textAlign: "center",
          transform: "rotateX(0deg) rotateZ(0deg)",
          backgroundColor: "#000",
        }}
      > */}
      <div className="node__decision nodrag" style={{ lineHeight: "150px" }}>
        <input
          id="text"
          name="text"
          onChange={onChange}
          ref={textFieldRef}
          style={{ width: 150, height: 40 }}
        />
      </div>
      {/* </div> */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="true" />
      <Handle type="source" position={Position.Right} id="false" />
    </>
  );
};

export default DecisionNode;
