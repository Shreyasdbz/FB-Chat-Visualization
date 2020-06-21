import React, { Component } from 'react';
//Functions
import * as Functions from './FunctionList'
import MessagesByUser from '../functions/MessagesByUser'
import MostWordUses from '../functions/MostWordUses'

class FunctionConductor extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeFunction: '',
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
        this.setState({
            activeFunction: this.props.children.activeFunction,
            conversation: this.props.children.conversation    
        })
    }

    handleClick = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    render(){
        switch(this.state.activeFunction){
            case Functions.MESSAGES_BY_USER:
                return(
                    <div className="container">
                        <div className="row">
                            <div className="row-content">
                                <div className="functionWindow-header">
                                    <div className="col s10">
                                        <div className="col-content">
                                            <h4>Messages By User</h4>
                                            <div className="row">
                                                <div className="row-content">
                                                    {this.state.conversation.title}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col s2">
                                        <div className="col-content">
                                            <div className="row">
                                                <div className="row-content">
                                                    <p>Go back to Functions List</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="row-content">
                                                    <button className="btn blue" onClick={e => {this.handleClick(e);}}>Back</button>
                                                </div>
                                            </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row-content">
                                <MessagesByUser conversation={this.state.conversation}></MessagesByUser>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row-content">
                                <div className="functionWindow-footer">
                                    <button className="btn blue" onClick={e => {this.handleClick(e);}}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case Functions.MOST_WORD_USES:
                return(
                    <div className="container">
                        <div className="row">
                            <div className="row-content">
                                <div className="functionWindow-header">
                                    <h3>Messages By User</h3>
                                    <button className="btn blue" onClick={e => {this.handleClick(e);}}>Back</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row-content">
                                <MostWordUses conversation={this.state.conversation}></MostWordUses>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row-content">
                                <div className="functionWindow-footer">
                                    <button className="btn blue" onClick={e => {this.handleClick(e);}}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            default:
                return(
                    null
                )
        }
    }
    // switch(props.currentFunction){
    //     case Functions.MESSAGES_BY_USER:
    //         return <MessagesByUser {...props}></MessagesByUser>
    
    //     case Functions.MOST_WORD_USES:
    //         return <MostWordUses {...props}></MostWordUses>

    //     default:
    //         return null
    // }
};

export default FunctionConductor
