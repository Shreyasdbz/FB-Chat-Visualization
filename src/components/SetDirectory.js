import React, { Component } from 'react'
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

class SetDirectory extends Component{
    render(){
        return(
            <div className="container">
                <button className="btn blue darken-5 z-depth-0">Set Directory</button>
                <br/>
                <br/>
                <br/>
                {/* <form className="uploader" encType="multipart/form-data" >
                    <input type="file" id="file" accept=".css" multiple />
                </form> */}
                <FilePond allowMultiple={true} name='LICENSE' required='true' acceptedFileTypes="css"></FilePond>
            </div>
        )
    }
}

export default SetDirectory