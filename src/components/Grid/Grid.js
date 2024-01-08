import React, { useCallback, useState } from "react";
import "./Grid.css";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ControlButton,
  Controls,
  MarkerType,
  MiniMap,
  Panel,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  getConnectedEdges,
} from "reactflow";
import "reactflow/dist/style.css";

import StartNode from "../nodes/StartNode";
import EndNode from "../nodes/EndNode";
import ProcessNode from "../nodes/ProcessNode";
import DecisionNode from "../nodes/DecisionNode";

const nodeTypes = {
  startNode: StartNode,
  endNode: EndNode,
  processNode: ProcessNode,
  decisionNode: DecisionNode,
};

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  { id: "3", position: { x: 200, y: 100 }, type: "startNode" },
];

const initialEdges = [
  {
    id: "1",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      strokeWidth: 4,
    },
  },
];

const adjustPosition = (coords) => {
  const snapConstant = 10;

  coords.x = snapConstant * Math.round(coords.x / snapConstant);
  coords.y = snapConstant * Math.round(coords.y / snapConstant);

  return coords;
};

const Grid = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  let id = 4;
  const getId = () => `${id++}`;
  /* const getId = () => {
    let id = 0;
    for (const node of nodes) {
      const nodeId = parseInt(node.id);
      if (nodeId > id) {
        id = nodeId;
      }
    }

    return id + 1;
  }; */

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => {
        let newNodes = applyNodeChanges(changes, nds);
        if (newNodes === undefined) {
          newNodes = nds;
        }
        newNodes.map((currentNode) => {
          if (currentNode.position && !currentNode.dragging) {
            currentNode.position = adjustPosition(currentNode.position);
          }
        });

        return newNodes;
      });
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) => {
        connection.type = "smoothstep";
        connection.markerEnd = { type: MarkerType.ArrowClosed, strokeWidth: 4 };
        return addEdge(connection, eds);
      }),
    [setEdges]
  );

  const isValidEdge = (connection) => {
    const source = connection.source;
    const sourceHandle = connection.sourceHandle;

    for (const edge of edges) {
      if (edge.source === source && edge.sourceHandle === sourceHandle) {
        return false;
      }
    }

    return true;
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition(
        adjustPosition({
          x: event.clientX,
          y: event.clientY,
        })
      );
      const newNode = {
        id: getId(),
        type,
        position,
        height: 58,
        width: 65,
        // data: { label: `${type} node` },
      };
      if (newNode.type !== "startNode" && newNode.type !== "endNode") {
        newNode.data = "";
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          isValidConnection={isValidEdge}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background
            id="1"
            gap={10}
            color="#f1f1f1"
            variant={BackgroundVariant.Lines}
          />

          <Background
            id="2"
            gap={50}
            color="#ccc"
            variant={BackgroundVariant.Lines}
          />
          <MiniMap pannable />
          <Controls showInteractive={false}>
            <ControlButton onClick={() => alert("Settings menu! ✨")}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="200px"
                width="200px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="48"
                  d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
                ></path>
              </svg>
            </ControlButton>
          </Controls>
          <Panel position="top-center">top-center</Panel>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default Grid;
