import React, { Component } from 'react'

//  Total messages sent broken down by each user
//  Stacked bar graph with different colors for 1) Messages, Photos, Links, Gifs, Stickers
export default class MessagesByUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            functionName: ''
        }
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    render(){
        if(!this.props.show){
            return null
        }
        return(
            <div className="functionModal-frame">
                <div className="functionModal-content">
                    {this.props.children}
                </div>
                <div className="functionModal-footer">
                    <button onClick={e => {
                        this.onClose(e);
                    }} className="btn blue">Close</button>
                </div>
            </div>
        )
    }
}
