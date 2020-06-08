import React, { Component } from 'react'
//Custom component import
import ParseFile from '../components/stats/ParseFile'
import Conversation from '../components/stats/Conversation'

class SetDirectory extends Component{
    constructor(props){
        super(props);
        this.state = {
            textStuff: "",
            fileArr: [],
            flist: [],
            clist: []
        }
    }

    loadTextasFile = () => {
        var filesToLoad = document.getElementById("filesToLoad").files
        var tempFileData = []
        var readFiles = []

        for (let i = 0; i < filesToLoad.length; i++) {
            const f = filesToLoad[i];

            if(f.name.includes(".json")){
                var fileReader = new FileReader();

                fileReader.onload = (fileLoadedEvent) => {
                    var textFromFile = fileLoadedEvent.target.result;
                    tempFileData.push(textFromFile)

                    this.state.flist.push(new ParseFile(textFromFile))

                    var convoTitle = JSON.parse(textFromFile).title
                    if(readFiles.includes(convoTitle)){
                        //pass
                    }         
                    else{
                        readFiles.push(convoTitle)
                        var pathKey = JSON.parse(textFromFile).thread_path
                        this.state.clist.push(new Conversation(pathKey, convoTitle))
                    }        


                }
                
                fileReader.readAsText(f, "UTF-8"); 
            }
        }
   
        this.setState({
            fileArr: [...this.state.fileArr, tempFileData]
        })
    }

    onClickHandler = () =>{
        console.log(this.state.clist)
    }

    render(){
        return(
            <div className="container">
                <br/>
                <br/>
                <input 
                    className="inputfile-btn" 
                    id="filesToLoad" 
                    name="file" 
                    directory="" 
                    webkitdirectory="" 
                    type="file" 
                    accept="json" 
                    onChange={this.loadTextasFile}
                    />
                <label htmlFor="filesToLoad">Select Directory</label> 
                <br/>
                <br/>
                <button className="btn blue darken-2 z-depth-0" onClick={this.onClickHandler}>Submit</button>
                <br/>
                <br/>
                <br/>
                <p>Imported Files: {this.state.fileArr}</p>
                <br/>
                <br/>
               </div>
        )
    }
}

export default SetDirectory