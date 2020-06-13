import React from "react";
import { connect } from "react-redux";
import store from '../redux/store/store'
import { addJsonFile } from '../redux/actions/rootActions'
import { addConversation } from '../redux/actions/rootActions'
// import { updateConversation } from '../redux/actions/rootActions'
import Conversation from '../analytics/Conversation'
import Participant from '../analytics/Participant'
import { NavLink } from "react-router-dom";

const Landing = () => {

  var store_conversations = []

  // Import all the uploaded files into an array that contains all of them
  //  in a JSON object format array
  const loadJsonFiles = () => {
    var filesToLoad = document.getElementById("filesToLoad").files;

    for(let i = 0; i < filesToLoad.length; i++) {
      const f = filesToLoad[i];

      if (f.name.includes(".json")) {
        var fileReader = new FileReader();
        
        fileReader.onload = (fileLoadedEvent) => {
          console.log("File loaded")
          var jFile = JSON.parse(fileLoadedEvent.target.result)

          //Precation in case uploading no conversation type files
          if(jFile.title === null || jFile.title === undefined || jFile.participants === undefined){
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
    
    //Precaution in case user clicks submit twice 
    var addedConvos = []
    // var storeConvos = store.getState().conversations
    var storeConvos = store_conversations
    for(let i=0; i<storeConvos.length; i++){
      addedConvos.push(storeConvos[i].title)
    }

    //Create Conversation Objects ---------------------------------------------------------
    var fileList = store.getState().jsonFiles
    for(let i=0; i<fileList.length; i++){
      var f = fileList[i]

      //Check if conversation already exists
      if(addedConvos.includes(f.title)){
        //Use the pathKey to map stuff to the conversation object
        // var payload_update = {
        //   thread_path: f.thread_path,
        //   messages: f.messages
        // }
        // store.dispatch(updateConversation(payload_update))
        for(let j=0; j<store_conversations.length; j++){
          if(store_conversations[j].title === f.title){
            store_conversations[j].addJsonMessages(f.messages)
            store_conversations[j].addMessages(f.messages)
          }
        }
      }
      else{
        //New conversation
        addedConvos.push(f.title)

        // var payload_add = new Conversation(f.title, f.thread_path, isGroup)
        // store.dispatch(addConversation(payload_add))  
        store_conversations.push(new Conversation(f.title, f.thread_path, f.messages))
      }
    }


    //Create Participants List ---------------------------------------------------------
    for(let i=0;  i<store_conversations.length; i++){
      var messages = store_conversations[i].jsonMessageList
      var participantList = []
      var participants = []

      for(let m=0; m<messages.length; m++){
        if(participants.includes(messages[m].sender_name)){
          //Participant already added
          for(let p=0; p<participantList.length; p++){
            if(participantList[p].sender_name === messages[m].sender_name){
              participantList[p].addMessage(messages[m])
            }
          }
        }
        else{
          //New Participant
          participants.push(messages[m].sender_name)
          participantList.push(new Participant(messages[m].sender_name, messages[m]))
        }
      }

      store_conversations[i].participantList = participantList
      if(participantList.length > 2){
        store_conversations[i].isGroup = true
      }  
    }


    //After processign push to store ------------------------------------------------------
    for(let c=0; c<store_conversations.length; c++){
      var payload = store_conversations[c]
      store.dispatch(addConversation(payload))
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
            <input className="inputfile-btn" id="filesToLoad" name="file" directory="" webkitdirectory="" type="file" accept="json" onChange={loadJsonFiles} />
            <label htmlFor="filesToLoad">Select Directory</label>
          </div>
        </div>


        <div className="row">
          <div className="row-content landing-submit">
          <NavLink to="/Dashboard">
            <button className="btn blue darken-2 z-depth-0" onClick={handleSubmit}>Get Analytics</button>
          </NavLink>
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
