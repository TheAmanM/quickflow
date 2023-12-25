import { Handle, Position, useReactFlow, useStoreApi } from "reactflow";

import React from "react";

const ProcessNode = ({ id }) => {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = (evt) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === id) {
          node.data = evt.target.value;
        }

        return node;
      })
    );
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <input
          id="text"
          name="text"
          onChange={onChange}
          style={{ width: 125, height: 40 }}
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default ProcessNode;
