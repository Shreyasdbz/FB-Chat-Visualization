import Message from './Message'

class Participant {
    constructor(name, message) {
      this.sender_name = name;
      this.messageList = this.initMessage(message);
      this.totalMessages = 0;
      this.textMessages = 0;
      this.mediaMessages = 0;
      this.linksMessages = 0;
      // activeTimes_hours list format: activity{time_hour_24, amount}
      // activeTimes_days list format: activity{time_day, amount}
      this.activeTimes_hours = [];
      this.activeTimes_days = [];
      // reactions list format: reaction{emoji, amount}
      this.reactions = [];
      this.metions = 0;
      this.avgMessageSize = 0;
    }

    initMessage(message){
        var msgList = []
        msgList.push(new Message(message))
        return msgList
    }

    addMessage(message){
        this.messageList.push(new Message(message))
    }
}

export default Participant
