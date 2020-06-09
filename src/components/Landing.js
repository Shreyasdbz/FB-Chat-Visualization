import React from "react";
import SetDirectory from "../components/SetDirectory";

const Landing = () => {
  return (
    <div className="container center">
      <div className="card landing-main">
        <h5>Welcome to Facebook Chat Vizualizer</h5>
        <h6>
          Use the set directory button to select your downloaded facebook
          messenger data
        </h6>
        <SetDirectory></SetDirectory>
        <p>Note: This is in no way shape or form associated with Facebook</p>
        <p>
          All Data is stored locally and deleted as soon as the tab/browser is
          closed
        </p>
      </div>
    </div>
  );
};

export default Landing;
