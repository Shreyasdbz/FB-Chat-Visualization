import React, { Component } from 'react'
import store from '../redux/store/store'

class ConversationFunctions extends Component {
    state = {
        threadPath: null,
        conversation: {
            title: "Loading",
            thread_path: null,
            messageList: [],
            participantList: [],
            isGroup: false
        }
    }

    componentDidMount(){
        let path = this.props.location.pathname.replace("/ConversationFunctions/", "");
        var convo = null
        for(let i=0; i<store.getState().conversations.length; i++){
            if(store.getState().conversations[i].thread_path === path){
                convo = store.getState().conversations[i]
            }
        }

        this.setState({
            threadPath: path,
            conversation: convo
        })
    }

    render(){
        console.log(this.state)

        return(
            <div className="container">
            {/* Need to pass props to each function via browser router */}
            </div>
        )
    }
}

export default ConversationFunctions