import React, { Component } from "react";

class GeneralAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoading: true,
      conversation: {
        title: "Loading",
        thread_path: null,
        messageList: [],
        participantList: [],
        isGroup: false
      }
    };
  }

  componentDidMount() {
    var convo = this.props.conversation;

    this.setState({
      conversation: convo,
      pageLoading: false
    });
  }

  render() {
    return (
      <div className="graph-container functionWrapper-card">
        <div className="card-content">
          <div className="row">
            <div className="row-content">Total messages sent: </div>
          </div>
        </div>
        {console.log("@GeneralAnalytics", this.state)}
      </div>
    );
  }
}

export default GeneralAnalytics;
