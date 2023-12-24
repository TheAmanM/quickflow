import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Grid from "../Grid/Grid";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Grid />
      <Sidebar />
    </div>
  );
};

export default Home;
