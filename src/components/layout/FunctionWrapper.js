import React, { Component } from "react";

class FunctionWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 5
    };
  }

  render() {
    return (
      <div className="row">
        <div className="row-content">
          <div className="card function-card">
            <div className="card-content">
              <div className="col s8">
                <div class="col-content">
                  <div className="row">
                    <div className="row-content">
                      <h5>{this.props.title}</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="row-content">
                      <p>{this.props.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col s4">
                <div class="col-content function-link right">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FunctionWrapper;
