import React from "react";
import { connect } from "react-redux";
import store from '../redux/store/store'
import { addJsonFile } from '../redux/actions/rootActions'
import { addConversation } from '../redux/actions/rootActions'
import { updateConversation } from '../redux/actions/rootActions'
import Conversation from '../analytics/Conversation'

const Landing = () => {

  // Import all the uploaded files into an array that contains all of them
  //  in a JSON object format array
  const fillJsonFiles = () => {
    var filesToLoad = document.getElementById("filesToLoad").files;

    for(let i = 0; i < filesToLoad.length; i++) {
      const f = filesToLoad[i];

      if (f.name.includes(".json")) {
        var fileReader = new FileReader();
        
        fileReader.onload = (fileLoadedEvent) => {
          var jFile = JSON.parse(fileLoadedEvent.target.result)

          // PARSE FILE CONTENTS HERE

          if(jFile.title === null || jFile.title === undefined){
            //dont add file
          }
          else{
            var payload = jFile
            store.dispatch(addJsonFile(payload))
          }
        };
        fileReader.readAsText(f, "UTF-8");
      }
    };
  };

  // Parse through all the imported files in the store's jsonFiles array
  //  Convert them into Conversation objects and build out the participant and message Lists
  const handleSubmit = () => {
    var fileList = store.getState().jsonFiles
    
    //Precaution in case user clicks submit twice 
    var addedConvos = []
    var storeConvos = store.getState().conversations
    for(let i=0; i<storeConvos.length; i++){
      addedConvos.push(storeConvos[i].title)
    }

    //Create Conversation Objects
    for(let i=0; i<fileList.length; i++){
      var f = fileList[i]

      //Check if conversation already exists
      if(addedConvos.includes(f.title)){
        //Use the pathKey to map stuff to the conversation object
        var payload_update = {
          thread_path: f.thread_path,
          messages: f.messages
        }
        store.dispatch(updateConversation(payload_update))
      }
      else{
        //New conversation
        addedConvos.push(f.title)
        
        var payload = new Conversation(f.title, f.thread_path)
        store.dispatch(addConversation(payload))  
      }
    }

    console.log(store.getState())
  };  

  
  return (
    <div className="container center">
      <div className="card landing-main">
        <div className="row">
          <div className="row-content landing-title">
            <h5>
              Welcome to Facebook Chat Analytics
            </h5>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-infoText">
            <h6>
              Use the set directory button to select your downloaded facebook
              messenger data
            </h6>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-directorySelect">
            <input className="inputfile-btn" id="filesToLoad" name="file" directory="" webkitdirectory="" type="file" accept="json" onChange={fillJsonFiles} />
            <label htmlFor="filesToLoad">Select Directory</label>
          </div>
        </div>
        
        <div className="row">
          <div className="row-content landing-submit">
          <button className="btn blue darken-2 z-depth-0" onClick={handleSubmit}>Get Analytics</button>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-note">
            <p>Note: This is in no way shape or form associated with Facebook</p>
            <p>
              All Data is stored locally and deleted as soon as the tab/browser is
              closed
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return{
    jsonFileList: state.jsonFiles
  }
}

export default connect(mapStateToProps)(Landing);
