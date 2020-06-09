import React from "react";
import store from '../redux/store/store'
// //Custom component import
import Conversation from '../analytics/Conversation'
//Redux imports
import { addConversation } from '../redux/actions/rootActions'

const SetDirectory = () => {

  const loadTextAsFile = () => {
    var filesToLoad = document.getElementById("filesToLoad").files;

    for(let i = 0; i < filesToLoad.length; i++) {
      const f = filesToLoad[i];

      if (f.name.includes(".json")) {
        var fileReader = new FileReader();
        
        fileReader.onload = (fileLoadedEvent) => {
          var tFile = fileLoadedEvent.target.result;
          var jFile = JSON.parse(tFile)
          
          var payload = {
            conversationAdd: new Conversation(jFile.title, jFile.thread_path)
          }
          store.dispatch(addConversation(payload))
        };
        fileReader.readAsText(f, "UTF-8");
      }

    };

    console.log(store.getState())
  };

  const onClickHandler = () => {
    console.log();
  };

  return (
    <div className="container">
      <input
        className="inputfile-btn"
        id="filesToLoad"
        name="file"
        directory=""
        webkitdirectory=""
        type="file"
        accept="json"
        onChange={loadTextAsFile}
      />
      <label htmlFor="filesToLoad">Select Directory</label>
      <button className="btn blue darken-2 z-depth-0" onClick={onClickHandler}>
        Submit
      </button>
    </div>
  );
};

export default SetDirectory;
