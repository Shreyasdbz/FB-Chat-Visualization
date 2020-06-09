import React, { useState } from "react";
// //Custom component import
// import ParseFile from "../components/stats/ParseFile";
// import Conversation from "../components/stats/Conversation";

const SetDirectory = () => {
  const [fbData, setFBData] = useState();
  const [conversation, setCoversation] = useState([]);

  const loadTextAsFile = () => {
    var filesToLoad = document.getElementById("filesToLoad").files;

    for(let i = 0; i < filesToLoad.length; i++) {
      const f = filesToLoad[i];

      if (f.name.includes(".json")) {
        var fileReader = new FileReader();
        
        fileReader.onload = (fileLoadedEvent) => {
          var textFromFile = fileLoadedEvent.target.result;
          var parseTextedFile = JSON.parse(textFromFile)
          setCoversation(conversation.push(parseTextedFile.title))
        };
        fileReader.readAsText(f, "UTF-8");
      }

    };

    console.log(conversation)
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
