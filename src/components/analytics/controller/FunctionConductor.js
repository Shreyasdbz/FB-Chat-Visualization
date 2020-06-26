import React, { Component } from "react";
//Functions
import * as Functions from "./FunctionList";
import MessagesByUser from "../functions/MessagesByUser";
import MostWordUses from "../functions/MostWordUses";
import AnalyticsWrapper from "../../layout/AnalyticsWrapper";
import WordCloud from "../functions/WordCloud";
import GeneralAnalytics from "../functions/GeneralAnalytics";

class FunctionConductor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFunction: "",
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
    this.setState({
      activeFunction: this.props.children.activeFunction,
      conversation: this.props.children.conversation
    });
  }

  handleClick = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    switch (this.state.activeFunction) {
      case Functions.MESSAGES_BY_USER:
        return (
          <AnalyticsWrapper
            title="Messages by User"
            conversation={this.state.conversation.title}
          >
            <MessagesByUser conversation={this.state.conversation} />
            <div className="container center">
              <button
                className="btn function-back-btn"
                onClick={e => {
                  this.handleClick(e);
                }}
              >
                Back
              </button>
            </div>
          </AnalyticsWrapper>
        );
      case Functions.MOST_WORD_USES:
        return (
          <AnalyticsWrapper
            title="Word Uses"
            conversation={this.state.conversation.title}
          >
            <MostWordUses conversation={this.state.conversation} />
            <div className="container center">
              <button
                className="btn function-back-btn"
                onClick={e => {
                  this.handleClick(e);
                }}
              >
                Back
              </button>
            </div>
          </AnalyticsWrapper>
        );
      case Functions.WORD_CLOUD:
        return (
          <AnalyticsWrapper
            title="Word Cloud"
            conversation={this.state.conversation.title}
          >
            <WordCloud conversation={this.state.conversation} />
            <div className="container center">
              <button
                className="btn function-back-btn"
                onClick={e => {
                  this.handleClick(e);
                }}
              >
                Back
              </button>
            </div>
          </AnalyticsWrapper>
        );
      case Functions.GENERAL_CONVERSATION_STATS:
        return (
          <AnalyticsWrapper
            title="General Analytics"
            conversation={this.state.conversation.title}
          >
            <GeneralAnalytics conversation={this.state.conversation} />
            <div className="container center">
              <button
                className="btn function-back-btn"
                onClick={e => {
                  this.handleClick(e);
                }}
              >
                Back
              </button>
            </div>
          </AnalyticsWrapper>
        );
      default:
        return null;
    }
  }
}

export default FunctionConductor;
