import React, { Component } from "react";
require("tui-chart/dist/tui-chart.css");
var toastui = require("@toast-ui/react-chart");
var BarChart = toastui.BarChart;

//  Total messages sent broken down by each user
//  Stacked bar graph with different colors for 1) Messages, Photos, Links, Gifs, Stickers
export default class MessagesByUser extends Component {
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
      },
      participants: [],
      //GRAPH DATA
      data: {
        //Participant Names + Total Messages
        categories: ["User1 - 750", "User2 - 850", "User3 - 200"],
        series: [
          {
            name: "Text Messages",
            //Participant's textMessages
            data: [100, 250, 2]
          },
          {
            name: "Photos/Vidoes",
            //Participant's mediaMessages
            data: [15, 80, 0]
          },
          {
            name: "Links",
            //Participant's linksMessages
            data: [4, 5, 0]
          },
          {
            name: "Stickers",
            //Participant's stickerMessages
            data: [0, 2, 1]
          }
        ]
      },
      options: {
        chart: {
          width: 1250,
          height: 650,
          title: "Messages Breakdown by Type"
        },
        yAxis: {
          title: "Users"
        },
        xAxis: {
          title: "Messages Sent"
        },
        series: {
          stack: {
            type: "normal",
            connector: true
          }
        },
        plot: {
          showLine: false
        }
      }
    };
  }

  componentDidMount() {
    var convo = this.props.conversation;
    var plist = this.props.conversation.participantList;

    var data = this.getData(plist);

    this.setState({
      conversation: convo,
      participants: plist,
      pageLoading: false,
      data: data
    });
  }

  getData = participantList => {
    var plist = participantList;

    var categories = [];
    var series = [
      { name: "Text Messages", data: [] },
      { name: "Photos/Vidoes", data: [] },
      { name: "Links", data: [] },
      { name: "Stickers", data: [] }
    ];

    for (let p = 0; p < plist.length; p++) {
      var user = plist[p];

      var name_label = user.sender_name + " [" + user.totalMessages + "]";
      categories.push(name_label);

      for (let s = 0; s < series.length; s++) {
        if (series[s].name === "Text Messages") {
          series[s].data.push(user.textMessages);
        }
        if (series[s].name === "Photos/Vidoes") {
          series[s].data.push(user.mediaMessages);
        }
        if (series[s].name === "Links") {
          series[s].data.push(user.linksMessages);
        }
        if (series[s].name === "Stickers") {
          series[s].data.push(user.stickerMessages);
        }
      }
    }

    var data = { categories, series };

    return data;
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
        <div className="graph-container functionWrapper-card">
          <div className="chart">
            {console.log(this.state.data)}
            <BarChart data={this.state.data} options={this.state.options} />
          </div>
        </div>
      );
    }
  }
}
