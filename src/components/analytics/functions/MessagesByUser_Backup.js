import React, { Component } from 'react'
require('tui-chart/dist/tui-chart.css');
var toastui = require('@toast-ui/react-chart');
var BarChart = toastui.BarChart;

//  Total messages sent broken down by each user
//  Stacked bar graph with different colors for 1) Messages, Photos, Links, Gifs, Stickers
export default class MessagesByUser extends Component {
    constructor(props){
        super(props)
        this.state = {

            data: {
                categories: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'],
                series: [
                    {
                        name: 'Budget',
                        data: [5000, 3000, 5000, 7000, 6000, 4000]
                    },
                    {
                        name: 'Income',
                        data: [8000, 1000, 7000, 2000, 5000, 3000]
                    }
                ]
            },
              
            options: {
                chart: {
                      width: 1160,
                      height: 650,
                      title: 'Monthly Revenue',
                      format: '1,000'
                  },
                  yAxis: {
                      title: 'Month'
                  },
                  xAxis: {
                      title: 'Amount',
                      min: 0,
                      max: 9000,
                      suffix: '$'
                  },
                  series: {
                      showLabel: true
                  }
            }

        }
    }


    render(){
        if(!this.props.show){
            return null
        }
        return(
            <div className="container">
                <div className="title">
                    Total messages sent broken down by each user
                </div>
                <div className="chart">
                    <BarChart data={this.state.data}  options={this.state.options} />                
                </div>
            </div>
        )
    }
}
