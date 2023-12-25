import { Handle, Position, useReactFlow, useStoreApi } from "reactflow";

import React, { useLayoutEffect, useRef } from "react";

const ProcessNode = ({ id }) => {
  const textFieldRef = useRef(null);

  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const updateNode = (evt) => {
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

  useLayoutEffect(adjustWidth, []);

  const onChange = () => {
    adjustWidth();
    updateNode();
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <input
          id="text"
          name="text"
          onChange={onChange}
          ref={textFieldRef}
          style={{ width: 125, height: 40 }}
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default ProcessNode;
