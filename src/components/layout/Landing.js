import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as buildData from "../analytics/dataProcessing/buildData";

const Landing = () => {
  var loadeadConvos = 0;

  // Import all the uploaded files into an array that contains all of them
  //  in a JSON object format array
  const loadJsonFiles = () => {
    var filesToLoad = document.getElementById("filesToLoad").files;
    for (let i = 0; i < filesToLoad.length; i++) {
      const f = filesToLoad[i];

      buildData.buildFileStore(f);
    }
    loadeadConvos = filesToLoad.length;

    alert("Files upload complete! Click on Submit to proceed");
  };

  // Parse through all the imported files in the store's jsonFiles array
  //  Convert them into Conversation objects and build out the participant and message Lists
  const handleSubmit = () => {
    if (loadeadConvos.length < 1) {
      alert("Please upload the correct directory");
    } else if (loadeadConvos.length > 1) {
      //do nothing
    } else {
      buildData.buildConversationStore();
    }
  };

  return (
    <div className="container center">
      <div className="card landing-main">
        <div className="row">
          <div className="row-content landing-title">
            <h4>
              Welcome to <strong>Facebook Messenger Analytics</strong>
            </h4>
            <h5>[Analytics background]</h5>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-title">
            <h6>
              This app needs downloaded data from Facebook to display analytics.
              Here's how you can get your data:
            </h6>
            <h6>
              Once you receive an email for the download, extract the folder
              from the zip file and upload the "messages" folder.
            </h6>
            <br />
            <div className="player">
              <iframe
                title="downloadTutorial"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/xY-5jns9yJ0"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                samesite="None"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-infoText">
            <h6>
              Use the set directory button to choose your downloaded facebook
              messenger data directory.
            </h6>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-directorySelect">
            <input
              className="inputfile-btn btn"
              id="filesToLoad"
              name="file"
              directory=""
              webkitdirectory=""
              type="file"
              accept="json"
              onChange={loadJsonFiles}
            />
            <label htmlFor="filesToLoad">Set Directory</label>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-submit">
            <NavLink to="/Dashboard">
              <button className="submitBtn btn" onClick={handleSubmit}>
                Submit
              </button>
            </NavLink>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-note">
            <p>
              Note: This is in no way shape or form associated with Facebook.
              <br />
              All Data is stored locally and deleted as soon as the tab/browser
              is closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    jsonFileList: state.jsonFiles
  };
};

export default connect(mapStateToProps)(Landing);
