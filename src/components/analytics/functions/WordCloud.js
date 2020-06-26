import React, { Component } from "react";
import ZingChart from "zingchart-react";
import "zingchart/es6";
// EXPLICITLY IMPORT MODULE
import "zingchart-react/dist/modules/zingchart-depth.min.js";

export default class WordCloud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoading: true,
      conversation: {
        title: "Loading",
        thread_path: null
      },
      wordList: [],
      text: "",
      //Zingchart Data
      data: {
        type: "line",
        series: [{ values: [1, 2, 4, 5, 6] }]
      }
    };
  }

  componentDidMount() {
    var convo = this.props.conversation;
    var wordList = this.props.conversation.wordList;

    var text = this.getData(wordList);

    var data = {
      type: "line",
      series: [{ values: [1, 2, 4, 5, 6] }]
    };

    this.setState({
      conversation: convo,
      wordList: wordList,
      text: text,
      pageLoading: false
      // data: data
    });
  }

  getData = wordList => {
    var longText = "";

    for (let w = 0; w < wordList.length; w++) {
      longText = longText + " " + wordList[w];
    }

    return longText;
  };

  render() {
    if (this.state.pageLoading === true) {
      return (
        <div className="container">
          <h2>Loading</h2>
        </div>
      );
    } else {
      return (
        <div className="container">
          TEST
          <ZingChart data={this.state.data} />
          {console.log(this.state)}
        </div>
      );
    }
  }
}
