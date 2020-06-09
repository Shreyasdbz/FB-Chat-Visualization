// Participant class object to be used inside a Conversation object
// The variables contained within are local to a specific conversation thread
// @param -- messages: 

class Participant {
    constructor(name) {
      this.pName = name;
      this.messages = this.getMessages;
      this.reactions = this.getReactions;
    }

    getMessages = (jsonText) => {
        var mlist = {
            mContent, mTimestamp
        }

        return mlist
    }    

    getReactions = (jsonText) => {
        var rlist = []

        return rlist
    }
}

export default Participant
