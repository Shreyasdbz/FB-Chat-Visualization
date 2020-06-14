import Message from './Message'

class Participant {
    constructor(name, message) {
      this.sender_name = name;
      this.messageList = this.initMessage(message)
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
