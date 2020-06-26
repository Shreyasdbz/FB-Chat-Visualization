import Message from "./Message";

class Converation {
  constructor(title, thread_path, messages) {
    this.title = title;
    this.thread_path = thread_path;
    this.jsonMessageList = this.initJsonMessages(messages);
    this.messageList = this.initMessages(messages);
    this.participantList = [];
    this.isGroup = false;
    //wordList list objects; word={str:"", amount:0}
    this.wordList = [];
    this.longestMsg = "";
    this.totalMessages = 0;
  }

  initJsonMessages(messages) {
    var msgArr = [];
    for (let i = 0; i < messages.length; i++) {
      msgArr.push(messages[i]);
    }
    return msgArr;
  }

  addJsonMessages(messages) {
    for (let i = 0; i < messages.length; i++) {
      this.jsonMessageList.push(messages[i]);
    }
  }

  initMessages(messages) {
    var msgArr = [];
    for (let i = 0; i < messages.length; i++) {
      msgArr.push(new Message(messages[i]));
    }
    return msgArr;
  }

  addMessages(messages) {
    for (let i = 0; i < messages.length; i++) {
      this.messageList.push(new Message(messages[i]));
    }
  }
}

export default Converation;
