class ParseFile {
    constructor(fileContents) {
      this.convoTitle = this.getTitle(fileContents);
      this.participantList = []
      this.messageList = []
    }

    getTitle = (jsonText) => {
      var jfile = JSON.parse(jsonText)

      return jfile.title
    }    
}

export default ParseFile
