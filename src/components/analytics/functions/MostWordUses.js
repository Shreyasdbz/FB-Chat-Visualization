import React, { Component } from 'react'
require('tui-chart/dist/tui-chart.css');
// var toastui = require('@toast-ui/react-chart');
// var BarChart = toastui.BarChart;

export default class MostWordUses extends Component {
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
        var plist = this.props.conversation.participantList

        this.setState({
            conversation: convo,
            participants: plist
        })
    }


    render(){
        // console.log(this.state.participants)

        return(
            <div className="container">
                <span>DATA DATA DATA</span>
           </div>
        )
    }
}
