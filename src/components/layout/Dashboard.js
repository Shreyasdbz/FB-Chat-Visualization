import React from "react";
import { Link } from "react-router-dom";
import store from "../redux/store/store";

const Dashboard = () => {
  var groupConvos = store.getState().conversations.map(convo => {
    if (convo.isGroup === true) {
      return (
        <div key={convo.thread_path} className="container left">
          <div className="row card vertical dashboard-convoDiv">
            <div className="row-content dashboard-convoDiv-content">
              <Link to={"/ConversationFunctions/" + convo.thread_path}>
                <span className="convoCard-name left">{convo.title}</span>
                <button className="btn blue dashboard-convoBtn right">
                  Open
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return <div key={convo.thread_path} className="container" />;
    }
  });

  var dmConvos = store.getState().conversations.map(convo => {
    if (convo.isGroup === false) {
      return (
        <div key={convo.thread_path} className="container left">
          <div className="row card vertical dashboard-convoDiv">
            <div className="row-content dashboard-convoDiv-content">
              <Link to={"/ConversationFunctions/" + convo.thread_path}>
                <span className="convoCard-name left">{convo.title}</span>
                <button className="btn blue dashboard-convoBtn right">
                  Open
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return <div key={convo.thread_path} className="container" />;
    }
  });

  return (
    <div className="dashboard">
      <div className="row center">
        <div className="row-content dashboard-title left">
          <h4>Select a Conversation to see analytics for:</h4>
        </div>
      </div>

      <div className="row">
        <div className="row-content">
          <div className="col s6">
            <div className="col-content">
              <div className="row">
                <div className="row-content">
                  <h5 className="dashboard-convoType-title">
                    {/* <icon class="material-icons">group</icon> */}
                    Group Conversations
                  </h5>
                  <hr className="dashboard-titleDivider left" />
                  <br />
                </div>
                {groupConvos}
              </div>
            </div>
          </div>

          <div className="col s6">
            <div className="col-content">
              <div className="row">
                <div className="row-content">
                  <h5 className="dashboard-convoType-title">
                    {/* <i class="material-icons">person</i> */}
                    Individual Conversations
                  </h5>
                  <hr className="dashboard-titleDivider left" />
                  <br />
                </div>
                {dmConvos}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
