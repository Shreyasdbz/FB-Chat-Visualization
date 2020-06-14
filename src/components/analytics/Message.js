class Message{
    constructor(messagePayload){
        this.sender = this.parsePayload(messagePayload, "sender");
        this.timeStamp = this.parsePayload(messagePayload, "timeStamp")
        this.content = this.parsePayload(messagePayload, "content")
        this.reactions = this.parsePayload(messagePayload, "reactions")
        this.photos = this.parsePayload(messagePayload, "photos")
        this.share = this.parsePayload(messagePayload, "share")
        this.gifs = this.parsePayload(messagePayload, "gifs")
        this.jsonMsg = messagePayload   
    }

    parsePayload(message, type){
        if(type === "sender"){
            return message.sender_name
        }
        else if(type === "timeStamp"){
            return message.timestamp_ms
        }
        else if(type === "content"){
            if(message.content === undefined || message.content === null){
                return ""
            }
            else{
                if(message.share === undefined || message.share === null){
                    return message.content
                }
                else{
                    return message.share.link
                }
            }
        }
        else if(type === "reactions"){
            if(message.reactions === undefined || message.reactions === null){
                return 0
            }
            else{
                var reactions = []
                for(let i=0; i<message.reactions.length; i++){
                    var reactObj = {
                        reactionEmoji: message.reactions[i].reaction,
                        actor: message.reactions[i].actor
                    }
                    reactions.push(reactObj)
                }
                return reactions
            }
        }
        else if(type === "photos"){
            if(message.photos === undefined || message.photos === null){
                return 0
            }
            else{
                return message.photos.length
            }
        }
        else if(type === "share"){
            if(message.share === undefined || message.share === null){
                return 0
            }
            else{
                return message.share.link
            }            
        }
        else if(type === "gifs"){
            if(message.gifs === undefined || message.gifs === null){
                return 0
            } 
            else{
                return 1
            }
        }
        else{
            console.log("Unknown message parse input: ", type, "Message: ", message)
            return message
        }
    }
}

export default Message