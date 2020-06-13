import React, { Component } from 'react'
import store from '../redux/store/store'

class ConversationFunctions extends Component {
    state = {
        threadPath: null,
        conversation: "Loading"
    }

    componentDidMount(){
        let path = this.props.location.pathname.replace("/ConversationFunctions/", "");

        console.log(store.getState())
        this.setState({
            threadPath: path,
        })
    }

    render(){
        return(
            <div className="container">
                <h4>{this.state.threadPath}</h4>
                <h5>{this.state.conversation}</h5>
            </div>
        )
    }
}

export default ConversationFunctions