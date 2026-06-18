import React from "react";
import CricketBall from "../../../Image/Loader-svg/LoaderBlack.svg";
import "./Loader.css";

const CricketBallLoader = () => (
  <div className="cricket-ball-loader">
    <img src={CricketBall} className="spinner" alt="Loading" />
  </div>
);

export default CricketBallLoader;
