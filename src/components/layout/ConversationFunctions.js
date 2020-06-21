import React, { Component } from 'react'
import store from '../redux/store/store'
import * as Functions from '../analytics/controller/FunctionList'
import FunctionConductor from '../analytics/controller/FunctionConductor'

class ConversationFunctions extends Component {
    constructor(props){
        super(props)
        this.state = {
            threadPath: null,
            conversation: {
                title: "Loading",
                thread_path: null,
                messageList: [],
                participantList: [],
                isGroup: false
            },
            show: false,
            activeFunction: Functions.NO_FUNCTION
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
            conversation: convo,       
        })
    }

    showFunction = (functionType) => {
        if(functionType === null || functionType === undefined){
            this.setState({
                show: !this.state.show
            });
        }
        else{
            this.setState({
                activeFunction: functionType,
                show: !this.state.show
            });
        }
    }

    render(){
        if(this.state.show){
            var functionData = {
                activeFunction: this.state.activeFunction,
                show: this.state.show,
                conversation: this.state.conversation    
            }
            return(
                <FunctionConductor onClose={this.showFunction}>{functionData}</FunctionConductor>
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
                                            <p>Get a breakdown of the number of messages sent by each user</p>
                                        </div>
                                        <div className="card-action">
                                            {/* <button onClick={this.showFunction} className="waves-effect waves-light btn toggle-button">Open</button> */}
                                            <button onClick={() => this.showFunction(Functions.MESSAGES_BY_USER)} className="waves-effect waves-light btn toggle-button">Open</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                            <div className="card horizontal">
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <h4>Most Word Uses</h4>
                                            <p>Search for a word and see who uses it the most!</p>
                                        </div>
                                        <div className="card-action">
                                            {/* <button onClick={this.showFunction} className="waves-effect waves-light btn toggle-button">Open</button> */}
                                            <button onClick={() => this.showFunction(Functions.MOST_WORD_USES)} className="waves-effect waves-light btn toggle-button">Open</button>
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