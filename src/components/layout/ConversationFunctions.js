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
            <p>Showing analytics functions for: </p>
            <h4>{this.state.conversation.title}</h4>
            <hr className="functions-titleDivider left" />
            <br />
            <h6>Select one of the available functions from below:</h6>
          </div>
        </div>
        {/* General Conversation Statistics -------------------------------------------------------- */}
        <FunctionWrapper
          title="General Conversation Analytics"
          description="A high level overview of various interesting statistics about a group or conversation"
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
        {/* Messages_by_user Statistics -------------------------------------------------------- */}
        <FunctionWrapper
          title="Message Type By User"
          description="Get a breakdown of the number of messages sent by each user"
        >
          <button
            className="btn blue function-link-btn"
            onClick={() => this.showFunction(Functions.MESSAGES_BY_USER)}
          >
            Open
          </button>
        </FunctionWrapper>
        {/* Messages graph over time Statistics -------------------------------------------------------- */}
        <FunctionWrapper
          title="Messages Over Time"
          description="See how the messages in a group have grown over time"
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
        {/* General Conversation Statistics -------------------------------------------------------- */}
        <FunctionWrapper
          title="Conversation Word Cloud"
          description="Get a word cloud diagram of the most frequently used words in a conversation"
        >
          <button
            className="btn blue function-link-btn"
            onClick={() => this.showFunction(Functions.WORD_CLOUD)}
          >
            Open
          </button>
        </FunctionWrapper>
        {/* General Conversation Statistics -------------------------------------------------------- */}
        <FunctionWrapper
          title="Serch word usage"
          description="Search for a specific word to see its usage frequency by user"
        >
          <button
            className="btn blue function-link-btn"
            onClick={() => this.showFunction(Functions.WORD_FREQUENCY)}
          >
            Open
          </button>
        </FunctionWrapper>
        {/* General Conversation Statistics -------------------------------------------------------- */}
        <FunctionWrapper
          title="Chat Active Times"
          description="See what times each user and the chat overall is active the most"
        >
          <button
            className="btn blue function-link-btn"
            onClick={() => this.showFunction(Functions.TIME_CHAT_ACTIVE)}
          >
            Open
          </button>
        </FunctionWrapper>
        {/* General Conversation Statistics -------------------------------------------------------- */}
        <FunctionWrapper
          title="Conversation Vocabulary"
          description="Check the word length frequency relative to different users"
        >
          <button
            className="btn blue function-link-btn"
            onClick={() => this.showFunction(Functions.WORD_FREQUENCY)}
          >
            Open
          </button>
        </FunctionWrapper>
      </div>
    );
  }
}

export default ConversationFunctions;
