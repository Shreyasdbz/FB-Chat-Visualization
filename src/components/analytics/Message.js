class Message{
    constructor(messagePayload){
        this.title = this.parsePayload(messagePayload, "title");
        this.timeStamp = this.parsePayload(messagePayload, "timeStamp");;
    }

    parsePayload(payload, type){
        var messageObject = {
            content: "",
            type: "",
            photos: [],
            reactions: []  
        }

        return messageObject
    }
}

export default Message