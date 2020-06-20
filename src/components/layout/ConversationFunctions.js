import React, { Component } from 'react'
import store from '../redux/store/store'

import FunctionWrapper from '../analytics/controller/FunctionWrapper'
import MessagesByUser from '../../components/analytics/functions/MessagesByUser'

class ConversationFunctions extends Component {
    constructor(props){
        super(props)
        this.state = {
            threadPath: null,
            show: false,
            conversation: {
                title: "Loading",
                thread_path: null,
                messageList: [],
                participantList: [],
                isGroup: false
            }
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

    showModal = () => {
        this.setState({
            show: !this.state.show
        });
    }

    render(){
        console.log(this.state)

        if(this.state.show){
            return(
                <FunctionWrapper>
                    <MessagesByUser onClose={this.showModal} show={this.state.show}>
                        Message in Modal 
                    </MessagesByUser>
                </FunctionWrapper>
            )
        }

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
                                            <button onClick={this.showModal} className="waves-effect waves-light btn toggle-button">Open</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="card horizontal">
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <h4>Most Word Uses</h4>
                                            <p>Search for a word and find out who uses it the most</p>
                                        </div>
                                        <div className="card-action">
                                            <button className="waves-effect waves-light btn">Open</button>
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