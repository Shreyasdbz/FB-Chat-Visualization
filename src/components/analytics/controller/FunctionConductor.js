import React, { Component } from 'react';
//Functions
import * as Functions from './FunctionList'
import MessagesByUser from '../functions/MessagesByUser'
// import MostWordUses from '../MostWordUses'

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
                        <h3>Messages By User</h3>
                        <MessagesByUser conversation={this.state.conversation}></MessagesByUser>
                        <button className="btn blue" onClick={e => {this.handleClick(e);}}>Back</button>
                    </div>
                )
            case Functions.MOST_WORD_USES:
                return(
                    <div className="container">
                        <h3>Most Word Uses</h3>
                        <button className="btn blue" onClick={e => {this.handleClick(e);}}>Back</button>
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
