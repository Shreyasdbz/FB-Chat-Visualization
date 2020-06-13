import React, { Component } from 'react'

class ConversationFunctions extends Component {
    state = {
        threadPath: null
    }

    componentDidMount(){
        let id = this.props.match.params.thread_path
        this.setState({
            threadPath: id
        })
    }

    render(){
        return(
            <div className="container">
                <h4>{this.state.threadPath}</h4>
            </div>
        )
    }
}

export default ConversationFunctions