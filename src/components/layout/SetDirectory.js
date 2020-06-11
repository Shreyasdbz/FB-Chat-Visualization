import React from "react";
import { connect } from "react-redux";
import store from '../redux/store/store'
import { addJsonFile } from '../redux/actions/rootActions'

const SetDirectory = () => {

  // Import all the uploaded files into an array that contains all of them
  //  in a JSON object format array
  const fillJsonFiles = () => {
    var filesToLoad = document.getElementById("filesToLoad").files;

    for(let i = 0; i < filesToLoad.length; i++) {
      const f = filesToLoad[i];

      if (f.name.includes(".json")) {
        var fileReader = new FileReader();
        
        fileReader.onload = (fileLoadedEvent) => {
          var tFile = fileLoadedEvent.target.result;
          var jFile = JSON.parse(tFile)

          // PARSE FILE CONTENTS HERE

          var payload_jsonFile = {
            jsonFileAdd: jFile
          }
          store.dispatch(addJsonFile(payload_jsonFile))
        };
        fileReader.readAsText(f, "UTF-8");
      }
    };
  };

  // Parse through all the imported files in the store's jsonFiles array
  //  Convert them into Conversation objects and build out the participant and message Lists
  const handleSubmit = () => {
    var fileList = store.getState().jsonFiles
    
    var addedConvos = []
    for(let i=0; i<fileList.length; i++){
      addedConvos.push(fileList[i].title)
    }

    console.log(addedConvos)
  };

  return (
    <div className="container">
      <input className="inputfile-btn" id="filesToLoad" name="file" directory="" webkitdirectory="" type="file" accept="json" onChange={fillJsonFiles} />
      <label htmlFor="filesToLoad">Select Directory</label>
      <button className="btn blue darken-2 z-depth-0" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const mapStateToProps = state => {
  return{
    jsonFileList: state.jsonFiles
  }
}

export default connect(mapStateToProps)(SetDirectory);
