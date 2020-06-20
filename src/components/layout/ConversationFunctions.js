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
                <div className="row">
                    <div className="row-content">
                        <h3>{this.state.conversation.title}</h3>
                        <p>Select one of the available functions from below:</p>
                    </div>
                </div>

                <div className="row">
                    <div className="row-content">
                        <ul>

                            <li>
                                <div className="card horizontal">
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <h4>Messages by User</h4>
                                            <p>Get a breakdown of the number of messages sent by each user </p>
                                        </div>
                                        <div className="card-action">
                                            <button>Open</button>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="card horizontal">
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <h4>Messages by User</h4>
                                            <p>Get a breakdown of the number of messages sent by each user </p>
                                        </div>
                                        <div className="card-action">
                                            <button>Open</button>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

export default ConversationFunctions