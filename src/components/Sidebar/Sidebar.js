import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    </div>
  );
};

export default Sidebar;
