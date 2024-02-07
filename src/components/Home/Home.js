import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Grid from "../Grid/Grid";
import Terminal from "../Terminal/Terminal";

import "./Home.css";
import { ReactFlowProvider } from "reactflow";
import { CompilerStateProvider } from "../../hooks/useCompiler";

const Home = () => {
  return (
    <div className="home">
      <ReactFlowProvider>
        <CompilerStateProvider>
          <Grid />
          <Terminal />
          <Sidebar />
        </CompilerStateProvider>
      </ReactFlowProvider>
    </div>
  );
};

export default Home;
