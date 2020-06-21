import React, { Component } from 'react'

//  Total messages sent broken down by each user
//  Stacked bar graph with different colors for 1) Messages, Photos, Links, Gifs, Stickers
export default class MessagesByUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            conversation: {
                title: "Loading",
                thread_path: null,
                messageList: [],
                participantList: [],
                isGroup: false
            },
            participants: []
        }
    }

    componentDidMount(){
        var convo = this.props.conversation
        var plist = []

        this.setState({
            conversation: convo,
            participants: plist
        })
    }


    render(){
        return(
            <div className="container">
                <span>DATA DATA DATA</span>
           </div>
        )
    }
}
