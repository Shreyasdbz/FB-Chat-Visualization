import React, { Component } from "react";
import store from "../redux/store/store";
import * as Functions from "../analytics/controller/FunctionList";
import FunctionConductor from "../analytics/controller/FunctionConductor";
import FunctionWrapper from "./FunctionWrapper";

class ConversationFunctions extends Component {
  constructor(props) {
    super(props);
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
    };
  }

  componentDidMount() {
    let path = this.props.location.pathname.replace(
      "/ConversationFunctions/",
      ""
    );
    var convo = null;
    for (let i = 0; i < store.getState().conversations.length; i++) {
      if (store.getState().conversations[i].thread_path === path) {
        convo = store.getState().conversations[i];
      }
    }

    this.setState({
      threadPath: path,
      conversation: convo
    });
  }

  showFunction = functionType => {
    if (functionType === null || functionType === undefined) {
      this.setState({
        show: !this.state.show
      });
    } else {
      this.setState({
        activeFunction: functionType,
        show: !this.state.show
      });
    }
  };

  render() {
    if (this.state.show) {
      var functionData = {
        activeFunction: this.state.activeFunction,
        show: this.state.show,
        conversation: this.state.conversation
      };
      return (
        <FunctionConductor onClose={this.showFunction}>
          {functionData}
        </FunctionConductor>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="row-content">
            <p>Showing functions for: </p>
            <h4>{this.state.conversation.title}</h4>
            <hr className="functions-titleDivider left" />
            <br />
            <h6>Select one of the available functions from below:</h6>
          </div>
        </div>

        <FunctionWrapper
          title="General Conversation Statistics"
          description="Get a breakdown of the number of messages sent by each user"
        >
          <button
            className="btn blue function-link-btn"
            onClick={() =>
              this.showFunction(Functions.GENERAL_CONVERSATION_STATS)
            }
          >
            Open
          </button>
        </FunctionWrapper>

        <FunctionWrapper
          title="Messages By User"
          description="Get a breakdown of the number of messages sent by each user"
        >
          <button
            className="btn blue function-link-btn"
            onClick={() => this.showFunction(Functions.MESSAGES_BY_USER)}
          >
            Open
          </button>
        </FunctionWrapper>

        <FunctionWrapper
          title="Messages Over Time"
          description="Get a breakdown of the number of messages sent by each user"
        >
          <button
            className="btn blue function-link-btn"
            onClick={() =>
              this.showFunction(Functions.MESSAGES_GRAPH_OVER_TIME)
            }
          >
            Open
          </button>
        </FunctionWrapper>

        <FunctionWrapper
          title="Conversation Word Cloud"
          description="Get a breakdown of the number of messages sent by each user"
        >
          <button
            className="btn blue function-link-btn"
            onClick={() => this.showFunction(Functions.WORD_CLOUD)}
          >
            Open
          </button>
        </FunctionWrapper>
      </div>
    );
  }
}

export default ConversationFunctions;
