import React, { Component } from 'react'

class SetDirectory extends Component{
    constructor(props){
        super(props);
        this.state = {
            textStuff: "",
            fileArr: []
        }
    }

    loadTextasFile = () => {
        var filesToLoad = document.getElementById("filesToLoad").files
        for (let i = 0; i < filesToLoad.length; i++) {
            const f = filesToLoad[i];

            var fileReader = new FileReader();
            fileReader.onload = (fileLoadedEvent) => {
                var textFromFile = fileLoadedEvent.target.result;
                this.setState(prevState => ({
                    arrayvar: [...prevState.fileArr, textFromFile]
                }))

            }
            fileReader.readAsText(f, "UTF-8");
        }
    }

    render(){
        return(
            <div className="container">
                <br/>
                <br/>
                {/* <input directory="" webkitdirectory="" type="file" accept="json" onChange={this.onChangeHandler}/> */}
                <input id="fileToLoad" name="file" type="file" accept="json" onChange={this.loadTextasFile}/>
                <br/>
                <br/>
                <button className="btn blue darken-5 z-depth-0" onClick={this.onClickHandler}>Submit</button>
                <br/>
                <br/>
                <br/>
                <br/>
                <p>Filestuf: {this.state.textStuff}</p>
                <br/>
               </div>
        )
    }
}

export default SetDirectory