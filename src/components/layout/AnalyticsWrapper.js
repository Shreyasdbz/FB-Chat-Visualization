import React, { Component } from "react";

class AnalyticsWrapper extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="row-content">
            <div className="functionWindow-header">
              <div className="row">
                <div className="row-content">
                  <p>Currently showing: {this.props.conversation}</p>
                </div>
              </div>
              <div className="row">
                <div className="row-content">
                  <h4>{this.props.title}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default AnalyticsWrapper;
