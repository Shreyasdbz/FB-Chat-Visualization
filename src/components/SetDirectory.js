import React, { Component } from 'react'
import ParseFile from '../components/stats/ParseFile'

class SetDirectory extends Component{
    constructor(props){
        super(props);
        this.state = {
            textStuff: "",
            fileArr: [],
            clist: []
        }
    }

    loadTextasFile = () => {
        var filesToLoad = document.getElementById("filesToLoad").files
        var tempFileData = []

        for (let i = 0; i < filesToLoad.length; i++) {
            const f = filesToLoad[i];

            if(f.name.includes(".json")){
                var fileReader = new FileReader();

                fileReader.onload = (fileLoadedEvent) => {
                    var textFromFile = fileLoadedEvent.target.result;
                    tempFileData.push(textFromFile)

                    this.state.clist.push(new ParseFile(textFromFile))
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
                <input id="filesToLoad" name="file" directory="" webkitdirectory="" type="file" accept="json" onChange={this.loadTextasFile}/>
                <br/>
                <br/>
                <button className="btn blue darken-5 z-depth-0" onClick={this.onClickHandler}>Submit</button>
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