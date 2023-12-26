import React, { useState } from "react";
import "./Sidebar.css";

const nodes = ["startNode", "endNode", "processNode", "decisionNode"];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={isCollapsed ? "sidebar collapsed" : "sidebar"}>
      Sidebar
      <button
        className="sidebar__collapse-button"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        {isCollapsed ? ">" : "<"}
      </button>
      <div className="sidebar__nodes">
        {nodes.map((nodeType) => {
          return (
            <div
              className={`sidebar__custom-node ${nodeType}`}
              onDragStart={(event) => onDragStart(event, nodeType)}
              draggable
            >
              {nodeType}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
