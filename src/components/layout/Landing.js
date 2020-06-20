import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import store from '../redux/store/store'
import { addJsonFile } from '../redux/actions/rootActions'
import { addConversation } from '../redux/actions/rootActions'
// import { updateConversation } from '../redux/actions/rootActions'
import Conversation from '../analytics/Conversation'
import Participant from '../analytics/Participant'

const Landing = () => {

  var store_conversations = []
  var loadeadConvos = 0

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

    loadeadConvos = filesToLoad.length
    alert("Files upload complete! Click on Submit to proceed");
  };


  // Parse through all the imported files in the store's jsonFiles array
  //  Convert them into Conversation objects and build out the participant and message Lists
  const handleSubmit = () => {
    
    if(loadeadConvos.length < 1){
      alert("Please upload the correct directory");
    }
    else{

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

    }

  };  

  
  return (
    <div className="container center">
      <div className="card landing-main">
        <div className="row">
          <div className="row-content landing-title">
            <h4>
              Welcome to Facebook Messenger Analytics
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-title">
            <h6>
              This app needs downloaded data from Facebook to display analytics. Here's how you can get your data:
            </h6>
            <h6>
              Once you receive an email for the download, extract the folder from the zip file and upload the "messages" folder.
            </h6>
            <br/>
            <iframe title="downloadTutorial" width="560" height="315" src="https://www.youtube.com/embed/xY-5jns9yJ0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-infoText">
            <h6>
              Use the set directory button to select your downloaded facebook messenger data.
            </h6>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-directorySelect">
            <input className="inputfile-btn" id="filesToLoad" name="file" directory="" webkitdirectory="" type="file" accept="json" onChange={loadJsonFiles} />
            <label htmlFor="filesToLoad">Set Directory</label>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-submit">
          <NavLink to="/Dashboard">
            <button className="btn blue darken-2 z-depth-0" onClick={handleSubmit}>Submit</button>
          </NavLink>
          </div>
        </div>

        <div className="row">
          <div className="row-content landing-note">
            <p >Note: This is in no way shape or form associated with Facebook. 
              <br/>
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
