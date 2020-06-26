import store from "../../redux/store/store";
import { addJsonFile } from "../../redux/actions/rootActions";
import { addConversation } from "../../redux/actions/rootActions";
import Conversation from "../Conversation";
import Participant from "../Participant";

// ***************************************************************************************************************************************
//  buildFileStore()
//  Takes in a file object and pushes it to the store's files array
//  @params: File Object
// ***************************************************************************************************************************************
export const buildFileStore = f => {
  if (f.name.includes(".json") && f.name.includes("message_")) {
    var fileReader = new FileReader();

    fileReader.onload = fileLoadedEvent => {
      console.log("Files loaded");
      var jFile = JSON.parse(fileLoadedEvent.target.result);

      //Precation in case uploading no conversation type files
      if (
        jFile.title === null ||
        jFile.title === undefined ||
        jFile.participants === undefined
      ) {
        //dont add file
      } else {
        var payload = jFile;
        store.dispatch(addJsonFile(payload));
      }
    };
    fileReader.readAsText(f, "UTF-8");
  }
};

// ***************************************************************************************************************************************
//  buildConversationStore()
//  Uses the state's already built json File list array to do the following:
//      Build a Conversation objects array & populate its respect fields
//          Inside each Conversation instance, build out each Participant instance
//  @params: NA
// ***************************************************************************************************************************************
export const buildConversationStore = () => {
  var store_conversations = [];

  //Precaution in case user clicks submit twice
  var addedConvos = [];
  // var storeConvos = store.getState().conversations
  var storeConvos = store_conversations;
  for (let i = 0; i < storeConvos.length; i++) {
    addedConvos.push(storeConvos[i].title);
  }

  //Create Conversation Objects ---------------------------------------------------------
  var fileList = store.getState().jsonFiles;
  for (let i = 0; i < fileList.length; i++) {
    var f = fileList[i];

    //Check if conversation already exists
    if (addedConvos.includes(f.title)) {
      for (let j = 0; j < store_conversations.length; j++) {
        if (store_conversations[j].title === f.title) {
          store_conversations[j].addJsonMessages(f.messages);
          store_conversations[j].addMessages(f.messages);
        }
      }
    } else {
      //New conversation
      addedConvos.push(f.title);
      store_conversations.push(
        new Conversation(f.title, f.thread_path, f.messages)
      );
    }
  }

  //Create Participants List ---------------------------------------------------------
  for (let i = 0; i < store_conversations.length; i++) {
    var messages = store_conversations[i].jsonMessageList;
    var participantList = [];
    var participants = [];

    //Participant List Setup ------------------------------
    for (let m = 0; m < messages.length; m++) {
      if (participants.includes(messages[m].sender_name)) {
        //Participant already added
        for (let p = 0; p < participantList.length; p++) {
          if (participantList[p].sender_name === messages[m].sender_name) {
            participantList[p].addMessage(messages[m]);
          }
        }
      } else {
        //New Participant
        participants.push(messages[m].sender_name);
        participantList.push(
          new Participant(messages[m].sender_name, messages[m])
        );
      }
    }

    //Do Participant analytics  ----------------------------------------------------------
    for (let p = 0; p < participantList.length; p++) {
      var totalMessages = 0;
      var textMessages = 0;
      var mediaMessages = 0;
      var linksMessages = 0;
      var stickerMessages = 0;
      var activeTimes_hours = [];
      var activeTimes_days = [];
      var reactions = [];
      var addedReacts = [];
      var mentions = 0;
      var avgMessageSize = 0;

      //Time Data Setup
      var weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      for (let d = 0; d < weekDays.length; d++) {
        var activity_day = {
          time_day: weekDays[d],
          time_day_num: d,
          amount: 0
        };
        activeTimes_days.push(activity_day);
      }
      for (let i = 0; i <= 24; i++) {
        var activity_hour = {
          time_hour: i,
          amount: 0
        };
        activeTimes_hours.push(activity_hour);
      }

      for (let m = 0; m < participantList[p].messageList.length; m++) {
        var msg = participantList[p].messageList[m].jsonMsg;

        // DATE Data ---------------------
        var date = new Date(msg.timestamp_ms);
        var active_hour = date.getHours();
        var active_day = date.getDay();
        for (let t = 0; t < activeTimes_days.length; t++) {
          if (activeTimes_days[t].time_day_num === active_day) {
            activeTimes_days[t].amount += 1;
          }
        }
        for (let t = 0; t < activeTimes_hours.length; t++) {
          if (activeTimes_hours[t].time_hour === active_hour) {
            activeTimes_hours[t].amount += 1;
          }
        }
        // Text/Media/Links Data ---------------------
        if (msg.content) {
          textMessages += 1;
          // Mentions Data ---------------------
          var fullName = participantList[p].sender_name;
          var firstName = "@" + fullName.split(" ")[0];
          var contentArr = msg.content.split(" ");
          if (contentArr.includes(firstName)) {
            mentions += 1;
          }
        }
        if (msg.share) {
          linksMessages += 1;
        }
        if (msg.type === "Share") {
          if (!msg.share) {
            //Game type links
            textMessages -= 1;
            linksMessages += 1;
          }
        }
        if (msg.photos) {
          mediaMessages += msg.photos.length;
        }
        if (msg.videos) {
          mediaMessages += msg.videos.length;
        }
        if (msg.sticker) {
          stickerMessages += 1;
        }
        // Reactions Data ---------------------
        if (msg.reactions) {
          for (let r = 0; r < msg.reactions.length; r++) {
            if (addedReacts.includes(msg.reactions[r].reaction)) {
              for (let k = 0; k < reactions.length; k++) {
                if (reactions[k].emoji === msg.reactions[r].reaction) {
                  reactions[k].amount += 1;
                }
              }
            } else {
              var reaction = { emoji: msg.reactions[r].reaction, amount: 1 };
              reactions.push(reaction);
              addedReacts.push(msg.reactions[r].reaction);
            }
          }
        }
      }
      // TotalMessages Data ---------------------
      totalMessages =
        textMessages + mediaMessages + linksMessages + stickerMessages;

      // After data, update Participant object ---------------------
      participantList[p].totalMessages = totalMessages;
      participantList[p].textMessages = textMessages;
      participantList[p].mediaMessages = mediaMessages;
      participantList[p].linksMessages = linksMessages;
      participantList[p].stickerMessages = stickerMessages;
      participantList[p].activeTimes_days = activeTimes_days;
      participantList[p].activeTimes_hours = activeTimes_hours;
      participantList[p].reactions = reactions;
      participantList[p].metions = mentions;
      participantList[p].avgMessageSize = avgMessageSize;
    }

    store_conversations[i].participantList = participantList;
    if (participantList.length > 2) {
      store_conversations[i].isGroup = true;
    }
  }

  //Do Conversation analytics  ----------------------------------------------------------
  for (let c = 0; c < store_conversations.length; c++) {
    var wordList = [];
    var convo = store_conversations[c];

    for (let m = 0; m < convo.messageList.length; m++) {
      // Word List ------------------------------
      var message = convo.messageList[m].content;
      if (message !== undefined && message !== null) {
        if (message.includes(" ")) {
          var mArr = message.split(" ");
          for (let a = 0; a < mArr.length; a++) {
            wordList.push(mArr[a]);
          }
        } else {
          wordList.push(message);
        }
      }
    }

    store_conversations[c].wordList = wordList;
  }

  //After processign push to store ------------------------------------------------------
  for (let c = 0; c < store_conversations.length; c++) {
    var payload = store_conversations[c];
    store.dispatch(addConversation(payload));
  }
};
