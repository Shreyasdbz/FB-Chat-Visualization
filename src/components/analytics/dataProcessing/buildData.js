import store from '../../redux/store/store'
import { addJsonFile } from '../../redux/actions/rootActions'
import { addConversation } from '../../redux/actions/rootActions'
import Conversation from '../Conversation'
import Participant from '../Participant'


// ***************************************************************************************************************************************
//  buildFileStore()
//  Takes in a file object and pushes it to the store's files array
//  @params: File Object
// ***************************************************************************************************************************************
export const buildFileStore = (f) =>{
    if (f.name.includes(".json") && f.name.includes("message_")) {
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
}



// ***************************************************************************************************************************************
//  buildConversationStore()
//  Uses the state's already built json File list array to do the following:
//      Build a Conversation objects array & populate its respect fields
//          Inside each Conversation instance, build out each Participant instance 
//  @params: NA
// ***************************************************************************************************************************************
export const buildConversationStore = () => {
    var store_conversations = []

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

    //Do conversation analytics  ----------------------------------------------------------
    for(let p=0; p<participantList.length;p++){
        var totalMessages = 0;
        var textMessages = 0;
        var mediaMessages = 0;
        var linksMessages = 0;
        // activeTimes_hours list format: activity{time_hour_24, amount}
        // activeTimes_days list format: activity{time_day, time_day_num, amount}
        var activeTimes_hours = [];
        var activeTimes_days = [];
        var addedTimes_hours = []
        var reactions = [];
        var addedReacts = []
        var metions = 0;
        var avgMessageSize = 0;

        //Time Data Setup
        var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        for(let d=0; d<weekDays.length; d++){
            var activity = {
                time_day: weekDays[d],
                time_day_num: d,
                amount: 0
            }
            activeTimes_days.push(activity)
        }
        for(let i=0; i<=24; i++){
            var activity = {
                time_hour: i,
                amount: 0
            }
            activeTimes_hours.push(activity)
        }


        for(let m=0; m<participantList[p].messageList.length; p++){
            var msg = participantList[p].messageList[m]
            
            //Add to activy time stuff
            var date = new Date(msg.timestamp_ms)
            var active_hour = date.getHours()
            var active_day = date.getDay()
            // TODO: ADD Time stuff using the pre created time data setup

            //Add to total messages counter
            totalMessages += 1;

            //Add to text mesage counter
            if(msg.content){
                textMessages += 1
            }

            //Add to reactions list
            if(msg.reactions){
                for(let r=0; r<msg.reactions.length; r++){
                    if(addedReacts.includes(msg.reactions[r].reaction)){
                        for(let k=0; k<reactions.length; k++){
                            if(reactions[k].emoji === msg.reactions[r].reaction){
                                reactions[k].amount += 1
                            }
                        }
                    }
                    else{
                        var reaction = {emoji: msg.reactions[r].reaction, amount: 0}
                        reactions.push(reaction)
                        addedReacts.push(msg.reactions[r].reaction)
                    }
                }
            }


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