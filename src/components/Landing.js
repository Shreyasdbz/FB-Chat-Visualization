import React, { Component } from 'react'
import SetDirectory from '../components/SetDirectory'

class Landing extends Component{
    state = {
        s1: ""
    }

    handleChange = (e) => {

    }

    render(){
        return(
            <div className="container center">
                <div className="card landing-main blue lighten-5 z-depth-0">
                    <br/>
                    <h5>Welcome to Facebook Chat Vizualizer</h5>
                    <br/>
                    <h6>Use the set directory button to select your downloaded facebook messenger data</h6>
                    <br/>
                    <SetDirectory></SetDirectory>
                    <br/>
                    <p>Note: This is in no way shape of form associated with Facebook</p>
                    <p>All Data is stored locally and deleted as soon as the tab/browser is closed</p>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
        )
    }
}

export default Landing